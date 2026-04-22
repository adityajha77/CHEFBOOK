import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, ChefHat, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);



  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*, chefs(name)')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setRecipe({
            ...data,
            image: data.image_url || '/placeholder.svg',
            cookTime: data.cook_time || 'N/A',
            spiceLevel: data.spice_level || 'Mild',
            chef: data.chefs?.name || 'Unknown Chef',
            ingredients: data.ingredients || [],
            instructions: data.instructions || []
          });
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        navigate('/recipes');
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id, navigate]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground animate-pulse text-lg">Loading master recipe...</p>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate('/recipes')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recipes
        </Button>

        <div className="bg-card rounded-3xl overflow-hidden shadow-custom-lg border border-border">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {recipe.name}
              </h1>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary fill-current" />
                <span className="text-lg font-medium">{recipe.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">{recipe.cuisine}</Badge>
              <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
              <Badge className={getSpiceLevelColor(recipe.spiceLevel)}>{recipe.spiceLevel}</Badge>
            </div>

            <p className="text-muted-foreground text-lg mb-6">
              {recipe.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Cook Time: {recipe.cookTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>Serves: {recipe.serves}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ChefHat className="h-5 w-5" />
                <span>Chef: {recipe.chef}</span>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Ingredients</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-8">
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Instructions</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-4">
              {(recipe.instructions || []).map((instruction, index) => (
                <li key={index} className="pl-2">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
