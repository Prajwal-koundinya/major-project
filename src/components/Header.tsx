
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeMode: 'tourist' | 'citizen';
  setActiveMode: React.Dispatch<React.SetStateAction<'tourist' | 'citizen'>>;
}

const Header: React.FC<HeaderProps> = ({ activeMode, setActiveMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if the user has scrolled down or up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Set scrolled state for styling
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        isScrolled ? 'glassmorphism py-2' : 'bg-transparent py-4',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <img src="/placeholder.svg" alt="Mysuru Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl md:text-2xl font-heading font-bold text-mysore-royal-purple">
            <span className="mr-1">Mysuru</span>
            <span className="text-mysore-heritage-red">Assist</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button
            variant={activeMode === 'tourist' ? "default" : "outline"} 
            onClick={() => setActiveMode('tourist')}
            className={cn(
              'rounded-full px-6',
              activeMode === 'tourist' ? 'bg-mysore-royal-purple text-white' : 'text-mysore-royal-purple'
            )}
          >
            Tourist Mode
          </Button>
          <Button
            variant={activeMode === 'citizen' ? "default" : "outline"} 
            onClick={() => setActiveMode('citizen')}
            className={cn(
              'rounded-full px-6',
              activeMode === 'citizen' ? 'bg-mysore-heritage-red text-white' : 'text-mysore-heritage-red'
            )}
          >
            Citizen Mode
          </Button>
          <Button variant="ghost" className="ml-2">About</Button>
        </nav>

        {/* Mobile Menu Trigger */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glassmorphism p-4 mt-2 animate-fade-in md:hidden">
            <div className="flex flex-col space-y-2">
              <Button
                variant={activeMode === 'tourist' ? "default" : "outline"} 
                onClick={() => {
                  setActiveMode('tourist');
                  toggleMobileMenu();
                }}
                className={cn(
                  'w-full justify-start',
                  activeMode === 'tourist' ? 'bg-mysore-royal-purple text-white' : 'text-mysore-royal-purple'
                )}
              >
                Tourist Mode
              </Button>
              <Button
                variant={activeMode === 'citizen' ? "default" : "outline"} 
                onClick={() => {
                  setActiveMode('citizen');
                  toggleMobileMenu();
                }}
                className={cn(
                  'w-full justify-start',
                  activeMode === 'citizen' ? 'bg-mysore-heritage-red text-white' : 'text-mysore-heritage-red'
                )}
              >
                Citizen Mode
              </Button>
              <Button variant="ghost" className="w-full justify-start">About</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
