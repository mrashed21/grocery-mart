"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

const AddProductInfo = ({
  register,
  errors,
  setCategory_id,
  setProduct_status,
  product_status,
  category_id,
}) => {
  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: [`/api/v1/category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });

  const productStatusOptions = [
    { value: "active", label: "Active" },
    { value: "in-active", label: "In-Active" },
  ];

  return (
    <div>
      {/* Product Information */}
      <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12">
        <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
          Product Information
        </h1>
        {/* Product all field  */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* Product Name */}
          <div className="">
            <label htmlFor="product_name" className="font-medium">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("product_name", {
                required: "Product Name is required",
              })}
              id="product_name"
              type="text"
              placeholder="Enter Product Name"
              className="block w-full p-2 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg "
            />
            {errors.product_name && (
              <p className="text-red-600">{errors.product_name?.message}</p>
            )}
          </div>

          {/* Category Name */}
          <div className="">
            <label htmlFor="category_name" className="font-medium">
              Category Name<span className="text-red-500">*</span>
            </label>

            <Select
              id="category_id"
              name="category_id"
              required
              isClearable
              aria-label="Select a Category"
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              value={category_id} // direct object
              onChange={(selectedOption) => {
                setCategory_id(selectedOption || null);
              }}
            />
          </div>

          <div className="">
            <label htmlFor="product_price" className="font-medium">
              Product Price<span className="text-red-500">*</span>
            </label>
            <input
              {...register("product_price", {
                required: "Product Price is required",
              })}
              id="product_price"
              type="text"
              placeholder="Enter Product Price"
              className="block w-full p-2 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg "
            />
            {errors.product_price && (
              <p className="text-red-600">{errors.product_price?.message}</p>
            )}
          </div>
          <div className="">
            <label htmlFor="product_discount_price" className="font-medium">
              Product Discount
            </label>
            <input
              {...register("product_discount_price")}
              id="product_discount_price"
              type="text"
              placeholder="Enter Product Discount Price"
              className="block w-full p-2 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg "
            />
            {errors.product_discount_price && (
              <p className="text-red-600">
                {errors.product_discount_price?.message}
              </p>
            )}
          </div>

          <div className="">
            <label htmlFor="product_buying_price" className="font-medium">
              Product Buying Price
            </label>
            <input
              {...register("product_buying_price")}
              id="product_buying_price"
              type="text"
              placeholder="Enter Product Buying Price"
              className="block w-full p-2 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg "
            />
            {errors.product_buying_price && (
              <p className="text-red-600">
                {errors.product_buying_price?.message}
              </p>
            )}
          </div>
          <div className=" space-y-2 ">
            <label htmlFor="product_status" className="font-medium">
              Product Status
            </label>

            <Select
              id="product_status"
              name="product_status"
              isClearable
              isSearchable
              placeholder="-Select Product Status-"
              required
              aria-label="Select a Status"
              options={productStatusOptions}
              value={
                productStatusOptions.find(
                  (opt) => opt.value === product_status
                ) || null
              }
              getOptionLabel={(x) => x?.label}
              getOptionValue={(x) => x?.value}
              onChange={(selectedOption) => {
                setProduct_status(selectedOption?.value || "");
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProductInfo;
