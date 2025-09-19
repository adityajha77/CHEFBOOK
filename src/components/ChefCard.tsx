import { useState } from 'react';
import { Star, MapPin, Clock, Users, IndianRupee, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ChefCardProps {
  chef: {
    id: string;
    name: string;
    image: string;
    cuisines: string[];
    rating: number;
    reviews: number;
    distance: string;
    price: number;
    tagline: string;
    dishes: number;
    maxGuests: number;
    availability: string;
    specialties: string[];
  };
}

const ChefCard = ({ chef }: ChefCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative w-full h-96 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // For mobile
    >
      <div className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="bg-gradient-card rounded-2xl shadow-custom-md hover:shadow-custom-lg transition-all duration-300 overflow-hidden h-full border border-border group-hover:border-primary/20">
            {/* Chef Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-success text-success-foreground font-semibold">
                  Available
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <div className="bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <IndianRupee className="h-3 w-3 text-primary" />
                  <span className="font-bold text-sm text-foreground">{chef.price}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {chef.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm font-medium text-foreground">{chef.rating}</span>
                  <span className="text-sm text-muted-foreground">({chef.reviews})</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{chef.tagline}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {chef.cuisines.slice(0, 3).map((cuisine, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
                {chef.cuisines.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{chef.cuisines.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{chef.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{chef.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="bg-gradient-primary rounded-2xl shadow-custom-lg h-full p-6 text-primary-foreground border border-primary/20">
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-6 w-6" />
                <h3 className="font-bold text-lg">{chef.name}</h3>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="h-4 w-4 text-secondary" />
                      <span>{chef.dishes} signature dishes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-secondary" />
                      <span>Serves up to {chef.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>3-4 hours cooking experience</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {chef.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-black text-white border-gray-700">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button 
                  className="w-full bg-secondary hover:bg-secondary-muted text-secondary-foreground font-semibold"
                  size="lg"
                  onClick={() => window.location.href = '/coming-soon'} // Redirect to coming soon page
                >
                  Book Now - ₹{chef.price}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-primary-foreground/30 text-white hover:bg-primary-foreground/10"
                  onClick={() => window.location.href = '/coming-soon'} // Redirect to coming soon page
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
