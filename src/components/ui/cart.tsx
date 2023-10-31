"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";

export const Cart = () => {
  const { products, total, subTotal, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
        {products?.map((product) => (
          <CartItem
            key={product.id}
            product={computeProductTotalPrice(product) as any}
          />
        ))}

        {!products?.length && (
          <h1 className="text-center font-semibold">Carrinho vazio.</h1>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Separator />
        
        <div className="flex items-center justify-between text-xs">
          <p>SubTotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />
        
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
