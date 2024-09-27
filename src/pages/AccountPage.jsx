import { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setUser(result);
        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <div className="bg-[#161A40] p-4 rounded-3xl text-xl text-white flex-grow">
        <h2 className="text-xl text-white">Account Settings</h2>
        <p className="text-left text-base text-gray-400 mt-3">
          Feel free to check our your account and your current account settings,
          such as Name, Profile Picture and more.
        </p>
        <div className="bg-[#161A40] w-full  p-8 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.profilePic}
                value={picture}
                onChange={(e) => {
                  setPicture(e.target.value);
                }}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base">
              Upload
            </button>
          </div>
        </div>
        <div className="mt-8 ">
          <div className="bg-[#161A40] w-full  p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">First name</label>
                <input
                  type="text"
                  placeholder={user.firstName}
                  value={firstName}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  className="w-full p-3 bg-gray-200 text-gray-900 rounded-md text-base"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last name</label>
                <input
                  type="text"
                  placeholder={user.lastName}
                  value={lastName}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  className="w-full p-3 bg-gray-200 text-gray-900 rounded-md text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full p-3 bg-gray-200 text-gray-900 rounded-md text-base"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-600 py-2 px-4 rounded-lg mr-4 hover:bg-gray-500 text-base">
                Cancel
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg  text-base">
                Save
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className=" flex flex-col sm:flex-row lg:flex-col gap-4">
        <div className="bg-[#161A40] p-4 rounded-3xl max-w-[32rem]">
          <h2 className="text-xl text-white">Change Password</h2>
          <p className="text-left text-base text-gray-400 mt-3">
            Here you can always change and reset your password. Ensure it´s
            strong enough!
          </p>
          <button className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg ">
            New Password
          </button>
        </div>
        <div className="bg-[#161A40] p-4 rounded-3xl max-w-[32rem]">
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
