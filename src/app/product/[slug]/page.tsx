import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";

type ProductDetailsPageProps = {
  params: {
    slug: string;
  };
};

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const products = await prismaClient.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!products) return null;

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={products.imageUrls} name={products.name} />
      <ProductInfo product={computeProductTotalPrice(products)} />
      <ProductList products={products.category.products} />
    </div>
  );
};

export default ProductDetailsPage;
