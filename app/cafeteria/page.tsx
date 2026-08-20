import { BookingPlanner } from "../components/booking-planner";
import { PageFrame } from "../components/page-frame";

export const metadata = { title: "Cafetería y agenda", description: "Reservá una solicitud para cafetería y espacios de juego en TOPA." };

export default function CafeteriaPage() {
  return <PageFrame><section className="page-hero blue-band"><div className="container narrow"><p className="section-kicker">Cafetería y agenda</p><h1>¿Querés venir a TOPA?</h1><p className="lead">Cada lunes habilitamos los días y horarios disponibles para esa misma semana, desde el lunes hasta el domingo.</p></div></section><section className="section booking-section" id="reservar"><div className="container"><div className="section-heading"><p className="section-kicker">Reservas</p><h2>Elegí tu turno.</h2><p>Tu solicitud queda pendiente hasta que TOPA confirme la disponibilidad.</p></div><BookingPlanner /></div></section></PageFrame>;
}
