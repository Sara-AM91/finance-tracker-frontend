import loginImg from "../assets/LoginPage.png";
const SignUpPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121428] to-[#000036]">
      {/* First Background Curve */}
      <div className="absolute top-0 left-0 w-[1853px] h-[780.46px] bg-gradient-to-b from-[#121428] to-[#000036]">
        {/* Upper Curve */}
        <div
          className="absolute top-0 left-0 w-full h-dull bg-gradient-to-r from-[#121428] to-[#000036]"
          style={{ clipPath: "ellipse(80% 50% at 50% 0%)" }}
        ></div>
      </div>

      {/* Second Background Curve */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-l from-[#121428] to-[#000036]"
        style={{ clipPath: "ellipse(80% 60% at 50% 100%)" }}
      ></div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">
        {/* Left Side (Login Form) */}
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-10 ">
          {/* Used w-full instead of  w-[434px] for being responsive for mobile view*/}
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md h-[729px] bg-[#161a40] relative overflow-hidden border border-indigo-400">
            {/* Decorative Shape */}
            <div
              className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-purple-600 to-indigo-900 transform -translate-y-1/2 rounded-t-lg"
              style={{ clipPath: "ellipse(80% 60% at 50% 0%)" }}
            ></div>

            <h2 className="text-2xl mb-10 mt-10 font-normal text-[36px] text-white">
              Get on Board!
            </h2>

            <form className="relative z-10 w-full">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] text-[#969696]"
                />
              </div>

              <p className="text-center text-[#969696] text-[14px]">
                By creating an account, you agree to the{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </p>

              <div className="flex justify-center mt-6">
                <button className="w-[200px] h-[55px] bg-gradient-to-b from-[#833ac9] to-[#5c40da] hover:bg-purple-700 font-normal text-[24px] text-white p-2 rounded-lg transition duration-300">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center relative z-10">
              <p className="font-normal text-[16px] text-[#969696]">
                Already a member?{" "}
                <a
                  href="#"
                  className="font-normal text-[16px] text-purple-400 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (image) */}
        <div className="hidden md:flex md:w-1/2 w-full justify-center items-center p-10 ml-60">
          <img
            src={loginImg}
            alt="Finance illustration"
            className="w-full max-w-xs md:max-w-lg h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
