import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiMenuEventBus } from '../components/Navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDXComponents from '../components/MDXComponents';
import { motion, AnimatePresence } from 'framer-motion';
import { CardImage } from '../components/CardImage';
import { TableOfContents } from '../components/TableOfContents';

// Data Imports
import generatedSections from '../data/ai/generated-ai-sections.json';
// FIX: Import the actual news data from the generated JSON file.
import generatedNews from '../data/ai/generated-news.json';

// --- Type Definition ---
interface CardItem {
  id: string;
  title: string;
  description: string;
  link: string;
  group?: string; // Added to support sub-category grouping
  date?: string;
  image?: string;
  author?: string;
  content?: string;
  // Other properties can be added here if needed
  [key: string]: any; 
}

// --- Data Hooks ---

// FIX: The useNews hook now loads, sorts, and formats data from generated-news.json.
const useNews = () => {
  const newsData = useMemo(() => {
    return [...generatedNews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item) => ({
        ...item,
        // Ensure date is formatted nicely if needed, here we just pass it through
        date: new Date(item.date).toLocaleDateString('en-CA'), // YYYY-MM-DD format
      }));
  }, []);
  
  const isLoadingNews = false;
  const newsError = null;
  return { newsData, isLoadingNews, newsError };
};

const useAISections = () => {
    const aiSections = (generatedSections as any[]) || [];
    return { aiSections };
};


// --- Helper Functions ---
const getDomainFromUrl = (url?: string): string | null => {
  if (!url) return null;
  try { return new URL(url).hostname; } 
  catch { return null; }
};

const getFaviconUrl = (url?: string): string => {
  const host = getDomainFromUrl(url);
  if (!host) return 'https://via.placeholder.com/32'; // Placeholder for invalid URLs
  return `https://icons.duckduckgo.com/ip3/${host}.ico`;
};


// --- UI Components ---
const SmallCard = ({ item }: { item: CardItem }) => (
  <a 
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group flex items-start gap-4"
  >
    <img src={getFaviconUrl(item.link)} alt={`${item.title} favicon`} className="w-8 h-8 mt-1 flex-shrink-0" />
    <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary">{item.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.description}</p>
    </div>
  </a>
);

const LargeCard = ({ item }: { item: CardItem }) => (
    <div 
        key={item.id} 
        className="card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 h-full"
    >
        <div className="p-4 flex flex-col h-full">
            {item.image && <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-4 rounded" />}
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">
                {item.description}
            </p>
            <div className="pt-3 mt-auto border-t border-gray-100 dark:border-gray-700/50 w-full flex justify-between items-center">
                <span className="text-xs text-gray-500">{item.date}</span>
                <a 
                    href={item.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary-dark text-xs whitespace-nowrap"
                >
                    Learn More <LucideIcons.ChevronRight size={14} className="ml-1" />
                </a>
            </div>
        </div>
    </div>
);


const TabIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent size={16} />;
};


// --- Main AI Component ---
const AI = () => {
  // Set the default tab to 'tools' for a better landing experience
  const [activeTab, setActiveTab] = useState('tools');
  const { newsData, isLoadingNews, newsError } = useNews();
  const { aiSections } = useAISections();

  // FIX: The sidebar generation logic is simplified and corrected to find all sections.
  const tabCategories = useMemo(() => {
    const iconMap: { [key: string]: string } = {
        learning: 'GraduationCap',
        tools: 'Telescope',
        prompts: 'Terminal',
        resources: 'Library',
    };

    const dynamicTabs = aiSections.map(section => ({
        id: section.id,
        label: section.title,
        icon: iconMap[section.id] || 'HelpCircle',
    }));

    return [
        {
            id: 'main',
            title: '主要',
            tabs: [{ id: 'news', label: 'AI新闻', icon: 'Newspaper' }],
        },
        {
            id: 'content',
            title: '导航',
            tabs: dynamicTabs,
        },
    ];
  }, [aiSections]);

  // REFACTOR: This function now simply finds the right section by ID.
  const getTabContent = (): CardItem[] => {
    if (activeTab === 'news') {
        // News items don't have a 'group' property, so we add a default one.
        return newsData.map(item => ({ ...item, group: '最新动态' })) as CardItem[];
    }
    const section = aiSections.find(s => s.id === activeTab);
    return section ? section.items as CardItem[] : [];
  };
  
  // REFACTOR: The core rendering logic is now grouped.
  const renderTabContent = () => {
    const items = getTabContent();

    if (!items || items.length === 0) {
        return (
            <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400">
                <LucideIcons.Search className="mx-auto mb-3 w-16 h-16 opacity-20" />
                <p className="text-lg">No Content Available</p>
            </div>
        );
    }
    
    // Group items by the `group` property from our build script
    const groupedItems = items.reduce((acc, item) => {
        const group = item.group || 'General'; // Fallback group
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(item);
        return acc;
    }, {} as Record<string, CardItem[]>);

    const CardComponent = activeTab === 'news' ? LargeCard : SmallCard;

    return (
        <div className="space-y-10">
            {Object.entries(groupedItems).map(([groupTitle, groupItems]) => (
                <section key={groupTitle}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-primary">
                        {groupTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupItems.map(item => (
                            <CardComponent key={item.id} item={item} />
                        ))}
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
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI 资源中心</h1>
                </div>
                <nav className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {tabCategories.map((category) => (
                        <div key={category.id} className="mb-4">
                            {category.title && (
                                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {category.title}
                                </div>
                            )}
                            <ul>
                                {category.tabs.map((tab) => (
                                    <li key={tab.id}>
                                        <button
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ease-in-out ${
                                                activeTab === tab.id 
                                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 font-medium' 
                                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                                            }`}
                                        >
                                            <span className="mr-3"><TabIcon iconName={tab.icon} /></span>
                                            {tab.label}
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
        </div>
    );
};

export default AI;