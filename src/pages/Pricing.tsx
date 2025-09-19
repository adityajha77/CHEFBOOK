import { useState } from 'react';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Chef',
      price: 999,
      icon: <Star className="h-6 w-6" />,
      description: 'Perfect for small gatherings',
      features: [
        '2-3 Authentic Indian dishes',
        'Serves up to 4 people',
        'Fresh ingredients included',
        '2 hours cooking service',
        'Basic cleanup included',
        'One cuisine specialty'
      ],
      cuisines: ['North Indian', 'South Indian', 'Gujarati'],
      popular: false,
      gradient: 'from-primary/10 to-secondary/10'
    },
    {
      id: 'premium',
      name: 'Premium Chef',
      price: 1599,
      icon: <Crown className="h-6 w-6" />,
      description: 'Multi-cuisine experience',
      features: [
        '4-5 Diverse dishes',
        'Serves up to 8 people', 
        '2 Different cuisines (Chinese + Indian)',
        '3 hours cooking service',
        'Premium ingredients',
        'Full cleanup & presentation',
        'Appetizer included'
      ],
      cuisines: ['Chinese', 'Indian', 'Continental'],
      popular: true,
      gradient: 'from-accent/10 to-primary/10'
    },
    {
      id: 'luxury',
      name: 'Luxury Chef',
      price: 2100,
      icon: <Sparkles className="h-6 w-6" />,
      description: 'Complete culinary experience',
      features: [
        '6-8 Gourmet dishes',
        'Serves up to 12 people',
        '3 Different cuisines',
        '4 hours premium service',
        'Exotic ingredients & spices',
        'Professional presentation',
        'Appetizer + Dessert included',
        'Live cooking demonstration'
      ],
      cuisines: ['Indian', 'Chinese', 'Continental', 'Thai'],
      popular: false,
      gradient: 'from-secondary/10 to-accent/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Chef Subscription Plans
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Choose the perfect chef experience for your home dining needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl p-8 shadow-custom-lg hover:shadow-custom-xl transition-all duration-500 cursor-pointer group border border-border hover:border-primary/20 ${
                  plan.popular ? 'ring-2 ring-primary/20 scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${
                    hoveredPlan === plan.id ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/session</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className={`h-5 w-5 mt-0.5 transition-colors duration-300 ${
                        hoveredPlan === plan.id ? 'text-primary' : 'text-success'
                      }`} />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Available Cuisines:</h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.cuisines.map((cuisine, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'bg-primary hover:bg-primary/90'
                  } ${hoveredPlan === plan.id ? 'scale-105' : ''}`}
                  size="lg"
                >
                  Book {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's included in each plan?",
                a: "Each plan includes fresh ingredients, cooking service, and cleanup. Higher tiers offer more dishes, cuisines, and premium ingredients."
              },
              {
                q: "Can I customize the menu?",
                a: "Yes! You can discuss your preferences with the chef and customize dishes based on dietary requirements and taste preferences."
              },
              {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 24-48 hours in advance, though same-day bookings may be available based on chef availability."
              },
              {
                q: "What if I need to cancel?",
                a: "Free cancellation up to 12 hours before your booking. Cancellations within 12 hours may incur a 25% fee."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-custom-sm">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;