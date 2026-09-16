import { EventModalities } from "../components/event-modalities";
import { PageFrame } from "../components/page-frame";

export const metadata = {
  title: "Eventos en TOPA",
  description: "Cumples infantiles y de adultos, eventos institucionales y despedidas de grupo en Espacio TOPA.",
};

export default function EventosPage() {
  return (
    <PageFrame>
      <section className="page-hero coral-band event-page-hero">
        <div className="container narrow">
          <p className="section-kicker">Cumpleaños y eventos</p>
          <h1>Un espacio, cuatro maneras de celebrar.</h1>
          <p className="lead">Elegí la propuesta que mejor acompaña a tu grupo. Vas a encontrar solamente la información que necesitás para organizarla.</p>
        </div>
      </section>
      <EventModalities />
    </PageFrame>
  );
}
