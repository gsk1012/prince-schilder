import { motion, useReducedMotion } from 'motion/react';
import './Werkwijze.css';

const COLUMNS = [
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223431_5f3cd53c-7819-439f-a284-250d3c5dfa5f.png',
    alt: 'Strak schilderwerk in een modern interieur',
    value: '20 jaar',
    label: 'vakervaring',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223902_1c688e30-9527-45b1-8186-29a9c09c9ae5.png',
    alt: 'Vakkundig aangebracht behang',
    value: 'Gratis',
    label: 'advies aan huis',
  },
  {
    src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Afgewerkte woning in Amsterdam',
    value: '50+',
    label: 'woningen opgeleverd',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223904_900dd7c6-8603-46e8-8970-e5464d07bfd5.png',
    alt: 'Perfecte stucwerk afwerking',
    value: 'Altijd',
    label: 'op tijd geleverd',
  },
];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
};

const REVEAL = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.80, ease: [0.16, 1, 0.3, 1] } },
};

const REVEAL_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Werkwijze() {
  const reduce = useReducedMotion();
  const variant = reduce ? REVEAL_REDUCED : REVEAL;

  return (
    <section className="werkwijze" id="werkzaamheden">
      <h2 className="ww-sr-heading">Onze werkzaamheden in Amsterdam en Noord-Holland</h2>
      <motion.div
        className="ww-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={STAGGER}
      >
        {COLUMNS.map((col, i) => (
          <motion.div key={i} className="ww-col" variants={variant}>
            <img
              src={col.src}
              alt={col.alt}
              className="ww-col-img"
              loading="lazy"
            />
            <div className="ww-col-overlay" aria-hidden="true" />
            <div className="ww-col-stat">
              <span className="ww-col-rule" aria-hidden="true" />
              <span className="ww-col-value">{col.value}</span>
              <span className="ww-col-label">{col.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
