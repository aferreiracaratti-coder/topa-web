import { BookingPlanner } from "../components/booking-planner";
import { PageFrame } from "../components/page-frame";

export const metadata = {
  title: "Talleres y experiencias",
  description: "Talleres creativos, mini chefs y experiencias especiales en TOPA.",
};

export default function TalleresPage() {
  return (
    <PageFrame>
      <section className="section booking-section first-action-section" id="reservar">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Agenda semanal</p>
            <h1>Reservá un taller.</h1>
            <p>Elegí una propuesta disponible para continuar.</p>
          </div>
          <BookingPlanner initialActivity="WORKSHOP" />
        </div>
      </section>

      <section className="section workshop-overview-section">
        <div className="container three-columns expanded">
          <article>
            <h2>Talleres creativos</h2>
            <p>Propuestas para experimentar, crear y llevarse una producción hecha por ellos mismos.</p>
          </article>
          <article>
            <h2>Mini chefs y experiencias</h2>
            <p>Actividades gastronómicas y temáticas adaptadas a distintas edades, siempre desde el juego.</p>
          </article>
          <article>
            <h2>Cafetería</h2>
            <p>Turnos para disfrutar de todo el espacio de juego mientras los adultos comparten algo rico.</p>
          </article>
        </div>
      </section>

      <section className="section workshop-gallery-section">
        <div className="container split-intro">
          <div>
            <p className="section-kicker">Aprender haciendo</p>
            <h2>Manos, colores y mucha imaginación.</h2>
          </div>
          <p className="lead">Cada propuesta invita a probar, crear y compartir. Mirá la agenda para conocer el taller y la experiencia disponibles esa semana.</p>
        </div>
        <div className="container workshop-photo-grid" aria-label="Momentos de talleres creativos en Espacio TOPA">
          <figure className="workshop-photo-main">
            <img src="/assets/topa/talleres-color-grupo.jpeg" alt="Niños creando juntos durante un taller de Espacio TOPA" width="1362" height="2048" />
          </figure>
          <figure>
            <img src="/assets/topa/talleres-bolsas-detalle.jpeg" alt="Niños decorando bolsas de tela en un taller creativo" width="1362" height="2048" />
          </figure>
          <figure>
            <img src="/assets/topa/talleres-bolsa-creativa.jpeg" alt="Niña mostrando una creación realizada durante el taller" width="1362" height="2048" />
          </figure>
        </div>
      </section>
    </PageFrame>
  );
}
