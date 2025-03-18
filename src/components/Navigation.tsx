import { useState } from "react";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from './SearchBar';
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { path: "/", label: "首页" },
    { path: "/ai", label: "AI" },
    { path: "/blog", label: "文章" },
    { path: "/portfolio", label: "软件" },
    { path: "/designs", label: "设计" },
    { path: "/about", label: "关于我" },
  ];

  return (
    <header className={styles.navbar}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-foreground dark:text-white hover:text-primary transition-colors duration-300">
            LuoYuan
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isOpen && (
            <div className={styles.mobileMenu}>
              <div className="flex flex-col space-y-4 px-6">
                <div className="flex justify-between items-center pt-2">
                  <SearchBar />
                  <ThemeToggle />
                </div>
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
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
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;