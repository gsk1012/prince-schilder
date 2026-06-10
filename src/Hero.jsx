import { motion, useReducedMotion } from 'motion/react';
import './Hero.css';
import HeroBg from './HeroBg';

const LINES = [
  { text: 'Schilderen', accent: false },
  { text: 'klussen',    accent: false },
  { text: 'afwerken.',  accent: true  },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const lift = (i) => ({
    initial: reduce ? { opacity: 0 } : { y: '105%', opacity: 0 },
    animate: { y: '0%', opacity: 1 },
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: reduce ? 0 : i * 0.11,
    },
  });

  return (
    <section className="hero">
      <HeroBg />

      {/* Large right-side focal visual */}
      <div className="hero-visual" aria-hidden="true">
        <motion.img
          src="/hero-bg.png"
          alt=""
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        />
      </div>

      <div className="hero-content">
        <h1 className="headline">
          {LINES.map(({ text, accent }, i) => (
            <span className="line" key={i}>
              <motion.span className="line-inner" {...lift(i)}>
                {accent ? <span className="accent">{text}</span> : text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="support"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.5 }}
        >
          <h2>Schilder- &amp; klusbedrijf.</h2>
          <p>
            Van strak schilderwerk binnen en buiten tot complete afwerking.
            Wij regelen het vakwerk in en om jouw woning.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
