import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ChefCard from '@/components/ChefCard';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Users, Award, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [featuredChefs] = useState([
    {
      id: '1',
      name: 'Arjun Mehta',
      image: '/BUTTER_CHICKEN.jpg', // Using Butter Chicken for Arjun Mehta
      cuisines: ['North Indian', 'Punjabi', 'Mughlai'],
      rating: 4.8,
      reviews: 127,
      distance: '2.3 km',
      price: 1599,
      tagline: 'Authentic Punjabi flavors with royal Mughlai touch',
      dishes: 8,
      maxGuests: 12,
      availability: 'Today',
      specialties: ['Butter Chicken', 'Biryani', 'Naan']
    },
    {
      id: '2',
      name: 'Priya Sharma',
      image: '/DOSA.jpg', // Using Dosa for Priya Sharma
      cuisines: ['South Indian', 'Tamil', 'Kerala'],
      rating: 4.9,
      reviews: 203,
      distance: '1.8 km',
      price: 999,
      tagline: 'Traditional South Indian recipes passed down generations',
      dishes: 10,
      maxGuests: 8,
      availability: 'Tomorrow',
      specialties: ['Dosa', 'Sambar', 'Coconut Curry']
    },
    {
      id: '3',
      name: 'Ravi Gupta',
      image: '/DHOKLA.jpg', // Using Dhokla for Ravi Gupta
      cuisines: ['Gujarati', 'Rajasthani', 'Street Food'],
      rating: 4.7,
      reviews: 89,
      distance: '3.1 km',
      price: 1299,
      tagline: 'Street food specialist with authentic regional flavors',
      dishes: 12,
      maxGuests: 15,
      availability: 'This Week',
      specialties: ['Thali', 'Chaat', 'Dhokla']
    }
  ]);

  const [featuredRecipes] = useState([
    {
      id: '1',
      name: 'Hyderabadi Chicken Biryani',
      image: '/HYDERABADI_CHICKEN.jpg',
      cuisine: 'Hyderabadi',
      difficulty: 'Medium' as const,
      cookTime: '2h 30min',
      serves: 6,
      rating: 4.9,
      description: 'Aromatic basmati rice layered with tender chicken, cooked in traditional dum style with authentic spices.',
      spiceLevel: 'Medium' as const,
      ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Yogurt', 'Biryani Spices'],
      chef: 'Chef Arjun'
    },
    {
      id: '2',
      name: 'Kerala Fish Curry',
      image: '/FISH.jpg',
      cuisine: 'Kerala',
      difficulty: 'Easy' as const,
      cookTime: '45 min',
      serves: 4,
      rating: 4.8,
      description: 'Traditional Kerala fish curry with coconut milk, curry leaves, and authentic spices.',
      spiceLevel: 'Spicy' as const,
      ingredients: ['Fish', 'Coconut Milk', 'Curry Leaves', 'Tamarind', 'Kerala Spices'],
      chef: 'Chef Priya'
    },
    {
      id: '3',
      name: 'Rajasthani Dal Baati Churma',
      image: '/RAJMA.jpg',
      cuisine: 'Rajasthani',
      difficulty: 'Hard' as const,
      cookTime: '3h 15min',
      serves: 8,
      rating: 4.7,
      description: 'Traditional Rajasthani delicacy with lentil curry, baked wheat balls, and sweet crumble.',
      spiceLevel: 'Medium' as const,
      ingredients: ['Wheat Flour', 'Mixed Lentils', 'Ghee', 'Jaggery', 'Rajasthani Spices'],
      chef: 'Chef Ravi'
    }
  ]);

  const cuisineTypes = [
    { name: 'North Indian', count: 45, color: 'bg-primary' },
    { name: 'South Indian', count: 38, color: 'bg-secondary' },
    { name: 'Bengali', count: 22, color: 'bg-accent' },
    { name: 'Gujarati', count: 19, color: 'bg-success' },
    { name: 'Punjabi', count: 31, color: 'bg-primary-muted' },
    { name: 'Street Food', count: 28, color: 'bg-secondary-muted' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Popular Cuisines Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Explore Indian Cuisines
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover authentic flavors from every corner of India, prepared by expert chefs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisineTypes.map((cuisine, index) => (
              <div
                key={index}
                className="group bg-card hover:bg-card-hover rounded-2xl p-6 text-center shadow-custom-sm hover:shadow-custom-md transition-all duration-300 cursor-pointer border border-border hover:border-primary/20"
              >
                <div className={`w-16 h-16 ${cuisine.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">🍛</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cuisine.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {cuisine.count} chefs available
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Chefs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Featured Chefs
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover top-rated chefs in your area
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center space-x-2" onClick={() => navigate('/coming-soon')}>
              <span>View All Chefs</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="flex items-center space-x-2 mx-auto" onClick={() => navigate('/coming-soon')}>
              <span>View All Chefs</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Popular Recipes
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn authentic Indian recipes from master chefs
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center space-x-2" onClick={() => navigate('/recipes')}>
              <span>Browse All Recipes</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="flex items-center space-x-2 mx-auto" onClick={() => navigate('/recipes')}>
              <span>Browse All Recipes</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="h-8 w-8" />, value: '500+', label: 'Expert Chefs' },
              { icon: <Star className="h-8 w-8" />, value: '4.8', label: 'Average Rating' },
              { icon: <MapPin className="h-8 w-8" />, value: '25+', label: 'Cities Covered' },
              { icon: <Award className="h-8 w-8" />, value: '10K+', label: 'Happy Customers' }
            ].map((stat, index) => (
              <div key={index} className="text-primary-foreground">
                <div className="flex justify-center mb-4 text-secondary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Ready to Experience Authentic Indian Cuisine?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a professional chef today and enjoy restaurant-quality Indian food in the comfort of your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold px-8" onClick={() => navigate('/coming-soon')}>
              Book a Chef Now
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8" onClick={() => navigate('/recipes')}>
              Explore Recipes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
