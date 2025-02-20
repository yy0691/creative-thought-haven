
import { useState } from "react";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from './SearchBar';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { path: "/", label: "首页" },
    { path: "/blog", label: "文章" },
    { path: "/portfolio", label: "软件" },
    { path: "/designs", label: "设计" },
    { path: "/about", label: "关于" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 glass px-6 py-4 backdrop-blur-sm bg-background/80 border-b border-border/40 animate-fadeIn">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold hover:text-primary transition-colors duration-300">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`transition-colors hover:text-primary ${
                location.pathname === route.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <SearchBar />
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
          <div className="absolute top-full left-0 right-0 glass py-4 md:hidden animate-slideDown backdrop-blur-sm bg-background/95 border-b border-border/40">
            <div className="flex flex-col space-y-4 px-6">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors hover:text-primary ${
                    location.pathname === route.path
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              ))}
              <div className="pt-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;