import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { Poppins } from "next/font/google";
import React from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"], // Add any weights you want to use
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  function isTokenExpired(token) {
    if (!token) {
      throw new Error("Token is required");
    }

    try {
      // Decode the token payload without verifying it
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));

      // Check if the token has an exp field
      if (!payload.exp) {
        throw new Error("Token does not have an expiration time");
      }

      // Calculate expiration time in milliseconds
      const expirationTime = payload.exp * 1000; // JWT exp is in seconds
      const currentTime = Date.now();

      // Return whether the token is expired
      return currentTime >= expirationTime;
    } catch (error) {
      return true; // Assume expired if token is invalid
    }
  }

  // Example usage

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      router.replace("/");
    } else {
      console.log("Token is valid");
    }
  }, [router]);
  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    router.replace("/");
  }

  // Redirect to login if not logged in and trying to access protected routes

  return (
    <div className={poppins.className + "flex h-screen w-full relative"}>
      {router.pathname !== "/" && (
        <div className="w-60  text-white h-full fixed left-0 bg-gray-100">
          <div className="bg-purple-700 mb-4 h-16 flex  items-center">
            <img
              src="/grom-logo.png"
              width={25}
              height={25}
              className="h-10 w-10 ml-5 mr-1"
            />
            <span className="font-bold  text-xl  ">Groom Admin</span>
          </div>
          <ul className="px-4 text-black ">
            <li>
              <a
                href="/dashboard"
                className="block py-2  hover:text-purple-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/Categories"
                className="block py-2 hover:text-purple-700 "
              >
                Service Categories
              </a>
            </li>
            <li>
              <a
                href="/customersComplaints"
                className="block py-2 hover:text-purple-700"
              >
                Customer Complaints
              </a>
            </li>
            <li>
              <a href="/clients" className="block py-2 hover:text-purple-700">
                Request Reservation
              </a>
            </li>
            <li>
              <a href="/reviews" className="block py-2 hover:text-purple-700">
                Reviews
              </a>
            </li>
            <li>
              <a href="/employees" className="block py-2 hover:text-purple-700">
                Report & Analytics
              </a>
            </li>

            <li>
              <a href="/glossary" className="block py-2 hover:text-purple-700 ">
                Glossary
              </a>
            </li>

            <li>
              <a
                href="/providerServices"
                className="block py-2 hover:text-purple-700 "
              >
                Provider Service
              </a>
            </li>
            <li>
              <a
                href="/customerOffers"
                className="block py-2 hover:text-purple-700 "
              >
                Customers Offers
              </a>
            </li>
            <li>
              <a href="/Users" className="block py-2 hover:text-purple-700 ">
                Users
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="block py-2 text-red-300 hover:text-white w-full text-left"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
      <div
        className={`flex-grow absolute ${
          router.pathname !== "/" ? "left-60" : ""
        } `}
        style={{
          width: `${router.pathname !== "/" ? "calc(100% - 240px)" : "100%"}`,
        }}
      >
        <Component {...pageProps} />
      </div>
    </div>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
