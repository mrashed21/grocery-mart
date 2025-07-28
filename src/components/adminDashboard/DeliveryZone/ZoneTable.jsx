"use client";

import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const ZoneTable = ({
  categoryTypes,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState();

  //update Category.....state
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [categoryUpdateData, setCategoryUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {categoryTypes?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="divide-x divide-gray-300  font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Delivery Zone</td>
                      <td className="whitespace-nowrap p-4 ">
                        Delivery Charge
                      </td>
                      <td className="whitespace-nowrap p-4 ">Zone Status</td>
                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="">
                    {categoryTypes?.data?.map((category, i) => (
                      <tr
                        key={category?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {serialNumber + i + 1}
                        </td>

                        <td className="whitespace-nowrap py-1.5  flex justify-center">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={category?.category_image}
                            alt=""
                          />
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {category?.category_name}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium ">
                          {category?.category_serial}
                        </td>


                        {(user?.role_id?.category_delete === true ||
                          user?.role_id?.category_update === true) && (
                          <td className="whitespace-nowrap px-4 py-2 ">
                            <>
                              {user?.role_id?.category_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteCategoryTableRow(category)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-deleteButtonColor"
                                  />
                                </button>
                              )}
                              {user?.role_id?.category_update && (
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

export default ZoneTable;
