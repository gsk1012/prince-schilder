import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="brand">
        Prince <span>Schilder</span>
      </div>

      <a className="pill" href="#offerte">
        <span className="dot" />
        Gratis offerte
      </a>

      <h1 className="headline">
        <span className="line">Schilderen</span>
        <span className="line">klussen</span>
        <span className="line">
          afwerken<span className="accent">.</span>
        </span>
      </h1>

      <p className="tag">(…tot in de kleinste hoek)</p>

      <div className="support">
        <h2>Schilder- &amp; klusbedrijf.</h2>
        <p>
          Van strak schilderwerk binnen en buiten tot complete afwerking.
          Wij regelen het vakwerk in en om jouw woning.
        </p>
      </div>
    </section>
  );
}
