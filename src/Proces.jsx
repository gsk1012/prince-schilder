import { motion, useReducedMotion } from 'motion/react';
import './Proces.css';

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="4" width="14" height="17" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3" />
    <line x1="8.5" y1="10" x2="15.5" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="8.5" y1="13.5" x2="15.5" y2="13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="8.5" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const HouseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 10.5L12 2l9 8.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 22V16h6v6" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 16.5L7 22l5-2 5 2-1.5-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const STEPS = [
  {
    icon: <ClipboardIcon />,
    ghost: 'Aanvragen',
    title: 'Offerte aanvragen',
    desc: 'Vul het formulier in of bel ons direct. Wij reageren binnen 1 werkdag met een vrijblijvende offerte op maat.',
  },
  {
    icon: <HouseIcon />,
    ghost: 'Afspreken',
    title: 'Afspraak aan huis',
    desc: 'We komen langs om het werk te bekijken en bespreken alles persoonlijk met u door. Geen verrassingen achteraf.',
  },
  {
    icon: <AwardIcon />,
    ghost: 'Opleveren',
    title: 'Strak opgeleverd',
    desc: 'Het werk wordt netjes uitgevoerd, op tijd en precies zoals afgesproken. U keurt af, wij zijn pas klaar als u tevreden bent.',
  },
];

export default function Proces() {
  const reduce = useReducedMotion();

  return (
    <section className="proces" id="hoe-het-werkt">
      <div className="proces-inner">

        <motion.div
          className="proces-header"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="proces-rule" aria-hidden="true" />
          <h2 className="proces-heading">
            Hoe het <span className="proces-accent">werkt.</span>
          </h2>
        </motion.div>

        <div className="proces-list" role="list">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.ghost}
              className="proces-row"
              role="listitem"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className="pr-icon-wrap">
                {step.icon}
              </div>
              <div className="pr-content">
                <h3 className="pr-title">{step.title}</h3>
                <p className="pr-desc">{step.desc}</p>
              </div>
              <span className="pr-ghost" aria-hidden="true">{step.ghost}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
