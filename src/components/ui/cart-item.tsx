import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from "react";

type CartItemProps = {
  product: CartProduct;
};

export const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
            >
              <ArrowLeftIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleRemoveProduct}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};
