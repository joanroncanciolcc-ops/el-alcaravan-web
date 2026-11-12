import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import Button, { FlameIcon, WhatsAppIcon } from '../ui/Button';
import { site } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import type { NavItem } from '../../types';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export default function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Bloqueo de scroll, tecla Esc y foco atrapado dentro del menú
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  // Cierra el menú y luego desplaza (el body deja de estar bloqueado)
  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onClose();
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView();
      history.replaceState(null, '', href);
    }, 60);
  };

  return (
    <div
      id="menu-movil"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-carbon-950 transition-[opacity,visibility] duration-300 lg:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {/* Decoración */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-grate absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Barra superior */}
      <div className="relative flex items-center justify-between px-6 py-5">
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-dorado-soft text-brasa-500">
            <FlameIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-crema-50">
            {site.name.toUpperCase()}
          </span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="grid h-12 w-12 place-items-center rounded-full border border-crema-50/20 text-crema-50 transition hover:border-brasa-400 hover:text-brasa-400"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Enlaces */}
      <nav aria-label="Principal" className="relative flex-1 px-6 pt-6">
        <ul>
          {items.map((item, index) => (
            <li key={item.id} className="border-b border-crema-50/10">
              <a
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                style={{ transitionDelay: open ? `${120 + index * 60}ms` : '0ms' }}
                className={`group flex items-baseline gap-4 py-4 transition duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="font-accent text-sm tracking-[0.2em] text-dorado">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl font-bold text-crema-50 transition group-hover:translate-x-1 group-hover:text-brasa-400 sm:text-4xl">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contacto */}
      <div
        className="relative px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
        style={{ transitionDelay: open ? '520ms' : '0ms' }}
      >
        <p className="font-accent text-xs uppercase tracking-[0.3em] text-dorado">Visítanos</p>
        <p className="mt-2 text-crema-200">{site.address}</p>
        <a
          href={`tel:${site.phoneLink}`}
          className="mt-1 inline-block text-crema-50 underline-offset-4 hover:text-brasa-400 hover:underline"
        >
          {site.phoneDisplay}
        </a>
        <Button href={buildWhatsAppLink()} external size="lg" className="mt-6 w-full">
          <WhatsAppIcon className="h-5 w-5" />
          Contáctanos
        </Button>
      </div>
    </div>
  );
}