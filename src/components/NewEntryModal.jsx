import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useMediaQuery } from "@mui/material";

const NewEntryModal = ({ setOpen }) => {
  const [form, setForm] = useState({
    user: "",
    title: "",
    type: "",
    description: "",
    amouunt: "",
    date: "",
    invoice: "",
  });

  const handleSubmit = () => {};
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Detects screen sizes >= 768px (md breakpoint)

  return (
    <div className="relative z-10">
      <div
        transition="true"
        className="fixed inset-0 bg-blue-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="">
            <div
              transition="true"
              className="relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-[#161a40] border border-indigo-400 rounded-xl relative overflow-hidden">
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

                <div className="px-4 pb-4 pt-12 sm:p-6 sm:pb-4 relative z-10 mt-20">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div
                        as="h3"
                        className="text-lg font-semibold leading-6 text-white"
                      >
                        Add a Transaction
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          I dont know text
                        </p>

                        <input
                          className="w-full mt-4 p-2 rounded bg-[#222759] border border-indigo-300 text-white"
                          placeholder="Title"
                        />
                        <input
                          className="w-full mt-4 p-2 rounded bg-[#222759] border border-indigo-300 text-white"
                          placeholder="Description"
                        />
                        <input
                          className="w-full mt-4 p-2 rounded bg-[#222759] border border-indigo-300 text-white"
                          placeholder="Type"
                        />
                        <input
                          className="w-full mt-4 p-2 rounded bg-[#222759] border border-indigo-300 text-white"
                          placeholder="Category"
                        />
                        <div className="mt-4">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {isDesktop ? (
                              <DesktopDatePicker
                                defaultValue={dayjs("2022-04-17")}
                                slotProps={{
                                  textField: {
                                    InputProps: {
                                      style: {
                                        color: "#ffffff",
                                        background: "#222759",
                                      },
                                    },
                                    sx: {
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#A5B4FC",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "#bbdefb",
                                        },
                                      },
                                    },
                                  },
                                  day: {
                                    sx: {
                                      color: "#A5B4FC", // Day number color
                                    },
                                  },
                                  calendar: {
                                    sx: {
                                      "& .MuiDayCalendar-root": {
                                        backgroundColor: "#0d47a1",
                                        color: "#bbdefb",
                                      },
                                    },
                                  },
                                }}
                              />
                            ) : (
                              <MobileDatePicker
                                defaultValue={dayjs("2022-04-17")}
                                slotProps={{
                                  textField: {
                                    InputProps: {
                                      style: {
                                        color: "#ffffff",
                                        background: "#222759",
                                      },
                                    },
                                    sx: {
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#A5B4FC",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "#bbdefb",
                                        },
                                      },
                                    },
                                  },
                                  day: {
                                    sx: {
                                      color: "#A5B4FC", // Day number color
                                    },
                                  },
                                  calendar: {
                                    sx: {
                                      "& .MuiDayCalendar-root": {
                                        backgroundColor: "#0d47a1",
                                        color: "#bbdefb",
                                      },
                                    },
                                  },
                                }}
                              />
                            )}
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pt-3 pb-6 sm:flex sm:flex-row-reverse sm:px-6 relative z-10">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-gradient-to-t from-orange-500 to-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-b sm:ml-3 sm:w-auto"
                  >
                    Set Goal
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntryModal;
