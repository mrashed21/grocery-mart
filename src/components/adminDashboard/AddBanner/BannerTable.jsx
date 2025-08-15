"use client";

import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateBanner from "./UpdateBanner";

const BannerTable = ({
  banners,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  isLoading,
  user,
  adminLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [showBannerUpdateModal, setShowBannerUpdateModal] = useState(false);
  const [getBannerUpdateData, setGetBannerUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //banner Update data Function
  const handleBannerUpdateModal = (banner) => {
    setShowBannerUpdateModal(true);
    setGetBannerUpdateData(banner);
  };

  // Handle Delete Banner Table Row function
  const handleDeleteBannerTableRow = (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${banner?.banner_serial} no banner!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: banner?._id,
          banner_image_key: banner?.banner_image_key,
        };
        try {
          const response = await fetch(
            `
              ${BASE_URL}/banner`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();

          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${banner?.banner_serial} No Banner has been deleted!`,
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

  //Update Banner Status..
  const handleBannerActiveStatus = async (id, banner_status) => {
    try {
      const data = {
        _id: id,
        banner_status,
      };
      const response = await fetch(`${BASE_URL}/banner`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Banner status Update successfully", {
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
  // Inactive Banner Status..
  const handleBannerInActiveStatus = async (id, banner_status) => {
    try {
      const data = {
        _id: id,
        banner_status,
      };
      const response = await fetch(`${BASE_URL}/banner`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Banner status  Update successfully", {
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

  return (
    <>
      {isLoading || adminLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {banners?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg rounded-xl border border-gray-200">
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden border-collapse">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className=" font-semibold text-center">
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        SL No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Banner Image
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Banner Path
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Banner Serial No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Banner Status
                      </td>

                      {(user?.role_id?.banner_delete === true ||
                        user?.role_id?.banner_update === true) && (
                        <td className="whitespace-nowrap p-4 border border-gray-200">
                          Action
                        </td>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {banners?.data?.map((banner, i) => (
                      <tr
                        key={banner?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-amber-50" : "bg-white"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium  border border-gray-200">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 flex justify-center border-t border-gray-200">
                          <img
                            className="w-[44px] h-[44px] rounded-[8px]"
                            src={banner?.banner_image}
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium  border border-gray-200">
                          {banner?.banner_path || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium  border border-gray-200">
                          {banner?.banner_serial}
                        </td>

                        <td className="whitespace-nowrap py-1.5 border border-gray-200">
                          {user?.role_id?.banner_update === true ? (
                            <>
                              {banner?.banner_status === "active" ? (
                                <button
                                  className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleBannerActiveStatus(
                                      banner?._id,
                                      banner?.banner_status
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
                                    handleBannerInActiveStatus(
                                      banner?._id,
                                      banner?.banner_status
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
                              {banner?.banner_status === "active" ? (
                                <span className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] ">
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

                        {(user?.role_id?.banner_delete === true ||
                          user?.role_id?.banner_update === true) && (
                          <td className="whitespace-nowrap py-1.5 px-2  border border-gray-200">
                            <>
                              {user?.role_id?.banner_delete && (
                                <button
                                  onClick={() =>
                                    handleDeleteBannerTableRow(banner)
                                  }
                                >
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-red-500"
                                  />
                                </button>
                              )}
                              {user?.role_id?.banner_update && (
                                <button
                                  className="ml-3"
                                  onClick={() =>
                                    handleBannerUpdateModal(banner)
                                  }
                                >
                                  <FiEdit
                                    size={25}
                                    className="cursor-pointer "
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
          {/* Show Banner Update Modal */}
          {showBannerUpdateModal && (
            <UpdateBanner
              setShowBannerUpdateModal={setShowBannerUpdateModal}
              getBannerUpdateData={getBannerUpdateData}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BannerTable;
