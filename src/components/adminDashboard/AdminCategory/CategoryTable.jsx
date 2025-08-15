"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import Swal from "sweetalert2";
import UpdateCategory from "./UpdateCategory";

const CategoryTable = ({
  categoryTypes,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  adminLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  //update Category.....state
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [categoryUpdateData, setCategoryUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Handle Delete Category Table Row function
  const handleDeleteCategoryTableRow = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${category?.category_name} Category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: category?._id,
        };
        try {
          const response = await fetch(
            `
          ${BASE_URL}/category`,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${category?.category_name} Category has been Deleted!`,
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
          console.error(error);
        }
      }
    });
  };

  //Update category Status..
  const handleCategoryActiveStatus = async (id, category_status) => {
    try {
      const data = {
        _id: id,
        category_status,
      };
      const response = await fetch(`${BASE_URL}/category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("category status Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };
  // Inactive category Status..
  const handleCategoryInActiveStatus = async (id, category_status) => {
    try {
      const data = {
        _id: id,
        category_status,
      };
      const response = await fetch(`${BASE_URL}/category/status_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("category status  Update successfully", {
          autoClose: 1000,
        });
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
    } finally {
      ("");
    }
  };

  //Update HandleFunction
  const handleCategoryUpdateModal = (category) => {
    setCategoryUpdateData(category);
    setCategoryUpdateModal(true);
  };

  return (
    <>
      {isLoading || adminLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {categoryTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg rounded-xl border border-gray-200">
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm   overflow-hidden border-collapse">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className=" font-semibold text-center">
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        SL No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Category Image
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Category Name
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Category Serial No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Status
                      </td>

                      {(user?.role_id?.category_update === true ||
                        user?.role_id?.category_delete === true) && (
                        <td className="whitespace-nowrap p-4 border border-gray-200">
                          Action
                        </td>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {categoryTypes?.data?.map((category, i) => (
                      <tr
                        key={category?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-amber-50" : "bg-white"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium border border-gray-200">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 flex justify-center border-t border-gray-200">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={category?.category_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium border border-gray-200">
                          {category?.category_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium border border-gray-200">
                          {category?.category_serial}
                        </td>
                        <td className="whitespace-nowrap py-1.5 border border-gray-200">
                          {user?.role_id?.category_update === true ? (
                            <>
                              {category?.category_status === "active" ? (
                                <button
                                  className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleCategoryActiveStatus(
                                      category?._id,
                                      category?.category_status
                                        ? "in-active"
                                        : "active"
                                    )
                                  }
                                >
                                  <span>Active</span>
                                </button>
                              ) : (
                                <button
                                  className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleCategoryInActiveStatus(
                                      category?._id,
                                      category?.category_status
                                        ? "active"
                                        : "in-active"
                                    )
                                  }
                                >
                                  <span>In-Active</span>
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {category?.category_status === "active" ? (
                                <span className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px]">
                                  <span>Active</span>
                                </span>
                              ) : (
                                <span className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] ">
                                  <span>In-Active</span>
                                </span>
                              )}
                            </>
                          )}
                        </td>
                        {(user?.role_id?.category_delete === true ||
                          user?.role_id?.category_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2 border border-gray-200">
                            <>
                              {user?.role_id?.category_delete === true && (
                                <button
                                  onClick={() =>
                                    handleDeleteCategoryTableRow(category)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-red-500"
                                  />
                                </button>
                              )}
                              {user?.role_id?.category_update === true && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleCategoryUpdateModal(category)
                                  }
                                >
                                  <FiEdit
                                    size={25}
                                    className="cursor-pointer text-updateBtnColor"
                                  />
                                </button>
                              )}
                            </>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoDataFound />
          )}

          {/* pagination */}
          {totalData > 1 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}

          {/* Show Category Update Modal */}
          {categoryUpdateModal && (
            <UpdateCategory
              setCategoryUpdateModal={setCategoryUpdateModal}
              categoryUpdateData={categoryUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CategoryTable;
