import { PageFrame } from "../components/page-frame";

const whatsappUrl = "https://wa.me/59899383698?text=Hola%20TOPA%2C%20quiero%20hacer%20una%20consulta%20por%20alquileres.";
export const metadata = { title: "Alquileres", description: "Juegos y experiencias infantiles de TOPA para llevar a tu evento." };

export default function AlquileresPage() {
  return <PageFrame><section className="page-hero green-band"><div className="container narrow"><p className="section-kicker">Alquileres a domicilio</p><h1>La experiencia TOPA también puede ir a tu evento.</h1><p className="lead">Conocé nuestras propuestas y consultanos disponibilidad para tu fecha. Cada producto es una unidad única y se bloquea por día al reservar.</p></div></section><section className="section"><div className="container three-columns expanded"><article><h2>Juegos y experiencias infantiles</h2><p>Propuestas que llevamos a cumpleaños, instituciones y celebraciones.</p></article><article><h2>Para instituciones</h2><p>Trabajamos con jardines, CAIF, centros educativos, empresas y grupos.</p></article><article><h2>Una propuesta a medida</h2><p>La propuesta se arma según la cantidad de participantes y el tipo de actividad.</p></article></div><div className="container centered-action"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Solicitar cotización por WhatsApp</a><p>El catálogo muestra las propuestas y sus características. Para precios y disponibilidad se solicita una cotización según la fecha y el producto.</p></div></section></PageFrame>;
}
