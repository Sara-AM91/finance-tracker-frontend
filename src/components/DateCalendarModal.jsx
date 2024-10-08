import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Dialog from "@mui/material/Dialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
// import { useTransactionContext } from "../contexts/TransactionContext"; // Uncomment if using context

const DateCalendarModal = ({ open, handleClose }) => {
  // const { transactions } = useTransactionContext();
  // const [markedDates, setMarkedDates] = useState([]);

  // useEffect(() => {
  //   if (transactions.length > 0) {
  //     const dates = transactions.map((tr) => ({
  //       date: tr.date.split("T")[0],
  //       type: tr.type,
  //     }));
  //     setMarkedDates(dates);
  //   }
  // }, [transactions]);

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            backgroundColor: "#161A40",
            color: "#ffffff",
            border: "none",
            "&:hover": {
              backgroundColor: "#26376D",
            },
            "&.Mui-selected": {
              backgroundColor: "#F36713",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#FF208B",
              },
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            "&.MuiDayCalendar-weekDayLabel": {
              color: "white",
            },
          },
        },
      },

      MuiDayCalendar: {
        styleOverrides: {
          header: {
            background: "linear-gradient(90deg, #633FD7 0%, #7F3BCB 100%)",
            borderBottom: "none",
            color: "red", // Style for header text color
          },
          headerTypography: {
            color: "#ffffff", // Style for header text color
          },
          weekContainer: {
            backgroundColor: "#161A40",
            borderBottom: "none",
          },
        },
      },
      MuiPickersBasePicker: {
        styleOverrides: {
          root: {
            backgroundColor: "#001f3f",
            color: "#ffffff",
          },
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          root: {
            "& .MuiIconButton-root": {
              color: "white",
            },
          },
        },
      },
    },
  });

  const theme2 = createTheme({
    components: {
      MuiPickersCalendarHeader: {
        styleOverrides: {
          dayLabel: {
            color: "red",
          },
        },
      },
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <ThemeProvider theme={theme}>
        <div className="sm:p-4 text-white bg-[#000036] shadow-lg border border-solid border-indigo-400 box-border">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()} // Today's date
              readOnly
            />
          </LocalizationProvider>

          <div className="mt-4 float-end">
            <button
              onClick={handleClose}
              className="rounded-md bg-gradient-to-r from-orange-500 to-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm mr-2 mb-2"
            >
              Close
            </button>
          </div>
        </div>
      </ThemeProvider>
    </Dialog>
  );
};

export default DateCalendarModal;
