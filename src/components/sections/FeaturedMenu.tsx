import Button from '../ui/Button';
import DishCard from '../ui/DishCard';
import SectionHeading from '../ui/SectionHeading';
import { menuCategories } from '../../data/menu';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export default function FeaturedMenu() {
  const today = new Date().getDay(); // 0 = domingo ... 6 = sábado

  return (
    <section
      id="menu"
      aria-labelledby="menu-titulo"
      className="relative overflow-hidden bg-carbon-950 py-20 md:py-28"
    >
      {/* Resplandor tenue */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute inset-0 opacity-60" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {menuCategories.map((category, index) => (
          <div key={category.id} className={index > 0 ? 'mt-24' : ''}>
            <SectionHeading
              id={index === 0 ? 'menu-titulo' : undefined}
              eyebrow={category.eyebrow}
              title={category.name}
              description={category.description}
            />

            <div className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-10">
              {category.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <DishCard dish={dish} isToday={dish.weekday === today} />
                </div>
              ))}
            </div>

            {category.note && (
              <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-humo-400">
                {category.note}
              </p>
            )}
          </div>
        ))}

        {/* Contacto */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-crema-200">¿Quieres saber más sobre nuestro menú?</p>
          <Button href={buildWhatsAppLink()} external variant="secondary" size="lg">
            Más información
          </Button>
        </div>
      </div>
    </section>
  );
}