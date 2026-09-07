import { PageFrame } from "../components/page-frame";
import { RentalGallery } from "../components/rental-gallery";
import { RentalMotion } from "../components/rental-motion";

const whatsappNumber = "59899383698";

const rentals = [
  {
    name: "Castillo inflable blanco",
    images: [
      { src: "/assets/topa/rentals/castillo-hero.jpeg", alt: "Niñas jugando en el castillo inflable blanco de TOPA" },
      { src: "/assets/topa/rentals/castillo-01.jpeg", alt: "Castillo inflable blanco con niños durante una celebración" },
      { src: "/assets/topa/rentals/castillo-02.jpeg", alt: "Castillo inflable blanco instalado en el exterior" },
      { src: "/assets/topa/rentals/castillo-03.jpeg", alt: "Detalle del castillo inflable blanco decorado" },
    ],
    description: "Un espacio para saltar, jugar y disfrutar durante toda la celebración.",
    details: [
      "Medidas: 3 × 5 metros",
      "Altura: 2,6 metros",
      "Edad recomendada: hasta 10 años",
      "Incluye traslado, armado, desarmado y supervisión",
      "Duración: 4 horas",
    ],
  },
  {
    name: "Plaza de madera",
    images: [
      { src: "/assets/topa/rentals/plaza-madera-01.jpeg", alt: "Plaza de madera de TOPA con juegos de movimiento" },
      { src: "/assets/topa/rentals/plaza-madera-02.jpeg", alt: "Juegos de madera, pelotero y elementos de exploración" },
      { src: "/assets/topa/rentals/plaza-madera-03.jpeg", alt: "Plaza de madera de TOPA preparada para una celebración" },
    ],
    description: "Una propuesta de juego libre que invita a moverse, explorar y descubrir.",
    details: [
      "Incluye juegos de equilibrio, escalada y movimiento",
      "También pelotero, carpa, colchonetas y materiales didácticos",
      "La disposición se adapta al espacio y a las edades de los niños",
      "Duración: 4 horas",
    ],
  },
  {
    name: "Plaza Apego",
    images: [
      { src: "/assets/topa/rentals/plaza-apego-real.jpeg", alt: "Plaza Apego de TOPA con carpa, juegos de madera y pelotero" },
    ],
    description: "Una propuesta más pequeña y versátil, creada para sumar juego, movimiento y exploración a cada celebración.",
    details: [
      "Incluye una selección de cinco juegos de nuestra Plaza de madera",
      "La familia puede elegir los elementos",
      "TOPA también puede seleccionarlos según las edades de los niños",
      "Duración: 4 horas",
    ],
  },
  {
    name: "Mega Pelotero",
    images: [
      { src: "/assets/topa/rentals/mega-pelotero-01.jpeg", alt: "Detalle del Mega Pelotero de TOPA" },
      { src: "/assets/topa/rentals/mega-pelotero-02.jpeg", alt: "Mega Pelotero con pelotas en una celebración al aire libre" },
      { src: "/assets/topa/rentals/mega-pelotero-03.jpeg", alt: "Mega Pelotero de TOPA preparado para jugar" },
    ],
    description: "Un gran espacio blando de juego para sumar exploración y movimiento a la celebración.",
    details: [
      "Pelotero amplio y acolchado",
      "Consulta disponibilidad según fecha y espacio",
    ],
  },
  {
    name: "Mesa de comidas",
    images: [
      { src: "/assets/topa/rentals/plaza-apego-01.jpeg", alt: "Mesa infantil de TOPA preparada para compartir durante una celebración" },
      { src: "/assets/topa/rentals/plaza-apego-02.jpeg", alt: "Mesas bajas de madera de TOPA listas para los niños" },
      { src: "/assets/topa/rentals/plaza-apego-03.jpeg", alt: "Mesa infantil de TOPA preparada para dibujar y compartir" },
    ],
    description: "Un rincón cómodo y a su altura para que los niños compartan la comida, una merienda o una actividad en la celebración.",
    details: [
      "Mesas bajas de madera para niños",
      "Ideal para sumar a celebraciones y propuestas de juego",
      "Consultá disponibilidad para tu fecha",
    ],
  },
];

