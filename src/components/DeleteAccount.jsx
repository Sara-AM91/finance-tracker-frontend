const DeleteAccount = ({ user, setUser }) => {
  return (
    <div className="bg-[#161A40] p-4 rounded-3xl max-w-[28rem]">
      <h2 className="text-xl text-white">Close Account</h2>
      <p className="text-left text-base text-gray-400 mt-3">
        Here you can delete your existing account. Keep in my mind, that it´s a
        premanent removal and can´t be retrieved.
      </p>
      <button className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg ">
        Delete
      </button>
    </div>
  );
};

export default DeleteAccount;
