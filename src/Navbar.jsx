import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Diensten',      href: '#diensten' },
  { label: 'Hoe het werkt', href: '#hoe-het-werkt' },
  { label: 'Werkzaamheden', href: '#werkzaamheden' },
  { label: 'Over ons',      href: '#over-ons' },
  { label: 'Contact',       href: '#contact' },
];

const DRAWER_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const DRAWER_ITEM = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { scrollY }             = useScroll();
  const reduce                  = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className="navbar"
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top:      { backgroundColor: 'rgba(8, 6, 3, 0)',    borderBottomColor: 'rgba(200, 160, 40, 0)',    backdropFilter: 'blur(0px)'  },
          scrolled: { backgroundColor: 'rgba(8, 6, 3, 0.88)', borderBottomColor: 'rgba(200, 160, 40, 0.14)', backdropFilter: 'blur(14px)' },
        }}
        transition={reduce ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
      >
        <nav className="navbar-inner">
          <a className="navbar-logo" href="/">Prince <span>Schilder</span></a>

          <ul className="navbar-links">
            {NAV_ITEMS.map(item => (
              <li key={item.label}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>

          <div className="navbar-cta">
            <a className="navbar-tel" href="tel:+31600000000">Bel ons</a>
            <a className="navbar-btn" href="#offerte">Gratis offerte</a>
          </div>

          <button
            className="navbar-hamburger"
            onClick={() => setOpen(true)}
            aria-label="Menu openen"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={reduce ? { duration: 0 } : { duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigatiemenu"
            >
              <div className="nav-drawer-top">
                <a className="nav-drawer-logo" href="/" onClick={close}>
                  Prince <span>Schilder</span>
                </a>
                <button className="nav-drawer-close" onClick={close} aria-label="Menu sluiten">
                  <span /><span />
                </button>
              </div>

              <motion.nav
                className="nav-drawer-links"
                initial="hidden"
                animate="visible"
                variants={DRAWER_STAGGER}
              >
                {NAV_ITEMS.map(item => (
                  <motion.a
                    key={item.label}
                    className="nav-drawer-item"
                    href={item.href}
                    onClick={close}
                    variants={DRAWER_ITEM}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>

              <motion.div
                className="nav-drawer-bottom"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
              >
                <a className="nav-drawer-cta" href="#offerte" onClick={close}>
                  Gratis offerte
                </a>
                <a className="nav-drawer-tel" href="tel:+31600000000">
                  +31 6 00 000 000
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
