import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Book Professional Chefs';
  
  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const { theme } = useTheme();

  const stats = [
    { icon: <Star className="h-5 w-5" />, value: '500+', label: 'Expert Chefs' },
    { icon: <Users className="h-5 w-5" />, value: '10K+', label: 'Happy Customers' },
    { icon: <Clock className="h-5 w-5" />, value: '24/7', label: 'Available' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${theme === 'dark' ? '%23ffffff' : '%23000000'}' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated Main Heading */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight drop-shadow-lg">
              <span className={`inline-block animate-slide-in-left hover:text-secondary transition-colors duration-300 cursor-default ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                {animatedText}
              </span>
              <span className={`inline-block w-1 h-16 ml-2 animate-pulse ${theme === 'dark' ? 'bg-white' : 'bg-foreground'}`} />
            </h1>
            <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '2s' }}>
              <span className={`text-xl md:text-2xl font-medium drop-shadow-md hover:text-accent transition-colors duration-300 cursor-default ${theme === 'dark' ? 'text-white/95' : 'text-muted-foreground'}`}>
                For Your Home & Events
              </span>
            </div>
          </div>

          {/* Subtitle with hover animation */}
          <p 
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up transition-colors duration-300 hover:text-secondary cursor-default drop-shadow-md ${theme === 'dark' ? 'text-white/90' : 'text-muted-foreground'}`}
            style={{ animationDelay: '2.5s' }}
          >
            Experience authentic Indian cuisine prepared by professional chefs in the comfort of your home. 
            From traditional recipes to modern fusion dishes.
          </p>

          {/* Search Bar */}
          <div className="animate-scale-in max-w-4xl mx-auto mb-8" style={{ animationDelay: '3s' }}>
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-custom-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="Search for cuisines, dishes, or chefs..."
                      className="pl-12 h-12 text-base bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div className="md:w-64">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="Enter your location"
                      className="pl-12 h-12 text-base bg-background border-border focus:border-primary"
                      defaultValue="Bangalore, Karnataka"
                    />
                  </div>
                </div>
                <Button className="h-12 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold">
                  Find Chefs
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up flex flex-wrap justify-center gap-8 mb-8" style={{ animationDelay: '3.5s' }}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-2 hover:text-secondary transition-colors duration-300 cursor-default drop-shadow-md ${theme === 'dark' ? 'text-white/90' : 'text-muted-foreground'}`}
              >
                <div className="text-secondary">{stat.icon}</div>
                <span className="font-bold text-lg">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '4s' }}>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary-muted text-secondary-foreground font-semibold px-8 hover:shadow-glow transition-all duration-300"
            >
              Explore Indian Cuisine
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={`font-semibold px-8 backdrop-blur-sm ${theme === 'dark' ? 'border-white/30 text-white hover:bg-white hover:text-primary' : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'}`}
            >
              View Recipes
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-20">
        <div className="w-16 h-16 bg-secondary rounded-full" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-accent rounded-full" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 bg-primary rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;
