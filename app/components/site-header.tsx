const links = [
  { href: "/nosotros", label: "Conocenos" },
  { href: "/cafeteria", label: "Cafetería" },
  { href: "/talleres", label: "Talleres" },
  { href: "/eventos", label: "Eventos" },
  { href: "/alquileres", label: "Alquileres" },
  { href: "/preguntas", label: "Preguntas" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-nav">
        <Link className="site-brand" href="/" aria-label="Espacio TOPA, inicio">
          <img src="/assets/brand/topa-logo.png" alt="Espacio TOPA" width="1944" height="1194" />
        </Link>
        <nav aria-label="Navegación principal">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <Link className="button button-primary nav-booking" href="/#reservar">
          Reservar
        </Link>
      </div>
    </header>
  );
}
import Link from "next/link";
