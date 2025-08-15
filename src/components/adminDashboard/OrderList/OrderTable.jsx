"use client";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";

import Pagination from "@/components/shared/Pagination/Pagination";
import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { DateFormat } from "@/utils/DateFormate";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderTable = ({
  ordersData,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  user,
  adminLoading,
  refetch,
  staffData,
  isLoadingStaff,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [prevStatuses, setPrevStatuses] = useState({});

  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentOrderProducts, setCurrentOrderProducts] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const resetOtpModal = (restoreStatus = true) => {
    if (restoreStatus && currentOrderId && prevStatuses[currentOrderId]) {
      // Restore previous dropdown value instantly
      const updated = ordersData.map((order) =>
        order._id === currentOrderId
          ? { ...order, order_status: prevStatuses[currentOrderId] }
          : order
      );
    }
    setShowOtpModal(false);
    setCurrentOrderId(null);
    setCurrentOrderProducts(null);
    setOtp(["", "", "", ""]);
    setOtpLoading(false);
  };

  // Send OTP and open modal
  const requestOtpForDelivery = async (orderId, userName, userPhone) => {
    const sendData = {
      _id: orderId,
      send_delivered_otp: true,
      user_name: userName,
      user_phone: userPhone,
    };

    try {
      const res = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("OTP sent successfully", { autoClose: 1000 });
        setCurrentOrderId(orderId);
        setShowOtpModal(true);
      } else {
        toast.error(data?.message || "Failed to send OTP", { autoClose: 1000 });
        resetOtpModal(true);
      }
    } catch (err) {
      toast.error(err?.message || "OTP request failed", { autoClose: 1000 });
      resetOtpModal(true);
    }
  };

  // Verify OTP and update delivery status
  const verifyOtpAndDeliver = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      return toast.error("Enter complete 4-digit OTP", { autoClose: 1000 });
    }

    try {
      setOtpLoading(true);

      const payload = {
        _id: currentOrderId,
        order_status: "delivered",
        order_updated_by: user?._id,
        order_products: currentOrderProducts?.order_products?.map((item) => ({
          order_product_id: item?.order_product_id,
          order_product_price: item?.order_product_price,
          order_product_quantity: item?.order_product_quantity,
        })),
        delivered_otp: enteredOtp,
        staff_delivery: true,
      };

      // return;
      const res = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success(data?.message || "Order delivered successfully", {
          autoClose: 1000,
        });
        resetOtpModal(false);
        refetch();
      } else {
        toast.error(data?.message || "Invalid OTP", { autoClose: 1000 });
        // resetOtpModal(true);
        setOtpLoading(false);
      }
    } catch (err) {
      toast.error(err?.message || "Failed to verify OTP", { autoClose: 1000 });
      // resetOtpModal(true);
      setOtpLoading(false);
    } finally {
      // setOtpLoading(false);
      setOtpLoading(false);
    }
  };

  // Generic status update for non-delivered statuses
  const updateOrderStatus = async (order_status, _id, order_products) => {
    try {
      const sendData = {
        _id: _id,
        order_status: order_status,
        order_updated_by: user?._id,
      };
      const today = `${
        new Date().toISOString().split("T")[0]
      } ${new Date().toLocaleTimeString()}`;
      if (order_status === "assigned") sendData.assigned_time = today;
      if (order_status === "shipped") sendData.shipped_time = today;
      if (order_status === "cancel") sendData.cancel_time = today;
      if (order_status === "return") sendData.return_time = today;

      const response = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const result = await response.json();
      if (result?.success) {
        toast.success(result?.message || "Status updated successfully", {
          autoClose: 1000,
        });
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        resetOtpModal(true);
      }
    } catch (error) {
      toast.error(error?.message, { autoClose: 1000 });
      resetOtpModal(true);
    } finally {
      refetch();
    }
  };

  // // Main order status handler
  // const handleOrderStatus = (
  //   status,
  //   id,
  //   products,
  //   prevStatus,
  //   userName,
  //   userPhone
  // ) => {
  //   setPrevStatuses((prev) => ({ ...prev, [id]: prevStatus }));
  //   if (status === "delivered") {
  //     requestOtpForDelivery(id, products, userName, userPhone);
  //   } else {
  //     updateOrderStatus(status, id, products);
  //   }
  // };

  // Main order status handler
  const handleOrderStatus = (
    status,
    id,
    products,
    prevStatus,
    userName,
    userPhone
  ) => {
    setPrevStatuses((prev) => ({ ...prev, [id]: prevStatus }));

    if (status === "delivered") {
      if (user?.role_id?.order_show && user?.role_id?.admin_create) {
        updateOrderStatus(status, id, products);
      } else {
        requestOtpForDelivery(id, userName, userPhone);
        setCurrentOrderProducts(products);
      }
    } else {
      updateOrderStatus(status, id, products);
    }
  };

  // handle assign staff (unchanged)
  const handleOrderStaff = async (staffPayload, orderId, orderProducts) => {
    const { staff_id, order_status } = staffPayload;

    try {
      const sendData = {
        _id: orderId,
        order_status: order_status,
        assign_staff_id: staff_id,
      };

      const todayDateTime = `${
        new Date().toISOString().split("T")[0]
      } ${new Date().toLocaleTimeString()}`;
      if (order_status === "processing")
        sendData.processing_time = todayDateTime;
      if (order_status === "shipped") sendData.shipped_time = todayDateTime;
      if (order_status === "delivered") {
        sendData.delivered_time = todayDateTime;
        sendData.order_products = orderProducts;
      }
      if (order_status === "cancel") sendData.cancel_time = todayDateTime;
      if (order_status === "return") sendData.return_time = todayDateTime;

      const response = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const result = await response.json();
      if (result?.success) {
        toast.success(result?.message || "Status updated successfully", {
          autoClose: 1000,
        });
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error?.message, { autoClose: 1000 });
    } finally {
      refetch();
    }
  };

  return (
    <>
      {isLoading || adminLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="mt-5 overflow-x-auto scrollbar-thin shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr className="divide-x divide-gray-300 font-semibold text-center">
                  <td className="whitespace-nowrap p-4">SL No</td>
                  <td className="whitespace-nowrap p-4">Date</td>
                  <td className="whitespace-nowrap p-4">Invoice No</td>
                  <td className="whitespace-nowrap p-4">Customer Name</td>
                  <td className="whitespace-nowrap p-4">Customer Phone</td>
                  {user?.role_id?.order_update && (
                    <td className="whitespace-nowrap p-4">Order Status</td>
                  )}
                  {user?.role_id?.order_update && (
                    <td className="whitespace-nowrap p-4">Assign Staff</td>
                  )}
                  <td className="whitespace-nowrap p-4">Total Amount</td>
                  <td className="whitespace-nowrap p-4">Discount Amount</td>
                  <td className="whitespace-nowrap p-4">Shipping Cost</td>
                  <td className="whitespace-nowrap p-4">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4">Zone</td>
                  <td className="whitespace-nowrap p-4">Address</td>
                  <td className="whitespace-nowrap p-4">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-amber-50" : "bg-white"
                    }`}
                  >
                    <td className="whitespace-nowrap p-3">
                      {serialNumber + index + 1}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {DateFormat(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <Link
                        href={`/admin/order-info/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap p-3 capitalize">
                      {order?.user_id?.user_name || "-"}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.user_phone}
                    </td>

                    {user?.role_id?.order_update && (
                      <td className="whitespace-nowrap p-1">
                        <select
                          onChange={(e) =>
                            handleOrderStatus(
                              e.target.value,
                              order?._id,
                              order?.order_products,
                              order?.order_status,
                              order?.user_id?.user_name,
                              order?.user_phone,
                              setCurrentOrderProducts(order)
                            )
                          }
                          value={order?.order_status}
                          className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer capitalize"
                        >
                          <option value={order?.order_status}>
                            {order?.order_status}
                          </option>
                          {order?.order_status === "pending" && (
                            <>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}
                          {order?.order_status === "assigned" && (
                            <>
                              <option value="shipped">Shipped</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}
                          {order?.order_status === "shipped" && (
                            <>
                              <option value="delivered">Delivered</option>
                              <option value="return">Return</option>
                            </>
                          )}
                        </select>
                      </td>
                    )}

                    {user?.role_id?.order_update && (
                      <td className="whitespace-nowrap p-3">
                        {user?.role_id?.admin_delete &&
                        (order?.order_status === "pending" ||
                          order?.order_status === "assigned") ? (
                          <select
                            value={order?.assign_staff_id?._id || ""}
                            onChange={(e) =>
                              handleOrderStaff(
                                {
                                  staff_id: e.target.value,
                                  order_status: "assigned",
                                },
                                order?._id,
                                order?.order_products
                              )
                            }
                            className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 cursor-pointer rounded capitalize"
                          >
                            <option value="" disabled>
                              Select Staff
                            </option>
                            {!isLoadingStaff &&
                              staffData?.map((staff) => (
                                <option key={staff._id} value={staff._id}>
                                  {staff.admin_name}
                                </option>
                              ))}
                          </select>
                        ) : (
                          <span>
                            {order?.assign_staff_id?.admin_name || "-"}
                          </span>
                        )}
                      </td>
                    )}

                    <td className="whitespace-nowrap p-3">
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.zone_id?.zone_name}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {order?.shipping_address}
                    </td>
                    <td className="whitespace-nowrap flex justify-center items-center p-4">
                      <Link
                        href={`/admin/order-info/${order?._id}`}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <FaRegEye size={23} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enter Delivery OTP
              </h3>
              <p className="text-sm text-gray-600">
                Please enter the 4-digit OTP to confirm delivery
              </p>
            </div>
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                />
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => resetOtpModal(true)}
                disabled={otpLoading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtpAndDeliver}
                disabled={otpLoading || otp.join("").length !== 4}
                className="flex-1 px-4 py-2 text-white bg-[#084C4E] rounded-md hover:bg-[#053536] focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {otpLoading ? "Verifying..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
