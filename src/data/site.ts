import type { SiteInfo } from '../types';

// Cuando tengas la foto del Hero, guárdala en src/assets/images/hero/
// y descomenta la siguiente línea y la propiedad `heroImage` de abajo:
// import heroImage from '../assets/images/hero/hero.webp';

// TODO: añade la ciudad a la búsqueda para que Google Maps ubique el punto exacto
const mapsQuery = encodeURIComponent('El Alcaraván Asadero Restaurante, Avenida Calle 11 Sur #7-44');

export const site: SiteInfo = {
  name: 'El Alcaraván',
  type: 'Asadero Restaurante',
  tagline: 'El auténtico sabor a la brasa.',
  heroText:
    'Pollo, costillas y carnes cocinadas despacio sobre brasa de carbón, con el sazón de la cocina colombiana.',
  description:
    'Asadero restaurante con pollo asado, costillas BBQ y carnes a la parrilla cocinados a la brasa.',
  // TODO: año real de fundación
  foundedYear: 2004,
  // heroImage,
  heroImage: undefined,
  address: 'Avenida Calle 11 Sur #7-44',
  // TODO: teléfono real
  phoneDisplay: '+57 300 000 0000',
  phoneLink: '+573000000000',
  // TODO: WhatsApp real (indicativo + número, sin +)
  whatsappNumber: '573000000000',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  // Horario real: lunes a viernes. No abre sábados, domingos ni festivos.
  // days: 0 = domingo ... 6 = sábado. Formato 24 h ("15:30" = 3:30 p. m.).
  hours: [
    { label: 'Lunes a viernes', days: [1, 2, 3, 4, 5], open: '11:30', close: '15:30' },
  ],
  // TODO: redes reales
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'TikTok', href: 'https://tiktok.com/' },
  ],
};