import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen w-full">
      <div className="w-64 bg-purple-700 p-6 text-white h-full">
        <div className="font-bold text-xl mb-8">Groom Admin</div>
        <ul className="h-full">
          <li>
            <a href="/" className="block py-2 text-gray-300 hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="Categories"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Service Categories
            </a>
          </li>
          <li>
            <a
              href="services"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="clients"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Clients
            </a>
          </li>
          <li>
            <a
              href="employees"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Employees
            </a>
          </li>
          <li>
            <a
              href="employeesSchedule"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Employee Schedule
            </a>
          </li>
        </ul>
      </div>
      <Component {...pageProps} />;
    </div>
  );
}
