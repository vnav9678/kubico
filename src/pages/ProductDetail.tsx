import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import type { Product } from '../types';
import ProductSVG from '../components/ProductSVG';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useCart } from '../store/cartStore';

const allProducts = productsData as Product[];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = allProducts.find(p => p.id === id);

  const [selectedFinish, setSelectedFinish] = useState(product?.finishes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#374151] mb-4">Product not found</h1>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
        <Link to="/catalog">
          <Button variant="primary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product!.id}-${selectedFinish}-${Date.now()}`,
        productId: product!.id,
        name: product!.name,
        price: product!.price,
        quantity,
        finish: selectedFinish,
      },
    });
    setAddedMessage('Added to cart!');
    setTimeout(() => setAddedMessage(''), 2500);
  }

  function handleBuyNow() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product!.id}-${selectedFinish}-${Date.now()}`,
        productId: product!.id,
        name: product!.name,
        price: product!.price,
        quantity,
        finish: selectedFinish,
      },
    });
    navigate('/cart');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2 items-center">
        <Link to="/" className="hover:text-[#2D6A4F]">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-[#2D6A4F]">Catalog</Link>
        <span>/</span>
        <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2D6A4F]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#374151]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-[#F0EBE3]">
          <ProductSVG
            productId={product.id}
            category={product.category}
            className="w-full"
            width={600}
            height={450}
          />
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge label={product.category} category={product.category} />
            <Badge label={`Size ${product.size}`} />
          </div>
          <h1 className="text-3xl font-bold text-[#374151] mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-[#2D6A4F] mb-4">€{product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Specs table */}
          <div className="bg-[#F8F5F0] rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-[#374151] mb-3 text-sm uppercase tracking-wider">Specifications</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-500 pr-4">Width</td>
                  <td className="py-2 font-medium text-[#374151]">{product.dimensions.width} cm</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4">Depth</td>
                  <td className="py-2 font-medium text-[#374151]">{product.dimensions.depth} cm</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4">Height</td>
                  <td className="py-2 font-medium text-[#374151]">{product.dimensions.height} cm</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 pr-4">Size</td>
                  <td className="py-2 font-medium text-[#374151]">{product.size}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Modules */}
          <div className="mb-6">
            <h2 className="font-semibold text-[#374151] mb-3 text-sm uppercase tracking-wider">Included Modules</h2>
            <ul className="space-y-1">
              {product.modules.map(m => (
                <li key={m} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="#2D6A4F" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Finish selector */}
          <div className="mb-6">
            <h2 className="font-semibold text-[#374151] mb-3 text-sm uppercase tracking-wider">
              Finish: <span className="text-[#2D6A4F] normal-case font-semibold">{selectedFinish}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.finishes.map(finish => (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  className={`px-4 py-2 rounded-lg text-sm border-2 font-medium transition-all ${
                    selectedFinish === finish
                      ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white'
                      : 'border-gray-200 bg-white text-[#374151] hover:border-[#2D6A4F]'
                  }`}
                >
                  {finish}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h2 className="font-semibold text-[#374151] mb-3 text-sm uppercase tracking-wider">Quantity</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <span className="w-10 text-center font-semibold text-[#374151]">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
              Add to Cart — €{(product.price * quantity).toFixed(2)}
            </Button>
            <Button variant="secondary" size="lg" onClick={handleBuyNow} className="flex-1">
              Buy Now
            </Button>
          </div>
          {addedMessage && (
            <p className="text-[#2D6A4F] text-sm font-medium">{addedMessage}</p>
          )}

          <Link
            to={`/configurator?base=${product.id}`}
            className="text-sm text-[#8B5E3C] hover:underline font-medium"
          >
            Customise with the Configurator &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
