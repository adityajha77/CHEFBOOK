import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Calendar, ArrowRight, User, Star, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import BookingDialog from '@/components/BookingDialog';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleBookNow = (item: any) => {
    setSelectedItem(item);
    setIsBookingDialogOpen(true);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="h-5 w-5" />;
      case 'Sparkles': return <Sparkles className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Your Kitchen Cart</h1>
            <p className="text-muted-foreground mt-2">Manage your selected chef sessions and plans.</p>
          </div>
          {cartCount > 0 && (
            <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any chef sessions yet.</p>
            <Button onClick={() => navigate('/pricing')} size="lg" className="bg-gradient-primary">
              Explore Plans
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={`${item.id}-${item.chefId}`} 
                  className="bg-card p-6 rounded-2xl border border-border shadow-custom-sm hover:shadow-custom-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-primary`}>
                    {getIcon(item.icon_name)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                      <Badge variant="secondary" className="text-[10px]">Session</Badge>
                    </div>
                    {item.chefName && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        <User className="h-3 w-3 mr-1" /> {item.chefName}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{item.description}</p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <span className="text-xl font-bold text-foreground">₹{item.price}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleBookNow(item)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-custom-lg sticky top-24">
                <h3 className="text-xl font-bold mb-6">Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (GST 18%)</span>
                    <span>₹{Math.round(totalPrice * 0.18)}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">₹{Math.round(totalPrice * 1.18)}</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mb-6">
                  * Final pricing may vary based on specific chef requests and additional items.
                </p>
                <Button className="w-full h-12 bg-gradient-primary font-bold shadow-glow" onClick={() => navigate('/pricing')}>
                  Add More Sessions
                </Button>
                <div className="mt-4 p-4 bg-muted/50 rounded-xl flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    You can schedule dates for each session during the final booking step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking Dialog */}
      <BookingDialog 
        isOpen={isBookingDialogOpen} 
        onOpenChange={setIsBookingDialogOpen} 
        selectedPlan={selectedItem} 
        chefId={selectedItem?.chefId}
      />
    </div>
  );
};

export default Cart;
