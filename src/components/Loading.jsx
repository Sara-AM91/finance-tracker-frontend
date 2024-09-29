// Loading.js
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <span className="loading loading-ring loading-lg"></span>{" "}
    {/* Use your loading spinner here */}
    <span className="ml-2 text-lg text-gray-700">Loading...</span>
  </div>
);

export default Loading;
