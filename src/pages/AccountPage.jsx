import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const AccountPage = () => {
  //const [user, setUser] = useState({});
  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const { user, setUser } = useOutletContext();

  useEffect(() => {
    if (user) {
      console.log("USER", user);
      setFirstname(user.firstName);
      setLastname(user.lastName);
      setEmail(user.email);
      setPicture(user.profilePic);
    }
  }, [user]);

  const handlePictureSubmit = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", picture);

    try {
      const res = await fetch("http://localhost:5000/user/profile/picture", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUser(data.user);
      console.log("Updated user:", data);
      setPicture(data.profilePic);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

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
                alt="Profile"
                className="w-24 h-24 rounded-full  bg-[#161A40] shadow-lg"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <button
              onClick={handlePictureSubmit}
              className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base"
            >
              Upload
            </button>
            <input
              type="file"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
            />
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
                  value={firstName || ""}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last name</label>
                <input
                  type="text"
                  placeholder={user.lastName}
                  value={lastName || ""}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder={user.email}
                  value={email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
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
