import { useState, useEffect } from "react";

const AccountSettings = ({ setUser, user }) => {
  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      //  console.log("USER", user);
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
    setLoading(true);
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
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDetailsSubmit = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");

      return;
    }

    const body = { firstName, lastName, email };
    console.log("body:", body);

    try {
      const res = await fetch("http://localhost:5000/user/profile/details", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Updated user:", data.user);
      setUser(data.user);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div className="bg-[#161A40] p-4 rounded-3xl text-xl text-white flex-grow">
      <h2 className="text-xl text-white">Account Settings</h2>
      <p className="text-left text-base text-gray-400 mt-3">
        Feel free to check our your account and your current account settings,
        such as Name, Profile Picture and more.
      </p>
      <div className="bg-[#161A40] w-full  p-8 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {loading ? (
              <div className="h-24 w-24 flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full  bg-[#161A40] shadow-lg"
              />
            )}

            <div className="ml-4">
              <p className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handlePictureSubmit}
            className={
              loading
                ? "bg-gradient-to-r from-cyan-500 to-teal-400 opacity-40 shadow-inner text-gray-300 cursor-not-allowed py-2 px-4 rounded-lg  text-base"
                : "bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg  text-base"
            }
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
            <button
              onClick={handleDetailsSubmit}
              className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg  text-base"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
