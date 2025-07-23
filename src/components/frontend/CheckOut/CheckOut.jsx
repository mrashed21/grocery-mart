"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SlArrowRight } from "react-icons/sl";
import DeliveryInformation from "../Home/ProductCheckOut/DevliveryInformation";
import CheckOutTable from "./CheckOutTable";
const CheckOut = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const userInfo = false;

  return (
    <div>
      <div className="lg:my-5">
        <h2 className="flex mb-2">
          <Link href={"/"} className="flex items-center">
            Home
            <span>
              <SlArrowRight className="text-sm mx-1" />
            </span>
            Cart
          </Link>
        </h2>
      </div>

      <div className="grid grid-cols-3">
        <div className="grid-cols-2">
          <CheckOutTable />
        </div>
        <div className="grid-cols-1">
          <DeliveryInformation
            register={register}
            userInfo={userInfo}
            errors={errors}
            setValue={setValue}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
