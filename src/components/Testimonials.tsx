import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Owner, Bloom Wellness Studio',
    content: 'They built exactly what I envisioned. The booking system syncs perfectly with my Google Calendar—clients love how easy it is to schedule appointments!',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, TechStart Solutions',
    content: 'The database integration was seamless. Our internal tools now run on a custom web app that saves us hours every week. Highly professional team.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Emily Chen',
    role: 'Director, Artisan Bakery Co.',
    content: 'Beautiful design, fast loading, and the online ordering system works flawlessly. Our sales increased 40% after launching the new site.',
    rating: 5,
    avatar: 'EC',
  },
  {
    name: 'David Thompson',
    role: 'CEO, Coastal Real Estate',
    content: 'They understood our complex requirements perfectly. The property listing system with search filters exceeded our expectations.',
    rating: 5,
    avatar: 'DT',
  },
  {
    name: 'Lisa Park',
    role: 'Founder, FitLife Coaching',
    content: 'The calendar booking integration changed my business. Clients book sessions 24/7, and everything syncs automatically. Worth every penny!',
    rating: 5,
    avatar: 'LP',
  },
  {
    name: 'James Wilson',
    role: 'Owner, Wilson & Associates Law',
    content: 'Professional, responsive, and delivered on time. Our new website positions us as the modern, client-focused firm we wanted to be.',
    rating: 5,
    avatar: 'JW',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
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
            What Our <span className="text-gp-accent">Clients</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from businesses we've helped build their online presence
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
              <Card className="bg-card border-2 border-border hover:border-gp-accent transition-all h-full hover:shadow-card">
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
