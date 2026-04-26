import { Link } from 'react-router-dom';
import { useCart } from '../store/cartStore';
import ProductSVG from '../components/ProductSVG';
import Button from '../components/Button';
import productsData from '../data/products.json';
import type { Product } from '../types';

const allProducts = productsData as Product[];

function getCategoryForProduct(productId: string): string {
  const p = allProducts.find(p => p.id === productId);
  return p?.category || 'Camas de cultivo';
}

export default function Cart() {
  const { state, dispatch, totalPrice, totalItems } = useCart();

  function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }

  function removeItem(id: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <svg width="80" height="80" fill="none" stroke="#D1D5DB" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-6" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h1 className="text-2xl font-bold text-[#374151] mb-3">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">
            Parece que aún no has añadido nada. Explora nuestra colección y encuentra la jardinera perfecta.
          </p>
          <Link to="/catalog">
            <Button variant="primary" size="lg">Ver productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 0 ? 9.95 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#374151] mb-6">
        Tu carrito ({totalItems} artículo{totalItems !== 1 ? 's' : ''})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Line items */}
        <div className="flex-1 space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
              {/* Thumbnail */}
              <div className="rounded-lg overflow-hidden flex-shrink-0 w-24 h-24">
                <ProductSVG
                  productId={item.productId}
                  category={getCategoryForProduct(item.productId)}
                  width={96}
                  height={96}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[#374151] text-sm leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Acabado: {item.finish}</p>
                    {item.configSummary && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{item.configSummary}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                      aria-label="Reducir cantidad"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#374151]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                      aria-label="Aumentar cantidad"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  <span className="font-bold text-[#2D6A4F]">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 xl:w-80">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
            <h2 className="font-semibold text-[#374151] mb-4">Resumen del pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Envío estándar 3–5 días laborables</p>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-[#374151]">
              <span>Total (IVA no incluido)</span>
              <span className="text-[#2D6A4F]">€{(totalPrice + shipping).toFixed(2)}</span>
            </div>
            <div className="mt-4 space-y-2">
              <Link to="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Finalizar compra
                </Button>
              </Link>
              <Link to="/quote" className="block">
                <Button variant="ghost" className="w-full">
                  Ver presupuesto
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Pago seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
