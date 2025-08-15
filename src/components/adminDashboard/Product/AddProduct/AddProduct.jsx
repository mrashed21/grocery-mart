"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { AdminAuthContext } from "@/context/AdminProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddProductImageDes from "./AddProductImageDes";
import AddProductInfo from "./AddProductInfo";

const AddProduct = () => {
  const [product_status, setProduct_status] = useState("active");
  const [category_id, setCategory_id] = useState();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const admin = useContext(AdminAuthContext);
  const user = admin?.admin;
  const handleDataPost = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("product_name", data.product_name);
    formData.append("product_slug", data.product_slug);
    formData.append("product_status", product_status);
    formData.append("category_id", category_id?._id);
    formData.append("description", description || "");
    formData.append("product_price", data.product_price);
    formData.append("product_discount_price", data.product_discount_price);
    formData.append("product_quantity", data.product_quantity);
    formData.append("product_buying_price", data.product_buying_price);
    formData.append("unit", data.unit);

    if (data.main_image instanceof File) {
      formData.append("main_image", data.main_image);
    }

    if (Array.isArray(data.other_images)) {
      data.other_images.forEach((file, index) => {
        formData.append("other_images", file);
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        credentials: "include",
        body: formData, // do NOT stringify
      });

      const result = await response.json();

      if (result?.success) {
        toast.success("Product created successfully");
        reset();
        setCategory_id("");
        setThumbnailPreview(false);
        setDescription("");
        setLoading(false);
      } else {
        toast.error(result?.message || "Failed to create product");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Request failed");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3 space-y-8">
        <AddProductInfo
          register={register}
          errors={errors}
          setCategory_id={setCategory_id}
          product_status={product_status}
          setProduct_status={setProduct_status}
          category_id={category_id}
        />

        <AddProductImageDes
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          thumbnailPreview={thumbnailPreview}
          setThumbnailPreview={setThumbnailPreview}
          description={description}
          setDescription={setDescription}
          setKeywords={setKeywords}
          keywords={keywords}
        />

        {user?.role_id?.product_create && (
          <div className="grid place-content-end mb-10  ">
            {loading ? (
              <MiniSpinner />
            ) : (
              <button
                type="submit"
                className=" bg-[#5E8A8C] text-white text-lg  py-2 px-6 font-semibold  rounded-lg  text-center cursor-pointer"
              >
                Publish
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
