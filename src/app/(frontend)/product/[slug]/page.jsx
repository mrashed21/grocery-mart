import Contain from "@/components/common/Contain";
import SingleProductWrapper from "@/components/frontend/SingleProduct/SimilarProducts/SingleProductWrapper";
import productData from "./../../../../../public/productData.json";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = productData.find((p) => p.slug === slug);

  return {
    title: ` ${product?.name} | Details` || "Product Name",
    description: product?.description || "Product Description",
    openGraph: {
      type: "article",
      title: product?.name,
      description: product?.description,
      url: `https://amarworld.com.bd/product/${slug}`,
      images: [
        {
          url: product?.image,
          alt: product?.name,
        },
      ],
    },
    metadataBase: new URL("https://amarworld.com.bd/"),
    authors: [{ name: "Amar World" }],
  };
}

export default function SingleProductPage({ params }) {
  const { slug } = params;
  const product = productData.find((p) => p.slug === slug);

  return (
    <Contain>
      <div className="py-5">
        <SingleProductWrapper product={product} />
      </div>
    </Contain>
  );
}
