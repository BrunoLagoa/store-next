"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

type CartProduct = Product & {
  quantity: number;
};

type CartContextData = {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
};

const initialCartContextData: CartContextData = {
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
};

const CartContext = createContext<CartContextData>(initialCartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={initialCartContextData}>
      {children}
    </CartContext.Provider>
  );
};
