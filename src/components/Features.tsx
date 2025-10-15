import { motion } from 'framer-motion';
import { Brain, FileSpreadsheet, Link as LinkIcon, Zap, Shield, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI Sentiment Analysis',
    description: 'Advanced AI automatically detects customer satisfaction levels and sentiment in feedback responses.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Google Sheets Export',
    description: 'Low ratings are automatically exported to Google Sheets for easy team review and follow-up.',
  },
  {
    icon: LinkIcon,
    title: 'Smart Review Routing',
    description: 'Happy customers (4-5 stars) get direct links to your Google Business Profile for instant reviews.',
  },
  {
    icon: Zap,
    title: 'Automated Follow-ups',
    description: 'Set up automated reminder sequences to boost response rates without manual effort.',
  },
  {
    icon: Shield,
    title: 'Privacy & Compliance',
    description: 'GDPR and privacy-compliant with secure data handling. Customers control their data.',
  },
  {
    icon: BarChart,
    title: 'Real-time Analytics',
    description: 'Track review collection performance with detailed dashboards and actionable insights.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gp-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
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
            Powerful <span className="text-gp-accent">Features</span> for Growth
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate review collection and protect your online reputation
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
              <Card className="bg-card border-border hover:border-gp-accent/50 transition-all hover:shadow-glow h-full group">
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
                Trusted by Leading Local Businesses
              </h3>
              <p className="text-lg text-white/90 mb-8">
                Join hundreds of businesses already growing their online reputation with GrowthPilot
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-white/80">Active Businesses</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50K+</div>
                  <div className="text-white/80">Reviews Collected</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">4.8★</div>
                  <div className="text-white/80">Average Rating Increase</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
