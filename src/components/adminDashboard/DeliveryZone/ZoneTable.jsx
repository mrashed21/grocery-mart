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
import UpdateZone from "./UpdateZone";

const ZoneTable = ({
  zoneData,
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

  const [zoneUpdateModal, setZoneUpdateModal] = useState(false);
  const [zoneUpdateData, setZoneUpdateData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const handleZoneUpdateModal = (zone) => {
    setZoneUpdateModal(true);
    setZoneUpdateData(zone);
  };

  //Update Zone Status..
  const handleZoneActiveStatus = async (id, zone_status) => {
    try {
      const data = {
        _id: id,
        zone_status,
      };
      const response = await fetch(`${BASE_URL}/zone`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Zone status Update successfully", {
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
  // Inactive Zone Status..
  const handleZoneInActiveStatus = async (id, zone_status) => {
    try {
      const data = {
        _id: id,
        zone_status,
      };
      const response = await fetch(`${BASE_URL}/zone`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success("Zone status  Update successfully", {
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

  // const handleDeleteZone = (zone) => {};
  const handleDeleteZone = (zone) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${zone?.zone_name} Zone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: zone?._id,
        };
        try {
          const response = await fetch(
            `
                ${BASE_URL}/zone`,
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
              text: `${zone?.zone_name} Zone has been Deleted!`,
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

  return (
    <>
      {isLoading || adminLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {zoneData?.data?.length > 0 ? (
            <div className="mt-6 shadow-lg rounded-xl border border-gray-200">
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden border-collapse">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className=" font-semibold text-center">
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        SL No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Delivery Zone
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Delivery Charge
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Zone Status
                      </td>
                      {(user?.role_id?.zone_update === true ||
                        user?.role_id?.zone_delete === true) && (
                        <td className="whitespace-nowrap p-4 border border-gray-200">
                          Action
                        </td>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {zoneData?.data?.map((zone, i) => (
                      <tr
                        key={zone?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-amber-50" : "bg-white"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium border border-gray-200">
                          {serialNumber + i + 1}
                        </td>

                        <td className="whitespace-nowrap py-1.5 flex justify-center border-t border-gray-200">
                          <p>{zone?.zone_name}</p>
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium border border-gray-200">
                          {zone?.zone_delivery_charge}
                        </td>

                        <td className="whitespace-nowrap py-1.5 border border-gray-200">
                          {user?.role_id?.zone_update ? (
                            <>
                              {zone?.zone_status === "active" ? (
                                <button
                                  className="bg-green-500 text-white px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleZoneActiveStatus(
                                      zone?._id,
                                      zone?.zone_status ? "in-active" : "active"
                                    )
                                  }
                                >
                                  <span>Active</span>
                                </button>
                              ) : (
                                <button
                                  className="bg-red-500 text-white font-semibold px-[10px] py-[4px] rounded-[8px] cursor-pointer"
                                  onClick={() =>
                                    handleZoneInActiveStatus(
                                      zone?._id,
                                      zone?.zone_status ? "active" : "in-active"
                                    )
                                  }
                                >
                                  <span>In-Active</span>
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {zone?.zone_status === "active" ? (
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

                        {(user?.role_id?.zone_update === true ||
                          user?.role_id?.zone_delete === true) && (
                          <td className="whitespace-nowrap px-4 py-2 border border-gray-200">
                            <>
                              {user?.role_id?.zone_delete && (
                                <button onClick={() => handleDeleteZone(zone)}>
                                  <MdDeleteForever
                                    size={25}
                                    className="cursor-pointer text-red-500"
                                  />
                                </button>
                              )}

                              {user?.role_id?.zone_update === true && (
                                <button
                                  className="ml-3"
                                  onClick={() => handleZoneUpdateModal(zone)}
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
          {zoneUpdateModal && (
            <UpdateZone
              setZoneUpdateModal={setZoneUpdateModal}
              zoneUpdateData={zoneUpdateData}
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
