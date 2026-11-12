import Button, { FlameIcon, WhatsAppIcon } from '../ui/Button';
import { site } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';

// Brasas que suben: posición, tamaño (px), retraso y duración (s)
const embers = [
  { left: '4%', size: 3, delay: 0, duration: 7 },
  { left: '11%', size: 2, delay: 2.4, duration: 9 },
  { left: '18%', size: 4, delay: 4.1, duration: 8 },
  { left: '26%', size: 2, delay: 1.2, duration: 10 },
  { left: '34%', size: 3, delay: 5.5, duration: 7.5 },
  { left: '42%', size: 2, delay: 3.3, duration: 9.5 },
  { left: '51%', size: 4, delay: 0.8, duration: 8.5 },
  { left: '59%', size: 2, delay: 6.2, duration: 10 },
  { left: '67%', size: 3, delay: 2.9, duration: 7 },
  { left: '75%', size: 2, delay: 4.7, duration: 9 },
  { left: '83%', size: 4, delay: 1.7, duration: 8 },
  { left: '91%', size: 3, delay: 5.1, duration: 7.5 },
  { left: '96%', size: 2, delay: 3.8, duration: 10 },
];

export default function Hero() {
  const years = new Date().getFullYear() - site.foundedYear;

  const facts = [
    { value: '100%', label: 'Brasa de carbón' },
    { value: '24 h', label: 'De marinado' },
    { value: `+${years}`, label: 'Años de tradición' },
  ];

  return (
    <section
      id="inicio"
      aria-label="Bienvenida"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-carbon-950"
    >
      {/* ---------- Fondo ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {site.heroImage && (
          <img
            src={site.heroImage}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-950/80 via-carbon-950/40 to-carbon-950/90" />
        <div className="hero-grate absolute inset-0" />
        <div className="hero-glow animate-glow absolute inset-0" />
        <div className="grain absolute inset-0" />

        {/* Brasas */}
        <div className="absolute inset-0 motion-reduce:hidden">
          {embers.map((ember, index) => (
            <span
              key={index}
              className="absolute bottom-0 animate-ember rounded-full bg-brasa-400 shadow-[0_0_10px_2px_rgba(255,122,26,0.6)]"
              style={{
                left: ember.left,
                width: ember.size,
                height: ember.size,
                opacity: 0,
                animationDelay: `${ember.delay}s`,
                animationDuration: `${ember.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Marco fino (tablet y escritorio) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-10 hidden border border-crema-50/10 md:block lg:inset-5"
      />

      {/* ---------- Contenido ---------- */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-14 pt-32 text-center md:px-14 md:text-left">
        <p
          className="flex animate-fade-up items-center justify-center gap-4 font-accent text-sm font-semibold uppercase tracking-[0.4em] text-dorado md:justify-start md:text-base"
          style={{ animationDelay: '100ms' }}
        >
          <span aria-hidden="true" className="h-px w-8 bg-dorado md:w-12" />
          {site.type}
          <span aria-hidden="true" className="h-px w-8 bg-dorado md:hidden" />
        </p>

        <h1
          className="mt-6 animate-fade-up font-display font-extrabold leading-[0.95] text-crema-50 text-shadow-soft"
          style={{ animationDelay: '250ms' }}
        >
          <span className="block font-accent text-xl font-semibold tracking-[0.55em] text-brasa-500 md:text-3xl">
            EL
          </span>
          <span className="mt-2 block text-[clamp(2.6rem,12.5vw,9rem)] tracking-[0.02em]">
            ALCARAVÁN
          </span>
        </h1>

        <p
          className="mt-6 animate-fade-up font-display text-2xl italic text-crema-200 text-shadow-soft md:text-4xl"
          style={{ animationDelay: '450ms' }}
        >
          {site.tagline}
        </p>

        <p
          className="mx-auto mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-crema-50/75 md:mx-0 md:text-lg"
          style={{ animationDelay: '550ms' }}
        >
          {site.heroText}
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-col items-stretch gap-4 sm:flex-row sm:justify-center md:justify-start"
          style={{ animationDelay: '700ms' }}
        >
          <Button href="#menu" size="lg">
            Ver menú
          </Button>
            <Button href={buildWhatsAppLink()} external variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366] transition-colors group-hover:text-carbon-950" />
            Solicitar información
          </Button>
        </div>
      </div>

      {/* ---------- Sello giratorio (solo escritorio grande) ---------- */}
      <div
        aria-hidden="true"
        className="absolute bottom-36 right-14 z-20 hidden text-dorado lg:block"
      >
        <svg viewBox="0 0 200 200" className="h-40 w-40">
          <defs>
            <path
              id="seal-circle"
              d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
            />
          </defs>
          <g
            className="animate-[spin_40s_linear_infinite]"
            style={{ transformOrigin: '100px 100px' }}
          >
            <text
              fill="currentColor"
              fontSize="13"
              className="font-accent font-semibold uppercase"
            >
              <textPath href="#seal-circle" textLength="470" lengthAdjust="spacing">
                Al carbón · Tradición · Sabor ·{' '}
              </textPath>
            </text>
          </g>
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" opacity="0.35" />
        </svg>
        <FlameIcon className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-brasa-500" />
      </div>

      {/* ---------- Franja de datos ---------- */}
      <div className="relative z-20 border-t border-crema-50/10 bg-carbon-950/70 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <ul className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-crema-50/10 px-2 md:px-14">
          {facts.map((fact) => (
            <li key={fact.label} className="px-2 py-5 text-center md:py-6 md:text-left md:first:pl-0 md:pl-8">
              <p className="font-display text-2xl font-bold text-dorado md:text-4xl">
                {fact.value}
              </p>
              <p className="mt-1 font-accent text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-humo-400 md:text-sm">
                {fact.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}