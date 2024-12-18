// pages/services.js
import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import { get, ref } from "firebase/database";
import { database } from "@/firebase";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track error

  const fetchUsers = async () => {
    const dataRef = ref(database, "customerOffers"); // Path to all services
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        console.log(snapshot.val()); // Logs the resolved data
        return snapshot.val(); // Return the data for further use
      } else {
        console.log("No data available");
        setError("No data available"); // Set error if no data exists
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again."); // Set error if fetching fails
    } finally {
      setLoading(false); // Ensure loading state is set to false after fetching
    }
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedServices = await fetchUsers();
      if (fetchedServices) {
        setServices(Object.values(fetchedServices)); // Set the services once data is fetched
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">
        Available Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          return <ServiceCard key={service.offerId} {...service} />;
        })}
      </div>
    </div>
  );
};

export default ServicesPage;
