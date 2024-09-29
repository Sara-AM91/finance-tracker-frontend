import AccountSettings from "../components/AccountSettings";
import PasswordChange from "../components/PasswordChange";
import DeleteAccount from "../components/DeleteAccount";
import { useOutletContext } from "react-router-dom";

const AccountPage = () => {
  const { user, setUser } = useOutletContext();
  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <AccountSettings user={user} setUser={setUser} />
      <div className=" flex flex-col sm:flex-row lg:flex-col gap-4 ">
        <PasswordChange setUser={setUser} />
        <DeleteAccount user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default AccountPage;
