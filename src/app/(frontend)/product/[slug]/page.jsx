import Contain from "@/components/common/Contain";
import SingleProductWrapper from "@/components/frontend/SingleProduct/SimilarProducts/SingleProductWrapper";

import { BASE_URL } from "@/utils/baseURL";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const productDataResponse = await fetch(`${BASE_URL}/product/${slug}`, {
    next: { revalidate: 30 },
  });


  // Convert the response to JSON
  const productData = await productDataResponse.json();
  return {
    title: productData?.data?.product_name || "product Name",
    description: productData?.data?.meta_description || "product Description",
    openGraph: {
      type: "article",
      title: productData?.data?.product_name,
      description: productData?.data?.meta_description,
      url: `https://amarworld.com.bd/${slug}`,
      images: [
        {
          url: productData?.data?.main_image,
          alt: productData?.data?.product_name,
        },
      ],
    },
    metadataBase: new URL("https://amarworld.com.bd/"),
    author: {
      name: "Amar World",
    },
  };
}

export default async function SingleProductPage({ params }) {
  const { slug } = await params;
  // const product = productData.find((p) => p.slug === slug);

  return (
    <Contain>
      <main className="py-5">
        <SingleProductWrapper slug={slug} />
      </main>
    </Contain>
  );
}
