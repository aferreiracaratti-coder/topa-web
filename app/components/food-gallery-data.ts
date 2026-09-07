export type FoodGalleryImage = {
  src: string;
  alt: string;
};

export type FoodGalleryCategory = {
  id: string;
  label: string;
  images: FoodGalleryImage[];
};

const meriendaImages: FoodGalleryImage[] = [
  { src: "/assets/topa/food-merienda-buffet.jpeg", alt: "Mesa de merienda preparada por Espacio TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-01.jpeg", alt: "Preparaciones dulces de TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-02.jpeg", alt: "Mesa dulce preparada para compartir" },
  { src: "/assets/topa/food-gallery/pasteleria-03.jpeg", alt: "Propuesta dulce de Espacio TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-04.jpeg", alt: "Pastelería casera de TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-05.jpeg", alt: "Opciones dulces para una merienda" },
  { src: "/assets/topa/food-gallery/pasteleria-06.jpeg", alt: "Mesa de comida para compartir" },
  { src: "/assets/topa/food-gallery/pasteleria-07.jpeg", alt: "Dulces de TOPA listos para disfrutar" },
  { src: "/assets/topa/food-gallery/pasteleria-08.jpeg", alt: "Detalle de una propuesta dulce de TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-09.jpeg", alt: "Merienda preparada por Espacio TOPA" },
  { src: "/assets/topa/food-gallery/pasteleria-10.jpeg", alt: "Variedad de pastelería de TOPA" },
];

const picadaImages: FoodGalleryImage[] = [
  { src: "/assets/topa/picada-eventos.jpg", alt: "Picada TOPA preparada para compartir" },
];

const pizzaImages: FoodGalleryImage[] = [
  { src: "/assets/topa/pizzas-artesanales.jpg", alt: "Pizzas artesanales de TOPA" },
  { src: "/assets/topa/food-pizza-compartir.jpeg", alt: "Pizza preparada para compartir en TOPA" },
];

const chivitoImages: FoodGalleryImage[] = [
  { src: "/assets/topa/food-chivitos-compartir.jpeg", alt: "Chivitos y sándwiches para compartir en TOPA" },
  { src: "/assets/topa/food-gallery/pizzas-01.jpeg", alt: "Ingredientes preparados para chivitos TOPA" },
  { src: "/assets/topa/food-gallery/pizzas-02.jpeg", alt: "Chivitos preparados para compartir" },
  { src: "/assets/topa/food-gallery/pizzas-03.jpeg", alt: "Mesa de chivitos de TOPA" },
  { src: "/assets/topa/food-gallery/pizzas-04.jpeg", alt: "Chivitos calientes listos para servir" },
  { src: "/assets/topa/food-gallery/pizzas-05.jpeg", alt: "Ingredientes frescos para chivitos" },
  { src: "/assets/topa/food-gallery/pizzas-06.jpeg", alt: "Detalle de pan y relleno de chivitos" },
  { src: "/assets/topa/food-gallery/pizzas-07.jpeg", alt: "Mesa preparada para servir chivitos" },
  { src: "/assets/topa/food-gallery/pizzas-08.jpeg", alt: "Fiambres e ingredientes para chivitos" },
];

export const foodGalleryCategories: FoodGalleryCategory[] = [
  { id: "meriendas", label: "Meriendas", images: meriendaImages },
  { id: "picadas", label: "Picada", images: picadaImages },
  { id: "pizzas", label: "Pizza", images: pizzaImages },
  { id: "chivitos", label: "Chivitos", images: chivitoImages },
];
