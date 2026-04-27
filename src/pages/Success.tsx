import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Calendar, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <div className="bg-success/10 p-6 rounded-full relative">
                <CheckCircle2 className="h-24 w-24 text-success" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
            Thank you for choosing ChefBook. Your culinary experience is now scheduled and our team will contact you shortly to finalize the details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 shadow-custom-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4 mx-auto">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">We've sent a confirmation with all the booking details.</p>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 shadow-custom-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4 mx-auto">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Stay Near Your Phone</h3>
              <p className="text-sm text-muted-foreground">A ChefBook coordinator will call you within 2-4 hours.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 border-primary/20 hover:bg-primary/5 text-primary font-semibold text-lg"
              onClick={() => navigate('/recipes')}
            >
              Explore Recipes
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ChefBook. Creating culinary memories together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Success;
