// pages/_app.js
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  function handleLogout() {
    router.replace("/");
    localStorage.removeItem("isLoggedIn");
  }
  useEffect(() => {
    // Check login status
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  // Redirect to login if not logged in and trying to access protected routes

  return (
    <div className="flex h-screen w-full">
      {isLoggedIn && router.pathname !== "/" && (
        <div className="w-64 bg-purple-700 p-6 text-white h-full">
          <div className="font-bold text-xl mb-8">Groom Admin</div>
          <ul className="h-full">
            <li>
              <a
                href="/dashboard"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/Categories"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Service Categories
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/clients"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Clients
              </a>
            </li>
            <li>
              <a
                href="/employees"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Employees
              </a>
            </li>
            <li>
              <a
                href="/employeesSchedule"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Employee Schedule
              </a>
            </li>
            <li>
              <a
                href="/glossary"
                className="block py-2 text-gray-300 hover:text-white"
              >
                Glossary
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
      <div className="flex-grow p-6">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
