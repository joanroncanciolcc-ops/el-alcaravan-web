import type { ReactNode } from 'react';
import Button, { FlameIcon } from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import { site } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';

/* ------------------------------------------------------------------
   Contenido de la sección.
   TODO: reemplazar los textos por la historia real del restaurante.
   Para usar una foto real, guárdala en src/assets/images/about/ y
   pásala como prop desde App.tsx:  <About image={aboutImage} />
------------------------------------------------------------------- */

const story = [
  'En El Alcaraván cocinamos como se hace en casa: sin afanes y con el fuego como protagonista. Cada pollo, cada costilla y cada corte pasa horas marinando antes de llegar a la parrilla.',
  'Trabajamos con carbón de verdad y con ingredientes escogidos cada día, porque el sabor a la brasa no se imita. Es el resultado de la paciencia, la experiencia y el cuidado por cada detalle.',
];

const quote = 'La brasa no se apura. Se respeta, y el plato lo agradece.';

interface Value {
  title: string;
  text: string;
  icon: ReactNode;
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6',
  'aria-hidden': true,
};

const values: Value[] = [
  {
    title: 'Brasa de carbón',
    text: 'Cocinamos despacio sobre carbón, sin atajos. El fuego marca el sabor.',
    icon: <FlameIcon className="h-6 w-6" />,
  },
  {
    title: 'Ingredientes selectos',
    text: 'Carnes y productos frescos, escogidos cada día y marinados con tiempo.',
    icon: (
      <svg {...iconProps}>
        <path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Z" />
        <path d="M5 19c3-4 6-7 10-9" />
      </svg>
    ),
  },
  {
    title: 'Tradición y oficio',
    text: 'Recetas y técnicas que se heredan y se afinan con los años.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M8.5 11.5 7 20l5-2.5 5 2.5-1.5-8.5" />
      </svg>
    ),
  },
  {
    title: 'Ambiente familiar',
    text: 'Una mesa amplia para compartir, con atención cercana y cálida.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    ),
  },
];

/** Cuántos días distintos de la semana abre el restaurante, según site.hours */
const openDays = new Set(site.hours.flatMap((slot) => slot.days)).size;

interface AboutProps {
  /** Foto del asador o del local (opcional). Sin foto se muestra un marcador oscuro. */
  image?: string;
}

export default function About({ image }: AboutProps) {
  const years = new Date().getFullYear() - site.foundedYear;

  const stats = [
    { value: `+${years}`, label: 'Años de tradición' },
    { value: '100%', label: 'A la brasa' },
    { value: `${openDays} días`, label: 'Abierto cada semana' },
  ];

  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-titulo"
      className="relative overflow-hidden bg-crema-50 py-20 text-carbon-950 md:py-28"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* ---------- Imagen ---------- */}
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative pb-4 pr-4">
            {/* Marco dorado desplazado */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-dorado"
            />

            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-carbon-900 shadow-2xl shadow-carbon-950/30">
              {image ? (
                <img
                  src={image}
                  alt="Parrilla de El Alcaraván con brasas encendidas"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0">
                  <div className="hero-grate absolute inset-0" />
                  <div className="hero-glow absolute inset-0" />
                  <div className="grain absolute inset-0" />
                  <div className="absolute inset-0 grid place-items-center text-brasa-500">
                    <FlameIcon className="h-24 w-24 opacity-90 md:h-28 md:w-28" />
                  </div>
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-carbon-950/70 via-transparent to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.35em] text-dorado">
                  Desde {site.foundedYear}
                </p>
                <p className="mt-1 font-display text-2xl font-bold italic text-crema-50">
                  Fuego, paciencia y sazón.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ---------- Texto ---------- */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="nosotros-titulo"
            eyebrow="Nuestra historia"
            title="Tradición que se cocina a fuego lento"
            align="left"
            tone="light"
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-carbon-700 md:text-lg">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-brasa-500 pl-5 font-display text-xl italic leading-snug text-carbon-950 md:text-2xl">
            “{quote}”
          </blockquote>

          {/* Valores */}
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {values.map((value) => (
              <li key={value.title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-carbon-950 text-brasa-400">
                  {value.icon}
                </span>
                <div>
                  <h3 className="font-accent text-lg font-semibold uppercase tracking-[0.12em] text-carbon-950">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-carbon-700 md:text-base">
                    {value.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Cifras */}
          <dl className="mt-10 grid grid-cols-3 divide-x divide-carbon-950/15 border-y border-carbon-950/15">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 py-5 text-center sm:px-6 sm:text-left">
                <dd className="font-display text-2xl font-bold text-ceniza-700 md:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-accent text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-carbon-700 md:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Acciones */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={buildWhatsAppLink()} external size="lg">
              Más información
            </Button>
            <a
              href="#menu"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-carbon-950/40 px-8 font-accent text-base font-semibold uppercase tracking-[0.18em] text-carbon-950 transition-colors duration-300 hover:border-carbon-950 hover:bg-carbon-950 hover:text-crema-50"
            >
              Ver menú
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}