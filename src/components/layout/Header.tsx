import { useCallback, useEffect, useRef, useState } from 'react';
import MobileMenu from './MobileMenu';
import Button, { FlameIcon, WhatsAppIcon } from '../ui/Button';
import { navigation } from '../../data/navigations';
import { site } from '../../data/site';
import { buildWhatsAppLink } from '../../lib/whatsapp';

function Logo() {
  return (
    <a href="#inicio" aria-label={`${site.name}, ir al inicio`} className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-dorado-soft bg-carbon-950/40 text-brasa-500">
        <FlameIcon className="h-6 w-6" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-[0.08em] text-crema-50 sm:text-xl">
          {site.name.toUpperCase()}
        </span>
        <span className="mt-1 block font-accent text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-dorado">
          {site.type.split(' ')[0]}
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Si la pantalla pasa a escritorio, cierra el menú móvil
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const desktopLinks = navigation.filter((item) => item.id !== 'inicio');

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-crema-50/10 bg-carbon-950/90 py-3 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
          <Logo />

          {/* Navegación escritorio */}
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {desktopLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="relative font-accent text-[0.95rem] font-semibold uppercase tracking-[0.2em] text-crema-50/85 transition-colors hover:text-crema-50 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-dorado after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* WhatsApp: solo icono en móvil, con texto desde sm */}
            <span className="sm:hidden">
              <Button href={buildWhatsAppLink()} external size="icon" aria-label="Contáctanos por WhatsApp">
                <WhatsAppIcon className="h-5 w-5" />
              </Button>
            </span>
            <span className="hidden sm:block">
              <Button href={buildWhatsAppLink()} external size="md">
                <WhatsAppIcon className="h-5 w-5" />
                Contáctanos
              </Button>
            </span>

            {/* Botón hamburguesa */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="grid h-12 w-12 place-items-center rounded-full border border-crema-50/25 text-crema-50 transition hover:border-brasa-400 hover:text-brasa-400 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} items={navigation} />
    </>
  );
}