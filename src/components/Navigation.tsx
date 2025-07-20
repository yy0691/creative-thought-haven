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
    { path: "/ai", label: "AI" },
    { path: "/blog", label: "文章" },
    { path: "/portfolio", label: "软件" },
    { path: "/designs", label: "设计" },
    { path: "/about", label: "关于我" },
    // { path: "/content", label: "内容管理" },
  ];

  return (
    <header className={styles.navbar}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-foreground dark:text-white hover:text-primary transition-colors duration-300">
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
          <div className="md:hidden flex items-center space-x-4">
            {location.pathname === '/ai' && (
              <button
                onClick={handleAIMenuClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="打开AI侧边栏"
              >
                <Bot size={20} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="打开导航菜单"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[64px] z-40 transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-96 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-4">
            <div className="max-w-md mx-auto">
              {/* 搜索和主题切换 */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1 max-w-[240px]">
                  <SearchBar />
                </div>
                <div className="ml-4">
                  <ThemeToggle />
                </div>
              </div>

              {/* 导航链接 */}
              <div className="space-y-2">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-1.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:translate-x-1 ${
                      location.pathname === route.path
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 font-medium shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-300"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;