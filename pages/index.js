import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    } else if (username !== "admin@gmail.com" || password !== "12345678") {
      setError("Invalid Email or Password");
    } else {
      sessionStorage.setItem("isLoggedIn", true);
      router.replace("/dashboard"); // Redirect to the dashboard without keeping login in history
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-purple-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl text-center text-purple-700 font-bold mb-4">
          Groom Admin Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-purple-700">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-purple-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
