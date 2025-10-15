import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 100 review requests/month',
      'Automated SMS/Email sequences',
      'Basic sentiment analysis',
      'Google Sheets export',
      'Email support',
    ],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For growing businesses scaling reputation',
    features: [
      'Up to 500 review requests/month',
      'Advanced AI feedback scoring',
      'Custom review links',
      'Priority support',
      'Advanced analytics dashboard',
      'CRM integrations',
      'White-label options',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Business',
    price: '$199',
    period: '/month',
    description: 'For enterprises with multiple locations',
    features: [
      'Unlimited review requests',
      'Multi-location management',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'Advanced reporting',
      'Phone support',
      'SLA guarantee',
    ],
    cta: 'Book a Call',
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gp-accent">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.featured ? 'md:scale-105' : ''}
            >
              <Card
                className={`h-full relative ${
                  plan.featured
                    ? 'bg-white border-2 border-gp-accent shadow-card'
                    : 'bg-white border-2 border-border hover:border-gp-accent'
                } transition-all`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gp-accent text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-white" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-10">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gp-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-6 rounded-2xl font-semibold text-lg ${
                      plan.featured
                        ? 'bg-gp-accent hover:bg-gp-accent/90 text-white shadow-glow'
                        : 'bg-secondary hover:bg-secondary/80'
                    } transition-all hover:scale-105`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-muted-foreground"
        >
          <p className="text-lg">
            ✓ 14-day free trial &nbsp;•&nbsp; ✓ No credit card required &nbsp;•&nbsp; ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
