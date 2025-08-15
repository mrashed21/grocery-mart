"use client";

import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { PiImagesThin } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";
import "react-quill-new/dist/quill.snow.css";
import Select from "react-select";
import { toast } from "react-toastify";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const UpdateProduct = ({ setProductUpdateModal, product, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [description, setDescription] = useState(product?.description || "");
  const [productStatus, setProductStatus] = useState(product?.product_status);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const thumbnailInputRef = useRef();
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
    },
  });

  const watchImages = watch("other_images");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${BASE_URL}/category`, {
        credentials: "include",
      });
      const data = await res.json();
      const categories = data?.data || [];
      setCategoryOptions(categories);
    };

    fetchCategories();

    if (product?.main_image) setThumbnailPreview(product.main_image);
    if (product?.other_images) {
      setImagePreviews(product.other_images.map((img) => img));
    }
  }, [product]);
  useEffect(() => {
    if (!product || !product.category_id || categoryOptions.length === 0)
      return;

    const matched = categoryOptions.find(
      (cat) =>
        cat._id === product.category_id || cat._id === product.category_id?._id
    );

    if (matched) setSelectedCategory(matched);
  }, [product, categoryOptions]);

  const productStatusOptions = [
    { value: "active", label: "Active" },
    { value: "in-active", label: "In-Active" },
  ];

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setValue("main_image", file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue("main_image", null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files?.length) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews([...imagePreviews, ...previews]);

      const currentFiles = watchImages ? Array.from(watchImages) : [];
      setValue("other_images", [...currentFiles, ...files]);
      e.target.value = null;
    }
  };

  const removeImage = (index) => {
    const previews = [...imagePreviews];
    const removedImage = previews[index];

    previews.splice(index, 1);
    setImagePreviews(previews);

    const updatedFiles = Array.from(watchImages || []);
    if (!removedImage?.other_image_key) {
      updatedFiles.splice(index, 1);
    }
    setValue("other_images", updatedFiles.length ? updatedFiles : []);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_id", product?._id);
    formData.append("product_name", data.product_name);
    formData.append("product_status", productStatus);
    formData.append("category_id", selectedCategory?._id);
    formData.append("description", description || "");
    formData.append("product_price", data.product_price);
    formData.append("product_discount_price", data.product_discount_price);
    formData.append("product_quantity", data.product_quantity);
    formData.append("product_buying_price", data.product_buying_price);
    formData.append("unit", data.unit);

    if (data.main_image instanceof File) {
      formData.append("main_image", data.main_image);
    }

    const oldImagesToKeep = imagePreviews.filter((img) => img?.other_image_key);

    if (oldImagesToKeep.length > 0) {
      oldImagesToKeep.forEach((img, i) => {
        formData.append(
          `other_default_images[other_image][${i}]`,
          img.other_image
        );
        formData.append(
          `other_default_images[other_image_key][${i}]`,
          img.other_image_key
        );
      });
    }

    if (Array.isArray(data?.other_images) && data.other_images.length > 0) {
      data.other_images.forEach((file) => {
        formData.append("other_images", file);
      });
    }

    try {
      const res = await fetch(`${BASE_URL}/product`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();
      if (result?.success) {
        toast.success("Product updated successfully");
        refetch();
        setProductUpdateModal(false);
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message || "Update request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center px-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-xl p-6 overflow-y-auto max-h-[95vh] relative">
        <button
          onClick={() => setProductUpdateModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 cursor-pointer"
        >
          <MdCancel size={28} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Product Name</label>
              <input
                {...register("product_name", { required: true })}
                type="text"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label>Price</label>
              <input
                {...register("product_price", { required: true })}
                type="number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Discount Price</label>
              <input
                {...register("product_discount_price")}
                type="number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Buying Price</label>
              <input
                {...register("product_buying_price")}
                type="number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                {...register("product_quantity")}
                type="number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Unit</label>
              <input
                {...register("unit")}
                type="text"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Product Status</label>
              <Select
                options={productStatusOptions}
                value={productStatusOptions.find(
                  (opt) => opt.value === productStatus
                )}
                onChange={(opt) => setProductStatus(opt?.value || "")}
              />
            </div>
            <div>
              <label>Category</label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={(selected) => setSelectedCategory(selected)}
                getOptionLabel={(x) => x.category_name}
                getOptionValue={(x) => x._id}
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <ReactQuill value={description} onChange={setDescription} />
          </div>

          <div>
            <div className="">
              <label>Thumbnail</label>
            </div>
            {thumbnailPreview ? (
              <div className="relative inline-block">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="w-32 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute -top-2 -right-2 text-red-500 cursor-pointer"
                >
                  <MdCancel size={20} />
                </button>
              </div>
            ) : (
              <label className="block border border-dashed border-gray-300 p-4 text-center rounded cursor-pointer">
                <RiImageAddLine className="mx-auto text-4xl text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  className="hidden cursor-pointer"
                  {...register("main_image")}
                  onChange={handleThumbnailChange}
                />
                Upload Thumbnail
              </label>
            )}
          </div>

          <div>
            <label>Other Images</label>
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img?.other_image || img}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-1 -right-1 text-red-600 cursor-pointer"
                  >
                    <MdCancel />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-300 rounded cursor-pointer">
                <PiImagesThin />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  {...register("other_images")}
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="text-right">
            {loading ? (
              <MiniSpinner />
            ) : (
              <button
                type="submit"
                className="bg-[#084C4E] text-white px-6 py-2 rounded-lg cursor-pointer"
              >
                Update Product
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
