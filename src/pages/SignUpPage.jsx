import { useState } from "react";
import loginImg from "../assets/LoginPage.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);

  const validateEmail = (emailValue) => {
    setEmail(emailValue);

    if (emailValue === "") {
      setEmailError("");
      return;
    }
    const atIndex = emailValue.indexOf("@");
    if (atIndex === -1) {
      setEmailError("Email must include '@'.");
      return;
    }
    //Check that there's a "." after the "@" and there's at least one character before the "."
    const dotIndex = emailValue.indexOf(".", atIndex);
    if (dotIndex === -1) {
      setEmailError("Email must include a domain like '.com'.");
      return;
    } else if (dotIndex - atIndex < 2) {
      setEmailError(
        "There must be at least one character between '@' and '.'."
      );
      return;
    }
    const domainPart = emailValue.substring(dotIndex + 1);
    if (domainPart.length < 2 || domainPart.length > 4) {
      setEmailError("Invalid domain after the dot.");
      return;
    }
    setEmailError("");
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    validateEmail(emailValue);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    let feedbackMessages = [];

    if (password === "") {
      setStrength(0);
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

    setStrength(strength);
    setFeedback(feedbackMessages);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    checkConfirmPasswordMatch(confirmPassword, newPassword);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkConfirmPasswordMatch(newConfirmPassword, password);
  };

  const checkConfirmPasswordMatch = (confirmPassword, password) => {
    if (confirmPassword && confirmPassword !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121428] to-[#000036]">
      {/* First Background Curve */}
      <div className="absolute top-0 left-0 w-[1853px] h-[780.46px] bg-gradient-to-b from-[#121428] to-[#000036]">
        {/* Upper Curve */}
        <div
          className="absolute top-0 left-0 w-full h-dull bg-gradient-to-r from-[#121428] to-[#000036]"
          style={{ clipPath: "ellipse(80% 50% at 50% 0%)" }}
        ></div>
      </div>

      {/* Second Background Curve */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-l from-[#121428] to-[#000036]"
        style={{ clipPath: "ellipse(80% 60% at 50% 100%)" }}
      ></div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">
        {/* Left Side (Login Form) */}
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-10 ">
          {/* Used w-full instead of  w-[434px] for being responsive for mobile view*/}
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md h-[729px] bg-[#161a40] relative overflow-hidden border border-indigo-400">
            {/* Decorative Shape */}
            <div
              className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-purple-600 to-indigo-900 transform -translate-y-1/2 rounded-t-lg"
              style={{ clipPath: "ellipse(80% 60% at 50% 0%)" }}
            ></div>

            <h2 className="text-2xl mb-10 mt-10 font-normal text-[36px] text-white">
              Get on Board!
            </h2>

            <form className="relative z-10 w-full">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  //className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                  className={`w-full text-[20px] text-[#969696] p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                    emailError ? "ring-red-500" : "ring-purple-500"
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {/* Display email validation error */}
                {emailError && (
                  <p className="text-red-500 text-xs mt-2">{emailError}</p>
                )}
              </div>
              {/* The wrapper (div) is set to relative to control the position of the icon inside the input field. */}
              {/* Adding flex and items-center aligns the content (input and icon) vertically in the center.*/}
              <div className="mb-4 relative flex items-center">
                <input
                  type={passwordVisible ? "password" : "text"}
                  placeholder="Enter Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[15px] text-[#969696]"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                />
              </div>
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      strength === 100
                        ? "bg-green-500"
                        : strength >= 75
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${strength}%` }}
                  ></div>
                </div>
              </div>
              {/* Feedback Section */}
              <div className="text-red-500 text-xs mb-4">
                {feedback.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>

              <div className="mb-4 relative flex items-center">
                <input
                  type={passwordVisible ? "password" : "text"}
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[15px] text-[#969696]"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />

                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-2">{passwordError}</p>
              )}
              <p className="text-center text-[#969696] text-[14px]">
                By creating an account, you agree to the{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </p>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="w-[200px] h-[55px] bg-gradient-to-b from-[#833ac9] to-[#5c40da] hover:bg-purple-700 font-normal text-[24px] text-white p-2 rounded-lg transition duration-300"
                  disabled={
                    emailError !== "" ||
                    feedback.length > 0 ||
                    passwordError !== ""
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center relative z-10">
              <p className="font-normal text-[16px] text-[#969696]">
                Already a member?{" "}
                <Link to="/" className="text-purple-400 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (image) */}
        <div className="hidden md:flex md:w-1/2 w-full justify-center items-center p-10 ml-60">
          <img
            src={loginImg}
            alt="Finance illustration"
            className="w-full max-w-xs md:max-w-lg h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
