import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Dialog from "@mui/material/Dialog";
import { useTransactionContext } from "../contexts/TransactionContext";

const DateCalendarModal = ({ open, handleClose }) => {
  const { transactions } = useTransactionContext();
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const dates = transactions.map((tr) => ({
        date: tr.date.split("T")[0],
        type: tr.type,
      }));
      setMarkedDates(dates);
      console.log("Marked Dates:", dates);
    }
  }, [transactions]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Dialog open={open} onClose={handleClose}>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()} // Set to today's date
              readOnly
            />
          </LocalizationProvider>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="rounded-md bg-gradient-to-r from-orange-500 to-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DateCalendarModal;
