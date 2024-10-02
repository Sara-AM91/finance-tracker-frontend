const ListItem = ({ action, lastFive }) => {
  const first = lastFive.indexOf(action);
  const dateCreated = action.createdAt.split("T")[0];

  return (
    <div
      className={`px-3 py-5 flex items-center justify-between ${
        first !== 0 ? "border-t border-solid border-gray-700" : ""
      } cursor-pointer hover:bg-[#293458]`}
    >
      <div className="flex items-center">
        <img
          className="rounded-full h-10 w-10"
          src="https://loremflickr.com/g/600/600/girl"
          //src={action.category.icon}
        />
        <div className="ml-2 flex flex-col">
          <div className="leading-snug text-sm text-white font-bold uppercase pb-2">
            {action.title}
          </div>
          <div className="leading-snug text-xs text-gray-200 uppercase">
            {action.description}
          </div>
          <div className="leading-snug text-[8pt] text-gray-400 mt-1">
            CREATED: {dateCreated}
          </div>
        </div>
      </div>
      <p
        className={
          action.type === "income" ? "text-[#08D59C]" : "text-[#FF4500]"
        }
      >
        {action.type === "income" ? `+${action.amount}€` : `-${action.amount}€`}
      </p>
    </div>
  );
};

export default ListItem;
