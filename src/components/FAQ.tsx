import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Timelines vary based on complexity. A simple starter site typically takes 2-3 weeks, while more complex projects with databases and integrations can take 4-8 weeks. We\'ll provide a detailed timeline after our initial consultation.',
  },
  {
    question: 'What is your design process?',
    answer: 'We start with a discovery call to understand your needs, then create wireframes and mockups for your approval. Once the design is finalized, we move to development. You\'ll have opportunities for feedback at every stage.',
  },
  {
    question: 'Can you integrate a booking system with Google Calendar?',
    answer: 'Absolutely! This is one of our specialties. We build custom booking systems that sync directly with Google Calendar, so appointments show up in real-time. Your clients can book 24/7 without double-bookings.',
  },
  {
    question: 'What kind of databases do you work with?',
    answer: 'We work with modern database solutions like PostgreSQL and Supabase. Whether you need user authentication, content management, or complex data relationships, we\'ll set up the right infrastructure for your needs.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'We can recommend and set up hosting for you, or deploy to your preferred platform. We work with modern hosting providers that offer excellent performance, security, and scalability.',
  },
  {
    question: 'Will I be able to update the website myself?',
    answer: 'Yes! Depending on your package, we can set up a content management system (CMS) that allows you to easily update text, images, and other content without any coding knowledge.',
  },
  {
    question: 'What about SEO?',
    answer: 'All our websites are built with SEO best practices in mind. This includes proper meta tags, fast loading speeds, mobile optimization, and clean URL structures. We can also provide advanced SEO services if needed.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes! All packages include a support period after launch. We also offer ongoing maintenance plans for updates, security patches, and content changes. We\'re here to help your website succeed long-term.',
  },
  {
    question: 'What if I need changes after the website is live?',
    answer: 'We offer flexible support options. Minor tweaks during the support period are included. For larger changes or new features, we can provide a quote for the additional work.',
  },
  {
    question: 'How do payments work?',
    answer: 'We typically work with a 50% deposit to begin the project, with the remaining 50% due upon completion. For larger projects, we can arrange milestone-based payments. All pricing is transparent with no hidden fees.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gp-accent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our web development services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 border-border rounded-xl px-6 hover:border-gp-accent transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-gp-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="text-gp-link hover:text-gp-link/80 font-semibold underline"
          >
            Contact our team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
