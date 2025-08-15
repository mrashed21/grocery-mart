"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiImagesThin } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const AddProductImageDes = ({
  register,
  errors,
  watch,
  setValue,
  thumbnailPreview,
  setThumbnailPreview,
  description,
  setDescription,
  setKeywords,
  keywords,
}) => {
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const watchImages = watch("other_images");

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]; // Safe check for file existence
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setValue("main_image", file); // Update React Hook Form value
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue("main_image", null); // Reset React Hook Form value
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = ""; // Reset input field
    }
  };

  // Handle file input change to show image preview
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews([...imagePreviews, ...previews]);

      const currentFiles = watchImages ? Array.from(watchImages) : [];
      setValue("other_images", [...currentFiles, ...files]);
      event.target.value = null;
    }
  };

  // Remove selected image preview
  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1); // Remove the image preview

    setImagePreviews(updatedPreviews);

    const updatedFiles = Array.from(watchImages);
    updatedFiles.splice(index, 1); // Remove the file itself
    setValue("other_images", updatedFiles.length ? updatedFiles : null); // Update the input field or reset
  };

  const [inputKeyword, setInputKeyword] = useState("");

  //   add keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputKeyword.trim();
      if (newKeyword !== "") {
        setKeywords([...keywords, { keyword: newKeyword }]);
        setInputKeyword(""); // Clear the input field
      }
    }
  };
  // remove keyword
  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword?.keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };
  //handle keyword
  const handleKeywordChange = (e) => {
    setInputKeyword(e.target.value);
  };

  return (
    <div>
      {/* Product Description Section */}
      <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12">
        <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
          Product Other Information
        </h1>

        {/* Product Description */}
        <div className="mt-4">
          <label
            htmlFor="product_description"
            className="font-medium text-gray-800"
          >
            Product Description
          </label>
          <ReactQuill
            className="mt-2"
            id="product_description"
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Enter Product Description"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="my-6">
          <h2 className="text-lg text-gray-700 font-semibold">
            Thumbnail Image
          </h2>
          <div className="border-dashed border my-3 bg-white border-blue-400 rounded-lg  text-center">
            {thumbnailPreview ? (
              <div className="relative inline-block my-2 ">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-48 h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full "
                  onClick={removeThumbnail}
                >
                  <MdCancel size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer p-6">
                <RiImageAddLine className="text-7xl text-gray-400" />

                <span className="text-gray-500">Upload Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  className="hidden"
                  {...register("main_image")}
                  onChange={handleThumbnailChange}
                />
                <p className="text-gray-400 text-sm">
                  Upload Product Thumbnil Image (JPG, PNG, WEBP)
                </p>
              </label>
            )}
            {errors.main_image && (
              <p className="text-red-600 text-xs">
                {errors.main_image.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="my-10">
          <h2 className="text-lg text-gray-700 mb-4 font-semibold">
            Aditional Images
          </h2>
          {imagePreviews.length > 0 ? (
            <>
              <div className="border-dashed border-2 border-blue-400 rounded-lg p-4 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* Display Image Previews */}
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}

                  {/* Image Upload Box */}
                  <label
                    htmlFor="image_upload"
                    className="w-24 h-24 flex items-center justify-center cursor-pointer bg-white border-dashed border border-blue-400 text-gray-500 rounded-md"
                  >
                    <span className="text-2xl font-semibold">+</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image_upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      {...register("other_images", {
                        validate: {
                          isImage: (files) =>
                            Array.from(files).every((file) =>
                              [
                                "image/jpg",
                                "image/jpeg",
                                "image/png",
                                "image/webp",
                                "image/gif",
                                "image/JPG",
                                "image/JPEG",
                                "image/PNG",
                                "image/WEBP",
                                "image/GIF",
                              ].includes(file.type)
                            ) || "Only image files are allowed",
                        },
                      })}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Upload 300×300 pixel images in PNG, JPG, or WebP format (max 1
                  MB)
                </p>
              </div>
            </>
          ) : (
            <>
              <div className=" text-center">
                <div className="flex flex-wrap gap-4 justify-center my-3">
                  {/* Display Image Previews */}
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative  border shadow">
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}

                  {/* Image Upload Box */}
                  <label
                    htmlFor="image_upload"
                    className="w-full p-10 flex flex-col  items-center justify-center cursor-pointer bg-white border-dashed border border-blue-400 text-gray-500 rounded-md"
                  >
                    <PiImagesThin className="text-7xl" />

                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image_upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      {...register("other_images", {
                        validate: {
                          isImage: (files) =>
                            Array.from(files).every((file) =>
                              [
                                "image/jpg",
                                "image/jpeg",
                                "image/png",
                                "image/webp",
                                "image/gif",
                                "image/JPG",
                                "image/JPEG",
                                "image/PNG",
                                "image/WEBP",
                                "image/GIF",
                              ].includes(file.type)
                            ) || "Only image files are allowed",
                        },
                      })}
                      onChange={handleImageChange}
                    />
                    <p className="text-gray-400 mt-2 text-sm">
                      Upload 300×300 pixel images in PNG, JPG, or WebP format
                    </p>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Image section end */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mt-4">
          {/* Product Return */}
          <div className="">
            <label htmlFor="product_quantity" className="font-medium">
              Product Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...register("product_quantity", {
                required: "Product Quantity is required",
              })}
              id="product_quantity"
              type="text"
              placeholder='Enter Quantiy Like "30", "50", "50" etc.'
              className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            />
            {errors.product_quantity && (
              <p className="text-red-600">{errors.product_quantity?.message}</p>
            )}
          </div>
          {/* unit */}
          <div className="">
            <label htmlFor="unit" className="font-medium">
              Unit <span className="text-red-500">*</span>
            </label>
            <input
              {...register("unit", {
                required: "Product Unit is required",
              })}
              id="unit"
              placeholder='Enter Unit Like "1 Pc", "1 Box", "1 kg", "1 Lit" etc.'
              type="text"
              className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
            />
            {errors.unit && (
              <p className="text-red-600">{errors.unit?.message}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProductImageDes;
