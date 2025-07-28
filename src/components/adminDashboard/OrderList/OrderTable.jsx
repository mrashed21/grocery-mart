"use client"
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";

import { GoEye } from "react-icons/go";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import Link from "next/link";


const OrderTable = ({
  ordersData,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  user,
  loading,
  refetch,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [buttonloading, setButtonLoading] = useState(false);

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //   handle order status
  const handleOrderStatus = async (order_status, _id, order_products) => {
    try {
      const sendData = {
        _id: _id,
        order_status: order_status,
        order_updated_by: user?._id,
      };
      if (order_status === "processing") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.processing_time = today;
      }
      if (order_status === "shipped") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.shipped_time = today;
      }
      if (order_status === "delivered") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.delivered_time = today;
        sendData.order_products = order_products;
      }
      if (order_status === "cancel") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.cancel_time = today;
        // sendData.order_products = order_products;
      }
      if (order_status === "return") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.return_time = today;
      }
      const response = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Status Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        refetch();
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      refetch();
    } finally {
      refetch();
    }
  };

  const handleOrderSendSteadFast = async (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to send this order to SteadFast?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        setButtonLoading(true);

        // Prepare order data
        const data = {
          invoice: order?.invoice_id,
          recipient_name: order?.customer_id?.user_name || "N/A",
          recipient_address: `${order?.billing_address}, ${order?.billing_district}, ${order?.billing_division}, ${order?.billing_country}`,
          recipient_phone: order?.customer_phone || "",
          cod_amount: order?.grand_total_amount,
          note: "",
        };

        // Send order to SteadFast API
        const response = await fetch(
          `https://portal.packzy.com/api/v1/create_order`,
          {
            method: "POST",
            headers: {
              // "Api-Key": "tc9iiq867dde8fnf4vjutvrbnpan5jfx",
              // "Secret-Key": "sfecxdfb3epe74fbu8v4pokf",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        // dada garments
        // api-key: tc9iiq867dde8fnf4vjutvrbnpan5jfx
        // secret-key: sfecxdfb3epe74fbu8v4pokf
        // Maheya garments
        // api-key: bsnadn4lsrdhuhjilbx04cgyj2srqrsa
        // secret-key: uhyoxpeacu8r2pxdgak3eb60
        // Aiman garments
        // api-key: imb5c4ev2itixc7hrjmoqnkfu7hehkpx
        // secret-key: alqvzcx6pwzytla4sehgubev

        // Parse API response
        const result = await response.json();

        if (result?.status !== 200 || !result?.consignment?.tracking_code) {
          throw new Error("Failed to send order to SteadFast.");
        }

        // Prepare order update data
        const sendData = {
          _id: order?._id,
          order_status: "processing",
          order_updated_by: user?._id,
          tracking_code: result?.consignment?.tracking_code,
          consignment_id: result?.consignment?.consignment_id,
        };

        // Update order status
        const updateResponse = await fetch(`${BASE_URL}/order`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        });

        const updateResult = await updateResponse.json();

        if (
          updateResult?.statusCode === 200 &&
          updateResult?.success === true
        ) {
          Swal.fire({
            title: "Sent!",
            text: "Order has been sent to SteadFast.",
            icon: "success",
          });
        } else {
          throw new Error("Failed to update order status.");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong.",
          icon: "error",
        });
        toast.error(error.message, { autoClose: 1000 });
      } finally {
        setButtonLoading(false);
        refetch();
      }
    });
  };

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  return (
    <>
      {isLoading || loading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Date</td>
                  {/* <td className="whitespace-nowrap p-4 ">Print</td>
                  <td className="whitespace-nowrap p-4 ">CN-ID</td> */}
                  <td className="whitespace-nowrap p-4 ">Invoice No</td>
                  <td className="whitespace-nowrap p-4 ">Customer Name</td>
                  <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                  {user?.role_id?.order_update === true && (
                    <td className="whitespace-nowrap p-4 ">Order Status</td>
                  )}
                  {user?.role_id?.order_update === true && (
                    <td className="whitespace-nowrap p-4 ">Send SteadFast</td>
                  )}
                  <td className="whitespace-nowrap p-4 ">Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Discount Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Cost</td>
                  <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Location</td>
                  <td className="whitespace-nowrap p-4 ">Division</td>
                  <td className="whitespace-nowrap p-4 ">District</td>
                  <td className="whitespace-nowrap p-4 ">Address</td>
                  <td className="whitespace-nowrap p-4 ">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {serialNumber + index + 1}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {DateFormat(order?.createdAt)}
                    </td>
                    {/* <td className="whitespace-nowrap p-3">
                      <button
                        onClick={() => handlePrintClick(order)}
                        className="flex items-center justify-center text-gray-800 hover:text-blue-700"
                      >
                        <FaPrint />
                        <span className="ml-2">Print</span>
                      </button>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.consignment_id || "--"}
                    </td> */}
                    <td className="whitespace-nowrap p-3">
                      <Link
                        href={`/all-order-info/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.customer_phone}
                    </td>
                    {/* <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.order_status}
                    </td> */}
                    {user?.role_id?.order_update === true &&
                      order?.order_status == "pending" && (
                        <td className="whitespace-nowrap p-1">
                          <select
                            onChange={(e) =>
                              handleOrderStatus(
                                e.target.value,
                                order?._id,
                                order?.order_products
                              )
                            }
                            id="order_status"
                            className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                          >
                            <option selected value={order?.order_status}>
                              {order?.order_status}
                            </option>
                            {order?.order_status !== "pending" &&
                              order?.order_status !== "processing" &&
                              order?.order_status !== "shipped" &&
                              order?.order_status !== "delivered" &&
                              order?.order_status !== "cancel" &&
                              order?.order_status !== "return" && (
                                <option value="pending">Pending</option>
                              )}
                            {/* {order?.order_status == "pending" && (
                            <option value="processing">Processing</option>
                          )} */}
                            {/* {order?.order_status == "processing" && (
                            <option value="shipped">Shipped</option>
                          )} */}
                            {(order?.order_status == "shipped" ||
                              order?.order_status == "pending") && (
                              <option value="delivered">Delivered</option>
                            )}
                            {order?.order_status !== "cancel" &&
                              order?.order_status !== "return" &&
                              order?.order_status !== "delivered" && (
                                <option value="cancel">Cancel</option>
                              )}
                            {/* {(order?.order_status == "pending" ||
                            order?.order_status == "processing") && (
                            <option value="return">Return</option>
                          )} */}
                            {/* {order?.order_status == "delivered" && (
                            <option value="return">Return</option>
                          )} */}
                          </select>
                        </td>
                      )}
                    <td className="whitespace-nowrap p-4">
                      {buttonloading ? (
                        <MiniSpinner />
                      ) : (
                        user?.role_id?.order_update === true &&
                        order?.order_status == "pending" && (
                          <div>
                            <button
                              className="h-[40px] rounded-[8px] py-[10px] px-[14px] bg-red-500 hover:bg-red-400 duration-200  text-white text-sm"
                              onClick={() => handleOrderSendSteadFast(order)}
                            >
                              Send SteadFast
                            </button>
                          </div>
                        )
                      )}
                    </td>

                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.shipping_location}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.billing_division}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.billing_district}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {" "}
                      {order?.billing_address}
                    </td>

                    <td className="whitespace-nowrap flex justify-center items-center p-4">
                      <div>
                        <Link
                          href={`/all-order-info/${order?._id}`}
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
          {/* pagination */}
          {totalData > 10 && (
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
    </>
  );
};

export default OrderTable;
