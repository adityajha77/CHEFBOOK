import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Clock, Users, ChefHat, Star, Filter, Search, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

const Recipes = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const cuisines = ['All', 'North Indian', 'South Indian', 'Chinese', 'Continental', 'Gujarati', 'Bengali', 'Punjabi'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase.from('recipes').select('*, chefs(name)');
        if (error) throw error;
        
        if (data) {
          const mappedRecipes = data.map(recipe => ({
            ...recipe,
            image: recipe.image_url || '/placeholder.svg',
            cookTime: recipe.cook_time || 'N/A',
            spiceLevel: recipe.spice_level || 'Mild',
            chef: recipe.chefs?.name || 'Unknown Chef',
            ingredients: recipe.ingredients || []
          }));
          setRecipes(mappedRecipes);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

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
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
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
                        {(recipe.ingredients || []).slice(0,3).map((ingredient: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                        {(recipe.ingredients || []).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(recipe.ingredients || []).length - 3} more
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
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
                No recipes found matching your filters.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recipes;
