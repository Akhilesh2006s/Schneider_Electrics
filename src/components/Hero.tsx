import { ContactCard } from "./ContactCard";
import { EventInfo } from "./EventInfo";
import { SvelLogo } from "./SvelLogo";

export function Hero() {
  return (
    <section className="hero" aria-label="Innovation Connect 2026">
      <div className="hero-inner">
        <div className="hero-logos">
          <SvelLogo />
          <img
            className="schneider-logo schneider-logo-light"
            src={`${import.meta.env.BASE_URL}schneider-white.png`}
            alt="Schneider Electric"
          />
        </div>

        <h1 className="hero-title">
          <span className="title-innovation">Innovation</span>
          <span className="title-connect">Connect</span>
          <span className="title-year">
            <span className="year-line" aria-hidden="true" />
            <span>2026</span>
            <span className="year-line" aria-hidden="true" />
          </span>
        </h1>

        <EventInfo />
        <ContactCard />
      </div>
    </section>
  );
}
