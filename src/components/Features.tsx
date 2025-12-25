import { motion } from 'framer-motion';
import { Code, Database, Calendar, Palette, Smartphone, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Unique, modern designs tailored to your brand identity. No templates—every site is built from scratch.',
  },
  {
    icon: Database,
    title: 'Database Integration',
    description: 'Need to store data? We integrate powerful databases to manage your content, users, and business logic.',
  },
  {
    icon: Calendar,
    title: 'Booking & Calendar Sync',
    description: 'Built-in booking systems that sync directly with Google Calendar. Let customers schedule appointments seamlessly.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Your website looks perfect on every device—desktop, tablet, and mobile. No compromise on user experience.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with fast load times. Keep visitors engaged with a smooth, snappy experience.',
  },
  {
    icon: Code,
    title: 'Clean, Modern Code',
    description: 'Built with the latest technologies. Easy to maintain, update, and scale as your business grows.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gp-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gp-link rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="text-gp-accent">Build</span> For You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a professional online presence, tailored to your specific requirements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-2 border-border hover:border-gp-accent transition-all hover:shadow-card h-full group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gp-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gp-accent/20 transition-colors group-hover:scale-110 transform duration-300">
                    <feature.icon className="w-7 h-7 text-gp-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gp-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional trust section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-accent border-none shadow-glow max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Trusted by Businesses Across Industries
              </h3>
              <p className="text-lg text-white/90 mb-8">
                From startups to established businesses, we deliver websites that drive results
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-white/80">Websites Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-white/80">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">5★</div>
                  <div className="text-white/80">Client Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
