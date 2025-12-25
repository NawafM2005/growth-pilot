import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Clock,
      title: '30-Minute Consultation',
      description: 'Quick, focused session to understand your needs',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Meet with our reputation management specialists',
    },
    {
      icon: CheckCircle,
      title: 'Custom Strategy',
      description: 'Get a tailored plan for your business growth',
    },
    {
      icon: Shield,
      title: 'No Obligation',
      description: 'Free consultation with zero pressure to buy',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Free <span className="text-gp-accent">Consultation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how GrowthPilot can transform your online reputation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar Embed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white border-2 border-border h-full shadow-card">
                <CardContent className="p-2">
                  {/* Calendly placeholder - replace with actual embed */}
                  <div className="aspect-[9/16] bg-gradient-to-br from-gp-accent/20 to-gp-link/20 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <Clock className="w-16 h-16 text-gp-accent mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Calendly Embed</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Replace with your Calendly iframe
                      </p>
                      <code className="text-xs bg-black/30 px-3 py-1 rounded">
                        &lt;iframe src="calendly.com/..."&gt;
                      </code>
                    </div>
                  </div>
                  
                  {/* Example Calendly embed code (uncomment and add your link):
                  <iframe
                    src="https://calendly.com/your-username/30min"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    className="rounded-lg"
                  />
                  */}
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-white border-2 border-border shadow-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-gp-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-gp-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-accent border-none shadow-card text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">Can't Find a Time?</h3>
                  <p className="text-white/90 mb-6">
                    Reach out directly and we'll find a time that works for you
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.location.href = 'mailto:hello@growthpilot.com'}
                      className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      Email Us: hello@growthpilot.com
                    </Button>
                    <Button
                      onClick={() => window.location.href = 'tel:+15551234567'}
                      variant="outline"
                      className="w-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary font-bold py-6 rounded-xl transition-all hover:scale-[1.02]"
                    >
                      Call Us: +1 (555) 123-4567
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-border shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Why Choose Us?</h3>
                  <p className="text-muted-foreground text-sm">
                    We deliver high-quality, custom-built websites tailored to your specific business needs. Our focus is on performance, design, and seamless integration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
