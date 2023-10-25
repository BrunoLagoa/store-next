import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./components/product-images";

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
  });

  if (!products) return null;

  return (
    <div>
      <ProductImages imageUrls={products.imageUrls} name={products.name} />
    </div>
  );
};

export default ProductDetailsPage;
