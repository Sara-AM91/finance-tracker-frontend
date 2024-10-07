import { useState, useEffect } from "react";
import loginImg from "../assets/LoginPage.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Alert:
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(""); //can be 'success' or 'error'
  const [alertMessage, setAlertMessage] = useState("");

  //useNavigate to redirect after signup
  const navigate = useNavigate();
  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

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
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setAlertVisible(false);

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        console.log(data.error);
        if (data.error === "Email already exists") {
          setError(data.error);
          setAlertType("error");
          setAlertMessage(
            "This email is already registered. Please use a different email."
          );
        }
        //I don't need it because I used email validation in the front! But just in case!
        else if (data.error === "Invalid email address") {
          setError(data.error);
          setAlertType("error");
          setAlertMessage(
            "This email is not valid. Please use a different email."
          );
        } else {
          setAlertType("error");
          setAlertMessage("Something went wrong. Please try again.");
        }
        setAlertVisible(true);
        return;
      }

      if (res.ok) {
        setIsLoading(false);
        setAlertType("success");
        setAlertMessage("Your account has been created successfully!");
        setAlertVisible(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again");
      setAlertType("error");
      setAlertMessage("Something went wrong, please try again.");
      setAlertVisible(true);
    }
  };

  const isFormInvalid =
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    emailError ||
    feedback.length > 0 ||
    passwordError;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121428] to-[#000036]">
      {/* Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full p-10">
        {/* Left Side (Login Form) */}
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-10">
          {/* Used w-full instead of  w-[434px] for being responsive for mobile view*/}
          <div className="fixed p-8 rounded-lg shadow-lg w-full max-w-md h-[780px] bg-[#161a40] relative overflow-hidden border border-indigo-400">
            {/* Decorative Shape */}
            <div
              className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-purple-600 to-indigo-900 transform -translate-y-1/2 rounded-t-lg"
              style={{ clipPath: "ellipse(80% 60% at 50% 0%)" }}
            ></div>

            {/* Corrected SVG Wave at the top */}
            <div className="absolute top-0 left-0 w-full">
              <svg
                viewBox="0 0 1440 320"
                className="w-full h-[100px]"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="waveGradient"
                    gradientTransform="rotate(1)"
                  >
                    <stop offset="0%" stopColor="#7F3BCB" />
                    <stop offset="100%" stopColor="#633FD7" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#waveGradient)"
                  fillOpacity="1"
                  d="M0,320L48,293.3C96,267,192,213,288,202.7C384,192,480,224,576,234.7C672,245,768,235,864,218.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
              </svg>
            </div>
            <div className="pt-6">
              <h2 className="text-2xl mb-10 mt-10 font-normal text-[36px] text-white">
                Get on Board!
              </h2>
            </div>

            <form
              className="relative z-10 w-full flex flex-col space-y-2"
              onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4 pb-2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-4 pb-2">
                <input
                  type="email"
                  name="email"
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
              <div className="mb-4 pb-2 relative flex items-center">
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
              <div className="mb-4 pb-2">
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
                  type={confirmPasswordVisible ? "password" : "text"}
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[15px] text-[#969696]"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />

                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  onClick={toggleConfirmPasswordVisibility}
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

              <div
                className="flex flex-col items-center"
                style={{ paddingBottom: "50px", overflow: "auto" }}
              >
                <button
                  type="submit"
                  className={`w-[200px] h-[55px] font-normal text-[24px] text-white p-2 rounded-lg transition duration-300 ${
                    isFormInvalid || isLoading
                      ? "bg-gradient-to-b from-[#833ac9] to-[#5c40da] opacity-40 shadow-inner text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-b from-[#833ac9] to-[#5c40da] hover:bg-purple-700"
                  }`}
                  disabled={isFormInvalid || isLoading}
                >
                  Sign Up
                </button>
                <p className="font-normal text-[16px] text-[#969696]">
                  Already a member?{" "}
                  <Link to="/login" className="text-purple-400 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
            {/* Add Alert */}
            {alertVisible && (
              <div
                role="alert"
                className={`alert ${
                  alertType === "success" ? "alert-success" : "alert-error"
                } shadow-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      alertType === "success"
                        ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  />
                </svg>
                <span>{alertMessage}</span>
              </div>
            )}

            {/* End of Alert */}
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
