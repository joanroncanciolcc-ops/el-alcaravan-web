import type { ReactNode } from 'react';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import { site } from '../../data/site';

/* ------------------------------------------------------------------
   Mapa de Google Maps
   Se muestra el mapa incrustado si `site.mapsEmbedUrl` tiene una URL.
   Si está vacía, se muestra un marcador temporal.

   TODO: reemplazar por URL real de Google Maps.
   Cómo obtenerla: Google Maps > buscar el restaurante > Compartir >
   "Insertar un mapa" > copiar solo el valor del atributo src="..."
   y pegarlo en `mapsEmbedUrl` dentro de src/data/site.ts.
------------------------------------------------------------------- */
const MAP_EMBED_URL: string = site.mapsEmbedUrl;

/* Días en que el restaurante NO abre (los festivos no se detectan solos).
   TODO: si cambia el horario, actualizar este texto. */
const CLOSED_LABEL = 'Sábados, domingos y festivos';

/** "15:30" -> "3:30 p. m." */
function formatTime(value: string): string {
  const [hours, minutes] = value.split(':').map(Number);
  const suffix = hours >= 12 ? 'p. m.' : 'a. m.';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

/* ---------- Iconos ---------- */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-5 w-5',
  'aria-hidden': true,
};

function PinIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className ?? iconProps.className}>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** Etiqueta pequeña con icono para cada bloque de la tarjeta */
function InfoLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-accent text-sm font-semibold uppercase tracking-[0.3em] text-dorado">
      {icon}
      {children}
    </p>
  );
}

export default function Location() {
  const today = new Date().getDay(); // 0 = domingo ... 6 = sábado
  // Hoy es un día sin servicio si ningún horario lo incluye (sábado o domingo)
  const closedToday = !site.hours.some((slot) => slot.days.includes(today));

  return (
    <section
      id="ubicacion"
      aria-labelledby="ubicacion-titulo"
      className="relative overflow-hidden bg-crema-50 py-20 text-carbon-950 md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          id="ubicacion-titulo"
          eyebrow="Ubicación"
          title="Visítanos"
          description="Te esperamos con la brasa encendida y una mesa lista para ti."
          tone="light"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Información (primero en móvil) ---------- */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="h-full rounded-2xl bg-carbon-950 p-7 text-crema-50 shadow-2xl shadow-carbon-950/25 md:p-9">
              {/* Dirección */}
              <InfoLabel icon={<PinIcon />}>Dirección</InfoLabel>
              <address className="mt-3 font-display text-2xl font-bold not-italic leading-snug md:text-3xl">
                {site.address}
              </address>

              <Button
                href={site.mapsUrl}
                external
                size="md"
                className="mt-6 w-full sm:w-auto"
              >
                Abrir en Google Maps
              </Button>

              <span aria-hidden="true" className="my-8 block h-px w-full bg-carbon-700" />

              {/* Teléfono */}
              <InfoLabel icon={<PhoneIcon />}>Teléfono</InfoLabel>
              <a
                href={`tel:${site.phoneLink}`}
                className="mt-3 inline-block font-accent text-2xl font-semibold tracking-wide text-crema-50 underline-offset-4 transition-colors hover:text-brasa-400 hover:underline"
              >
                {site.phoneDisplay}
              </a>

              <span aria-hidden="true" className="my-8 block h-px w-full bg-carbon-700" />

              {/* Horarios */}
              <InfoLabel icon={<ClockIcon />}>Horarios</InfoLabel>
              <ul className="mt-4 space-y-3">
                {site.hours.map((slot) => {
                  const isToday = slot.days.includes(today);
                  return (
                    <li
                      key={slot.label}
                      className="flex flex-col gap-1"
                    >
                      <span
                        className={`flex items-center gap-2 ${
                          isToday ? 'font-semibold text-brasa-400' : 'text-crema-200'
                        }`}
                      >
                        {slot.label}
                        {isToday && (
                          <span className="rounded-full bg-brasa-500 px-2 py-0.5 font-accent text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-carbon-950">
                            Hoy
                          </span>
                        )}
                      </span>
                      <span className={isToday ? 'text-crema-50' : 'text-humo-400'}>
                        {formatTime(slot.open)} – {formatTime(slot.close)}
                      </span>
                    </li>
                  );
                })}

                {/* Días sin servicio */}
                <li className="flex flex-col gap-1">
                  <span
                    className={`flex items-center gap-2 ${
                      closedToday ? 'font-semibold text-brasa-400' : 'text-crema-200'
                    }`}
                  >
                    {CLOSED_LABEL}
                    {closedToday && (
                      <span className="rounded-full bg-brasa-500 px-2 py-0.5 font-accent text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-carbon-950">
                        Hoy
                      </span>
                    )}
                  </span>
                  <span className={closedToday ? 'text-crema-50' : 'text-humo-400'}>Cerrado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- Mapa ---------- */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="relative h-full pb-4 pr-4">
              {/* Marco dorado desplazado */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-4 right-0 top-4 rounded-2xl border border-dorado"
              />

              <div className="relative h-full min-h-[340px] overflow-hidden rounded-2xl bg-carbon-900 shadow-2xl shadow-carbon-950/25 md:min-h-[460px]">
                {MAP_EMBED_URL ? (
                  <iframe
                    src={MAP_EMBED_URL}
                    title={`Mapa de ubicación de ${site.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  /* MARCADOR TEMPORAL: TODO reemplazar por URL real de Google Maps */
                  <div className="absolute inset-0 grid place-items-center p-5 text-center sm:p-8">
                    <div aria-hidden="true" className="absolute inset-0">
                      <div className="hero-grate absolute inset-0" />
                      <div className="hero-glow absolute inset-0" />
                      <div className="grain absolute inset-0" />
                    </div>
                    <div className="relative">
                      <PinIcon className="mx-auto h-14 w-14 text-brasa-500" />
                      <p className="mt-4 font-display text-xl font-bold text-crema-50 sm:text-2xl">
                        {site.address}
                      </p>
                      <p className="mt-3 inline-block rounded-full border border-dorado-soft px-4 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.25em] text-dorado">
                        Mapa temporal · TODO: URL real de Google Maps
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}