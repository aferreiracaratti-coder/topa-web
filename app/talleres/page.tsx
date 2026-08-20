import { BookingPlanner } from "../components/booking-planner";
import { PageFrame } from "../components/page-frame";

export const metadata = { title: "Talleres y experiencias", description: "Talleres creativos, mini chefs y experiencias especiales en TOPA." };

export default function TalleresPage() {
  return <PageFrame><section className="page-hero yellow-band"><div className="container narrow"><p className="section-kicker">Experiencias TOPA</p><h1>Siempre hay algo distinto por descubrir.</h1><p className="lead">Cafetería, talleres creativos, mini chefs, cuentos, actividades temáticas y experiencias especiales durante todo el año.</p></div></section><section className="section"><div className="container three-columns expanded"><article><h2>Talleres creativos</h2><p>Propuestas para experimentar, crear y llevarse una producción hecha por ellos mismos.</p></article><article><h2>Mini chefs y experiencias</h2><p>Actividades gastronómicas y temáticas adaptadas a distintas edades, siempre desde el juego.</p></article><article><h2>Cafetería</h2><p>Turnos para disfrutar de todo el espacio de juego mientras los adultos comparten algo rico.</p></article></div></section><section className="section booking-section" id="reservar"><div className="container"><div className="section-heading"><p className="section-kicker">Agenda semanal</p><h2>Reservá un taller.</h2></div><BookingPlanner initialActivity="WORKSHOP" /></div></section></PageFrame>;
}
