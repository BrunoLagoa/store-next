"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

type CartProduct = Product & {
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
