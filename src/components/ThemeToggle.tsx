
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center w-14 h-8 rounded-full border-2 transition-all duration-300 ease-in-out hover:scale-105',
        isDark 
          ? 'bg-slate-800 border-slate-600' 
          : 'bg-mysore-marigold/20 border-mysore-marigold/30'
      )}
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <div
        className={cn(
          'absolute w-6 h-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center',
          isDark 
            ? 'translate-x-3 bg-slate-700 shadow-lg' 
            : '-translate-x-3 bg-mysore-marigold shadow-md'
        )}
      >
        {/* Icon with rotation animation */}
        <div className="transition-transform duration-300 ease-in-out">
          {isDark ? (
            <Moon className="w-3 h-3 text-blue-200 animate-fade-in" />
          ) : (
            <Sun className="w-3 h-3 text-white animate-fade-in" />
          )}
        </div>
      </div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun 
          className={cn(
            'w-3 h-3 transition-opacity duration-300',
            isDark ? 'opacity-30 text-gray-500' : 'opacity-70 text-mysore-marigold'
          )} 
        />
        <Moon 
          className={cn(
            'w-3 h-3 transition-opacity duration-300',
            isDark ? 'opacity-70 text-blue-300' : 'opacity-30 text-gray-400'
          )} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
