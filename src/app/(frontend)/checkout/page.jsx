import Contain from "@/components/common/Contain";
import CheckOut from "@/components/frontend/CheckOut/CheckOut";

export async function generateMetadata() {
  return {
    title: "Checkout | Grocery Mart",
    // description: product?.description || "Product Description",
    // openGraph: {
    //   type: "article",
    //   title: product?.name,
    //   description: product?.description,
    //   url: `https://amarworld.com.bd/product/${slug}`,
    //   images: [
    //     {
    //       url: product?.image,
    //       alt: product?.name,
    //     },
    //   ],
    // },
    // metadataBase: new URL("https://amarworld.com.bd/"),
    // authors: [{ name: "Amar World" }],
  };
}

const CheckOutPage = () => {
  return (
    <main>
      <Contain>
        <CheckOut />
      </Contain>
    </main>
  );
};

export default CheckOutPage;
