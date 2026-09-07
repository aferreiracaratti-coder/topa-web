import { BookingPlanner } from "../components/booking-planner";
import { FoodGallery } from "../components/food-gallery";
import { foodGalleryCategories } from "../components/food-gallery-data";
import { PageFrame } from "../components/page-frame";

export const metadata = {
  title: "Cafetería y agenda",
  description: "Reservá una solicitud para cafetería y espacios de juego en TOPA.",
};

export default function CafeteriaPage() {
  return (
    <PageFrame>
      <section className="section booking-section first-action-section" id="reservar">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Cafetería y agenda</p>
            <h1>Elegí tu turno.</h1>
            <p>Seleccioná un horario disponible para continuar con la solicitud.</p>
          </div>
          <BookingPlanner />
        </div>
      </section>

      <section className="section cafeteria-space-section">
        <div className="container cafeteria-space-grid">
          <div className="cafeteria-space-copy">
            <p className="section-kicker">Un lugar para compartir</p>
            <h2>La cafetería también es parte de la experiencia.</h2>
            <p className="lead">Un salón luminoso, cómodo y pensado para que las familias puedan sentarse, acompañar el juego y disfrutar del momento.</p>
          </div>
          <div className="cafeteria-photo-pair">
            <img src="/assets/topa/cafeteria-salon.jpeg" alt="Salón luminoso de la cafetería de Espacio TOPA" width="2048" height="1362" />
            <img src="/assets/topa/cafeteria-mesas-detalle.jpeg" alt="Mesas y banco de la cafetería de Espacio TOPA" width="1362" height="2048" />
          </div>
        </div>
      </section>

      <section className="section food-section">
        <div className="container split-intro">
          <div>
            <p className="section-kicker">Para acompañar el juego</p>
            <h2>Algo rico para cada momento.</h2>
          </div>
          <p className="lead">Meriendas, pizzas y opciones para compartir que completan la experiencia. Las propuestas disponibles se confirman en cada fecha.</p>
        </div>
        <div className="container">
          <FoodGallery name="la propuesta gastronómica de TOPA" categories={foodGalleryCategories} />
        </div>
      </section>
    </PageFrame>
  );
}
