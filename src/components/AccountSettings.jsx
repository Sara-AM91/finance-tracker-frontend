import { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { useAlert } from "../contexts/AlertContext"; // Import useAlert
import GlobalAlert from "./GlobalAlert ";
import CropEasy from "./crop/CropEasy";

const AccountSettings = ({ setUser, user }) => {
  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [existingEmailError, setExistingEmailError] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  const [error, setError] = useState(null);

  const [openCrop, setOpenCrop] = useState(false);

  const handleFileChange = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result); // Set the base64 string
      setOpenCrop(true); // Open the crop modal after setting the picture
    };
  };

  const { showAlert } = useAlert();

  useEffect(() => {
    if (user) {
      //  console.log("USER", user);
      setFirstname(user.firstName);
      setLastname(user.lastName);
      setEmail(user.email);
      setPicture(user.profilePic);
      setAddress(user.address);
      setCity(user.city);
      setZipCode(user.zipCode);
      setCountry(user.country);
      setPhone(user.phone);
    }
  }, [user]);

  const handlePictureSubmit = async (croppedFile) => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", croppedFile); // Use the cropped file

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
        const errorData = await res.text();
        showAlert("error", "Profile picture upload failed.");
        throw new Error(errorData.error || "Profile picture upload failed.");
      }
      const data = await res.json();
      setUser(data.user);
      setPicture(data.profilePic); // Update the picture in the state
      showAlert("success", "Profile Picture successfully created");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");

      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      address,
      city,
      zipCode,
      country,
      phone,
    };

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
        const data = await res.json();
        if (data.error) {
          // Check if the error is related to the current password
          if (data.error.includes("Email already exists")) {
            setExistingEmailError("Email already exists");
          } else {
            setExistingEmailError("");
          }
        }
        return;
      }

      const data = await res.json();

      setUser(data.user);
      setPicture(null);
      showAlert("success", "Profile details successfully updated");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const validateEmail = (email) => {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return !!String(phone).match(
      /^[\+]?(\d{1,3})?\W?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}$/im
    );
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError("Please provide a valid email address");
    } else {
      setEmailError("");
    }

    if (phone && !validatePhone(phone)) {
      setPhoneError("Please provide a valid email");
    } else {
      setPhoneError("");
    }
  }, [email, phone]);

  return (
    <>
      <div className="w-full rounded-3xl shadow-lg p-5 glass ">
        <div className="flex lg:items-center items-start justify-between flex-col lg:flex-row">
          <div className="flex items-center">
            {loading ? (
              <div className="h-24 w-24 flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : (
              <label htmlFor="file-input" className="cursor-pointer">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full bg-[#161A40] shadow-lg"
                />
                {/* Hidden file input */}
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      handleFileChange(e.target.files[0]); // Call the new function
                    } else {
                      setPicture(null);
                    }
                  }}
                  className="hidden" // Hide the input
                />
              </label>
            )}

            <div className="ml-4">
              <p className="text-2xl font-semibold text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {openCrop && (
        <CropEasy
          picture={picture}
          setPicture={setPicture}
          setOpenCrop={setOpenCrop}
          handlePictureSubmit={handlePictureSubmit}
        />
      )}

      <div className="mt-8 w-full">
        <div>
          <h2 className="text-xl text-white mb-4">Full Name</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-400">First name</label>
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
              <label className="block text-xs text-gray-400">Last name</label>
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
        </div>
        <div className="h-[2px] w-full bg-[#1a243d] mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl text-white">Contact Email</h2>
          <p className="text-sm mb-4 text-gray-400">
            Your email address is used to login to this plattform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="relative">
              <label className="block text-xs text-gray-400">Email</label>
              <div className="relative">
                {/* Mail icon centered on the left */}
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <CiMail size={25} color="white" />
                </div>

                {/* Input field */}
                <input
                  type="email"
                  placeholder={user.email}
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pr-12 pl-12 bg-[#293458] text-white rounded-md text-base"
                />
              </div>
              {emailError && (
                <div className="absolute">
                  <p className="text-red-500 text-xs mt-2">{emailError}</p>
                </div>
              )}
              {existingEmailError && (
                <div className="absolute">
                  <p className="text-red-500 text-xs mt-2">
                    {existingEmailError}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-[#1a243d] mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl text-white">Address</h2>
          <p className="text-sm mb-4 text-gray-400">
            Feel free to add your address
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-xs text-gray-400">Address</label>
              <input
                type="text"
                value={address || ""}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400">City</label>
              <input
                type="text"
                value={city || ""}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Zip Code</label>
              <input
                type="text"
                value={zipCode || ""}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Country</label>
              <input
                type="text"
                value={country || ""}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="w-full p-3 bg-[#293458] text-white rounded-md text-base"
              />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-[#1a243d] mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl text-white mb-4">Phone Number</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="relative">
              <label className="block text-xs text-gray-400">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <CiPhone size={25} color="white" />
                </div>
                <input
                  type="tel"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-3 pr-12 pl-12 bg-[#293458] text-white rounded-md text-base"
                />
              </div>
              {phoneError && (
                <div className="absolute">
                  <p className="text-red-500 text-xs mt-2">{phoneError}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDetailsSubmit}
            className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base"
          >
            Save
          </button>
        </div>
      </div>
      <GlobalAlert />
    </>
  );
};

export default AccountSettings;
