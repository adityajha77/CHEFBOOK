import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Phone, User, Mail, MessageSquare, Loader2, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface BookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: any;
  chefId: string | null;
  onSuccess?: () => void;
}

const BookingDialog = ({ isOpen, onOpenChange, selectedPlan, chefId, onSuccess }: BookingDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'now',
    date: new Date(Date.now() + 86400000),
    notes: '',
    preference: 'random'
  });

  useEffect(() => {
    if (isOpen) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setBookingForm(prev => ({
            ...prev,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || ''
          }));
        }
      });
    }
  }, [isOpen]);

  const submitBooking = async () => {
    if (!selectedPlan) return;
    
    if (!bookingForm.phone || !bookingForm.address) {
      toast({
        title: "Missing Information",
        description: "Please provide your phone number and address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase.from('bookings').insert([
        {
          user_id: session?.user.id,
          chef_id: chefId || null,
          plan_id: selectedPlan.id,
          total_price: selectedPlan.price,
          status: 'pending',
          booking_date: bookingForm.type === 'now' 
            ? new Date().toISOString() 
            : bookingForm.date.toISOString(),
          customer_name: bookingForm.name,
          customer_email: bookingForm.email,
          customer_phone: bookingForm.phone,
          customer_address: bookingForm.address,
          booking_type: bookingForm.type,
          scheduled_date: bookingForm.type === 'scheduled' ? bookingForm.date.toISOString() : null,
          additional_notes: bookingForm.notes,
          chef_preference: chefId ? null : bookingForm.preference
        }
      ]);

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: `Your ${selectedPlan.name} has been received. We will contact you soon!`,
      });
      onOpenChange(false);
      if (onSuccess) onSuccess();
      navigate('/success');
    } catch (err: any) {
      toast({
        title: "Booking Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-foreground">
            Complete Your Booking
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            We need a few more details to finalize your {selectedPlan?.name} session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center text-foreground font-medium">
                <User className="h-4 w-4 mr-2 text-primary" /> Full Name
              </Label>
              <Input 
                id="name" 
                value={bookingForm.name}
                onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe" 
                className="bg-background border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-foreground font-medium">
                <Mail className="h-4 w-4 mr-2 text-primary" /> Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={bookingForm.email}
                onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com" 
                className="bg-background border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center text-foreground font-semibold">
                <Phone className="h-4 w-4 mr-2 text-primary" /> Phone Number *
              </Label>
              <Input 
                id="phone" 
                type="tel" 
                value={bookingForm.phone}
                onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 XXXXX XXXXX" 
                required
                className="bg-background border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="flex items-center text-foreground font-medium">
                <CalendarIcon className="h-4 w-4 mr-2 text-primary" /> Booking Type
              </Label>
              <Select 
                value={bookingForm.type} 
                onValueChange={(val) => setBookingForm(prev => ({ ...prev, type: val }))}
              >
                <SelectTrigger id="type" className="bg-background border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent side="bottom" sideOffset={4}>
                  <SelectItem value="now">Book Now (ASAP)</SelectItem>
                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {bookingForm.type === 'scheduled' && (
            <div className="space-y-2">
              <Label className="flex items-center text-foreground font-medium">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-12 bg-background border-border",
                      !bookingForm.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {bookingForm.date ? format(bookingForm.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingForm.date}
                    onSelect={(date) => date && setBookingForm(prev => ({ ...prev, date }))}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center text-foreground font-semibold">
              <MapPin className="h-4 w-4 mr-2 text-primary" /> Service Address *
            </Label>
            <Textarea 
              id="address" 
              value={bookingForm.address}
              onChange={(e) => setBookingForm(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your complete address where the chef will visit..." 
              className="bg-background resize-none min-h-[80px] border-primary/20 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center text-foreground font-medium">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" /> Additional Notes
            </Label>
            <Textarea 
              id="notes" 
              value={bookingForm.notes}
              onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any dietary restrictions, spice level preferences, or special requests?" 
              className="bg-background resize-none min-h-[60px] border-border focus:border-primary"
            />
          </div>

          {!chefId && (
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-3">
              <Label htmlFor="preference" className="flex items-center text-foreground font-bold">
                <ChefHat className="h-5 w-5 mr-2 text-primary" /> Chef Preference
              </Label>
              <Select 
                value={bookingForm.preference} 
                onValueChange={(val) => setBookingForm(prev => ({ ...prev, preference: val }))}
              >
                <SelectTrigger id="preference" className="bg-background border-primary/20 h-11">
                  <SelectValue placeholder="Select chef type" />
                </SelectTrigger>
                <SelectContent side="bottom" sideOffset={4}>
                  <SelectItem value="random">Random (Best Available)</SelectItem>
                  <SelectItem value="veg">Vegetarian Specialist</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian Specialist</SelectItem>
                  <SelectItem value="north-indian">North Indian Specialist</SelectItem>
                  <SelectItem value="south-indian">South Indian Specialist</SelectItem>
                  <SelectItem value="western">Western / Continental</SelectItem>
                  <SelectItem value="eastern">Eastern / Pan-Asian</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground italic pl-1">
                * We will assign a top-rated chef matching your preference for this session.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-muted font-medium">
            Cancel
          </Button>
          <Button 
            onClick={submitBooking} 
            disabled={loading}
            className="bg-gradient-primary hover:shadow-glow min-w-[140px] font-semibold"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
