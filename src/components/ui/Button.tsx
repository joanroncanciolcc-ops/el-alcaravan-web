import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
type Size = 'md' | 'lg' | 'icon';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  'aria-label'?: string;
}

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-accent font-semibold uppercase tracking-[0.18em] transition-all duration-300';

const variants: Record<Variant, string> = {
  primary:
    'bg-brasa-500 text-carbon-950 shadow-[0_10px_28px_-10px_rgba(232,89,12,0.75)] hover:-translate-y-0.5 hover:bg-brasa-400',
  secondary:
    'border border-crema-50/50 text-crema-50 hover:border-crema-50 hover:bg-crema-50 hover:text-carbon-950',
  whatsapp:
    'border border-crema-50/40 bg-carbon-950/40 text-crema-50 backdrop-blur-sm hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366] hover:text-carbon-950',
  ghost: 'text-brasa-400 hover:text-dorado',
};

const sizes: Record<Size, string> = {
  md: 'min-h-[48px] px-6 text-sm',
  lg: 'min-h-[56px] px-8 text-base',
  icon: 'h-12 w-12',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ---------- Iconos compartidos ---------- */

interface IconProps {
  className?: string;
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FlameIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.6 2c.9 3.2-.9 4.8-2.4 6.8C8.8 10.6 7.5 12.2 7.5 14.6a4.9 4.9 0 0 0 9.8 0c0-2-.9-3.4-2-4.6-.1 1.3-.7 2.2-1.6 2.7.7-3.2-.2-6.6-1.1-10.7Z" />
    </svg>
  );
}