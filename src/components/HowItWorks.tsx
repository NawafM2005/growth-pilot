import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We start with a consultation to understand your business, goals, and vision for your website.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'We create custom designs and plan the architecture, including any database or booking features you need.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Our team builds your website with clean code, integrating databases and calendar syncing as needed.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'We deploy your site, provide training, and offer ongoing support to keep everything running smoothly.',
    icon: Rocket,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gp-accent">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we guide you through every step of building your perfect website
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-2 border-border hover:border-gp-accent transition-all hover:shadow-card h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gp-accent/10 rounded-2xl flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-gp-accent" />
                    </div>
                    <div className="text-5xl font-bold text-gp-accent/20 mb-2">{step.number}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Services Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card border-2 border-gp-accent/30 shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">What's Included</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gp-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <PenTool className="w-6 h-6 text-gp-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Custom Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Unique layouts and branding that match your vision
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gp-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6 text-gp-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Database Setup</h4>
                  <p className="text-sm text-muted-foreground">
                    Powerful backends for content, users, and data
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gp-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-gp-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Google Calendar Sync</h4>
                  <p className="text-sm text-muted-foreground">
                    Booking systems integrated with your calendar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
