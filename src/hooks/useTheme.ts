import { useState, useEffect } from 'react';

type Theme = 'dark' | 'olive';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-olive');
    
    if (theme === 'olive') {
      root.classList.add('theme-olive');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'olive' : 'dark');
  };

  return { theme, toggleTheme };
}
