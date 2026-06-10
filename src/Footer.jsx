import { motion, useReducedMotion } from 'motion/react';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Diensten',      href: '#diensten' },
  { label: 'Werkzaamheden', href: '#werkzaamheden' },
  { label: 'Over ons',      href: '#over-ons' },
  { label: 'Contact',       href: '#contact' },
];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const REVEAL = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

const REVEAL_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Footer() {
  const reduce = useReducedMotion();
  const variant = reduce ? REVEAL_REDUCED : REVEAL;

  return (
    <footer className="site-footer">
      <motion.div
        className="footer-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={STAGGER}
      >
        {/* Brand */}
        <motion.div className="footer-brand" variants={variant}>
          <a className="footer-logo" href="/">
            Prince <span>Schilder</span>
          </a>
          <p className="footer-tagline">
            Schilder- en klusbedrijf in Amsterdam en omgeving.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div className="footer-col" variants={variant}>
          <span className="footer-col-label">Navigatie</span>
          <ul className="footer-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div className="footer-col" variants={variant}>
          <span className="footer-col-label">Bereikbaar</span>
          <ul className="footer-contact-list">
            <li>
              <a href="tel:+31600000000">+31 6 00 000 000</a>
            </li>
            <li>
              <a href="mailto:info@princeschilder.nl">info@princeschilder.nl</a>
            </li>
            <li>Amsterdam en omgeving</li>
          </ul>
          <a className="footer-cta" href="#offerte">
            Gratis offerte
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom strip */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copy">© 2026 Prince Schilder en Klusbedrijf. Alle rechten voorbehouden.</span>
          <span className="footer-kvk">KvK 92911056</span>
        </div>
      </div>
    </footer>
  );
}
