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
    <section id="features" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What We <span className="text-primary">Build</span> For You
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
              <Card className="bg-card border-2 border-border hover:border-primary hover:shadow-hover transition-all duration-300 h-full group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
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
      </div>
    </section>
  );
}
