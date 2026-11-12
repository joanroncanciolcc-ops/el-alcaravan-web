import type { MenuCategory } from '../types';

/* ------------------------------------------------------------------
   Menú del restaurante (contenido estático).
   Para cambiar un plato o un precio, edita este archivo y guarda.

   - Lunes, martes y miércoles: datos reales del restaurante.
   - Jueves y viernes: menús de ejemplo (TODO: reemplazar por los reales).
   - Precios: de ejemplo, en pesos colombianos (TODO: confirmar).
   - weekday: 0 = domingo ... 6 = sábado (resalta la tarjeta de "Hoy").
------------------------------------------------------------------- */

export const menuCategories: MenuCategory[] = [
  {
    id: 'menu-del-dia',
    name: 'Menú del día',
    eyebrow: 'Cocina colombiana',
    description:
      'Almuerzo corriente y ejecutivo, preparado cada día con sazón casera. Sopa y plato principal incluidos.',
    note: 'Valores en pesos colombianos. El menú puede variar según la disponibilidad del día.',
    dishes: [
      {
        id: 'lunes',
        title: 'Lunes',
        weekday: 1,
        price: 15000,
        sections: [
          { title: 'Sopa', items: ['Sopa de arroz'] },
          { title: 'Plato principal', items: ['Lenteja', 'Coliflor', 'Tarta de banano'] },
        ],
      },
      {
        id: 'martes',
        title: 'Martes',
        weekday: 2,
        price: 15000,
        sections: [
          { title: 'Sopa', items: ['Sopa de cuchuco'] },
          { title: 'Plato principal', items: ['Frijoles', 'Pasta'] },
        ],
      },
      {
        id: 'miercoles',
        title: 'Miércoles',
        weekday: 3,
        price: 16000,
        sections: [
          { title: 'Sopa', items: ['Sopa de pasta'] },
          {
            title: 'Plato principal',
            items: ['Garbanzo', 'Mazorca', 'Huevo', 'Tarta de maracuyá'],
          },
        ],
      },
      {
        // TODO: menú de ejemplo, reemplazar por el real
        id: 'jueves',
        title: 'Jueves',
        weekday: 4,
        price: 15000,
        sections: [
          { title: 'Sopa', items: ['Sopa de verduras'] },
          {
            title: 'Plato principal',
            items: ['Arveja', 'Papa criolla', 'Plátano maduro', 'Tarta de mora'],
          },
        ],
      },
      {
        // TODO: menú de ejemplo, reemplazar por el real
        id: 'viernes',
        title: 'Viernes',
        weekday: 5,
        price: 17000,
        sections: [
          { title: 'Sopa', items: ['Sopa de ahuyama'] },
          {
            title: 'Plato principal',
            items: ['Arroz con pollo', 'Ensalada fresca', 'Yuca frita', 'Tarta de coco'],
          },
        ],
      },
    ],
  },
];