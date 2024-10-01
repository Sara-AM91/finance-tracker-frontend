const DeleteAccount = ({ user, setUser }) => {
  return (
    <div>
      <h2 className="text-xl text-white">Close Account</h2>
      <p className="text-left text-base text-gray-400 mt-3">
        Here you can delete your existing account. Keep in my mind, that it´s a
        premanent removal and can´t be retrieved.
      </p>
      <button className="bg-gradient-to-r from-orange-500 to-rose-600 text-white py-2 px-4 rounded-lg text-base float-start">
        Delete
      </button>
    </div>
  );
};

export default DeleteAccount;
