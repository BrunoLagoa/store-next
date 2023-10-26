"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export type CartProduct = ProductWithTotalPrice & {
  quantity: number;
};

type CartContextData = {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
};

const initialCartContextData: CartContextData = {
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
};

export const CartContext = createContext<CartContextData>(
  initialCartContextData,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        ...initialCartContextData,
        products,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
