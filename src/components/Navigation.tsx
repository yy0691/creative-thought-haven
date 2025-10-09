import { useState, useEffect } from "react";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bot } from "lucide-react";
import SearchBar from './SearchBar';
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navigation.module.css";

// 创建一个全局事件总线来处理AI菜单的状态
export const aiMenuEventBus = {
  listeners: new Set(),
  emit() {
    this.listeners.forEach(listener => listener());
  },
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 触发AI菜单事件
  const handleAIMenuClick = () => {
    aiMenuEventBus.emit();
  };

  // 防止菜单打开时页面滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 当路由变化时自动关闭菜单
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const routes = [
    { path: "/", label: "首页" },
    { path: "/ai", label: "人工智能" },
    { path: "/blog", label: "文章" },
    { path: "/portfolio", label: "软件&工具" },
    // { path: "/designs", label: "设计" },
    { path: "/about", label: "关于我" },
    // { path: "/content", label: "内容管理" },
  ];

  return (
    <header className={styles.navbar}>
      <nav className="container mx-auto px-3 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-semibold text-foreground dark:text-white hover:text-primary transition-colors duration-300">
            LuoYuan
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <ThemeToggle />
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`transition-colors hover:text-primary ${
                  location.pathname === route.path
                    ? "text-primary font-medium dark:text-white"
                    : "text-muted-foreground dark:text-gray-300"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* 移动导航按钮 */}
          <div className="md:hidden flex items-center gap-2">
            {location.pathname === '/ai' && (
              <button
                onClick={handleAIMenuClick}
                className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 active:scale-95"
                aria-label="打开AI侧边栏"
              >
                <Bot size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="打开导航菜单"
              className="relative p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 active:scale-95"
            >
              <div className="relative w-5 h-5">
                {/* 汉堡菜单动画图标 */}
                <span className={`absolute left-0 top-1 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-4 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端下拉菜单背景遮罩 */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[56px] bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 移动端下拉菜单 */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[56px] z-40 transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-3 py-4">
            <div className="max-w-md mx-auto space-y-4">
              {/* 搜索和主题切换 */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex-1">
                  <SearchBar />
                </div>
                <div className="flex-shrink-0">
                  <ThemeToggle />
                </div>
              </div>

              {/* 导航链接 */}
              <div className="space-y-1">
                {routes.map((route, index) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`group relative block px-4 py-2.5 rounded-lg transition-all duration-200 overflow-hidden ${
                      location.pathname === route.path
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {/* 波纹效果背景 */}
                    <span className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${location.pathname === route.path ? 'hidden' : ''}`} />
                    
                    {/* 激活指示器 */}
                    {location.pathname === route.path && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                    )}
                    
                    <span className="relative z-10 flex items-center justify-between">
                      <span>{route.label}</span>
                      {location.pathname === route.path && (
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navigation;