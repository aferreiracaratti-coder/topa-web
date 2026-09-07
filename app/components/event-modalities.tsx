"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FoodGallery } from "./food-gallery";
import { foodGalleryCategories } from "./food-gallery-data";

const whatsappNumber = "59899383698";

type EventMode = {
  id: "infantiles" | "adultos" | "institucionales" | "despedidas";
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  intro: string[];
  includes: string[];
  sections: Array<{ title: string; paragraphs?: string[]; items?: string[] }>;
  catering?: boolean;
  contactTitle: string;
  contactCopy: string[];
  whatsappText: string;
  contactLabel: string;
};

const modes: EventMode[] = [
  {
    id: "infantiles",
    title: "Cumples infantiles",
    shortTitle: "Cumples infantiles",
    description: "Ellos juegan, ustedes disfrutan y TOPA se ocupa del resto.",
    image: "/assets/topa/event-covers/cumple-infantil-topa.jpeg",
    imageAlt: "Vaso de TOPA preparado para un cumple infantil",
    imagePosition: "center 58%",
    intro: [
      "En TOPA los niños son los protagonistas, pero el festejo está pensado para que todos puedan disfrutar.",
      "Durante el cumpleaños, TOPA es exclusivo para tu evento. Los niños disfrutan de nuestros diferentes espacios de juego mientras los adultos comparten el festejo con comodidad.",
      "Nosotros nos ocupamos de preparar el espacio, la comida de los niños, la atención durante el evento y el orden final.",
    ],
    includes: [
      "Uso exclusivo de TOPA durante 2 horas y media.",
      "Hasta 30 niños incluidos, con posibilidad de ampliar hasta un máximo de 40 niños.",
      "Comida y bebida para los niños.",
      "Acceso a todos los espacios de juego.",
      "Mesas y sillas para niños y adultos.",
      "Vajilla necesaria para el servicio y el momento de la torta.",
      "Espacio preparado para la torta.",
      "Personal TOPA durante todo el evento.",
      "Ambientes climatizados.",
      "Organización, lavado y limpieza final.",
    ],
    sections: [
      { title: "La propuesta para los niños", paragraphs: ["Durante el cumpleaños servimos frutas de estación, panchos, sándwiches de jamón y queso y papas Lay's."], items: ["Bebidas: agua, agua saborizada y Coca-Cola."] },
      { title: "Los grandes también disfrutan", paragraphs: ["Mientras los niños juegan, los adultos pueden compartir el festejo y elegir entre nuestras diferentes propuestas de catering para adultos."] },
      { title: "También podés agregar", items: ["Media hora adicional.", "Castillo inflable.", "Pizza Libre TOPA.", "Chivitos Calientes TOPA.", "Súper Picada TOPA.", "Merienda TOPA.", "Otras propuestas especiales disponibles."] },
    ],
    catering: true,
    contactTitle: "¿Querés festejar en TOPA?",
    contactCopy: ["Escribinos por WhatsApp indicando la fecha que te interesa, la edad del cumpleañero o cumpleañera y la cantidad aproximada de niños y adultos.", "Con esa información te contamos la disponibilidad y te enviamos la propuesta completa para tu evento.", "Ellos juegan. Ustedes disfrutan. Nosotros nos ocupamos del resto."],
    whatsappText: "Hola TOPA, quiero consultar fecha para un cumple infantil.",
    contactLabel: "Consultar fecha por WhatsApp",
  },
  {
    id: "adultos",
    title: "Cumples de adultos",
    shortTitle: "Cumples adultos",
    description: "Un festejo para los grandes, donde los chicos también tienen su lugar.",
    image: "/assets/topa/event-covers/cumple-adultos-topa.jpeg",
    imageAlt: "Celebración de adultos en la barbacoa de TOPA",
    imagePosition: "center 54%",
    intro: ["Celebrá tu cumpleaños en la barbacoa de TOPA, mientras los niños disfrutan de nuestros espacios de juego.", "Una propuesta pensada para reunirse, comer y festejar con tranquilidad, con el espacio preparado y personal TOPA durante todo el evento."],
    includes: ["Uso exclusivo de la barbacoa durante 3 horas.", "Capacidad de hasta 40 adultos.", "Hasta 15 niños adicionales.", "Acceso a los espacios de juego de TOPA para los niños.", "Parrilla, 5 mesas redondas para 8 adultos cada una y 40 sillas para adultos.", "Mantelería blanca, servilletas de papel, vasos y vajilla de postre para los adultos.", "Heladera para las bebidas y baños interiores equipados.", "Ambientes climatizados.", "Dos personas de TOPA durante todo el evento: una en el acceso y juegos; otra para atención y servicio en la mesa.", "Lavado de vajilla, orden y limpieza final."],
    sections: [
      { title: "Armalo a tu manera", paragraphs: ["Podés traer tu propia comida y bebida y utilizar nuestra parrilla, o elegir alguna de las propuestas de catering de TOPA.", "La cocina no está incluida en el uso del espacio."] },
      { title: "También podés agregar", items: ["Media hora adicional.", "Asador.", "Catering para adultos.", "Pizza Libre TOPA.", "Chivitos Calientes TOPA.", "Súper Picada TOPA.", "Merienda TOPA.", "Otras propuestas disponibles."] },
      { title: "Mientras ustedes festejan, ellos juegan", paragraphs: ["Los adultos disfrutan del encuentro en la barbacoa mientras los niños tienen acceso a los espacios de juego de TOPA.", "Durante todo el evento, una persona de nuestro equipo estará destinada al acceso y al sector de juegos, mientras otra estará a disposición del festejo para la atención y el servicio en la barbacoa."] },
      { title: "Importante sobre las reservas", paragraphs: ["Los Cumples de Adultos funcionan con disponibilidad semanal. Podés consultarnos con anticipación por la fecha que te interesa, pero la reserva se confirma el lunes de la misma semana en la que se realizará el cumpleaños, independientemente del día elegido.", "Esto significa que las fechas de Cumples de Adultos no se confirman con semanas o meses de anticipación. Podés dejarnos tu consulta previamente y el lunes correspondiente te confirmamos la disponibilidad para realizar la reserva."] },
    ],
    catering: true,
    contactTitle: "¿Querés festejar tu cumple en TOPA?",
    contactCopy: ["Escribinos indicando la fecha que te interesa y la cantidad aproximada de adultos y niños. Te enviamos la propuesta completa y te contamos la disponibilidad."],
    whatsappText: "Hola TOPA, quiero consultar por un cumple de adultos.",
    contactLabel: "Consultar por WhatsApp",
  },
  {
    id: "institucionales",
    title: "Eventos institucionales",
    shortTitle: "Instituciones",
    description: "Una jornada diferente para CAIF, jardines, colegios y centros educativos.",
    image: "/assets/topa/event-covers/evento-institucional-topa.jpeg",
    imageAlt: "Espacio de juego y panadería de TOPA para instituciones",
    imagePosition: "center 51%",
    intro: ["TOPA también abre sus puertas a CAIF, jardines, colegios, centros educativos e instituciones que buscan realizar una jornada recreativa fuera de su espacio habitual.", "Una propuesta pensada para que los niños disfruten de nuestras instalaciones junto a sus educadores y acompañantes, con TOPA en exclusividad para el grupo."],
    includes: ["Uso exclusivo de TOPA durante 2 horas.", "Acceso a todos los espacios de juego.", "Personal TOPA durante toda la actividad.", "Mesas y sillas para niños y adultos.", "Baños interiores totalmente equipados, incluyendo baño con inodoro infantil.", "Ambientes climatizados con aire acondicionado y ventiladores.", "Organización y preparación del espacio, más limpieza final."],
    sections: [
      { title: "Una propuesta adaptada a cada institución", paragraphs: ["Los Eventos Institucionales se cotizan según la cantidad de niños, educadores, maestros y acompañantes, la fecha solicitada y las características del grupo.", "La propuesta base es sin comida ni bebida, tanto para niños como para adultos. La institución puede traer la alimentación, merienda y bebidas que quiera ofrecer. También podemos preparar una propuesta con comida y bebida de TOPA."] },
      { title: "Días y horarios", paragraphs: ["Los Eventos Institucionales están disponibles únicamente los lunes, martes y miércoles. El turno debe realizarse entre las 10:00 y las 15:00 horas, sin excepción, coordinando el horario de inicio según disponibilidad.", "La duración habitual es de 2 horas. En caso de necesitar más tiempo, se puede agregar media hora adicional por $2.000."] },
    ],
    contactTitle: "¿Quieren visitar TOPA con su institución?",
    contactCopy: ["Escribinos por WhatsApp indicando el nombre de la institución, fecha, cantidad aproximada de niños y adultos, horario preferido dentro de la franja disponible y si desean la actividad con o sin comida de TOPA.", "Con esa información armamos y les enviamos una propuesta especialmente para el grupo."],
    whatsappText: "Hola TOPA, queremos solicitar una cotización para un evento institucional.",
    contactLabel: "Solicitar cotización por WhatsApp",
  },
  {
    id: "despedidas",
    title: "Despedidas de grupo",
    shortTitle: "Despedidas de grupo",
    description: "Una experiencia completa para cerrar juntos una etapa.",
    image: "/assets/topa/experience-gallery/experience-15-ball-pit.jpeg",
    imageAlt: "Niños disfrutando un espacio de juego de TOPA",
    intro: ["Una propuesta pensada para jardines, colegios, clases y grupos de familias que quieren compartir una despedida diferente.", "Las Despedidas de Grupo son una propuesta completa de TOPA: espacio, juegos, comida, bebida y atención durante todo el evento."],
    includes: ["Uso exclusivo de TOPA durante 2 horas y media.", "Acceso a todos los espacios de juego.", "Castillo inflable incluido, sujeto a condiciones climáticas.", "Mesas y sillas para niños y adultos.", "Personal TOPA durante todo el evento y ambientes climatizados.", "Comida y bebida para todos los niños.", "Picada de fiambres y quesos, pizza libre y bebidas línea Coca-Cola para los adultos.", "Torta dulce personalizada con el nombre del grupo, clase, jardín o colegio.", "Vajilla necesaria para el servicio y el momento de la torta.", "Organización, lavado y limpieza final."],
    sections: [
      { title: "Una propuesta completa", paragraphs: ["La propuesta se cotiza de acuerdo con la cantidad de niños de la clase, adultos acompañantes y hermanitos que participarán.", "Cada niño de la clase puede participar acompañado por hasta 2 adultos y sus hermanitos. Contemplando también la participación de los hermanos, podemos recibir hasta aproximadamente 40 niños en total, coordinando previamente la cantidad total de asistentes."] },
      { title: "¿Prefieren realizar el encuentro sin la comida de TOPA?", paragraphs: ["En ese caso, la despedida se cotiza como un evento privado tradicional, de acuerdo con la cantidad de niños y adultos que asistirán y las condiciones habituales de nuestros eventos."] },
      { title: "Disponibilidad", paragraphs: ["Las Despedidas de Grupo TOPA están disponibles únicamente los lunes, martes y miércoles, en horario a coordinar según disponibilidad."] },
    ],
    contactTitle: "¿Quieren hacer su despedida en TOPA?",
    contactCopy: ["Escribinos por WhatsApp indicando el nombre del grupo, jardín o colegio, fecha, cantidad aproximada de niños de la clase, adultos y hermanitos.", "Con esa información armamos y les enviamos una propuesta completa para su grupo."],
    whatsappText: "Hola TOPA, queremos solicitar una cotización para una despedida de grupo.",
    contactLabel: "Solicitar cotización por WhatsApp",
  },
];

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function EventModalities() {
  const [activeId, setActiveId] = useState<EventMode["id"]>("infantiles");
  const [showCatering, setShowCatering] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const shouldScrollToDetail = useRef(false);
  const activeMode = modes.find((mode) => mode.id === activeId) ?? modes[0];

  useGSAP(() => {
    const detail = root.current?.querySelector<HTMLElement>("[data-event-detail]");
    if (!detail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(detail, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out", overwrite: "auto" });
    gsap.fromTo(detail.querySelectorAll("[data-event-reveal]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055, delay: 0.08, ease: "power2.out", overwrite: "auto" });
  }, { scope: root, dependencies: [activeId] });

  useEffect(() => {
    if (!shouldScrollToDetail.current) return;
    shouldScrollToDetail.current = false;
    detailRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [activeId]);

  function selectMode(id: EventMode["id"]) {
    shouldScrollToDetail.current = true;
    setActiveId(id);
    setShowCatering(false);
  }

  return (
    <div className="event-modalities" ref={root}>
      <section className="section event-selector-section" aria-labelledby="event-selector-title">
        <div className="container">
          <div className="section-heading event-selector-heading">
            <p className="section-kicker">Elegí tu propuesta</p>
            <h2 id="event-selector-title">Cada celebración tiene su propia forma.</h2>
            <p>Seleccioná una modalidad para ver su propuesta completa, sin perderte entre información que no necesitás.</p>
          </div>
          <div className="event-mode-grid" role="tablist" aria-label="Modalidades de eventos TOPA">
            {modes.map((mode) => {
              const isActive = mode.id === activeId;
              return <button className={`event-mode-card ${isActive ? "is-active" : ""}`} type="button" key={mode.id} role="tab" aria-selected={isActive} aria-controls="event-mode-detail" onClick={() => selectMode(mode.id)}>
                <img src={mode.image} alt="" width="960" height="720" style={{ objectPosition: mode.imagePosition }} />
                <span className="event-mode-card-overlay" />
                <span className="event-mode-card-content"><strong>{mode.shortTitle}</strong><small>{mode.description}</small><span>{isActive ? "Propuesta seleccionada" : "Ver propuesta"}</span></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section className="section event-detail-section" id="event-mode-detail" role="tabpanel" aria-label={activeMode.title} data-event-detail ref={detailRef}>
        <div className="container">
          <header className="event-detail-hero" data-event-reveal>
            <div className="event-detail-copy"><p className="section-kicker">{activeMode.title} en TOPA</p><h2>{activeMode.description}</h2>{activeMode.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <img src={activeMode.image} alt={activeMode.imageAlt} width="1200" height="900" />
          </header>
          <section className="event-includes" aria-labelledby="event-includes-title" data-event-reveal>
            <div className="event-section-heading"><p className="section-kicker">Qué incluye</p><h3 id="event-includes-title">Una propuesta pensada de principio a fin.</h3></div>
            <ul className="event-includes-list">{activeMode.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <div className="event-info-grid">{activeMode.sections.map((section) => <article key={section.title} data-event-reveal><h3>{section.title}</h3>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div>
          {activeMode.catering && <div className="event-catering-toggle" data-event-reveal><div><p className="section-kicker">Catering TOPA</p><h3>Opciones ricas para compartir.</h3><p>Pizza libre, chivitos calientes, súper picada, merienda y estación de café para completar el festejo.</p></div><button className="button button-secondary" type="button" aria-expanded={showCatering} onClick={() => setShowCatering((visible) => !visible)}>{showCatering ? "Cerrar opciones de catering" : "Ver opciones de catering"}</button></div>}
          {activeMode.catering && showCatering && <section className="event-catering-drawer" aria-label="Opciones de catering TOPA" data-event-reveal><FoodGallery name="el catering de TOPA" categories={foodGalleryCategories} /></section>}
          <section className="event-contact-card" data-event-reveal><div><p className="section-kicker">Hablemos de tu evento</p><h3>{activeMode.contactTitle}</h3>{activeMode.contactCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><a className="button button-primary" href={whatsappUrl(activeMode.whatsappText)} target="_blank" rel="noreferrer">{activeMode.contactLabel}</a></section>
        </div>
      </section>
    </div>
  );
}
