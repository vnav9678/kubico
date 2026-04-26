import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import type { Product } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

const products = productsData as Product[];
const featuredProducts = products.filter(p => p.featured).slice(0, 4);

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="3" width="8" height="8" rx="1" />
        <rect x="14" y="3" width="8" height="8" rx="1" />
        <rect x="2" y="13" width="8" height="8" rx="1" />
        <rect x="14" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
    title: 'Diseño modular',
    desc: 'Cada jardinera Kubico encaja sin herramientas. Combina y mezcla unidades para crear el jardín ideal.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Madera sostenible',
    desc: 'Toda la madera está certificada FSC y proviene de bosques gestionados. Plantamos dos árboles por cada pedido.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    title: 'Totalmente configurable',
    desc: 'Elige tu tamaño, acabado y accesorios con nuestro configurador en línea. Obtén un presupuesto al instante.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 010 1.4l-8 8a1 1 0 01-.4.25l-4 1a1 1 0 01-1.25-1.25l1-4a1 1 0 01.25-.4l8-8a1 1 0 011.4 0z" />
        <path d="M21 21H3" />
      </svg>
    ),
    title: 'Montaje sencillo',
    desc: 'Piezas pretaladradas y numeradas con una guía clara permiten montar la mayoría de camas en menos de 30 minutos.',
  },
];

const categories = [
  {
    name: 'Camas de cultivo',
    description: 'Cultivo en profundidad para verduras, hierbas y flores',
    color: '#8B5E3C',
    accent: '#2D6A4F',
  },
  {
    name: 'Jardineras de pared',
    description: 'Convierte superficies verticales en paredes verdes vivas',
    color: '#2D6A4F',
    accent: '#40916C',
  },
  {
    name: 'Unidades de esquina',
    description: 'Aprovecha al máximo los rincones con camas en forma de L',
    color: '#374151',
    accent: '#8B5E3C',
  },
  {
    name: 'Accesorios',
    description: 'Enrejados, kits de riego, ruedas y mucho más',
    color: '#40916C',
    accent: '#F8F5F0',
  },
];

const testimonials = [
  {
    text: 'Monté dos camas medianas en una tarde. Las instrucciones eran clarísimas y la calidad de la madera es excepcional. ¡Mis tomates nunca habían estado tan contentos!',
    author: 'Sara M.',
    location: 'Ámsterdam, Países Bajos',
  },
  {
    text: 'La unidad de esquina transformó un rincón muerto de mi terraza en el punto focal del jardín. Los vecinos no paran de preguntarme dónde la compré.',
    author: 'David K.',
    location: 'Berlín, Alemania',
  },
  {
    text: 'Pedí la cama XL para mi huerto. La entrega fue rápida, el embalaje era libre de plástico y el acabado Carbón queda espectacular. Muy recomendable.',
    author: 'Priya L.',
    location: 'Londres, Reino Unido',
  },
];

function CategorySVG({ color, accent, name }: { color: string; accent: string; name: string }) {
  return (
    <svg width="100%" height="160" viewBox="0 0 300 160" aria-label={name} role="img">
      <rect width="300" height="160" fill="#F0EBE3" />
      <rect x="40" y="30" width="220" height="100" rx="8" fill={color} opacity="0.15" />
      <rect x="60" y="50" width="80" height="60" rx="4" fill={color} opacity="0.8" />
      <rect x="160" y="50" width="80" height="60" rx="4" fill={accent} opacity="0.8" />
      <rect x="110" y="70" width="80" height="40" rx="4" fill={color} opacity="0.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B4332] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Cultiva tu mundo,{' '}
              <span className="text-[#40916C]">bloque a bloque</span>
            </h1>
            <p className="text-lg md:text-xl text-green-200 mb-8 leading-relaxed">
              Las jardineras modulares de Kubico te permiten diseñar el jardín perfecto — desde una sola cama de hierbas
              hasta un huerto completo — con madera de origen sostenible que dura años.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button variant="primary" size="lg" className="bg-[#40916C] hover:bg-[#2D6A4F] border-transparent text-white">
                  Ver tienda
                </Button>
              </Link>
              <Link to="/configurator">
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#1B4332]">
                  Diseña el tuyo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#374151] mb-4">
            ¿Por qué elegir Kubico?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Creamos jardineras que crecen contigo — modulares, sostenibles y diseñadas para durar toda la vida.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(f => (
              <div key={f.title} className="text-center p-6 rounded-xl bg-[#F8F5F0]">
                <div className="flex justify-center mb-4 text-[#2D6A4F]">{f.icon}</div>
                <h3 className="font-semibold text-[#374151] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#374151] mb-4">
            Explorar por categoría
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Desde jardineras de pared compactas hasta camas de cultivo de gran tamaño — hay un Kubico para cada espacio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <CategorySVG color={cat.color} accent={cat.accent} name={cat.name} />
                <div className="p-4">
                  <h3 className="font-semibold text-[#374151] group-hover:text-[#2D6A4F] transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#374151] mb-2">Jardineras destacadas</h2>
                <p className="text-gray-500">Nuestra selección más popular, elegida para ti.</p>
              </div>
              <Link to="/catalog" className="hidden md:block text-sm font-medium text-[#2D6A4F] hover:underline">
                Ver todo &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Card key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link to="/catalog">
                <Button variant="ghost">Ver todos los productos</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#374151] mb-4">
            La elección de los jardineros
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Miles de clientes satisfechos en toda Europa. Esto es lo que dicen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.author} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#2D6A4F" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm text-[#374151]">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#2D6A4F] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para empezar a cultivar?
          </h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Usa nuestro configurador gratuito para diseñar tu setup perfecto y obtener un presupuesto al instante.
          </p>
          <Link to="/configurator">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#2D6A4F]">
              Abrir configurador
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
