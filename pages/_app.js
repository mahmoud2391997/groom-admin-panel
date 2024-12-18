import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ref, get } from "firebase/database";
import { database } from "../firebase";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    router.replace("/");
  }
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
  }, []);

  // Redirect to login if not logged in and trying to access protected routes
  useEffect(() => {
    if (!isLoggedIn && router.pathname !== "/dashboard") {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-screen w-full">
      {router.pathname !== "/" && (
        <div className="w-60 bg-purple-700 p-6 text-white h-full">
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
      <div className="flex-grow" style={{ width: "calc(100% - 240px)" }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
