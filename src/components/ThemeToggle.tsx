import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
      aria-label="切换主题"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-primary hover:text-primary/80" />
      ) : (
        <Sun size={20} className="text-primary hover:text-primary/80" />
      )}
    </button>
  );
};

export default ThemeToggle;