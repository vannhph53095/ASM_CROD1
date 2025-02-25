import React, { createContext, useReducer, useContext } from 'react';

// Định nghĩa kiểu dữ liệu cho CartItem
export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  type: 'drink' | 'bean';
  sizes?: { size: string; quantity: number; price: number }[];
  weights?: { weight: string; quantity: number; price: number }[];
}

// Định nghĩa kiểu dữ liệu cho CartState
interface CartState {
  items: CartItem[];
}

// Định nghĩa các hành động (actions) có thể thực hiện trên giỏ hàng
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'INCREASE_QUANTITY'; payload: { id: string; size: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { id: string; size: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } };

// Tạo Context
const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  cart: { items: [] },
  dispatch: () => null,
});

// Hàm cập nhật sizes
const updateSizes = (
  sizes: { size: string; quantity: number; price: number }[],
  payloadSizes: { size: string; quantity: number; price: number }[]
) => {
  return sizes.map((size) => {
    const updatedSize = payloadSizes.find((s) => s.size === size.size);
    return updatedSize
      ? { ...size, quantity: size.quantity + updatedSize.quantity }
      : size;
  });
};

// Hàm cập nhật weights
const updateWeights = (
  weights: { weight: string; quantity: number; price: number }[],
  payloadWeights: { weight: string; quantity: number; price: number }[]
) => {
  return weights.map((weight) => {
    const updatedWeight = payloadWeights.find((w) => w.weight === weight.weight);
    return updatedWeight
      ? { ...weight, quantity: weight.quantity + updatedWeight.quantity }
      : weight;
  });
};

// Reducer để xử lý các hành động
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  sizes: item.type === 'drink' && item.sizes
                    ? updateSizes(item.sizes, action.payload.sizes || [])
                    : item.sizes,
                  weights: item.type === 'bean' && item.weights
                    ? updateWeights(item.weights, action.payload.weights || [])
                    : item.weights,
                }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                sizes: item.type === 'drink' && item.sizes
                  ? item.sizes.map((size) =>
                      size.size === action.payload.size
                        ? { ...size, quantity: size.quantity + 1, price: size.price * (size.quantity + 1) }
                        : size
                    )
                  : item.sizes,
                weights: item.type === 'bean' && item.weights
                  ? item.weights.map((weight) =>
                      weight.weight === action.payload.size
                        ? { ...weight, quantity: weight.quantity + 1, price: weight.price * (weight.quantity + 1) }
                        : weight
                    )
                  : item.weights,
              }
            : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                sizes: item.type === 'drink' && item.sizes
                  ? item.sizes.map((size) =>
                      size.size === action.payload.size
                        ? { ...size, quantity: Math.max(0, size.quantity - 1), price: size.price * Math.max(0, size.quantity - 1) }
                        : size
                    )
                  : item.sizes,
                weights: item.type === 'bean' && item.weights
                  ? item.weights.map((weight) =>
                      weight.weight === action.payload.size
                        ? { ...weight, quantity: Math.max(0, weight.quantity - 1), price: weight.price * Math.max(0, weight.quantity - 1) }
                        : weight
                    )
                  : item.weights,
              }
            : item
        ),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

// CartProvider để cung cấp Context cho ứng dụng
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => useContext(CartContext);