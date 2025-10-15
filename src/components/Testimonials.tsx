import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Owner, Bella Vista Dental',
    content: 'GrowthPilot transformed our review collection. We went from 3.8 to 4.7 stars in just 3 months. The automated routing is genius!',
    rating: 5,
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'Manager, Peak Fitness Studio',
    content: 'Finally, a system that prevents negative reviews from going public while still collecting valuable feedback. ROI was immediate.',
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director, Sunrise Auto Repair',
    content: 'We increased our Google reviews by 300% in 2 months. The SMS automation makes it so easy for customers to leave reviews.',
    rating: 5,
    avatar: 'ER',
  },
  {
    name: 'David Thompson',
    role: 'Owner, Thompson Law Firm',
    content: 'Love how it integrates with our existing CRM. The private feedback feature saved us from several potential negative reviews.',
    rating: 5,
    avatar: 'DT',
  },
  {
    name: 'Jessica Martinez',
    role: 'Marketing Lead, Luxe Salon Group',
    content: 'Best investment we made for our reputation management. The dashboard insights help us improve service quality continuously.',
    rating: 5,
    avatar: 'JM',
  },
  {
    name: 'Robert Kim',
    role: 'Owner, Golden Wok Restaurant',
    content: 'Simple setup, powerful results. Our star rating improved significantly, leading to 40% more customers finding us online.',
    rating: 5,
    avatar: 'RK',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gp-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gp-warn rounded-full blur-3xl" />
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
            What Our <span className="text-gp-accent">Customers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of businesses already transforming their online reputation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-gp-accent/50 transition-all h-full hover:shadow-glow">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-gp-accent/30 mb-4" />
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gp-warn text-gp-warn" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gp-accent rounded-full flex items-center justify-center font-bold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
