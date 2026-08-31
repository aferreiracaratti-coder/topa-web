import { BookingPlanner } from "../components/booking-planner";
import { PageFrame } from "../components/page-frame";

export const metadata = { title: "Talleres y experiencias", description: "Talleres creativos, mini chefs y experiencias especiales en TOPA." };

export default function TalleresPage() {
  return <PageFrame><section className="section booking-section first-action-section" id="reservar"><div className="container"><div className="section-heading"><p className="section-kicker">Agenda semanal</p><h1>Reservá un taller.</h1><p>Elegí una propuesta disponible para continuar.</p></div><BookingPlanner initialActivity="WORKSHOP" /></div></section><section className="section"><div className="container three-columns expanded"><article><h2>Talleres creativos</h2><p>Propuestas para experimentar, crear y llevarse una producción hecha por ellos mismos.</p></article><article><h2>Mini chefs y experiencias</h2><p>Actividades gastronómicas y temáticas adaptadas a distintas edades, siempre desde el juego.</p></article><article><h2>Cafetería</h2><p>Turnos para disfrutar de todo el espacio de juego mientras los adultos comparten algo rico.</p></article></div></section></PageFrame>;
}
