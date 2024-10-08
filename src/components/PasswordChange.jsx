import { useEffect, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext"; // Import useAlert
import GlobalAlert from "./GlobalAlert ";

const PasswordChange = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(true);
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(true);

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const passwordSubmit = async () => {
    setLoading(true);

    setCurrentPasswordError("");
    setNewPasswordError(false);
    setConfirmPasswordError("");

    if (newPassword === currentPassword) {
      setNewPasswordError(true);
      showAlert(
        "error",
        "New password cannot be the same as the current password."
      );
      setLoading(false);
      return;
    }

    // Check if the new password is empty
    if (!newPassword || newPassword.trim() === "") {
      setNewPasswordError(true);
      showAlert("error", "New password cannot be empty.");
      setLoading(false);
      return;
    }

    // Check if the confirm password matches the new password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    const body = { currentPassword, newPassword, confirmPassword };

    try {
      const res = await fetch(
        "https://finance-tracker-api-eunu.onrender.com/user/profile/password",
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        if (data.error) {
          // Check if the error is related to the current password
          if (data.error.includes("Incorrect current password")) {
            setCurrentPasswordError("Current password is incorrect");
          } else {
            setCurrentPasswordError("");
          }
          showAlert("error", "There was an issue with changing your password");
        }
        return;
      }

      const data = await res.json();

      showAlert("success", "Password has been changed");

      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    let feedbackMessages = [];

    if (password === "") {
      setFeedback([]);
      return;
    }

    if (password.length >= 8) {
      strength += 25;
    } else {
      feedbackMessages.push("Password must be at least 8 characters long.");
    }

    //Check for numbers
    if (/\d/.test(password)) {
      strength += 25;
    } else {
      feedbackMessages.push("Password must contain at least one number.");
    }

    //Check for both lower and upper case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 25;
    } else {
      feedbackMessages.push(
        "Password must contain both uppercase and lowercase letters."
      );
    }

    //Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
    } else {
      feedbackMessages.push(
        "Password must contain at least one special character."
      );
    }
    setFeedback(feedbackMessages);
  };

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords don´t match");
    } else {
      setConfirmPasswordError("");
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (newPassword && !checkPasswordStrength(newPassword)) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  }, [newPassword]);

  return (
    <div className="my-10">
      <h2 className="text-xl text-white">Password</h2>
      <p className="text-sm mb-4 text-gray-400">Modify your current password</p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <label className="font-light text-xs text-gray-400">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CiLock size={25} color="white" />
            </div>
            <input
              id="current"
              type={currentPasswordVisible ? "password" : "text"}
              value={currentPassword || ""}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setCurrentPasswordError("");
              }}
              className="w-full py-3 pr-12 pl-12 bg-[#293458] text-white rounded-md text-base"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <FontAwesomeIcon
                icon={currentPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleCurrentPasswordVisibility}
                className="cursor-pointer text-gray-400 w-8"
              />
            </div>
          </div>
          {currentPasswordError && (
            <div className="text-red-500 text-xs mt-2">
              {currentPasswordError}
            </div>
          )}
        </div>

        <div>
          <label className="font-light text-xs text-gray-400">
            New Password
          </label>
          <div className="relative">
            <div className="md:relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <CiLock size={25} color="white" />
              </div>
              <input
                id="new"
                type={newPasswordVisible ? "password" : "text"}
                value={newPassword || ""}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-full py-3 pr-12 pl-12 bg-[#293458] text-white rounded-md text-base"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <FontAwesomeIcon
                  icon={newPasswordVisible ? faEyeSlash : faEye}
                  onClick={toggleNewPasswordVisibility}
                  className="cursor-pointer text-gray-400 w-8"
                />
              </div>
            </div>
            <div className="text-red-500 text-xs mt-2 md:absolute">
              {newPasswordError &&
                feedback.map((message, index) => <p key={index}>{message}</p>)}
            </div>
          </div>
        </div>

        <div>
          <label className="font-light text-xs text-gray-400">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <CiLock size={25} color="white" />
              </div>
              <input
                id="confirm"
                type={repeatPasswordVisible ? "text" : "password"}
                value={confirmPassword || ""}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="w-full py-3 pr-12 pl-12 bg-[#293458] text-white rounded-md text-base"
              />

              {/* Eye icon on the right */}
              <div className="absolute inset-y-0 right-3 flex items-center">
                <FontAwesomeIcon
                  icon={repeatPasswordVisible ? faEye : faEyeSlash}
                  onClick={toggleRepeatPasswordVisibility}
                  className="cursor-pointer text-gray-400 w-8"
                />
              </div>
            </div>
            {confirmPasswordError && (
              <div className="text-red-500 text-xs mt-2 md:absolute">
                {confirmPasswordError}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={passwordSubmit}
        className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base float-end mt-5"
      >
        Set Password
      </button>
    </div>
  );
};

export default PasswordChange;
