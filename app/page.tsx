import type { Metadata } from "next";

const bookingUrl = "https://espaciotopa.simplybook.me/v2/#book";
const workshopUrl =
  "https://espaciotopa.simplybook.me/v2/#book/service/5";
const whatsappUrl =
  "https://wa.me/59899383698?text=Hola%20Espacio%20TOPA%2C%20quisiera%20consultar%20por%20cumplea%C3%B1os%20o%20eventos.";
const instagramUrl = "https://www.instagram.com/espaciotopauy/";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Brasil%20774%2C%20Salto%2C%20Uruguay";

export const metadata: Metadata = {
  title: "Cafetería, juegos, talleres y eventos",
  description:
    "Un espacio familiar en Salto para jugar, encontrarnos y disfrutar. Cafetería, talleres, cumpleaños y eventos.",
};

const hours = [
  { day: "Jueves", time: "17:00 a 19:00" },
  { day: "Viernes", time: "17:00 a 19:00" },
  { day: "Sábado", time: "16:00 a 18:00" },
  { day: "Domingo", time: "16:00 a 18:00" },
];

const faqs = [
  {
    question: "¿Cómo reservo para la cafetería?",
    answer:
      "Las reservas de cafetería se toman únicamente por SimplyBook. Elegí el turno disponible y seguí los pasos hasta completar la reserva.",
  },
  {
    question: "¿Los bebés pagan entrada?",
    answer: "Los bebés menores de 1 año no pagan entrada.",
  },
  {
    question: "¿Los niños ingresan solos?",
    answer:
      "No. Cada menor debe ingresar acompañado por una persona adulta responsable.",
  },
  {
    question: "¿Cómo consulto por cumpleaños o eventos?",
    answer:
      "Escribinos por WhatsApp al 099 383 698. Te contamos las opciones y coordinamos según la fecha y el tipo de celebración.",
  },
];

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Espacio TOPA",
    description:
      "Cafetería familiar, ciudad de niños, talleres, cumpleaños y eventos en Salto, Uruguay.",
    url: "https://espaciotopa.simplybook.me/v2/",
    telephone: "+59899383698",
    email: "espaciotopa@gmail.com",
    image: "/assets/brand/topa-logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Brasil 774",
      addressLocality: "Salto",
      postalCode: "50000",
      addressCountry: "UY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.386492,
      longitude: -57.965588,
    },
    sameAs: [instagramUrl],
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#inicio" aria-label="Espacio TOPA, inicio">
            <img
              className="brand-logo"
              src="/assets/brand/topa-logo.png"
              alt="Espacio TOPA"
              width="1944"
              height="1194"
            />
          </a>

          <nav className="main-nav" aria-label="Navegación principal">
            <a href="#experiencias">Qué hacemos</a>
            <a href="#visitanos">Horarios</a>
            <a href="#preguntas">Preguntas</a>
          </nav>

          <a
            className="button button-small button-primary header-cta"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Reservar
          </a>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Cafetería familiar en Salto</p>
              <h1>Un lugar para jugar, encontrarnos y disfrutar.</h1>
              <p className="hero-lead">
                Una ciudad pensada para las infancias, con rica merienda,
                cafetería para grandes y experiencias que se viven en familia.
              </p>

              <div className="hero-actions" aria-label="Acciones principales">
                <a
                  className="button button-primary"
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reservar cafetería
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button button-secondary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar por eventos
                </a>
              </div>

              <p className="hero-note">
                Brasil 774 · Salto, Uruguay
                <span aria-hidden="true">•</span>
                Jueves a domingo
              </p>
            </div>

            <div className="topa-world" aria-label="El mundo TOPA">
              <div className="world-sun" aria-hidden="true" />
              <div className="world-cloud" aria-hidden="true" />
              <div className="world-card world-card-cafe">
                <span className="world-card-letter" aria-hidden="true">
                  C
                </span>
                <strong>Cafetería</strong>
                <small>Para compartir</small>
              </div>
              <div className="world-card world-card-play">
                <span className="world-card-letter" aria-hidden="true">
                  J
                </span>
                <strong>Juego</strong>
                <small>Con libertad</small>
              </div>
              <div className="world-card world-card-create">
                <span className="world-card-letter" aria-hidden="true">
                  T
                </span>
                <strong>Talleres</strong>
                <small>Para crear</small>
              </div>
              <div className="world-smile" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="welcome-strip" aria-label="Propuesta de Espacio TOPA">
          <div className="container welcome-items">
            <p>
              <strong>Jugar</strong>
              <span>Un mini mundo para explorar</span>
            </p>
            <p>
              <strong>Compartir</strong>
              <span>Tiempo de calidad en familia</span>
            </p>
            <p>
              <strong>Celebrar</strong>
              <span>Momentos que quedan</span>
            </p>
          </div>
        </section>

        <section className="section experiences" id="experiencias">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Hay un TOPA para cada momento</p>
                <h2>Experiencias para disfrutar juntos</h2>
              </div>
              <p>
                Vení a merendar, crear, jugar o celebrar. Cada propuesta está
                pensada para que niños y grandes la pasen bien.
              </p>
            </div>

            <div className="experience-grid">
              <article className="experience-card card-cafe">
                <span className="card-number">01</span>
                <div className="card-shape card-shape-circle" aria-hidden="true" />
                <h3>Cafetería y juego</h3>
                <p>
                  Turnos con cupos limitados para que los niños disfruten
                  nuestra ciudad de juegos y los grandes compartan la
                  cafetería.
                </p>
                <ul className="plain-list">
                  <li>Menores de 1 año: sin entrada</li>
                  <li>Hasta 10 años: $390 con merienda</li>
                  <li>Desde 11 años y adultos: a la carta</li>
                </ul>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Ver turnos disponibles <span aria-hidden="true">→</span>
                </a>
              </article>

              <article className="experience-card card-workshop">
                <span className="card-number">02</span>
                <div className="card-shape card-shape-arch" aria-hidden="true" />
                <h3>Taller TOPA</h3>
                <p>
                  Una actividad creativa para llevar a casa, desayuno o
                  merienda y juego libre en nuestra ciudad de niños.
                </p>
                <ul className="plain-list">
                  <li>Edad recomendada: desde 3 años</li>
                  <li>Actividad, merienda y juego incluidos</li>
                  <li>Valor actual: $700 por niño</li>
                </ul>
                <a href={workshopUrl} target="_blank" rel="noreferrer">
                  Reservar un taller <span aria-hidden="true">→</span>
                </a>
              </article>

              <article className="experience-card card-event">
                <span className="card-number">03</span>
                <div className="card-shape card-shape-cross" aria-hidden="true" />
                <h3>Cumpleaños y eventos</h3>
                <p>
                  Celebraciones privadas en un espacio cálido y diferente,
                  pensado para que la experiencia sea disfrutable de principio
                  a fin.
                </p>
                <ul className="plain-list">
                  <li>Dos turnos privados por día los fines de semana</li>
                  <li>Propuestas adaptadas a cada celebración</li>
                  <li>Coordinación directa por WhatsApp</li>
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Consultar fecha <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section how-it-works">
          <div className="container booking-panel">
            <div className="booking-copy">
              <p className="eyebrow">Reservar es simple</p>
              <h2>Elegí un turno y preparate para disfrutar.</h2>
              <p>
                Los días disponibles se habilitan semana a semana. También
                compartimos las novedades en las historias destacadas de
                Instagram.
              </p>
              <a
                className="button button-light"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ir a reservas
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <ol className="booking-steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Elegí la experiencia</strong>
                  <p>Cafetería o taller TOPA.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Mirá los turnos</strong>
                  <p>Seleccioná el día y horario habilitado.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Completá la reserva</strong>
                  <p>Ingresá los datos solicitados y listo.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section visit" id="visitanos">
          <div className="container visit-grid">
            <div className="visit-copy">
              <p className="eyebrow">Vení a conocernos</p>
              <h2>Tu próximo plan en familia está en Brasil 774.</h2>
              <p>
                Estamos en Salto, Uruguay. Los horarios pueden variar cuando
                hay eventos privados, por eso siempre recomendamos reservar.
              </p>
              <div className="visit-actions">
                <a
                  className="button button-primary"
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cómo llegar
                </a>
                <a
                  className="text-link"
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver Instagram <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="hours-card">
              <div className="hours-heading">
                <span>Horarios habituales</span>
                <small>Turnos con reserva</small>
              </div>
              <dl>
                {hours.map((item) => (
                  <div key={item.day}>
                    <dt>{item.day}</dt>
                    <dd>{item.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="hours-note">
                Lunes a miércoles: cerrado. La cafetería de fin de semana se
                habilita cuando no hay eventos privados.
              </p>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Familias felices</p>
                <h2>Un espacio hecho con cariño.</h2>
              </div>
              <p className="rating" aria-label="Calificación: 5 de 5">
                <span aria-hidden="true">★★★★★</span>
                5,0 en reseñas
              </p>
            </div>

            <div className="testimonial-grid">
              <blockquote>
                <p>
                  “Juegos de calidad, espacios seguros y una merienda
                  deliciosa. Un plan para volver.”
                </p>
                <footer>Familia visitante</footer>
              </blockquote>
              <blockquote>
                <p>
                  “Un mini mundo pensado para que los niños jueguen con
                  libertad y los grandes también disfruten.”
                </p>
                <footer>Familia visitante</footer>
              </blockquote>
              <blockquote>
                <p>
                  “La atención cálida, la limpieza y el cuidado de cada detalle
                  hacen la diferencia.”
                </p>
                <footer>Familia visitante</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section faq" id="preguntas">
          <div className="container faq-grid">
            <div className="faq-intro">
              <p className="eyebrow">Antes de venir</p>
              <h2>Preguntas frecuentes</h2>
              <p>
                Si te queda alguna duda, escribinos. Cami, Santi y Nachi están
                del otro lado.
              </p>
              <a
                className="text-link"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <img
              src="/assets/brand/topa-logo.png"
              alt=""
              width="1944"
              height="1194"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow">Nos vemos en TOPA</p>
              <h2>¿Armamos un lindo recuerdo?</h2>
            </div>
            <a
              className="button button-primary"
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Reservar ahora
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img
              className="footer-logo"
              src="/assets/brand/topa-logo.png"
              alt="Espacio TOPA"
              width="1944"
              height="1194"
            />
            <p>Cafetería, cumples, talleres y eventos.</p>
          </div>
          <div>
            <strong>Visitanos</strong>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              Brasil 774, Salto
            </a>
            <span>Uruguay</span>
          </div>
          <div>
            <strong>Contacto</strong>
            <a href="tel:+59899383698">099 383 698</a>
            <a href="mailto:espaciotopa@gmail.com">espaciotopa@gmail.com</a>
          </div>
          <div>
            <strong>Seguinos</strong>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              @espaciotopauy
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Espacio TOPA</span>
          <span>Hecho para disfrutar en familia.</span>
        </div>
      </footer>

      <div className="mobile-booking-bar">
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          Reservar cafetería
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
