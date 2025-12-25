import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Process', href: '#how-it-works' },
  { name: 'Services', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-background border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gp-accent hover:opacity-80 transition-opacity"
          >
            WebCraft
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-gp-accent transition-colors rounded-lg hover:bg-secondary/50"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate('/book')}
              className="bg-gp-accent hover:bg-gp-accent/90 text-white font-semibold px-6 py-2 rounded-2xl shadow-glow transition-all hover:scale-105"
            >
              Book a Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-gp-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card rounded-lg mt-2 shadow-card">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-gp-accent hover:bg-secondary/50 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button
                onClick={() => {
                  navigate('/book');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gp-accent hover:bg-gp-accent/90 text-white font-semibold py-2 rounded-2xl"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
