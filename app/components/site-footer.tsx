const whatsappUrl = "https://wa.me/59899383698?text=Hola%20TOPA%2C%20quiero%20hacer%20una%20consulta.";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/assets/brand/topa-logo.png" alt="Espacio TOPA" width="1944" height="1194" />
          <p>Cafetería, talleres, cumpleaños, eventos y alquileres infantiles en Salto, Uruguay.</p>
        </div>
        <div>
          <h2>Explorar</h2>
          <a href="/cafeteria">Cafetería</a>
          <a href="/eventos">Eventos</a>
          <a href="/eventos#catering">Catering</a>
          <a href="/alquileres">Alquileres</a>
        </div>
        <div>
          <h2>Información</h2>
          <a href="/nosotros">Conocenos</a>
          <a href="/nosotros#galeria">Galería</a>
          <a href="/nosotros#experiencia">Experiencia TOPA</a>
          <a href="/preguntas">Preguntas frecuentes</a>
        </div>
        <div>
          <h2>Contacto</h2>
          <a href="https://www.instagram.com/espaciotopauy/" target="_blank" rel="noreferrer">Seguinos en Instagram</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp 099 383 698</a>
          <a href="/nosotros">Quiénes somos</a>
          <a href="/cafeteria#reservar">Reservar</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Espacio TOPA · Todos los derechos reservados.</span>
        <span>Salto · Uruguay</span>
      </div>
    </footer>
  );
}
