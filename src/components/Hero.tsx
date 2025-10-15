import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

export function Hero() {
  const handleScrollToPricing = () => {
    const element = document.querySelector('#pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Hero image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={heroImage}
          alt="Automated review management"
          className="w-full h-full object-cover"
        />
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gp-accent/10 border border-gp-accent/30 rounded-full text-gp-accent text-sm font-medium"
            >
              <Star className="w-4 h-4 fill-gp-accent" />
              <span>Trusted by 500+ Local Businesses</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Effortlessly Grow Your{' '}
              <span className="text-gp-accent">Online Reputation</span>{' '}
              with Automated Google Review Funnels
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Collect private feedback, route happy customers to Google, and grow your stars—on autopilot.
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button
                onClick={handleScrollToPricing}
                size="lg"
                className="bg-gp-accent hover:bg-gp-accent/90 text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-glow transition-all hover:scale-105 group"
              >
                Start Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => window.location.href = '/book'}
                size="lg"
                variant="outline"
                className="border-2 border-gp-accent text-gp-accent hover:bg-gp-accent hover:text-white font-bold px-8 py-6 rounded-2xl text-lg transition-all hover:scale-105"
              >
                Book a Meeting
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
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gp-warn text-gp-warn" />
                  ))}
                </div>
                <span>4.9/5 from 200+ reviews</span>
              </div>
              <div>✓ No credit card required</div>
              <div>✓ Free 14-day trial</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
