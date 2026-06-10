import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './Contact.css';

const BELOFTES = [
  'Reactie binnen 1 werkdag',
  'Vrijblijvende offerte',
  'Persoonlijk advies aan huis',
];

const FADE = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ naam: '', email: '', dienst: '', bericht: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/xwvjqdrn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <span id="offerte" className="ct-offerte-anchor" aria-hidden="true" />
      <div className="ct-bleed-top" aria-hidden="true" />

      <div className="ct-inner">

        {/* ── Full-width headline ── */}
        <div className="ct-head">
          <motion.p
            className="ct-head-meta"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ct-avail-dot" aria-hidden="true" />
            Beschikbaar voor nieuwe opdrachten
          </motion.p>

          <motion.h2
            className="ct-headline"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Vraag een gratis offerte <span className="ct-accent">aan.</span>
          </motion.h2>

        </div>

        {/* ── Two-column: info left, form right ── */}
        <div className="ct-grid">

          {/* LEFT: tagline + contact details */}
          <div className="ct-left">
            <motion.p
              className="ct-tagline"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Vul het formulier in of neem direct contact op. Wij reageren binnen 1 werkdag met een vrijblijvende offerte op maat.
            </motion.p>

            <motion.div
              className="ct-info-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            >
              <motion.a href="tel:+31612345678" className="ct-info-item" variants={FADE}>
                <span className="ct-info-label">Telefoon</span>
                <span className="ct-info-value">06 12 34 56 78</span>
              </motion.a>
              <motion.a href="mailto:info@princeschilder.nl" className="ct-info-item" variants={FADE}>
                <span className="ct-info-label">E-mail</span>
                <span className="ct-info-value">info@princeschilder.nl</span>
              </motion.a>
              <motion.span className="ct-info-item" variants={FADE}>
                <span className="ct-info-label">Werkgebied</span>
                <span className="ct-info-value">Amsterdam &amp; omgeving</span>
              </motion.span>
            </motion.div>

            <motion.div
              className="ct-beloftes"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
            >
              {BELOFTES.map((b, i) => (
                <motion.span key={i} className="ct-belofte" variants={FADE}>
                  <svg className="ct-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="#c8a028" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </motion.span>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              className="ct-testimonial"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              <p className="ct-testi-quote">
                "Gurdeep heeft onze woonkamer perfect geschilderd. Strak werk, op tijd opgeleverd en echt een vakman."
              </p>
              <span className="ct-testi-attr">Layla Bouabid, Amsterdam</span>
            </motion.div>

          </div>

          {/* RIGHT: Form */}
          <motion.div
            className="ct-form-card"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            {!submitted ? (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-form-header">
                  <span className="ct-form-eyebrow">Offerte aanvragen</span>
                </div>

                <div className="ct-fields">
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-naam">Uw naam</label>
                    <input
                      id="ct-naam"
                      className="ct-input"
                      type="text"
                      name="naam"
                      value={form.naam}
                      onChange={handleChange}
                      placeholder="Jouw naam"
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-email">E-mailadres</label>
                    <input
                      id="ct-email"
                      className="ct-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Jouw e-mailadres"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="ct-field ct-field--full">
                    <label className="ct-label" htmlFor="ct-dienst">Welke dienst?</label>
                    <select
                      id="ct-dienst"
                      className="ct-select"
                      name="dienst"
                      value={form.dienst}
                      onChange={handleChange}
                    >
                      <option value="">Kies een dienst...</option>
                      <option value="binnenschilderwerk">Binnenschilderwerk</option>
                      <option value="buitenschilderwerk">Buitenschilderwerk</option>
                      <option value="behangen">Behangen</option>
                      <option value="stucwerk">Stucwerk &amp; afwerking</option>
                      <option value="kleine-klussen">Kleine klussen</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>

                  <div className="ct-field ct-field--full">
                    <label className="ct-label" htmlFor="ct-bericht">Uw bericht</label>
                    <textarea
                      id="ct-bericht"
                      className="ct-textarea"
                      name="bericht"
                      value={form.bericht}
                      onChange={handleChange}
                      placeholder="Vertel kort over je project, de ruimte en eventuele wensen..."
                      rows={5}
                    />
                  </div>
                </div>

                <button type="submit" className="ct-submit" disabled={sending}>
                  {sending ? 'Versturen...' : 'Stuur aanvraag'}
                  {!sending && (
                    <svg className="ct-submit-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                className="ct-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="ct-success-icon" aria-hidden="true" />
                <p className="ct-success-title">Aanvraag ontvangen</p>
                <p className="ct-success-body">
                  Bedankt, {form.naam || 'u'}. Wij nemen binnen 1 werkdag contact met u op.
                </p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
      <div className="ct-bleed-bottom" aria-hidden="true" />

    </section>
  );
}
