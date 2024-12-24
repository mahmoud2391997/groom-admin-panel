import { useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import { database } from "@/firebase";
import Link from "next/link";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredServices(
      services.filter((service) =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, services]);

  const fetchServices = async () => {
    const dataRef = ref(database, "customerOffers");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        console.log(
          Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...value,
          }))
        );

        setServices(
          Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...value,
          }))
        );
        setFilteredServices(
          Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...value,
          }))
        );
      } else {
        setServices([]); // No data found
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [services]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Offers</h1>

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
            <th className="py-2 px-4 text-left">Price Range</th>
            <th className="py-2 px-4 text-left">Deposit Payment</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="py-2 px-4">{service.serviceName}</td>
              <td className="py-2 px-4">{service.serviceType}</td>
              <td className="py-2 px-4">{service.priceRange}$</td>
              <td className="py-2 px-4">
                {service.deposit ? "Provided" : "Not provided"}
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <Link href={`/customerOffers/${service.id}`}>
                  <button
                    onClick={() => {
                      console.log(service.id);
                    }}
                    className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                  >
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

export default ServicesPage;
