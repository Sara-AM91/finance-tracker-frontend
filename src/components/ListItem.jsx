//Dynamically import all icons from the `src/assets/icons` folder
const icons = import.meta.glob("../assets/icons/*.png", { eager: true });

const ListItem = ({ action, indexInGroup, groupSize }) => {
  const dateCreated = action.createdAt.split("T")[0];

  //Resolve the icon path using the `action.category.icon` value
  const categoryIconPath = action.category.icon
    ? icons[`../assets/icons/${action.category.icon}`]?.default
    : null;
  return (
    <div
      className={`px-3 py-5 flex items-center justify-between ${
        indexInGroup !== 0 ? "border-t border-solid border-gray-700" : ""
      } cursor-pointer hover:bg-[#293458]`}
    >
      <div className="flex items-center">
        <img
          className="h-10 w-10"
          src={categoryIconPath || "https://loremflickr.com/g/600/600/girl"}
          style={{
            filter:
              "invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(200%) contrast(100%)",
          }} //Makes the icon white
          alt={`${action.category.title} icon`}
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
