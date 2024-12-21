import { useRouter } from "next/router";
import { useState } from "react";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { get, ref, set, update } from "firebase/database";
import { database } from "@/firebase.mjs";
import { SignJWT } from "jose";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // Handle form submission

  const findUserByEmailAndPassword = async (
    email,
    plainTextPassword,
    userArray
  ) => {
    try {
      // Find user by email
      const user = userArray.find((user) => user.email === email);

      if (!user) {
        setError("Invalid Email or Password");

        return false;
      }

      // Verify password
      const isPasswordMatch = await bcrypt.compare(
        plainTextPassword,
        user.password
      );
      if (isPasswordMatch) {
        console.log("User authenticated successfully");
        const dataRef = ref(database, "secretKey");
        const snapshot = await get(dataRef);
        const secretKey = Object.values(snapshot.val())[0].secretKey;
        const secret = new TextEncoder().encode(secretKey); // Encode secret to Uint8Array
        const token = await new SignJWT({ email: username })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1h") // Token expires in 1 hour
          .sign(secret);
        console.log(token);
        console.log(snapshot.val());

        sessionStorage.setItem("token", token);
        router.replace("/dashboard");
        return true;
      } else {
        setError("Invalid Email or Password");
        return false;
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      return false;
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    } else {
      const dataRef = ref(database, "admins");
      try {
        const snapshot = await get(dataRef);
        findUserByEmailAndPassword(
          username,
          password,
          Object.values(snapshot.val())
        );
      } catch (error) {
        setError("Internet Connection Error");
        console.error("Error fetching data:", error);
      }
    }
    // Redirect to the dashboard without keeping login in history
  }
  return (
    <div className="h-screen flex justify-center items-center bg-purple-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-4"
        >
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
