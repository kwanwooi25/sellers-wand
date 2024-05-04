'use client';

import { LucideMoon, LucideSettings, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

type Theme = 'light' | 'dark' | 'system';

const THEMES: Theme[] = ['light', 'dark', 'system'];

const getNextTheme = (theme: Theme): Theme => {
  const themeIndex = THEMES.findIndex((t) => t === theme);
  const nextThemeIndex = THEMES.length <= themeIndex + 1 ? 0 : themeIndex + 1;
  return THEMES[nextThemeIndex];
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="text-foreground"
      size="icon"
      variant="ghost"
      onClick={() => setTheme(getNextTheme(theme as Theme))}
    >
      {theme === 'light' && <LucideMoon size={20} />}
      {theme === 'dark' && <LucideSettings size={20} />}
      {theme === 'system' && <LucideSun size={20} />}
    </Button>
  );
}
