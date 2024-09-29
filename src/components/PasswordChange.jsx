import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const PasswordChange = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const passwordSubmit = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    const body = { currentPassword, newPassword, confirmPassword };

    try {
      const res = await fetch("http://localhost:5000/user/profile/password", {
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

      setUser(data.user);
      navigate("/login");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="bg-[#161A40] p-4 rounded-3xl flex-grow max-w-[28rem]">
      <div className="flex justify-between">
        <h2 className="text-xl text-white">Change Password</h2>
        <FontAwesomeIcon
          icon={passwordVisible ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
          className="cursor-pointer text-gray-400 w-8"
        />
      </div>
      <p className="text-left text-base text-gray-400 mt-3">
        Here you can always change and reset your password. Ensure it´s strong
        enough!
      </p>

      <div className="flex flex-col gap-5 p-4">
        <div>
          <label className="font-light text-xs text-white">
            Current Password
          </label>
          <input
            id="current"
            type={passwordVisible ? "password" : "text"}
            value={currentPassword || ""}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
          />
        </div>
        <div>
          <label className="font-light text-xs text-white">New Password</label>
          <input
            id="new"
            type={passwordVisible ? "password" : "text"}
            value={newPassword || ""}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
          />
        </div>

        <div>
          <label className="font-light text-xs text-white">
            Confirm New Password
          </label>
          <input
            id="confirm"
            type={passwordVisible ? "password" : "text"}
            value={confirmPassword || ""}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
          />
        </div>
      </div>
      <button
        onClick={passwordSubmit}
        className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg "
      >
        New Password
      </button>
    </div>
  );
};

export default PasswordChange;
