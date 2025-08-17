"use client";
import MiniSpinner from "@/components/Skeleton/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddProductImageDes from "./AddProductImageDes";
import AddProductInfo from "./AddProductInfo";

const AddProduct = () => {
  const [product_status, setProduct_status] = useState("active");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const buttonLoading = false;
  const handleDataPost = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form handleSubmit={handleDataPost} className="mt-3 space-y-8">
        <AddProductInfo
          // productInfoData={productInfoData}
          // setProductInfoData={setProductInfoData}
          register={register}
          errors={errors}
          // setSub_Category_id={setSub_Category_id}
          // setBrand_id={setBrand_id}
          // attributeDataToSubmit={attributeDataToSubmit}
          // setAttributeDataToSubmit={setAttributeDataToSubmit}
          // setShowProductVariation={setShowProductVariation}
          // showProductVariation={showProductVariation}
          // variationTableData={variationTableData}
          // setVariationTableData={setVariationTableData}
        />

        <AddProductImageDes
          register={register}
          errors={errors}
          watch={watch}
          // setValue={setValue}
          // thumbnailPreview={thumbnailPreview}
          // setThumbnailPreview={setThumbnailPreview}
          // description={description}
          // setDescription={setDescription}
          // setKeywords={setKeywords}
          // keywords={keywords}
          product_status={product_status}
          setProduct_status={setProduct_status}
          // settrendingProduct={settrendingProduct}
        />

        <div className="grid place-content-end mb-10  ">
          {buttonLoading ? (
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
      </form>
    </div>
  );
};

export default AddProduct;
