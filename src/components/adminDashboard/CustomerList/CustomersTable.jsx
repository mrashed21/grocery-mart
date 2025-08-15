"use client";
import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CustomerStatusModal from "./CustomerStatusModal";

const CustomersTable = ({
  customers,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  user,
  isLoading,
  adminLoading,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState(false);

  const handleInactiveStatus = (customer) => {
    setCustomerData(customer);
    setIsStatusModalOpen(true);
  };
  return (
    <>
      {isLoading || adminLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {customers?.data.length > 0 ? (
            <div className="mt-6 shadow-lg rounded-xl border border-gray-200">
              <div className="overflow-x-auto ">
                <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden border-collapse">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="font-semibold text-center">
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        SL No
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Name
                      </td>
                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Phone
                      </td>

                      <td className="whitespace-nowrap p-4 border border-gray-200">
                        Status
                      </td>

                      {user?.role_id?.user_update === true && (
                        <td className="whitespace-nowrap p-4 border border-gray-200">
                          Action
                        </td>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {customers?.data?.map((customer, i) => (
                      <tr
                        key={customer?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-amber-50" : "bg-white"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium  border border-gray-200">
                          {i + 1}
                        </td>

                        <td className="whitespace-nowrap py-1.5  border border-gray-200 capitalize">
                          {customer?.user_name || "-"}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium  border border-gray-200">
                          {customer?.user_phone}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-semibold  capitalize border border-gray-200">
                          <p
                            className={`${
                              customer?.user_status === "active"
                                ? "text-green-600"
                                : customer?.user_status === "in-active"
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {(customer?.user_status || "").replace("-", " ")}
                          </p>
                        </td>

                        {user?.role_id?.user_update === true && (
                          <td className="whitespace-nowrap py-1.5 px-2  border border-gray-200">
                            <button
                              onClick={() => handleInactiveStatus(customer)}
                            >
                              <FiEdit size={25} className="cursor-pointer" />
                            </button>
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
        </div>
      )}
      {/* status update modal */}
      {isStatusModalOpen && (
        <CustomerStatusModal
          customerData={customerData}
          setIsStatusModalOpen={setIsStatusModalOpen}
        />
      )}
    </>
  );
};

export default CustomersTable;
