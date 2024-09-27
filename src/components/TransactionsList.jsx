import ListItem from "./ListItem";
import data from "./data.json";

const TransactionsList = ({ transactions }) => {
  const lastFive = transactions.slice(0, 5);

  return (
    <div className="w-full mx-auto p-4 overflow-auto">
      {lastFive.map((action) => (
        <ListItem key={action._id} action={action} lastFive={lastFive} />
      ))}
    </div>
  );
};

export default TransactionsList;
