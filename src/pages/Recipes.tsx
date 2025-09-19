import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Clock, Users, ChefHat, Star, Filter, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Recipes = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const cuisines = ['All', 'North Indian', 'South Indian', 'Chinese', 'Continental', 'Gujarati', 'Bengali', 'Punjabi'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const recipes = [
    {
      id: 1,
      name: 'Butter Chicken',
      image: '/BUTTER_CHICKEN.jpg',
      cuisine: 'North Indian',
      difficulty: 'Medium',
      cookTime: '45 min',
      serves: 4,
      rating: 4.8,
      spiceLevel: 'Medium',
      chef: 'Chef Arjun',
      description: 'Creamy tomato-based curry with tender chicken pieces',
      ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Spices']
    },
    {
      id: 2,
      name: 'Masala Dosa',
      image: '/DOSA.jpg',
      cuisine: 'South Indian',
      difficulty: 'Hard',
      cookTime: '2h 30min',
      serves: 6,
      rating: 4.9,
      spiceLevel: 'Mild',
      chef: 'Chef Priya',
      description: 'Crispy fermented crepe with spiced potato filling',
      ingredients: ['Rice', 'Urad Dal', 'Potatoes', 'Curry Leaves', 'Turmeric']
    },
    {
      id: 3,
      name: 'Hakka Noodles',
      image: '/NOODLES.jpg',
      cuisine: 'Chinese',
      difficulty: 'Easy',
      cookTime: '25 min',
      serves: 3,
      rating: 4.6,
      spiceLevel: 'Mild',
      chef: 'Chef Li Wei',
      description: 'Stir-fried noodles with fresh vegetables and sauces',
      ingredients: ['Noodles', 'Vegetables', 'Soy Sauce', 'Garlic', 'Ginger']
    },
    {
      id: 4,
      name: 'Rajma Chawal',
      image: '/RAJMA.jpg',
      cuisine: 'North Indian',
      difficulty: 'Easy',
      cookTime: '1h 15min',
      serves: 5,
      rating: 4.7,
      spiceLevel: 'Medium',
      chef: 'Chef Ravi',
      description: 'Kidney beans curry served with steamed basmati rice',
      ingredients: ['Kidney Beans', 'Onions', 'Tomatoes', 'Basmati Rice', 'Spices']
    },
    {
      id: 5,
      name: 'Fish Curry',
      image: '/FISH.jpg',
      cuisine: 'South Indian',
      difficulty: 'Medium',
      cookTime: '40 min',
      serves: 4,
      rating: 4.8,
      spiceLevel: 'Spicy',
      chef: 'Chef Priya',
      description: 'Kerala-style fish curry with coconut milk',
      ingredients: ['Fish', 'Coconut Milk', 'Curry Leaves', 'Tamarind', 'Spices']
    },
    {
      id: 6,
      name: 'Dhokla',
      image: '/DHOKLA.jpg',
      cuisine: 'Gujarati',
      difficulty: 'Medium',
      cookTime: '35 min',
      serves: 6,
      rating: 4.5,
      spiceLevel: 'Mild',
      chef: 'Chef Meera',
      description: 'Steamed spongy cake made from gram flour',
      ingredients: ['Gram Flour', 'Yogurt', 'Green Chilies', 'Ginger', 'Mustard Seeds']
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const cuisineMatch = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    const difficultyMatch = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    return cuisineMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/20 text-success';
      case 'Medium': return 'bg-secondary/20 text-secondary-foreground';
      case 'Hard': return 'bg-accent/20 text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSpiceLevelColor = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'bg-success/20 text-success';
      case 'Medium': return 'bg-secondary/20 text-secondary-foreground';
      case 'Spicy': return 'bg-accent/20 text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Authentic Indian Recipes
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Learn to cook traditional and modern Indian dishes from master chefs
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search recipes by name, ingredient, or cuisine..."
                className="pl-12 h-12 text-base bg-card/95 backdrop-blur-md border-border focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Filter by:</span>
            </div>
            
            {/* Cuisine Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Cuisine:</span>
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  size="sm"
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className="h-8"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  size="sm"
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="h-8"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-custom-sm hover:shadow-custom-xl transition-all duration-300 border border-border hover:border-primary/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                    <Badge className={getSpiceLevelColor(recipe.spiceLevel)}>
                      {recipe.spiceLevel}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {recipe.cuisine}
                    </Badge>
                    <span className="text-sm text-muted-foreground">by {recipe.chef}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Serves {recipe.serves}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Main Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0,3).map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Link to={`/recipes/${recipe.id}`}>
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      <ChefHat className="h-4 w-4 mr-2" />
                      View Recipe
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recipes;
