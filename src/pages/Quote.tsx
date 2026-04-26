import { Link } from 'react-router-dom';
import { useCart } from '../store/cartStore';
import Button from '../components/Button';

const SHIPPING = 9.95;
const VAT_RATE = 0.21;

export default function Quote() {
  const { state, totalPrice } = useCart();
  const vat = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + SHIPPING + vat;

  function handlePrint() {
    window.print();
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#374151] mb-4">Tu presupuesto</h1>
        <p className="text-gray-500 mb-6">Tu carrito está vacío. Añade productos para generar un presupuesto.</p>
        <Link to="/catalog">
          <Button variant="primary">Ver productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#374151]">Tu presupuesto</h1>
          <p className="text-gray-500 text-sm mt-1">
            Generado el {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="no-print flex gap-3">
          <Button variant="ghost" size="sm" onClick={handlePrint}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2" aria-hidden="true">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Imprimir presupuesto
          </Button>
        </div>
      </div>

      {/* Quote header for print */}
      <div className="hidden print:block mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#2D6A4F]">Kubico</h2>
            <p className="text-sm text-gray-500">Jardineras modulares de madera</p>
            <p className="text-sm text-gray-500">hello@kubico.com</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Referencia de presupuesto: KUB-Q-{Date.now().toString().slice(-8)}</p>
            <p>Fecha: {new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F5F0] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#374151]">Producto</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151]">Acabado</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151] hidden md:table-cell">Configuración</th>
                <th className="px-4 py-3 text-center font-semibold text-[#374151]">Cant.</th>
                <th className="px-4 py-3 text-right font-semibold text-[#374151]">Precio unit.</th>
                <th className="px-4 py-3 text-right font-semibold text-[#374151]">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {state.items.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-4">
                    <p className="font-medium text-[#374151]">{item.name}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{item.finish}</td>
                  <td className="px-4 py-4 text-gray-400 text-xs hidden md:table-cell max-w-xs">
                    {item.configSummary || '—'}
                  </td>
                  <td className="px-4 py-4 text-center text-[#374151]">{item.quantity}</td>
                  <td className="px-4 py-4 text-right text-[#374151]">€{item.price.toFixed(2)}</td>
                  <td className="px-4 py-4 text-right font-semibold text-[#374151]">
                    €{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#F8F5F0] rounded-xl p-5 text-sm text-gray-600">
          <h3 className="font-semibold text-[#374151] mb-2">Notas</h3>
          <ul className="space-y-1 list-disc list-inside text-xs">
            <li>Todos los precios incluyen material y componentes de montaje.</li>
            <li>El envío se cotiza por separado (€9,95 estándar).</li>
            <li>Plazo de entrega: 3–5 días laborables para tallas estándar.</li>
            <li>Este presupuesto es válido durante 30 días desde la fecha indicada.</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Envío estándar</span>
            <span>€{SHIPPING.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>IVA (21%)</span>
            <span>€{vat.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-base text-[#374151]">
            <span>Total</span>
            <span className="text-[#2D6A4F]">€{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 no-print flex flex-wrap gap-3 justify-end">
        <Link to="/cart">
          <Button variant="ghost">Editar carrito</Button>
        </Link>
        <Link to="/checkout">
          <Button variant="primary" size="lg">Finalizar compra &rarr;</Button>
        </Link>
      </div>
    </div>
  );
}
