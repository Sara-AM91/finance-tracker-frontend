import ListItem from "./ListItem";

const TransactionsList = ({ transactions }) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ); // Sort in descending order

  // Get the last five transactions after sorting
  const lastFive = sorted.slice(0, 5);

  // Group transactions by date
  const groupedTransactions = lastFive.reduce((acc, transaction) => {
    const date = transaction.date.split("T")[0]; // Extract the date part (YYYY-MM-DD) using split method

    // Initialize the date key if it doesn't exist
    if (!acc[date]) {
      acc[date] = [];
    }

    // Push the transaction into the corresponding date group
    acc[date].push(transaction);
    return acc;
  }, {});

  return (
    <div className="w-full mx-auto x-4 pt-4 overflow-auto">
      {Object.entries(groupedTransactions).map(([date, actions]) => (
        <div key={date} className="mb-4">
          <h3 className="text-lg font-bold">{date}</h3>
          {actions.map((action) => (
            <ListItem key={action._id} action={action} lastFive={lastFive} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
