import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does GrowthPilot prevent negative reviews?',
    answer: 'GrowthPilot uses smart routing based on customer ratings. When someone rates their experience below 4 stars, their feedback is kept private and sent to your dashboard/Google Sheets instead of directing them to Google. This gives you a chance to address concerns before they become public reviews.',
  },
  {
    question: 'Is this compliant with Google\'s review policies?',
    answer: 'Absolutely. GrowthPilot is fully compliant with Google\'s review policies. We don\'t block negative reviews or manipulate ratings. We simply give all customers the option to provide feedback first, then route happy customers (who rate 4-5 stars) to Google naturally.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Most businesses are up and running in under 15 minutes. Simply import your customer list, customize your message templates, and activate your campaign. Our onboarding wizard guides you through every step.',
  },
  {
    question: 'What if my customers don\'t respond to requests?',
    answer: 'GrowthPilot includes automated follow-up sequences that significantly boost response rates. You can configure multiple touchpoints via SMS and email, and our AI optimizes send times for maximum engagement.',
  },
  {
    question: 'Can I customize the messages sent to customers?',
    answer: 'Yes! All message templates are fully customizable. You can personalize the content, adjust the tone, and even use merge fields to include customer names, business details, and more.',
  },
  {
    question: 'Do you integrate with my existing CRM?',
    answer: 'GrowthPilot integrates with most popular CRMs including Salesforce, HubSpot, and more. You can also import contacts via CSV or sync automatically. Our Pro and Business plans include advanced integration options.',
  },
  {
    question: 'What happens to low-rated feedback?',
    answer: 'All feedback below 4 stars is stored in your private dashboard and can be automatically exported to Google Sheets. This allows you to track issues, respond to concerns, and improve your service without public exposure.',
  },
  {
    question: 'Is there a contract or can I cancel anytime?',
    answer: 'No contracts required! All plans are month-to-month and you can cancel anytime. We also offer a 14-day free trial so you can test everything risk-free before committing.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Plans start at $49/month for small businesses. All plans include a 14-day free trial with no credit card required. Check our Pricing section above for detailed plan comparisons.',
  },
  {
    question: 'Do you offer phone or email support?',
    answer: 'Yes! All plans include email support. Pro plans get priority support, and Business plans include a dedicated account manager plus phone support. Our team is here to help you succeed.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
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
            Everything you need to know about GrowthPilot
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
                className="bg-white border-2 border-border rounded-xl px-6 hover:border-gp-accent transition-colors"
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
