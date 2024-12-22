import { useState } from "react";

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email:"",
    password:"",
  })
  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      

      {/* Login Form Section */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
        <form className="flex flex-col gap-4">
        <div className="relative">
            <label htmlFor="fullname" className="block text-sm font-medium ">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="mt-1 block w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 block w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 font-medium hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Forgot password?{" "}
            <a href="/reset" className="text-indigo-500 font-medium hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </div>

      {/* Skeleton Blocks Section */}
      <div className="hidden lg:flex flex-1 flex-col gap-4 p-10">
        <div className="bg-gray-300 h-12 w-3/4 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-12 w-2/3 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-12 w-4/5 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 h-12 w-1/2 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SigninPage