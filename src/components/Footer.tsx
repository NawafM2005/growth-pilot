import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gp-accent mb-4 block">
              GrowthPilot
            </Link>
            <p className="text-muted-foreground text-sm">
              Automated Google review funnels that grow your online reputation effortlessly.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-gp-accent transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-gp-accent transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-gp-accent transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-gp-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#testimonials" className="hover:text-gp-accent transition-colors">Testimonials</a></li>
              <li><Link to="/book" className="hover:text-gp-accent transition-colors">Book a Meeting</Link></li>
              <li><a href="#contact" className="hover:text-gp-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-gp-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gp-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GrowthPilot. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-gp-accent/20 hover:text-gp-accent transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-gp-accent/20 hover:text-gp-accent transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-gp-accent/20 hover:text-gp-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-gp-accent/20 hover:text-gp-accent transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
