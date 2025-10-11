import React from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionForm } from './SubscriptionForm';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12">
      <div className="container flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-md">
          <SubscriptionForm />
        </div>
        <div className="w-full flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {currentYear} LuoYuan. All Rights Reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About & Contact
            </Link>
            <Link to="/ai" className="text-sm text-muted-foreground hover:text-foreground">
              AI
            </Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Articles
            </Link>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
              Portfolio
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 