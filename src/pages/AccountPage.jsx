import AccountSettings from "../components/AccountSettings";
import PasswordChange from "../components/PasswordChange";
import DeleteAccount from "../components/DeleteAccount";
import { useOutletContext } from "react-router-dom";

const AccountPage = () => {
  const { user, setUser } = useOutletContext();
  return (
    <div className="w-full bg-[#161A40] p-4 rounded-3xl ">
      <h2 className="text-xl text-white">Account Settings</h2>
      <p className="text-left text-base text-gray-400 mt-3">
        Feel free to check our your account and your current account settings,
        such as Name, Profile Picture and more.
      </p>
      <div className="flex flex-col gap-6 px-2 sm:px-10 lg:px-20 mt-10">
        {/* <AccountSettings user={user} setUser={setUser} />
        <PasswordChange setUser={setUser} />
        <DeleteAccount user={user} setUser={setUser} /> */}
      </div>
    </div>
  );
};

export default AccountPage;
