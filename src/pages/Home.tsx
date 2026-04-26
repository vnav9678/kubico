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
    title: 'Modular Design',
    desc: 'Every Kubico planter snaps together without tools. Mix and match units to create your ideal garden layout.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Sustainably Sourced',
    desc: 'All timber is FSC-certified and sourced from managed forests. We plant two trees for every order placed.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    title: 'Fully Configurable',
    desc: 'Choose your size, finish, and accessories using our online configurator. Get a custom quote instantly.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 010 1.4l-8 8a1 1 0 01-.4.25l-4 1a1 1 0 01-1.25-1.25l1-4a1 1 0 01.25-.4l8-8a1 1 0 011.4 0z" />
        <path d="M21 21H3" />
      </svg>
    ),
    title: 'Easy Assembly',
    desc: 'Pre-drilled, numbered components and a clear guide mean most beds are assembled in under 30 minutes.',
  },
];

const categories = [
  {
    name: 'Raised Beds',
    description: 'Deep-rooted growing for vegetables, herbs, and flowers',
    color: '#8B5E3C',
    accent: '#2D6A4F',
  },
  {
    name: 'Wall Planters',
    description: 'Transform vertical surfaces into living green walls',
    color: '#2D6A4F',
    accent: '#40916C',
  },
  {
    name: 'Corner Units',
    description: 'Make the most of awkward corners with L-shaped beds',
    color: '#374151',
    accent: '#8B5E3C',
  },
  {
    name: 'Accessories',
    description: 'Trellises, irrigation kits, wheels, and more',
    color: '#40916C',
    accent: '#F8F5F0',
  },
];

const testimonials = [
  {
    text: 'I built two medium beds in an afternoon. The instructions were crystal clear and the timber quality is outstanding. My tomatoes have never been happier!',
    author: 'Sarah M.',
    location: 'Amsterdam, NL',
  },
  {
    text: 'The corner unit transformed a dead corner of my terrace into the centrepiece of the garden. Neighbours keep asking where I bought it.',
    author: 'David K.',
    location: 'Berlin, DE',
  },
  {
    text: 'Ordered the XL raised bed for my allotment. Delivery was fast, packaging was plastic-free, and the Charcoal finish looks stunning. Highly recommend.',
    author: 'Priya L.',
    location: 'London, UK',
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
              Grow Your World,{' '}
              <span className="text-[#40916C]">Block by Block</span>
            </h1>
            <p className="text-lg md:text-xl text-green-200 mb-8 leading-relaxed">
              Kubico modular planters let you design the perfect garden setup — from a single herb bed
              to a full kitchen garden — using sustainably sourced timber that lasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button variant="primary" size="lg" className="bg-[#40916C] hover:bg-[#2D6A4F] border-transparent text-white">
                  Shop Now
                </Button>
              </Link>
              <Link to="/configurator">
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#1B4332]">
                  Build Yours
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
            Why Choose Kubico?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            We build planters that grow with you — modular, sustainable, and designed to last a lifetime.
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
            Browse by Category
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            From compact wall planters to estate-sized raised beds — there's a Kubico for every space.
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
                <h2 className="text-2xl md:text-3xl font-bold text-[#374151] mb-2">Featured Planters</h2>
                <p className="text-gray-500">Our most popular picks, hand selected for you.</p>
              </div>
              <Link to="/catalog" className="hidden md:block text-sm font-medium text-[#2D6A4F] hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Card key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link to="/catalog">
                <Button variant="ghost">View all products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#374151] mb-4">
            Loved by Gardeners
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Thousands of happy customers across Europe. Here's what they're saying.
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
            Ready to start growing?
          </h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Use our free configurator to design your perfect setup and get an instant quote.
          </p>
          <Link to="/configurator">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-[#2D6A4F]">
              Open Configurator
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
