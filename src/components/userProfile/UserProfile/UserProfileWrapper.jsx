import UserAccountDetails from "./UserAccountDetails";
import UserAccountPassword from "./UserAccountPassword";
const UserProfileWrapper = () => {
  return (
    <div className="pt-8">
      <UserAccountDetails />
      <UserAccountPassword />
    </div>
  );
};

export default UserProfileWrapper;
