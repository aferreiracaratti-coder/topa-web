import { PageFrame } from "./components/page-frame";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Espacio TOPA",
  address: { "@type": "PostalAddress", streetAddress: "Brasil 774", addressLocality: "Salto", addressCountry: "UY" },
  telephone: "+59899383698",
  email: "espaciotopa@gmail.com",
};

export default function HomePage() {
  return (
    <PageFrame>
      <section className="topa-video-hero">
        <div className="topa-video-hero-media" aria-hidden="true">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/assets/topa/topa-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container topa-video-hero-content">
          <div className="topa-video-hero-logo-wrap">
            <img className="topa-video-hero-logo" src="/assets/brand/topa-logo.png" alt="Espacio TOPA" width="1944" height="1194" />
          </div>
          <h1>Bienvenidos al mundo TOPA, la primera ciudad de los niños en Salto.</h1>
          <p>Un espacio pensado para que los niños exploren con libertad y las familias compartan momentos que quedan para siempre.</p>
          <div className="button-row">
            <a className="button button-primary" href="/#reservar">Reservar ahora</a>
            <a className="button topa-video-hero-secondary" href="/nosotros">Descubrir TOPA</a>
          </div>
        </div>
      </section>
      <section className="reservation-cta" id="reservar">
        <div className="container reservation-cta-grid">
          <div className="reservation-cta-copy">
            <p className="section-kicker">Reservas TOPA</p>
            <h2>Reservá tu lugar para jugar, crear y compartir.</h2>
            <p>Consultá los turnos disponibles para cafetería, juego y talleres. Cada lunes habilitamos la agenda de esa misma semana.</p>
            <div className="button-row">
              <a className="button button-primary" href="/cafeteria#reservar">Ver horarios y reservar</a>
              <a className="text-link" href="/preguntas">¿Cómo funcionan las reservas?</a>
            </div>
            <p className="reservation-note"><strong>Importante:</strong> enviás una solicitud y TOPA te confirma la disponibilidad.</p>
          </div>
          <div className="reservation-visual">
            <img className="reservation-topa-facade" src="/assets/topa/fachada-reservas-topa.jpeg" alt="Fachada de Espacio TOPA en Brasil 774" width="2048" height="1362" />
            <span>Tu próximo momento TOPA empieza acá</span>
          </div>
        </div>
      </section>
      <section className="section intro-section">
        <div className="container split-intro"><div><p className="section-kicker">Espacio TOPA</p><h2>Mucho más que un salón de juegos.</h2></div><p className="lead">TOPA es un centro de experiencias infantiles. Cada rincón fue creado para que los niños sean protagonistas, mientras las familias comparten una salida diferente en un ambiente cálido, cuidado y con identidad propia.</p></div>
        <div className="container service-list">
          <article><img src="/assets/topa/cafeteria-salon.jpeg" alt="Salón de la cafetería de Espacio TOPA" width="2048" height="1362" /><h3>Cafetería y espacios de juego</h3><p>Los adultos pueden sentarse, conversar y disfrutar algo rico, acompañando a los niños mientras exploran los diferentes sectores.</p><a href="/cafeteria">Conocer la cafetería →</a></article>
          <article><img className="city-play-image" src="/assets/topa/ciudad-mercado.jpeg" alt="Mercado de juego simbólico dentro de la ciudad de los niños" width="1362" height="2048" /><h3>Una ciudad hecha para ellos</h3><p>Supermercado, hospital, panadería, heladería, teatro y diferentes escenarios de juego simbólico para inventar historias.</p><a href="/nosotros#galeria">Conocer TOPA →</a></article>
          <article><img src="/assets/topa/ingreso-ciudad.webp" alt="Ingreso a la ciudad de los niños" width="720" height="480" /><h3>Eventos privados</h3><p>Cumpleaños y celebraciones con el espacio preparado para recibir a niños y adultos con comodidad.</p><a href="/eventos">Ver eventos →</a></article>
          <article><img src="/assets/topa/rentals/castillo-hero.jpeg" alt="Castillo inflable blanco de TOPA durante una celebración" width="1206" height="800" /><h3>Alquileres a domicilio</h3><p>El castillo inflable blanco y propuestas de juego que llevamos a cumpleaños, instituciones y celebraciones.</p><a href="/alquileres">Abrir catálogo →</a></article>
        </div>
      </section>
      <section className="section weekly-callout"><div className="container callout-inner"><div><p className="section-kicker">Cafetería y agenda</p><h2>¿Querés venir a TOPA?</h2><p>Cada lunes habilitamos los días y horarios disponibles para esa misma semana, desde el lunes hasta el domingo.</p></div><a className="button button-dark" href="/#reservar">Ver agenda y reservar</a></div></section>
      <section className="section explore-section"><div className="container split-intro"><div><p className="section-kicker">Experiencias TOPA</p><h2>Siempre hay algo distinto por descubrir.</h2></div><p className="lead">Cafetería, talleres creativos, mini chefs, cuentos, actividades temáticas y experiencias especiales durante todo el año.</p></div><div className="container three-columns"><article><h3>Cafetería</h3><p>Turnos para disfrutar de todo el espacio de juego mientras los adultos comparten algo rico.</p><a href="/cafeteria">Ver agenda →</a></article><article><h3>Talleres creativos</h3><p>Propuestas para experimentar, crear y llevarse una producción hecha por ellos mismos.</p><a href="/talleres">Ver talleres →</a></article><article><h3>Mini chefs y experiencias</h3><p>Actividades gastronómicas y temáticas adaptadas a distintas edades, siempre desde el juego.</p><a href="/talleres">Explorar experiencias →</a></article></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </PageFrame>
  );
}
