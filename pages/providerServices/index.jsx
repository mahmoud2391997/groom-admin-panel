import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { get, ref } from "firebase/database";
import { database } from "@/firebase.mjs";

const ProviderServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock services data
  const fetchSercives = async () => {
    const dataRef = ref(database, "providerServices");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        console.log(snapshot.val());

        setServices(Object.values(snapshot.val()));
        setFilteredServices(Object.values(snapshot.val()));
        setLoading(false);
      } else {
        setError("No data available");
        return null;
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSercives();
  }, []);
  useEffect(() => {
    setFilteredServices(
      services.filter((service) =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  console.log(filteredServices);

  // Navigate to single service page

  loading && <div>Loading...</div>;
  error && <div>Error...</div>;
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Provider Services</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Service Name</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Deposit</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.serviceId} className="border-t">
              <td className="py-2 px-4">{service.serviceName}</td>
              <td className="py-2 px-4">{service.serviceType}</td>
              <td className="py-2 px-4">${service.servicePrice}</td>
              <td className="py-2 px-4">${service.serviceDeposit}</td>
              <td className="py-2 px-4 flex space-x-2">
                <Link href={`/providerServices/${service.serviceId}`}>
                  <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderServicesPage;