function availabilityUrl(productName: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola TOPA, quiero consultar la disponibilidad de ${productName}.`)}`;
}

export const metadata = {
  title: "Alquileres",
  description: "Catálogo de juegos y experiencias infantiles de TOPA para llevar a tu evento.",
};

export default function AlquileresPage() {
  return (
    <PageFrame>
      <RentalMotion>
      <section className="section rental-first-section">
        <div className="container rental-hero">
          <div className="rental-hero-copy" data-rental-hero-copy>
            <p className="section-kicker">Alquileres a domicilio</p>
            <h1>El juego de TOPA llega a tu celebración.</h1>
            <p className="lead">Conocé las propuestas de TOPA y consultá disponibilidad para tu fecha. Cada alquiler se coordina según el espacio, las edades y la celebración.</p>
            <div className="button-row"><a className="button button-primary" href="#catalogo">Conocé las propuestas</a><a className="button button-secondary" href={availabilityUrl("una propuesta de alquiler")}>Consultar por WhatsApp</a></div>
          </div>
          <div className="rental-hero-image" data-rental-hero-media>
            <img src="/assets/topa/rentals/castillo-hero.jpeg" alt="Niñas disfrutando el castillo inflable blanco de TOPA" width="1206" height="800" />
          </div>
        </div>
      </section>

      <div className="rental-marquee" aria-label="Servicios incluidos en los alquileres de TOPA"><div>Traslado coordinado <span>·</span> armado <span>·</span> desarmado <span>·</span> propuestas pensadas para cada edad <span>·</span> traslado coordinado <span>·</span> armado <span>·</span> desarmado <span>·</span> propuestas pensadas para cada edad</div></div>

      <section className="section rental-catalog-section" id="catalogo" aria-labelledby="rental-catalog-title">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Catálogo de alquileres TOPA</p>
            <h2 id="rental-catalog-title">Propuestas listas para llevar.</h2>
            <p>Escribinos con la fecha y el producto que te interesa. Te confirmamos disponibilidad y coordinamos cada detalle.</p>
          </div>
          <div className="rental-catalog">
            {rentals.map((rental, index) => (
              <article className={`rental-card rental-card-${index}`} data-rental-card key={rental.name}>
                <RentalGallery name={rental.name} images={rental.images} />
                <div className="rental-card-content">
                  <h3>{rental.name}</h3>
                  <p>{rental.description}</p>
                  <ul>
                    {rental.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <a className="button button-primary" href={availabilityUrl(rental.name)} target="_blank" rel="noreferrer">Consultar disponibilidad</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section rental-journey-section">
        <div className="container"><div className="section-heading rental-journey-heading"><p className="section-kicker">Así lo coordinamos</p><h2>Una propuesta que llega lista para jugar.</h2><p>Nos contás la fecha, el espacio y las edades. TOPA prepara la propuesta y coordina cada detalle con vos.</p></div><div className="rental-journey-accordion"><article className="journey-panel journey-panel-plan" data-rental-journey><span>01</span><h3>Elegís la propuesta</h3><p>Te orientamos según el tipo de festejo, el lugar y la cantidad de niños.</p></article><article className="journey-panel journey-panel-prepare" data-rental-journey><span>02</span><h3>Coordinamos todo</h3><p>Definimos horario, acceso, armado y cada detalle necesario antes del día.</p></article><article className="journey-panel journey-panel-play" data-rental-journey><span>03</span><h3>Ellos disfrutan</h3><p>La propuesta queda preparada para que el juego sea el protagonista.</p></article></div></div>
      </section>

      <section className="section rental-action-section"><div className="container rental-action-inner"><div><p className="section-kicker">Tu próximo festejo</p><h2>Llevamos una parte de TOPA <span className="inline-rental-image" aria-hidden="true"></span> a donde estén ustedes.</h2></div><a className="button button-primary" href={availabilityUrl("una propuesta de alquiler")} target="_blank" rel="noreferrer">Consultar disponibilidad</a></div></section>
      </RentalMotion>
    </PageFrame>
  );
}
