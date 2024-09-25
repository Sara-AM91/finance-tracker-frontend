import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
const TrashIconWithCross = ({ filtersActive }) => (
  <div className="relative w-6 h-6">
    {/* Trash Icon */}
    <AiFillDelete className="w-6 h-6 text-gray-400" />
    {/* Red Cross Icon */}
    {filtersActive && (
      <AiOutlineClose
        className="absolute top-0 right-0 w-3 h-3 text-red-500"
        style={{ transform: "translate(25%, -25%)" }}
      />
    )}
  </div>
);
export default TrashIconWithCross;
