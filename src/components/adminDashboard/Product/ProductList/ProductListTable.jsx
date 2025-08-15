"use client";
import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { AdminAuthContext } from "@/context/AdminProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProduct from "./UpdateProduct";

const ProductListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const { admin, adminLoading } = useContext(AdminAuthContext);
  const user = admin;

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  const {
    data: productData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      return data;
    },
  });

  // delete a product
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.product_name} Product!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: item?._id,
        };
        try {
          const response = await fetch(`${BASE_URL}/product`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(sendData),
          });
          const result = await response.json();

          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.product_name} Product has been Dleted!`,
              icon: "success",
            });
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          toast.error("Network error or server is down", {
            autoClose: 1000,
          });
          console.log(error);
        }
      }
    });
  };

  // product update
  const handleProductUpdate = (item) => {
    setProductUpdateModal(true);
    setUpdateProduct(item);
  };
  return (
    <>
      <div className=" py-6 px-4 ">
        <div className="flex justify-between mt-6">
          <div>
            <h1 className="text-2xl  uppercase">Product List</h1>
          </div>

          {user?.role_id?.product_create && (
            <div>
              <Link
                href="/admin/add-product"
                type="button"
                className="rounded-[8px] py-[10px] px-[14px] bg-[#084C4E]  transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
              >
                Create Product
              </Link>
            </div>
          )}
        </div>
        {/* search Product... */}
        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="SEARCH PRODUCT..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
          />
        </div>

        {isLoading || adminLoading ? (
          <TableLoadingSkeleton />
        ) : (
          <>
            {/* Table for showing data */}
            {productData?.data?.length > 0 ? (
              <div className="mt-5 overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full  bg-white text-sm border border-gray-200 rounded-xl overflow-hidden border-collapse">
                  <thead>
                    <tr className="font-semibold text-center">
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Name
                      </th>
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Image
                      </th>
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Status
                      </th>
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Category
                      </th>
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Price
                      </th>
                      <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                        Remaining Quantity
                      </th>

                      {/* <th className="whitespace-nowrap p-4 text-center border border-gray-200">
                    Publisher
                  </th> */}

                      {(user?.role_id?.product_delete === true ||
                        user?.role_id?.product_create === true) && (
                        <th className="p-4 text-center border border-gray-200">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {productData?.data?.map((item, i) => (
                      <tr
                        key={item?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-amber-50" : "bg-white"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-semibold border border-gray-200 capitalize">
                          {item?.product_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 font-semibold flex justify-center border-t border-gray-200">
                          <img
                            src={item?.main_image}
                            alt=""
                            className="w-20 h-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 border border-gray-200 px-4">
                          {item?.product_status === "active" ? (
                            <p className="bg-green-500 text-white  py-[4px] rounded-[8px]">
                              <span>Active</span>
                            </p>
                          ) : (
                            <p className="bg-red-500 text-white font-semibold py-[4px] rounded-[8px]">
                              <span>In-Active</span>
                            </p>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-semibold border border-gray-200">
                          {item?.category_id?.category_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center font-semibold border-b border-gray-200">
                          {item?.product_discount_price ? (
                            <div className="flex items-center justify-center gap-2 lg:gap-4">
                              {/* Discount Price */}
                              <span className="flex items-center text-[#2C2C2C]  font-bold">
                                <TbCurrencyTaka className="text-base lg:text-xl mr-0.5" />
                                {item.product_discount_price}
                              </span>

                              {/* Original Price */}
                              <span className="flex items-center text-gray-400 line-through text-xs lg:text-sm">
                                <TbCurrencyTaka className="text-sm lg:text-base mr-0.5" />
                                {item.product_price}
                              </span>
                            </div>
                          ) : (
                            <span className="flex items-center justify-center text-[#2C2C2C] gap-1  font-bold">
                              <TbCurrencyTaka className="text-base lg:text-xl" />
                              {item.product_price}
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-4 py-2 font-semibold border border-gray-200">
                          {item?.product_quantity}
                        </td>

                        {/* <td className="whitespace-nowrap px-4 py-2 font-semibold border border-gray-200">
                      {item?.product_publisher_id
                        ? item?.product_publisher_id?.admin_name
                        : "-"}
                    </td> */}

                        {(user?.role_id?.product_delete === true ||
                          user?.role_id?.product_create === true) && (
                          <td className="whitespace-nowrap px-4 py-2 border border-gray-200">
                            <span className="flex items-center justify-center gap-2">
                              {user?.role_id?.product_delete === true && (
                                <button
                                  onClick={() => handleDelete(item)}
                                  className="cursor-pointer text-red-500"
                                >
                                  <MdDeleteForever size={22} />
                                </button>
                              )}
                              {user?.role_id?.product_update === true && (
                                <button
                                  type="button "
                                  onClick={() => {
                                    handleProductUpdate(item);
                                  }}
                                >
                                  <FiEdit
                                    className="cursor-pointer text-updateBtnColor"
                                    size={22}
                                  />
                                </button>
                              )}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
          </>
        )}

        {/* pagination */}
        {productData?.totalData > 10 && (
          <Pagination
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            limit={limit}
            totalData={productData?.totalData}
          />
        )}

        {productUpdateModal && (
          <UpdateProduct
            setProductUpdateModal={setProductUpdateModal}
            product={updateProduct}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

export default ProductListTable;
