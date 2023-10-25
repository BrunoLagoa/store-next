import { prismaClient } from "@/lib/prisma";

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

  return <h1>{products?.name}</h1>;
};

export default ProductDetailsPage;
