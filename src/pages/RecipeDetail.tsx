import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, ChefHat, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const allRecipes = [
    {
      id: 1,
      name: 'Butter Chicken',
      image: '/placeholder.svg',
      cuisine: 'North Indian',
      difficulty: 'Medium',
      cookTime: '45 min',
      serves: 4,
      rating: 4.8,
      spiceLevel: 'Medium',
      chef: 'Chef Arjun',
      description: 'Creamy tomato-based curry with tender chicken pieces, a classic Indian dish.',
      ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Ginger-Garlic Paste', 'Garam Masala', 'Kasuri Methi'],
      instructions: [
        'Marinate chicken with yogurt and spices for at least 30 minutes.',
        'Cook tomatoes, onions, and cashews to make a rich gravy base.',
        'Blend the gravy to a smooth paste and strain.',
        'Add marinated chicken to the gravy and cook until tender.',
        'Finish with cream, butter, and a sprinkle of fresh coriander.'
      ]
    },
    {
      id: 2,
      name: 'Masala Dosa',
      image: '/placeholder.svg',
      cuisine: 'South Indian',
      difficulty: 'Hard',
      cookTime: '2h 30min',
      serves: 6,
      rating: 4.9,
      spiceLevel: 'Mild',
      chef: 'Chef Priya',
      description: 'Crispy fermented crepe with spiced potato filling, a popular South Indian breakfast.',
      ingredients: ['Rice', 'Urad Dal', 'Potatoes', 'Onions', 'Curry Leaves', 'Mustard Seeds', 'Turmeric'],
      instructions: [
        'Soak rice and urad dal overnight, then grind to a smooth batter and ferment.',
        'Prepare the potato masala filling with onions, curry leaves, and spices.',
        'Heat a griddle, spread a thin layer of dosa batter.',
        'Cook until crispy, then add potato filling and fold.',
        'Serve hot with sambar and coconut chutney.'
      ]
    },
    {
      id: 3,
      name: 'Hakka Noodles',
      image: '/placeholder.svg',
      cuisine: 'Chinese',
      difficulty: 'Easy',
      cookTime: '25 min',
      serves: 3,
      rating: 4.6,
      spiceLevel: 'Mild',
      chef: 'Chef Li Wei',
      description: 'Stir-fried noodles with fresh vegetables and sauces, a quick and delicious meal.',
      ingredients: ['Noodles', 'Cabbage', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Vinegar', 'Garlic', 'Ginger'],
      instructions: [
        'Boil noodles until al dente, then drain and set aside.',
        'Heat oil in a wok, stir-fry garlic, ginger, and vegetables.',
        'Add noodles and sauces, toss well to combine.',
        'Cook for a few minutes until heated through and flavors are blended.',
        'Serve hot as a main course or side dish.'
      ]
    },
    {
      id: 4,
      name: 'Rajma Chawal',
      image: '/placeholder.svg',
      cuisine: 'North Indian',
      difficulty: 'Easy',
      cookTime: '1h 15min',
      serves: 5,
      rating: 4.7,
      spiceLevel: 'Medium',
      chef: 'Chef Ravi',
      description: 'Kidney beans curry served with steamed basmati rice, a comforting North Indian staple.',
      ingredients: ['Kidney Beans', 'Onions', 'Tomatoes', 'Basmati Rice', 'Garam Masala', 'Coriander Powder', 'Cumin'],
      instructions: [
        'Soak kidney beans overnight and pressure cook until tender.',
        'Prepare a gravy with sautéed onions, tomatoes, and spices.',
        'Add cooked kidney beans to the gravy and simmer.',
        'Cook basmati rice separately.',
        'Serve hot rajma with chawal and a dollop of butter.'
      ]
    },
    {
      id: 5,
      name: 'Fish Curry',
      image: '/placeholder.svg',
      cuisine: 'South Indian',
      difficulty: 'Medium',
      cookTime: '40 min',
      serves: 4,
      rating: 4.8,
      spiceLevel: 'Spicy',
      chef: 'Chef Priya',
      description: 'Kerala-style fish curry with coconut milk, a flavorful and aromatic dish.',
      ingredients: ['Fish', 'Coconut Milk', 'Curry Leaves', 'Tamarind', 'Green Chilies', 'Ginger', 'Garlic'],
      instructions: [
        'Marinate fish with turmeric and salt.',
        'Sauté onions, ginger, garlic, and green chilies.',
        'Add tamarind pulp and coconut milk, bring to a simmer.',
        'Gently add fish pieces and cook until done.',
        'Garnish with curry leaves and serve with rice.'
      ]
    },
    {
      id: 6,
      name: 'Dhokla',
      image: '/placeholder.svg',
      cuisine: 'Gujarati',
      difficulty: 'Medium',
      cookTime: '35 min',
      serves: 6,
      rating: 4.5,
      spiceLevel: 'Mild',
      chef: 'Chef Meera',
      description: 'Steamed spongy cake made from gram flour, a light and healthy Gujarati snack.',
      ingredients: ['Gram Flour', 'Yogurt', 'Eno Fruit Salt', 'Green Chilies', 'Ginger', 'Mustard Seeds', 'Curry Leaves'],
      instructions: [
        'Prepare a batter with gram flour, yogurt, and spices.',
        'Add Eno fruit salt just before steaming to make it fluffy.',
        'Steam the batter in a dhokla maker until cooked.',
        'Prepare a tempering with mustard seeds, curry leaves, and green chilies.',
        'Pour tempering over the steamed dhokla and cut into pieces.'
      ]
    }
  ];

  useEffect(() => {
    const foundRecipe = allRecipes.find(r => r.id === parseInt(id || '0'));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      navigate('/recipes'); // Redirect to recipes page if not found
    }
  }, [id, navigate]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading recipe...
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
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Instructions</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
