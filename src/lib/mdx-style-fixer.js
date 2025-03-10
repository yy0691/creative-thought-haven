/**
 * 修复MDX文件中的样式语法问题 (ES Module版本)
 */
const fixMdxStyles = (content) => {
  // 修复 style="property: value" 格式为 style={{property: value}}
  const styleRegex = /<(\w+)\s+style="([^"]+)"/g;
  
  return content.replace(styleRegex, (match, tag, styleString) => {
    // 解析样式字符串
    const styleProperties = styleString.split(';').filter(prop => prop.trim());
    const styleObject = {};
    
    styleProperties.forEach(prop => {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) {
        // 转换CSS属性为驼峰命名
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styleObject[camelKey] = value;
      }
    });
    
    // 生成新的样式对象字符串
    const styleObjectString = Object.entries(styleObject)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(', ');
    
    return `<${tag} style={{${styleObjectString}}}`;
  });
};

export default fixMdxStyles; 