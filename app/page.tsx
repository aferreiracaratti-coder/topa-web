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
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Bienvenidos al mundo TOPA</h1>
            <p>En TOPA los niños pueden <strong>jugar de verdad, imaginar, crear y explorar</strong>. Los adultos los acompañan en un espacio lindo, cómodo y cuidado en cada detalle.</p>
            <div className="button-row"><a className="button button-primary" href="/cafeteria#reservar">Ver agenda y reservar</a><a className="button button-secondary" href="/nosotros">Descubrir TOPA</a></div>
            <p className="hero-note"><strong>Nueva agenda cada lunes.</strong> Se habilitan los turnos disponibles de esa misma semana, hasta el domingo.</p>
          </div>
          <div className="hero-art" aria-hidden="true"><span className="shape shape-yellow" /><span className="shape shape-blue" /><span className="shape shape-coral" /><span className="shape shape-orange" /><span className="art-label">Juego + encuentro</span></div>
        </div>
      </section>
      <section className="section intro-section">
        <div className="container split-intro"><div><p className="section-kicker">Espacio TOPA</p><h2>Mucho más que un salón de juegos.</h2></div><p className="lead">TOPA es un centro de experiencias infantiles. Cada rincón fue creado para que los niños sean protagonistas, mientras las familias comparten una salida diferente en un ambiente cálido, cuidado y con identidad propia.</p></div>
        <div className="container service-list">
          <article><span>☕</span><h3>Cafetería y espacios de juego</h3><p>Los adultos pueden sentarse, conversar y disfrutar algo rico, acompañando a los niños mientras exploran los diferentes sectores.</p><a href="/cafeteria">Conocer la cafetería →</a></article>
          <article><span>✦</span><h3>Una ciudad hecha para ellos</h3><p>Supermercado, hospital, panadería, heladería, teatro y diferentes escenarios de juego simbólico para inventar historias.</p><a href="/nosotros#galeria">Conocer TOPA →</a></article>
          <article><span>♡</span><h3>Eventos privados</h3><p>Cumpleaños y celebraciones con el espacio preparado para recibir a niños y adultos con comodidad.</p><a href="/eventos">Ver eventos →</a></article>
          <article><span>⌂</span><h3>Alquileres a domicilio</h3><p>Juegos y experiencias infantiles que llevamos a cumpleaños, instituciones y celebraciones.</p><a href="/alquileres">Abrir catálogo →</a></article>
        </div>
      </section>
      <section className="section weekly-callout"><div className="container callout-inner"><div><p className="section-kicker">Cafetería y agenda</p><h2>¿Querés venir a TOPA?</h2><p>Cada lunes habilitamos los días y horarios disponibles para esa misma semana, desde el lunes hasta el domingo.</p></div><a className="button button-dark" href="/cafeteria#reservar">Ver agenda y reservar</a></div></section>
      <section className="section explore-section"><div className="container split-intro"><div><p className="section-kicker">Experiencias TOPA</p><h2>Siempre hay algo distinto por descubrir.</h2></div><p className="lead">Cafetería, talleres creativos, mini chefs, cuentos, actividades temáticas y experiencias especiales durante todo el año.</p></div><div className="container three-columns"><article><h3>Cafetería</h3><p>Turnos para disfrutar de todo el espacio de juego mientras los adultos comparten algo rico.</p><a href="/cafeteria">Ver agenda →</a></article><article><h3>Talleres creativos</h3><p>Propuestas para experimentar, crear y llevarse una producción hecha por ellos mismos.</p><a href="/talleres">Ver talleres →</a></article><article><h3>Mini chefs y experiencias</h3><p>Actividades gastronómicas y temáticas adaptadas a distintas edades, siempre desde el juego.</p><a href="/talleres">Explorar experiencias →</a></article></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </PageFrame>
  );
}
