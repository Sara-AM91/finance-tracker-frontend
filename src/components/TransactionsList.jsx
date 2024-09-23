import ListItem from "./ListItem";
import data from "./data.json";

const TransactionsList = () => {
  const lastFive = data.slice(0, 5);

  return (
    <div className="w-full mx-auto p-4">
      {lastFive.map((action) => (
        <ListItem key={action._id} action={action} lastFive={lastFive} />
      ))}
    </div>
  );
};

export default TransactionsList;
