import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Search, Menu, X, User, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Chefs', href: '/coming-soon' }, // Link to the new ComingSoon page
    { name: 'Recipes', href: '/recipes' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-custom-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ChefBook
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-lg mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for chefs, cuisines, or dishes..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
              />
            </div>
            <Button size="sm" variant="outline" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Bangalore</span>
            </Button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" variant="ghost" className="hidden md:flex">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart
            </Button>
            <Button size="sm" variant="ghost">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for chefs, cuisines..."
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
