import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Star, Crown, Sparkles, Loader2, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const chefId = searchParams.get('chefId');
  
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const [selectedChef, setSelectedChef] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plansRes, chefRes] = await Promise.all([
          supabase.from('pricing_plans').select('*'),
          chefId ? supabase.from('chefs').select('*').eq('id', chefId).single() : Promise.resolve({ data: null })
        ]);

        if (plansRes.data) {
          const mappedPlans = plansRes.data.map(plan => {
            let iconComponent = <Star className="h-6 w-6" />;
            if (plan.icon_name === 'Crown') iconComponent = <Crown className="h-6 w-6" />;
            if (plan.icon_name === 'Sparkles') iconComponent = <Sparkles className="h-6 w-6" />;

            return {
              ...plan,
              icon: iconComponent,
              popular: plan.is_popular
            };
          });
          mappedPlans.sort((a, b) => a.price - b.price);
          setPlans(mappedPlans);
        }

        if (chefRes.data) {
          setSelectedChef(chefRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [chefId]);

  const handleBooking = async (plan: any) => {
    setBookingLoading(plan.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Please sign in to book a chef.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.from('bookings').insert([
        {
          user_id: session.user.id,
          chef_id: chefId || null, // Allow no chef for now if direct visit
          plan_id: plan.id,
          total_price: plan.price,
          status: 'pending',
          booking_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        }
      ]);

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: `Your ${plan.name} has been scheduled.`,
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: "Booking Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            {selectedChef ? `Book ${selectedChef.name}` : 'Chef Subscription Plans'}
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {selectedChef 
              ? `Select the perfect plan for your experience with ${selectedChef.name}`
              : 'Choose the perfect chef experience for your home dining needs'
            }
          </p>
          {selectedChef && (
            <div className="mt-8 flex justify-center">
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg backdrop-blur-md border-white/30">
                <Calendar className="h-5 w-5 mr-2" />
                Booking for Tomorrow
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-1 md:col-span-3 flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              plans.map((plan) => (
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
                    {plan.features.map((feature: string, index: number) => (
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
                      {plan.cuisines.map((cuisine: string, index: number) => (
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
                    onClick={() => handleBooking(plan)}
                    disabled={bookingLoading === plan.id}
                  >
                    {bookingLoading === plan.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      `Book ${plan.name}`
                    )}
                  </Button>
                </div>
              ))
            )}
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