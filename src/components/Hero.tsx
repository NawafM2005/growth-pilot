import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Sparkles } from 'lucide-react';

export function Hero() {
  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-background to-secondary/40">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gp-link rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Custom Websites Built for Your Vision</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              We Build{' '}
              <span className="text-primary">Beautiful Websites</span>{' '}
              Tailored to Your Business
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Custom web development with database integration and booking systems that sync with Google Calendar. Your vision, expertly crafted.
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button
                onClick={handleScrollToContact}
                size="lg"
                className="bg-primary hover:bg-gp-accent-hover text-white font-bold px-8 py-6 rounded-xl text-lg shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-hover group"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => window.location.href = '/book'}
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white font-bold px-8 py-6 rounded-xl text-lg transition-all duration-300 hover:scale-105"
              >
                Book a Consultation
              </Button>
            </motion.div>

            {/* Login Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4"
            >
              <Button
                onClick={() => window.location.href = '/owner-login'}
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors"
              >
                Client Portal
              </Button>
              <span className="text-border">|</span>
              <Button
                onClick={() => window.location.href = '/admin-login'}
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors"
              >
                Admin Login
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 pt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span className="font-medium">Database Integration</span>
              </div>
              <div className="font-medium">✓ Google Calendar Sync</div>
              <div className="font-medium">✓ Custom Design</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
}
