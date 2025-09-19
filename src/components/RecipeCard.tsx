import { Clock, Users, Star, ChefHat, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    image: string;
    cuisine: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    cookTime: string;
    serves: number;
    rating: number;
    description: string;
    spiceLevel: 'Mild' | 'Medium' | 'Spicy' | 'Very Spicy';
    ingredients: string[];
    chef: string;
  };
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/20 text-success border-success/30';
      case 'Medium': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'Hard': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getSpiceLevelIcon = (level: string) => {
    const flames = {
      'Mild': 1,
      'Medium': 2,
      'Spicy': 3,
      'Very Spicy': 4,
    }[level] || 1;

    return Array.from({ length: 4 }, (_, i) => (
      <Flame
        key={i}
        className={`h-3 w-3 ${i < flames ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <div 
      className="group bg-gradient-card rounded-2xl shadow-custom-md hover:shadow-custom-lg transition-transform transition-shadow duration-300 overflow-hidden border border-border hover:border-primary/20 will-change-transform will-change-shadow"
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="h-3 w-3 fill-secondary text-secondary" />
          <span className="text-sm font-medium text-foreground">{recipe.rating}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground">
            {recipe.cuisine}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
          {recipe.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {recipe.description}
        </p>

        {/* Recipe Stats */}
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Serves {recipe.serves}</span>
          </div>
        </div>

        {/* Spice Level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Spice Level:</span>
            <div className="flex items-center space-x-1">
              {getSpiceLevelIcon(recipe.spiceLevel)}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <ChefHat className="h-3 w-3" />
            <span>By {recipe.chef}</span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
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
      </div>
    </div>
  );
};

export default RecipeCard;
