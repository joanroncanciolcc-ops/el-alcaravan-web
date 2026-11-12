interface SectionHeadingProps {
  /** Sobretítulo pequeño en mayúsculas */
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  /** dark = sobre fondo carbón · light = sobre fondo crema */
  tone?: 'dark' | 'light';
  /** id del <h2>, para enlazarlo con aria-labelledby en la sección */
  id?: string;
}

const tones = {
  dark: {
    eyebrow: 'text-dorado',
    title: 'text-crema-50',
    text: 'text-humo-400',
  },
  light: {
    eyebrow: 'text-ceniza-700',
    title: 'text-carbon-950',
    text: 'text-carbon-700',
  },
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  id,
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const colors = tones[tone];

  return (
    <header className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`flex items-center gap-4 font-accent text-sm font-semibold uppercase tracking-[0.35em] ${colors.eyebrow} ${
          isCenter ? 'justify-center' : ''
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
        {eyebrow}
      </p>

      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-bold leading-[1.1] md:text-5xl ${colors.title}`}
      >
        {title}
      </h2>

      {description && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${colors.text}`}>{description}</p>
      )}
    </header>
  );
}