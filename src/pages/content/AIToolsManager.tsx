import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardItem } from '../../data/ai/types';
import { supabase } from '../../lib/supabese';

// 工具分类定义
const toolCategories = [
  { id: 'general-cn', name: '通用大模型 - 国内' },
  { id: 'general-overseas', name: '通用大模型 - 国外' },
  { id: 'painting', name: 'AI绘画' },
  { id: 'coding', name: 'AI编程' },
  { id: 'voice', name: 'AI语音' },
  { id: 'video', name: 'AI视频' },
  { id: 'modeling', name: 'AI建模' },
  { id: 'security', name: 'AI安全' },
  { id: 'other', name: '其他工具' }
];

const LOCAL_STORAGE_KEY = 'ai-tools-data';

const AIToolsManager: React.FC = () => {
  // 状态定义
  const [activeCategory, setActiveCategory] = useState<string>('general-cn');
  const [toolsList, setToolsList] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<CardItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 表单状态
  const [formData, setFormData] = useState<CardItem>({
    id: '',
    title: '',
    description: '',
    link: '',
    image: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    tags: []
  });

  // 错误状态
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 加载工具数据
  useEffect(() => {
    loadToolsData();
  }, []);

  const loadToolsData = async () => {
    try {
      setIsLoading(true);
      
      // 从Supabase加载数据
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setToolsList(data);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('加载工具数据失败:', error);
      setIsLoading(false);
      toast({
        title: '错误',
        description: '加载工具数据失败',
        variant: 'destructive',
      });
    }
  };

  // 创建新工具ID
  const generateNewId = (category: string) => {
    const existingTools = toolsList.filter(tool => tool.category === category);
    const nextIndex = existingTools.length;
    return `${category}-${nextIndex}`;
  };

  // 处理表单输入变化
  const handleInputChange = (field: keyof CardItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 处理标签变化
  const handleTagsChange = (value: string) => {
    const tags = value
      .split(/[,，]/) // 支持中英文逗号
      .map(tag => tag.trim())
      .filter(Boolean);

    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  // 表单验证
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) errors.title = '标题不能为空';
    if (!formData.description.trim()) errors.description = '描述不能为空';
    if (!formData.link?.trim()) errors.link = '链接不能为空';
    if (!formData.category?.trim()) errors.category = '请选择分类';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 处理保存
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      // 准备要保存的数据
      const toolData = {
        ...formData,
        id: formData.id || undefined // 如果是新记录，让Supabase生成ID
      };
      
      // 如果是编辑现有记录
      if (selectedTool) {
        const { error } = await supabase
          .from('ai_tools')
          .update(toolData)
          .eq('id', toolData.id);
          
        if (error) throw error;
      } 
      // 如果是新建记录
      else {
        const { error } = await supabase
          .from('ai_tools')
          .insert(toolData);
          
        if (error) throw error;
      }
      
      toast({
        title: '成功',
        description: '工具数据已保存',
      });
      
      // 重新加载数据
      loadToolsData();
      resetForm();
    } catch (error) {
      console.error('保存工具数据失败:', error);
      toast({
        title: '错误',
        description: '保存工具数据失败',
        variant: 'destructive',
      });
    }
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这个工具吗？此操作不可恢复。')) return;

    try {
      const { error } = await supabase
        .from('ai_tools')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: '成功',
        description: '工具已删除',
      });
      
      // 重新加载数据
      loadToolsData();
      resetForm();
    } catch (error) {
      console.error('删除工具失败:', error);
      toast({
        title: '错误',
        description: '删除工具失败',
        variant: 'destructive',
      });
    }
  };

  // 重置表单
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      link: '',
      image: '',
      category: activeCategory,
      author: '',
      date: new Date().toISOString().split('T')[0],
      tags: []
    });
    setSelectedTool(null);
    setIsEditing(false);
    setFormErrors({});
  };

  // 处理编辑工具
  const handleEditTool = (tool: CardItem) => {
    setSelectedTool(tool);
    setFormData({
      ...tool,
      date: tool.date || new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  // 过滤当前分类的工具
  const filteredTools = toolsList.filter(tool => {
    const matchesCategory = tool.category === activeCategory;
    const matchesSearch = !searchTerm || 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.author && tool.author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI工具管理</h1>
            <p className="text-gray-600 mt-2">添加、编辑和管理AI工具信息</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsEditing(true);
              setFormData(prev => ({
                ...prev,
                category: activeCategory
              }));
            }}
          >
            添加新工具
          </Button>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* 左侧分类和工具列表 */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>工具分类</CardTitle>
                <CardDescription>选择要管理的AI工具分类</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue={activeCategory} 
                  onValueChange={setActiveCategory}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    {toolCategories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="text-sm"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {toolCategories.map(category => (
                    <TabsContent key={category.id} value={category.id}>
                      <div className="mb-4">
                        <Label htmlFor="search">搜索工具</Label>
                        <Input
                          id="search"
                          placeholder="输入关键词搜索..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <p>加载中...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredTools.length > 0 ? (
                            filteredTools.map(tool => (
                              <Card key={tool.id} className="overflow-hidden">
                                <div className="p-4 flex justify-between items-start">
                                  <div className="flex-1">
                                    <h3 className="text-lg font-medium">{tool.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
                                    {tool.author && (
                                      <p className="text-xs text-gray-400 mt-1">作者: {tool.author}</p>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleEditTool(tool)}
                                    >
                                      编辑
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleDelete(tool.id)}
                                    >
                                      删除
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))
                          ) : (
                            <div className="text-center py-4">
                              <p>没有找到匹配的工具</p>
                            </div>
                          )}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* 右侧编辑表单 */}
          <div className="col-span-12 lg:col-span-5">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTool ? '编辑工具' : '添加新工具'}</CardTitle>
                  <CardDescription>
                    {selectedTool 
                      ? `正在编辑: ${selectedTool.title}` 
                      : '填写以下信息添加新工具'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">标题</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="工具名称"
                        className={formErrors.title ? 'border-red-500' : ''}
                      />
                      {formErrors.title && (
                        <p className="text-xs text-red-500">{formErrors.title}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">描述</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="工具简介"
                        className={formErrors.description ? 'border-red-500' : ''}
                        rows={3}
                      />
                      {formErrors.description && (
                        <p className="text-xs text-red-500">{formErrors.description}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="link">链接</Label>
                      <Input
                        id="link"
                        value={formData.link || ''}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                        placeholder="https://example.com"
                        className={formErrors.link ? 'border-red-500' : ''}
                      />
                      {formErrors.link && (
                        <p className="text-xs text-red-500">{formErrors.link}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">图片URL</Label>
                      <Input
                        id="image"
                        value={formData.image || ''}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">分类</Label>
                      <Select
                        value={formData.category || ''}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className={formErrors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="选择分类" />
                        </SelectTrigger>
                        <SelectContent>
                          {toolCategories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.category && (
                        <p className="text-xs text-red-500">{formErrors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author">作者/提供商</Label>
                      <Input
                        id="author"
                        value={formData.author || ''}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="公司或作者名称"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">日期</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">标签</Label>
                      <Input
                        id="tags"
                        value={formData.tags?.join(', ') || ''}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder="标签1, 标签2, 标签3"
                      />
                      <p className="text-xs text-gray-500">用逗号分隔多个标签</p>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={resetForm}>
                        取消
                      </Button>
                      <Button onClick={handleSave}>
                        保存
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>AI工具管理说明</CardTitle>
                    <CardDescription>选择左侧工具进行编辑，或点击"添加新工具"创建新条目</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>工具按分类组织，选择合适的分类管理内容</li>
                      <li>每个工具需要提供标题、描述和链接</li>
                      <li>图片URL应为公开可访问的图片地址</li>
                      <li>标签有助于用户搜索和过滤工具</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsManager; 