import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function VideoSection() {
  return (
    <section id="video" className="py-24 bg-gradient-to-b from-gp-bg to-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See GrowthPilot in <span className="text-gp-accent">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch Kevin explain how GrowthPilot automates your review collection in under 3 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-card border-gp-accent/30 overflow-hidden shadow-glow">
            <div className="relative aspect-video bg-gradient-to-br from-gp-accent/20 to-gp-link/20">
              {/* Placeholder for video - replace with actual embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gp-accent rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-glow">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                  <p className="text-lg font-medium text-gp-text">Watch Demo Video</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Learn how to set up your automated review funnel
                  </p>
                </div>
              </div>
              
              {/* Replace with actual video embed when available */}
              {/* Example YouTube embed:
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="GrowthPilot Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}
            </div>
          </Card>

          {/* Video highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { time: '0:30', title: 'Quick Setup', description: 'Import contacts in seconds' },
              { time: '1:15', title: 'Smart Routing', description: 'See the magic of automated filtering' },
              { time: '2:30', title: 'Dashboard Tour', description: 'Track results in real-time' },
            ].map((highlight, index) => (
              <div
                key={index}
                className="text-center p-4 bg-card/50 rounded-xl border border-border hover:border-gp-accent/50 transition-colors"
              >
                <div className="text-gp-accent font-bold text-lg mb-2">{highlight.time}</div>
                <div className="font-semibold mb-1">{highlight.title}</div>
                <div className="text-sm text-muted-foreground">{highlight.description}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
