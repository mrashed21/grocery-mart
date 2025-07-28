"use clint";

// import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
// import { BASE_URL } from "@/utils/baseURL";
// import { DateFormat } from "@/utils/DateFormate";
import Link from "next/link";

import { FaRegEye } from "react-icons/fa";
import { GoEye } from "react-icons/go";

const UserOrderTable = () => {
  //   const { data: userInfo, isLoading: userGetLoading } = useUserInfoQuery();
  const userInfo = false;
  const userGetLoading = false;
  const id = userInfo?.data?._id;
  const isLoading = false;
  const ordersData = false;
  //   const { data: ordersData, isLoading } = useQuery({
  //     queryKey: [`/api/v1/order?customer_id=${id}`],
  //     queryFn: async () => {
  //       const res = await fetch(`${BASE_URL}/order?customer_id=${id}`, {
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       return data;
  //     },
  //   });

  if (userGetLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-[#977b63] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="">loading...</div>
      ) : (
        <div className="pt-8">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="bg-[#5E8B8C]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                  <td className="whitespace-nowrap p-2">SL No</td>
                  <td className="whitespace-nowrap p-2">Date</td>

                  <td className="whitespace-nowrap p-2">Invoice No</td>

                  <td className="whitespace-nowrap p-2">Order Status</td>

                  <td className="whitespace-nowrap p-2">Total Amount</td>
                  <td className="whitespace-nowrap p-2">Discount Amount</td>
                  <td className="whitespace-nowrap p-2">Shipping Cost</td>
                  <td className="whitespace-nowrap p-2">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-2">Shipping Location</td>
                  <td className="whitespace-nowrap p-2">Division</td>
                  <td className="whitespace-nowrap p-2">District</td>
                  <td className="whitespace-nowrap p-2">Address</td>
                  <td className="whitespace-nowrap p-2">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.data?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#e4e0e1]"
                    }`}
                  >
                    <td className="whitespace-nowrap p-2"> {index + 1}</td>
                    <td className="whitespace-nowrap p-2">
                      {DateFormat(order?.createdAt)}
                    </td>

                    <td className="whitespace-nowrap p-2">
                      <Link
                        href={`/user-profile/order/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>

                    <td className="whitespace-nowrap p-2">
                      {order?.order_status == "shipped" ? (
                        <a
                          href={`https://steadfast.com.bd/t/${order?.tracking_code}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GoEye
                            size={22}
                            className="cursor-pointer text-gray-500 hover:text-gray-300 ml-8"
                          />
                        </a>
                      ) : (
                        order?.order_status
                      )}
                    </td>

                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.shipping_location}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.billing_division}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.billing_district}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.billing_address}
                    </td>

                    <td className="whitespace-nowrap flex justify-center items-center p-2">
                      <div>
                        <Link
                          href={`/user-profile/order/${order?._id}`}
                          className=" text-gray-500 hover:text-gray-900"
                        >
                          <FaRegEye size={23} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderTable;
