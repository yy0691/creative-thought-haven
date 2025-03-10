import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} LuoYuan. 保留所有权利。
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            关于
          </Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            文章
          </Link>
          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
            作品
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer; 