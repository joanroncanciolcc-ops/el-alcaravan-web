import { formatCOP } from '../../lib/format';
import type { Dish } from '../../types';

interface DishCardProps {
  dish: Dish;
  /** Resalta la tarjeta con la etiqueta "Hoy" */
  isToday?: boolean;
}

export default function DishCard({ dish, isToday = false }: DishCardProps) {
  return (
    <article
      aria-label={`Menú del ${dish.title}`}
      className={`group relative flex h-full flex-col rounded-2xl border bg-carbon-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-dorado-soft md:p-8 ${
        isToday
          ? 'border-brasa-500 shadow-[0_18px_50px_-24px_rgba(232,89,12,0.55)]'
          : 'border-carbon-700'
      }`}
    >
      {isToday && (
        <span className="absolute -top-3 left-7 rounded-full bg-brasa-500 px-3 py-1 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-carbon-950">
          Hoy
        </span>
      )}

      {/* Día y precio */}
      <header className="flex items-start justify-between gap-4">
        <h3 className="font-display text-3xl font-bold text-crema-50">{dish.title}</h3>
        <p className="text-right">
          <span className="block font-accent text-3xl font-semibold leading-none text-dorado">
            {formatCOP(dish.price)}
          </span>
          <span className="mt-1 block font-accent text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-humo-400">
            Almuerzo
          </span>
        </p>
      </header>

      <span aria-hidden="true" className="mt-5 block h-px w-full bg-carbon-700" />

      {/* Bloques: sopa, plato principal... */}
      <div className="mt-6 flex-1 space-y-6">
        {dish.sections.map((section) => (
          <section key={section.title}>
            <h4 className="font-accent text-sm font-semibold uppercase tracking-[0.3em] text-brasa-400">
              {section.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-crema-200">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-dorado"
                  />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}