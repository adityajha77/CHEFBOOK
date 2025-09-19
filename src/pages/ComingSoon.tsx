import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 className="text-5xl md:text-7xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent mb-6">
          Coming Soon!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
          We're working hard to bring you an amazing experience. Stay tuned for updates!
        </p>
        <Link to="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm">
        © 2023 ChefBook. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
