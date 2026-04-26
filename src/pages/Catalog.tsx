import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import type { Product } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

const allProducts = productsData as Product[];

const categories = ['Camas de cultivo', 'Jardineras de pared', 'Unidades de esquina', 'Accesorios'] as const;
const sizes = ['S', 'M', 'L', 'XL'] as const;
const allFinishes = Array.from(new Set(allProducts.flatMap(p => p.finishes))).sort();

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedFinish = searchParams.get('finish') || '';
  const minPrice = Number(searchParams.get('minPrice') || '0');
  const maxPrice = Number(searchParams.get('maxPrice') || '1000');

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
  }

  const filtered = allProducts.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedSize && p.size !== selectedSize) return false;
    if (selectedFinish && !p.finishes.includes(selectedFinish)) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    return true;
  });

  const hasFilters = selectedCategory || selectedSize || selectedFinish || minPrice > 0 || maxPrice < 1000;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#374151]">Filtros</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#2D6A4F] hover:underline font-medium"
          >
            Borrar todo
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-medium text-[#374151] mb-3">Categoría</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setParam('category', selectedCategory === cat ? '' : cat)}
                className="accent-[#2D6A4F]"
              />
              <span className="text-sm text-gray-600">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-medium text-[#374151] mb-3">Talla</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(sz => (
            <button
              key={sz}
              onClick={() => setParam('size', selectedSize === sz ? '' : sz)}
              className={`px-3 py-1 rounded-md text-sm border font-medium transition-colors ${
                selectedSize === sz
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                  : 'bg-white text-[#374151] border-gray-300 hover:border-[#2D6A4F]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div>
        <h3 className="text-sm font-medium text-[#374151] mb-3">Acabado</h3>
        <select
          value={selectedFinish}
          onChange={e => setParam('finish', e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
        >
          <option value="">Todos los acabados</option>
          {allFinishes.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-medium text-[#374151] mb-3">
          Rango de precio: €{minPrice} – €{maxPrice === 1000 ? '1000+' : maxPrice}
        </h3>
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Precio mínimo</label>
          <input
            type="range"
            min={0}
            max={300}
            step={10}
            value={minPrice}
            onChange={e => setParam('minPrice', e.target.value)}
            className="w-full accent-[#2D6A4F]"
          />
          <label className="text-xs text-gray-500">Precio máximo</label>
          <input
            type="range"
            min={50}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={e => setParam('maxPrice', e.target.value)}
            className="w-full accent-[#2D6A4F]"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#374151] mb-1">Todos los productos</h1>
        <p className="text-gray-500 text-sm">{filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        <div className="flex-1">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(true)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2" aria-hidden="true">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filtros {hasFilters && `(activos)`}
            </Button>
          </div>

          {/* Mobile drawer */}
          {drawerOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
              <div className="relative w-72 bg-white h-full overflow-y-auto p-6 ml-auto shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-[#374151]">Filtros</h2>
                  <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="Cerrar filtros">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar />
                <div className="mt-6">
                  <Button variant="primary" className="w-full" onClick={() => setDrawerOpen(false)}>
                    Mostrar {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-4">Ningún producto coincide con los filtros.</p>
              <Button variant="ghost" onClick={clearFilters}>Borrar filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(product => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
