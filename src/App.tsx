import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import FeaturedMenu from './components/sections/FeaturedMenu';
import Location from './components/sections/Location';

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brasa-500 focus:px-5 focus:py-3 focus:font-accent focus:font-semibold focus:uppercase focus:text-carbon-950"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <About />
        <FeaturedMenu />
        <Location />
      </main>
    </>
  );
}