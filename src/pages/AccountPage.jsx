import AccountSettings from "../components/AccountSettings";
import PasswordChange from "../components/PasswordChange";
import { useOutletContext } from "react-router-dom";

const AccountPage = () => {
  const { user, setUser } = useOutletContext();
  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <AccountSettings user={user} setUser={setUser} />
      <div className=" flex flex-col sm:flex-row lg:flex-col gap-4 ">
        <PasswordChange setUser={setUser} />
        <div className="bg-[#161A40] p-4 rounded-3xl max-w-[28rem]">
          <h2 className="text-xl text-white">Close Account</h2>
          <p className="text-left text-base text-gray-400 mt-3">
            Here you can delete your existing account. Keep in my mind, that
            it´s a premanent removal and can´t be retrieved.
          </p>
          <button className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg ">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
