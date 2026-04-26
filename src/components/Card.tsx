import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ProductSVG from './ProductSVG';
import Badge from './Badge';
import Button from './Button';
import { useCart } from '../store/cartStore';

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const { dispatch } = useCart();

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${product.finishes[0]}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        finish: product.finishes[0],
      },
    });
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block" aria-label={`Ver ${product.name}`}>
        <ProductSVG
          productId={product.id}
          category={product.category}
          className="w-full"
          width={400}
          height={220}
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-[#374151] hover:text-[#2D6A4F] transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <Badge label={product.size} />
        </div>
        <Badge label={product.category} category={product.category} className="self-start mb-2" />
        <p className="text-sm text-gray-500 mb-4 flex-1">{product.shortDescription}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-[#2D6A4F]">€{product.price}</span>
          <div className="flex gap-2">
            <Link to={`/configurator?base=${product.id}`}>
              <Button variant="ghost" size="sm">Configurar</Button>
            </Link>
            <Button variant="primary" size="sm" onClick={handleAddToCart}>
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
