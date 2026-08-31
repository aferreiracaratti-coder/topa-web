import { BookingPlanner } from "../components/booking-planner";
import { PageFrame } from "../components/page-frame";

export const metadata = { title: "Cafetería y agenda", description: "Reservá una solicitud para cafetería y espacios de juego en TOPA." };

export default function CafeteriaPage() {
  return <PageFrame><section className="section booking-section first-action-section" id="reservar"><div className="container"><div className="section-heading"><p className="section-kicker">Cafetería y agenda</p><h1>Elegí tu turno.</h1><p>Seleccioná un horario disponible para continuar con la solicitud.</p></div><BookingPlanner /></div></section></PageFrame>;
}
