import { PageFrame } from "../components/page-frame";
import { RentalGallery } from "../components/rental-gallery";

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
      { src: "/assets/topa/rentals/plaza-apego-01.jpeg", alt: "Mesas bajas y actividades de la Plaza Apego" },
      { src: "/assets/topa/rentals/plaza-apego-02.jpeg", alt: "Propuesta de juego tranquila con mesas bajas y almohadones" },
      { src: "/assets/topa/rentals/plaza-apego-03.jpeg", alt: "Mesa de actividades infantiles preparada por TOPA" },
    ],
    description: "Una propuesta más pequeña y versátil, creada para sumar juego, movimiento y exploración a cada celebración.",
    details: [
      "Incluye una selección de cinco juegos de nuestra Plaza de madera",
      "La familia puede elegir los elementos",
      "TOPA también puede seleccionarlos según las edades de los niños",
      "Duración: 4 horas",
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
      <section className="section rental-first-section">
        <div className="container rental-hero">
          <div className="rental-hero-copy">
            <p className="section-kicker">Alquileres a domicilio</p>
            <h1>Juego, movimiento y exploración para cada celebración.</h1>
            <p className="lead">Conocé las propuestas de TOPA y consultá disponibilidad para tu fecha. Cada alquiler se coordina según el espacio, las edades y la celebración.</p>
          </div>
          <div className="rental-hero-image">
            <img src="/assets/topa/rentals/castillo-hero.jpeg" alt="Niñas disfrutando el castillo inflable blanco de TOPA" width="1206" height="800" />
          </div>
        </div>
      </section>

      <section className="section rental-catalog-section" aria-labelledby="rental-catalog-title">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Catálogo de alquileres TOPA</p>
            <h2 id="rental-catalog-title">Propuestas listas para llevar.</h2>
            <p>Escribinos con la fecha y el producto que te interesa. Te confirmamos disponibilidad y coordinamos cada detalle.</p>
          </div>
          <div className="rental-catalog">
            {rentals.map((rental) => (
              <article className="rental-card" key={rental.name}>
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
    </PageFrame>
  );
}
