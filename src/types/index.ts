/* ------------------------------------------------------------------
   Menú
   Una categoría (ej. "Menú del día") contiene varias tarjetas (Dish).
   En el menú del día, cada Dish es un día de la semana.
------------------------------------------------------------------- */

/** Bloque dentro de una tarjeta: "Plato principal", "Sopa", etc. */
export interface MenuSection {
  title: string;
  items: string[];
}

export interface Dish {
  id: string;
  title: string; // ej. "Lunes"
  sections: MenuSection[];
  price: number; // pesos colombianos (COP)
  /** 0 = domingo ... 6 = sábado. Sirve para resaltar la tarjeta de "Hoy". */
  weekday?: number;
}

export interface MenuCategory {
  id: string;
  name: string; // ej. "Menú del día"
  eyebrow: string; // sobretítulo de la sección
  description: string;
  note?: string; // aviso al pie de la sección
  dishes: Dish[];
}

/* ------------------------------------------------------------------
   Resto del sitio
------------------------------------------------------------------- */

export interface Testimonial {
  id: string;
  name: string;
  detail: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface OpeningSlot {
  label: string; // texto visible, ej. "Lunes a jueves"
  days: number[]; // 0 = domingo ... 6 = sábado
  open: string; // "11:00"
  close: string; // "22:00"
}

export interface SiteInfo {
  name: string;
  type: string;
  tagline: string;
  heroText: string;
  description: string;
  foundedYear: number;
  heroImage?: string; // foto de fondo del Hero (opcional)
  address: string;
  phoneDisplay: string;
  phoneLink: string;
  whatsappNumber: string; // con indicativo, sin +
  mapsUrl: string;
  mapsEmbedUrl: string;
  hours: OpeningSlot[];
  social: { label: string; href: string }[];
}