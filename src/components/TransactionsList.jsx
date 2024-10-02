import ListItem from "./ListItem";
import { useState } from "react";
import ViewEntryModal from "../components/ViewEntryModal";
import EditEntryModal from "../components/EditEntryModal";

const TransactionsList = ({ transactions }) => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openEditEntryModal, setOpenEditEntryModal] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ); //Sort in descending order

  //Get the last five transactions after sorting
  const lastFive = sorted.slice(0, 5);

  //Group transactions by date
  const groupedTransactions = lastFive.reduce((acc, transaction) => {
    const date = transaction.date.split("T")[0]; //Extract the date part (YYYY-MM-DD) using split method

    //Initialize the date key if it doesn't exist
    if (!acc[date]) {
      acc[date] = [];
    }

    //Push the transaction into the corresponding date group
    acc[date].push(transaction);
    return acc;
  }, {});

  //Handle row click to open View Entry modal
  const handleRowClick = (expense) => {
    setEntryToEdit(expense);
    setOpenViewModal(true);
  };

  //Handle edit action from View Entry modal
  const handleEditFromViewModal = () => {
    setOpenViewModal(false);
    setTimeout(() => {
      setOpenEditEntryModal(true);
    }, 0);
  };

  //Function to handle viewing the transaction
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction); // Set the selected transaction
    setViewModalOpen(true); // Open the view modal
  };

  return (
    <div className="recent-transactions w-full mx-auto x-4 pt-4 overflow-auto">
      {Object.entries(groupedTransactions).map(([date, actions]) => (
        <div key={date} className="mb-4">
          <h3 className="text-lg font-semibold">{date}</h3>
          {actions.map((action, index) => (
            <div
              key={action._id}
              onClick={() => handleRowClick(action)} //Handle click to view transaction
              className="cursor-pointer"
            >
              <ListItem
                action={action}
                indexInGroup={index} //Pass the index of the action in its group
                groupSize={actions.length} //Pass the total number of actions in this group
              />
            </div>
          ))}
        </div>
      ))}

      {/* View Entry Modal */}
      {entryToEdit && (
        <ViewEntryModal
          open={openViewModal}
          setOpen={setOpenViewModal}
          entry={entryToEdit}
          onEdit={handleEditFromViewModal}
        />
      )}

      {/* Edit Entry Modal */}
      {entryToEdit && (
        <EditEntryModal
          open={openEditEntryModal}
          setOpen={setOpenEditEntryModal}
          entry={entryToEdit}
        />
      )}
    </div>
  );
};

export default TransactionsList;
