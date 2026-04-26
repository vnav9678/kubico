export interface Product {
  id: string;
  name: string;
  category: 'Raised Beds' | 'Wall Planters' | 'Corner Units' | 'Accessories';
  description: string;
  shortDescription: string;
  price: number;
  dimensions: { width: number; depth: number; height: number };
  modules: string[];
  finishes: string[];
  tags: string[];
  featured: boolean;
  size: 'S' | 'M' | 'L' | 'XL';
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  finish: string;
  configSummary?: string;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };
