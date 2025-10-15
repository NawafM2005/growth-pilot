import { motion } from 'framer-motion';
import { Upload, MessageSquare, ArrowRight, Star, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'Import/Sync Customer List',
    description: 'Upload your customer list via CSV or sync directly from your CRM. Quick and seamless integration.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Send Feedback Request',
    description: 'Automatically send personalized feedback requests via SMS or email to your customers.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Auto-Route Based on Rating',
    description: 'Smart routing ensures happy customers (4-5 stars) go to Google, while lower ratings stay private for your review.',
    icon: ArrowRight,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gp-bg relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gp-accent">GrowthPilot</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your review collection and protect your online reputation
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-gp-accent/50 transition-all hover:shadow-glow h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gp-accent/10 rounded-2xl flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-gp-accent" />
                    </div>
                    <div className="text-5xl font-bold text-gp-accent/20 mb-2">{step.number}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card border-gp-accent/30 shadow-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Smart Rating Router</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Low Rating Path */}
                <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-muted text-muted" />
                      ))}
                    </div>
                    <span className="font-semibold">Rating {'<'} 4 Stars</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-2">Private Feedback Storage</p>
                      <p className="text-sm text-muted-foreground">
                        Feedback saved to your dashboard and exported to Google Sheets. Address concerns privately without public visibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* High Rating Path */}
                <div className="bg-gp-accent/10 border-2 border-gp-accent/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gp-accent text-gp-accent" />
                      ))}
                    </div>
                    <span className="font-semibold">Rating ≥ 4 Stars</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-8 h-8 text-gp-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-2">Google Review Link</p>
                      <p className="text-sm text-muted-foreground">
                        Happy customers are automatically directed to leave a review on Google, boosting your online reputation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
