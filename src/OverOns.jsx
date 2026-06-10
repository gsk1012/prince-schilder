import { motion, useReducedMotion } from 'motion/react';
import './OverOns.css';

const HEADLINE_LINES = ['Vakmanschap', 'met een gezicht.'];

const MARQUEE_ITEMS = [
  'Werkgebied Amsterdam',
  'Noord-Holland en omgeving',
  'Binnen- en buitenwerk',
  'Gratis advies aan huis',
  '20 jaar vakervaring',
  'Particulieren, VvE & bedrijven',
  'Op tijd opgeleverd',
];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const COL_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } },
};

const LIFT = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const LIFT_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const FADE = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

function OoMarquee() {
  return (
    <div className="oo-marquee" aria-hidden="true">
      <div className="oo-marquee-track">
        {[0, 1].map(copy => (
          <span className="oo-marquee-set" key={copy}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span className="oo-marquee-item" key={i}>
                {item}
                <span className="oo-marquee-dot">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OverOns() {
  const reduce = useReducedMotion();
  const liftVariant = reduce ? LIFT_REDUCED : LIFT;

  return (
    <section className="overons" id="over-ons">
      <div className="oo-bleed-top" aria-hidden="true" />

      <div className="oo-inner">

        {/* ── Header row: headline left, intro right ── */}
        <div className="oo-header-row">
          <div className="oo-headline-col">
            <span className="oo-gold-rule" aria-hidden="true" />
            <motion.h2
              className="oo-headline"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={STAGGER}
            >
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="oo-headline-wrap">
                  <motion.span className="oo-headline-line" variants={liftVariant}>
                    {i === HEADLINE_LINES.length - 1
                      ? <>{line.slice(0, -8)}<span className="oo-headline-accent">gezicht.</span></>
                      : line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            className="oo-intro"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            Prince Schilder en Klusbedrijf is meer dan een verfkwast en een ladder. Gurdeep Singh heeft meer dan twintig jaar ervaring in het schildersvak en richtte vijf jaar geleden zijn eigen bedrijf op in Amsterdam. Die kennis en toewijding zitten in elke klus, groot of klein.
            <br /><br />
            Wij werken voor particulieren, VvE's en bedrijven die begrijpen dat goed werk zijn prijs waard is. Van een enkele kamer tot een volledig pand in Noord-Holland: wij nemen elk project even serieus en leveren altijd op tijd op.
          </motion.p>
        </div>


        {/* ── 3-column company text ── */}
        <motion.div
          className="oo-body-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={COL_STAGGER}
        >
          <motion.div className="oo-body-col" variants={FADE}>
            <span className="oo-col-number" aria-hidden="true">01</span>
            <p className="oo-para">
              Wij zijn opgericht met één overtuiging: schilderwerk moet goed zijn, of het doet er niet toe. Gurdeep Singh begon als vakman op de steiger en kent het vak van binnenuit na meer dan twintig jaar in het schildersvak. Die kennis nemen wij mee op elke klus.
            </p>
          </motion.div>
          <motion.div className="oo-body-col" variants={FADE}>
            <span className="oo-col-number" aria-hidden="true">02</span>
            <p className="oo-para">
              U belt ons en u spreekt direct met de vakman die bij u langs komt. Geen callcenter, geen onderaannemers, geen wisselende gezichten. Elk project begeleiden wij persoonlijk van de eerste offerte tot en met de eindoplevering.
            </p>
          </motion.div>
          <motion.div className="oo-body-col" variants={FADE}>
            <span className="oo-col-number" aria-hidden="true">03</span>
            <p className="oo-para">
              Wij werken uitsluitend met kwalitatieve verfproducten. Een goede verflaag beschermt uw woning voor jaren en bespaart u op termijn kosten. Dat is de investering die wij u adviseren, en de kwaliteit die wij zonder uitzondering leveren.
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Marquee strip — full bleed ── */}
      <OoMarquee />

      <div className="oo-inner oo-inner--testi">
        {/* ── Testimonial strip at the bottom ── */}
        <motion.div
          className="oo-testimonial"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <span className="oo-testi-mark" aria-hidden="true">&ldquo;</span>
          <p className="oo-testi-body">
            Eindelijk een schilder die doet wat hij zegt. Op tijd, netjes en zonder gedoe.
          </p>
          <div className="oo-testi-attribution">
            <div className="oo-attribution-portrait">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2"
                alt="Layla Bouabid, tevreden klant van Prince Schilder Amsterdam"
                className="oo-attribution-img"
                draggable="false"
              />
            </div>
            <span className="oo-attribution-name">
              Layla Bouabid<br />Amsterdam-Oost
            </span>
          </div>
          <span className="oo-testi-mark oo-testi-mark--close" aria-hidden="true">&rdquo;</span>
        </motion.div>
      </div>

      <div className="oo-bleed-bottom" aria-hidden="true" />
    </section>
  );
}
