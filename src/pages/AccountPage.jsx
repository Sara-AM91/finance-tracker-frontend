const AccountPage = () => {
  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <div className="bg-[#161A40] p-4 rounded-3xl text-xl text-white flex-grow">
        <h2 className="text-xl text-white">Account Settings</h2>
        <p className="text-left text-base text-gray-400 mt-3">
          Feel free to check our your account and your current account settings,
          such as Name, Profile Picture and more.
        </p>
        <div className="bg-[#161A40] w-full  p-8 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">Julianne Moore</p>
                <a href="#" className="text-blue-500 underline text-sm">
                  View Profile
                </a>
              </div>
            </div>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Upload
            </button>
          </div>
        </div>

        <div className="mt-8 ">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">First name</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 bg-gray-200 text-gray-900 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Last name</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-3 bg-gray-200 text-gray-900 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-200 text-gray-900 rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-gray-600 py-2 px-4 rounded-lg mr-4 hover:bg-gray-500">
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">
            Save
          </button>
        </div>
      </div>

      <div className=" flex flex-col sm:flex-row lg:flex-col gap-4">
        <div className="bg-[#161A40] p-4 rounded-3xl max-w-[32rem]">
          <h2 className="text-xl text-white">Change Password</h2>
          <p className="text-left text-base text-gray-400 mt-3">
            Here you can always change and reset your password. Ensure it´s
            strong enough!
          </p>
          <button className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg ">
            New Password
          </button>
        </div>
        <div className="bg-[#161A40] p-4 rounded-3xl max-w-[32rem]">
          <h2 className="text-xl text-white">Close Account</h2>
          <p className="text-left text-base text-gray-400 mt-3">
            Here you can delete your existing account. Keep in my mind, that
            it´s a premanent removal and can´t be retrieved.
          </p>
          <button className=" mt-5 mb-2 float-end text-white py-2 px-3 bg-orange-500 rounded-lg ">
            Delete
          </button>
          <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Proceed with caution
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
