import { PageFrame } from "../components/page-frame";

const galleryImages = [
  ["/assets/topa/experience-gallery/experience-01-climbing-spiderman.jpeg", "Niño jugando en la rampa de movimiento de TOPA"],
  ["/assets/topa/experience-gallery/experience-02-play-through-shapes.jpeg", "Niños descubriendo el espacio de juego"],
  ["/assets/topa/experience-gallery/experience-03-supermarket.jpeg", "Mercado de juego simbólico de TOPA"],
  ["/assets/topa/experience-gallery/experience-04-topa-cup.jpeg", "Vaso TOPA preparado para una celebración"],
  ["/assets/topa/experience-gallery/experience-05-bakery-climbing.jpeg", "Panadería y rampa de juego de TOPA"],
  ["/assets/topa/experience-gallery/experience-06-hospital.jpeg", "Hospital de juego simbólico en TOPA"],
  ["/assets/topa/experience-gallery/experience-07-ice-cream-slide.jpeg", "Heladería y tobogán dentro de la ciudad TOPA"],
  ["/assets/topa/experience-gallery/experience-08-fruit-market.jpeg", "Niños jugando en el mercado de TOPA"],
  ["/assets/topa/experience-gallery/experience-09-theater-hospital.jpeg", "Teatro y hospital de juego simbólico"],
  ["/assets/topa/experience-gallery/experience-10-bakery-detail.jpeg", "Panadería de juego con alimentos de tela"],
  ["/assets/topa/experience-gallery/experience-11-costumes.jpeg", "Disfraces disponibles para imaginar nuevos personajes"],
  ["/assets/topa/experience-gallery/experience-12-trees.jpeg", "Ingreso arbolado a la zona de movimiento"],
  ["/assets/topa/experience-gallery/experience-13-doll-play.jpeg", "Niña jugando con muñecos en TOPA"],
  ["/assets/topa/experience-gallery/experience-14-costume-play.jpeg", "Niñas disfrutando del juego de disfraces"],
  ["/assets/topa/experience-gallery/experience-15-ball-pit.jpeg", "Familias disfrutando de la piscina de pelotas"],
] as const;

export const metadata = { title: "Conocenos", description: "Conocé el proyecto y la experiencia TOPA." };

export default function NosotrosPage() {
  return (
    <PageFrame>
      <section className="page-hero sand-band">
        <div className="container narrow">
          <p className="section-kicker">Conocenos</p>
          <h1>Un proyecto que nació desde nuestra propia familia.</h1>
          <p>Somos Cami, Santi y Nachi. TOPA comenzó con el deseo de crear el tipo de espacio que nosotros mismos buscábamos como padres: un lugar donde los niños pudieran jugar, imaginar y disfrutar con libertad, y donde los adultos también se sintieran cómodos y bien recibidos.</p>
        </div>
      </section>

      <section className="section family-story-section">
        <div className="container family-story-grid">
          <figure className="family-story-photo">
            <img src="/assets/topa/familia-topa.jpeg" alt="La familia detrás de Espacio TOPA durante una celebración" width="1362" height="2048" />
          </figure>
          <div className="family-story-copy">
            <p>Empezamos llevando propuestas de juego a diferentes celebraciones y, con el tiempo, ese sueño fue creciendo hasta convertirse en un espacio propio.</p>
            <p>Cada rincón fue pensado desde una pregunta muy sencilla: <strong>¿cómo nos gustaría que cuidaran y recibieran a nuestra hija?</strong> Por eso cuidamos la seguridad, la limpieza, la comodidad, la calidad del servicio y la calidez con la que recibimos a cada familia.</p>
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="galeria">
        <div className="container">
          <p className="section-kicker">Galería</p>
          <h2>Así se ve y se vive TOPA.</h2>
          <p className="lead">Madera, colores suaves, escenarios de juego y rincones pensados para despertar la imaginación.</p>
          <div className="photo-gallery" aria-label="Galería de momentos en Espacio TOPA">
            {galleryImages.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} width="1362" height="2048" /></figure>)}
          </div>
        </div>
      </section>

      <section className="section" id="experiencia">
        <div className="container split-intro">
          <div><p className="section-kicker">Experiencia TOPA</p><h2>Lo que queremos que sienta cada familia.</h2></div>
          <p className="lead">No buscamos que sea solamente una salida o un cumpleaños. Queremos que sea una experiencia bien cuidada, disfrutable y fácil de recordar.</p>
        </div>
        <div className="container three-columns">
          <article><h3>Un espacio que sorprende</h3><p>La ciudad de los niños, las estructuras de movimiento y cada pequeño detalle invitan a explorar desde que entran.</p></article>
          <article><h3>Atención cálida y cercana</h3><p>Recibimos a cada familia como nos gustaría que recibieran a la nuestra: con respeto, cuidado y verdadera disposición.</p></article>
          <article><h3>Calidad en cada detalle</h3><p>Limpieza, comodidad, estética, organización y propuestas bien pensadas para que los adultos también puedan disfrutar.</p></article>
        </div>
      </section>
    </PageFrame>
  );
}
