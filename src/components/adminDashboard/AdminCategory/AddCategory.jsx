import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { generateSlug } from "@/utils/genarateSlug";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const AddCategory = ({ setCategoryCreateModal, user, refetch }) => {
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("category_image", file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("category_image", null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  //Image preview....

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const category_slug = generateSlug(data?.category_name);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "category_image") {
          formData.append(key, value); // No need to access data?.category_image again
        } else {
          formData.append(key, value);
        }
      });

      formData.append("category_slug", category_slug);
      formData.append("category_publisher_id", user?._id);

      const response = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        credentials: "include",
        body: formData, // Don't set Content-Type manually
      });

      const result = await response.json(); // Optional: to get response

      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Category created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setCategoryCreateModal(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[650px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin uppercase">
          <div className="flex items-center justify-between mt-4">
            <h3 className="sm:text-[26px] font-bold" id="modal-title ">
              Create Category
            </h3>
            <button
              type="button"
              className="p-1 absolute right-3 rounded-full top-3 bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-all duration-300"
              onClick={() => setCategoryCreateModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6 border-t border-gray-200" />

          <form onSubmit={handleSubmit(handleDataPost)} className="">
            <div>
              <label className="block text-xs font-medium ">
                Category Name <span className="text-red-500">*</span>
              </label>

              <input
                {...register("category_name", {
                  required: "category name is required",
                })}
                type="text"
                placeholder="CATEGORY NAME"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors?.category_name && (
                <p className="text-red-600">{errors.category_name?.message}</p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium ">
                  Category Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category_status", {
                    required: "Category Status is required",
                  })}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.category_status && (
                  <p className="text-red-600">
                    {errors.category_status.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium ">
                  Category serial <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("category_serial", {
                    required: "category Serial is required",
                    validate: (value) => {
                      if (value < 1) {
                        return "serial must be greater than 0";
                      }
                      // else if (value > 100) {
                      //   return 'Serial must be less then 100'
                      // }
                    },
                  })}
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  placeholder="TYPE NUMBER"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.category_serial && (
                  <p className="text-red-600">
                    {errors.category_serial?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-medium ">
                Upload Category Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <button
                    type="button"
                    className="btn bg-white p-1 absolute right-1 rounded-full top-1 text-red-600 cursor-pointer"
                    onClick={() => handleRemoveImage()}
                  >
                    {" "}
                    <RxCross1 size={15}></RxCross1>
                  </button>

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover my-2 rounded "
                  />
                </div>
              ) : (
                <label
                  className="mt-1 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer"
                  htmlFor="category_image"
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center ">
                    <div>
                      <RiImageAddFill size={25} />
                    </div>
                    <p className="mt-2 text-[#C9CACA]" type="">
                      upload image
                    </p>
                  </div>
                </label>
              )}
              <input
                {...register("category_image", {
                  required: "Image is Required",
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                accept="image/*"
                type="file"
                ref={imageInputRef} // Attach ref to input
                id="category_image"
                className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-[#084C4E] file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                onChange={handleImageChange}
              />
              <p className="text-xs text-[#C9CACA]  mt-1 text-end">
                Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                MB).
              </p>

              {errors.category_image && (
                <p className="text-red-600">{errors.category_image?.message}</p>
              )}
            </div>

            <div className="flex gap-8 mt-4 justify-end">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <button
                  className="rounded-[8px] py-[10px] px-[18px] bg-[#084C4E] transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
                  type="submit"
                >
                  Create Category
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
