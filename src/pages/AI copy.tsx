import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CustomMDXComponents from '../components/MDXComponents';
import { H2, H3, H4 } from '../components/ui/Heading';

// Data Imports
import generatedSections from '../data/ai/generated-ai-sections.json';
import generatedNews from '../data/ai/generated-news.json';

// --- Type Definition ---
interface CardItem {
  id: string;
  title: string;
  description: string;
  link: string;
  group?: string;
  date?: string;
  image?: string;
  author?: string;
  content?: string;
  [key: string]: any; 
}

// --- Data Hooks ---
const useNews = () => {
  const newsData = useMemo(() => {
    return generatedNews.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-CA'), // YYYY-MM-DD
    }));
  }, []);
  return { newsData };
};

const useAISections = () => {
    return { aiSections: (generatedSections as unknown as CardItem[]) || [] };
};

// --- Helper Functions ---
const getFaviconUrl = (url?: string): string => {
  if (!url) return 'https://via.placeholder.com/32';
  try {
    const host = new URL(url).hostname;
    return `https://icons.duckduckgo.com/ip3/${host}.ico`;
  } catch {
    return 'https://via.placeholder.com/32';
  }
};

// --- UI Components ---
const SmallCard = ({ item, onClick }: { item: CardItem, onClick: () => void }) => (
  <div onClick={onClick} className="p-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group flex items-start gap-4 cursor-pointer">
    <img src={getFaviconUrl(item.link)} alt={`${item.title} favicon`} className="w-8 h-8 mt-1 flex-shrink-0" />
    <div className="flex-1">
      <H4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary">{item.title}</H4>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.description}</p>
    </div>
  </div>
);

const LargeCard = ({ item, onClick }: { item: CardItem, onClick: () => void }) => (
  <div onClick={onClick} className="card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 h-full cursor-pointer flex flex-col">
    {item.image && <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />}
    <div className="p-4 flex flex-col flex-grow">
      <H6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{item.title}</H6>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">
        {item.description}
      </p>
      <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-700/50 w-full flex justify-between items-center text-xs text-gray-500">
        <span>{item.author}</span>
        <span>{item.date}</span>
      </div>
    </div>
  </div>
);

const TabIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent size={16} />;
};

const DetailModal = ({ item, onClose }: { item: CardItem | null, onClose: () => void }) => (
    <AnimatePresence>
        {item && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                >
                    <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                        <H2 className="text-xl font-bold">{item.title}</H2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <LucideIcons.X size={20} />
                        </button>
                    </header>
                    <main className="p-6 overflow-y-auto">
                        <div className="prose dark:prose-invert max-w-none">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={CustomMDXComponents as any}>
                                {item.content || item.description}
                            </ReactMarkdown>
                        </div>
                    </main>
                    <footer className="p-4 border-t dark:border-gray-700 flex justify-end flex-shrink-0">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            访问原文 <LucideIcons.ExternalLink size={16} className="ml-2" />
                        </a>
                    </footer>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- Main AI Component ---
const AI = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);

  const { newsData } = useNews();
  const { aiSections } = useAISections();

  const tabCategories = useMemo(() => {
    const iconMap: { [key: string]: string } = {
      learning: 'GraduationCap', tools: 'Telescope', prompts: 'Terminal', resources: 'Library'
    };
    const dynamicTabs = aiSections.map(s => ({ id: s.id, label: s.title, icon: iconMap[s.id] || 'HelpCircle' }));
    return [
      { id: 'main', title: '主要', tabs: [{ id: 'news', label: 'AI新闻', icon: 'Newspaper' }] },
      { id: 'content', title: '导航', tabs: dynamicTabs },
    ];
  }, [aiSections]);

  const getTabContent = (): CardItem[] => {
    if (activeTab === 'news') return newsData.map(item => ({ ...item, group: '最新动态' }));
    const section = aiSections.find(s => s.id === activeTab);
    return section ? (section as any).items : [];
  };

  const renderTabContent = () => {
    const items = getTabContent();
    if (items.length === 0) return <div className="text-center py-20">无内容</div>;
    
    const groupedItems = items.reduce((acc, item) => {
        const group = item.group || 'General';
        (acc[group] = acc[group] || []).push(item);
        return acc;
    }, {} as Record<string, CardItem[]>);

    const isNewsTab = activeTab === 'news';

    return (
      <div className="space-y-10">
        {Object.entries(groupedItems).map(([groupTitle, groupItems]) => (
          <section key={groupTitle}>
            <H2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-primary">{groupTitle}</H2>
            <div className={`grid gap-4 ${isNewsTab ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {groupItems.map(item => isNewsTab
                ? <LargeCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                : <SmallCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              )}
            </div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex relative">
      <SEO title="AI资源中心" description="AI前沿新闻、工具、提示词库、学习资料和相关链接" />
      <aside className="hidden lg:block w-[280px] min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
          <header className="text-xl font-bold text-gray-900 dark:text-white">AI 资源中心</header>
        </div>
        <nav className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {tabCategories.map(cat => (
            <div key={cat.id} className="mb-4">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{cat.title}</div>
<ul>
                {cat.tabs.map(tab => (
                  <li key={tab.id}>
                    <button onClick={() => setActiveTab(tab.id)} className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
                      <TabIcon iconName={tab.icon} /><span className="ml-3">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderTabContent()}
      </main>
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default AI;