"use client";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import UserAccountDetails from "./UserAccountDetails";
import UserAccountPassword from "./UserAccountPassword";
const UserProfileWrapper = () => {
  const {
    data: userInfo,
    isLoading: userGetLoading,
    refetch,
  } = useUserInfoQuery();

  return (
    <div className="pt-8">
      <UserAccountDetails
        userInfo={userInfo}
        userGetLoading={userGetLoading}
        refetch={refetch}
      />
      <UserAccountPassword
        userInfo={userInfo}
        userGetLoading={userGetLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default UserProfileWrapper;
