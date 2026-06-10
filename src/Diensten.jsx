import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import './Diensten.css';

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  return (
    <div className="tile-img-wrap" ref={ref}>
      <motion.img src={src} alt={alt} className="tile-img" style={{ y }} />
    </div>
  );
}

export default function Diensten() {
  return (
    <section className="diensten" id="diensten">
      <div className="diensten-inner">

        <motion.div
          className="diensten-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={STAGGER}
        >
          <motion.span className="diensten-rule" aria-hidden="true" variants={FADE_UP} />
          <motion.h2 className="diensten-heading" variants={FADE_UP}>
            Van vloer tot<br /><span className="accent">plafond.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="diensten-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER}
        >
          {/* Tile 1 - Binnenschilderwerk (large, image) */}
          <motion.article className="diensten-tile tile-binnen" variants={FADE_UP}>
            <ParallaxImage
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223431_5f3cd53c-7819-439f-a284-250d3c5dfa5f.png"
              alt="Binnenschilderwerk"
            />
            <div className="tile-content">
              <h3 className="tile-title">Binnenschilderwerk</h3>
              <p className="tile-desc">Strakke muren, fraaie kozijnen en vlekkeloze afwerking in elke ruimte.</p>
            </div>
          </motion.article>

          {/* Tile 2 - Buitenschilderwerk (image) */}
          <motion.article className="diensten-tile tile-buiten" variants={FADE_UP}>
            <ParallaxImage
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223435_f9e0e2b5-33a8-4a72-b5cb-b7b4dc42add6.png"
              alt="Buitenschilderwerk"
            />
            <div className="tile-content">
              <h3 className="tile-title">Buitenschilderwerk</h3>
              <p className="tile-desc">Bescherming en uitstraling voor gevels, kozijnen en houtwerk.</p>
            </div>
          </motion.article>

          {/* Tile 3 - Behangen (image) */}
          <motion.article className="diensten-tile tile-behangen" variants={FADE_UP}>
            <ParallaxImage
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223902_1c688e30-9527-45b1-8186-29a9c09c9ae5.png"
              alt="Behangen"
            />
            <div className="tile-content">
              <h3 className="tile-title">Behangen</h3>
              <p className="tile-desc">Van klassiek tot modern, strak aangebracht zonder zichtbare naden.</p>
            </div>
          </motion.article>

          {/* Tile 4 - Stucwerk (image) */}
          <motion.article className="diensten-tile tile-stuc" variants={FADE_UP}>
            <ParallaxImage
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_223904_900dd7c6-8603-46e8-8970-e5464d07bfd5.png"
              alt="Stucwerk"
            />
            <div className="tile-content">
              <h3 className="tile-title">Stucwerk &amp; afwerking</h3>
              <p className="tile-desc">Glad of gestructureerd, wij leveren het resultaat dat jij voor ogen hebt.</p>
            </div>
          </motion.article>

          {/* Tile 5 - Kleine klussen (wide, cinematic) */}
          <motion.article className="diensten-tile tile-klussen" variants={FADE_UP}>
            <div className="klussen-bg" aria-hidden="true">
              <img
                src="https://d8j0ntlcm91z4.cloudfront.net/user_3EullDUozCLP0n2estZw2O2QBZD/hf_20260609_211440_ce54a6f8-1dd3-44a3-a761-83414d5a8a43.png"
                alt=""
                className="klussen-img"
              />
              <div className="klussen-overlay" />
            </div>
            <div className="tile-content tile-content--row">
              <div>
                <h3 className="tile-title">Kleine klussen</h3>
                <p className="tile-desc">Deuren, plinten, kitten, geen klus te klein voor ons.</p>
              </div>
              <a href="#contact" className="tile-cta">Gratis offerte</a>
            </div>
          </motion.article>
        </motion.div>

      </div>
    </section>
  );
}
