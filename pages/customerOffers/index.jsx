import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import ServiceForm from "../../components/ServiceForm";
import { get, ref, push, remove, update } from "firebase/database";
import { database } from "@/firebase";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchServices = async () => {
    const dataRef = ref(database, "customerOffers");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setServices(
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

  const handleAddService = async (newService) => {
    const dataRef = ref(database, "customerOffers");
    try {
      await push(dataRef, newService);
      fetchServices(); // Refresh services after adding
      setShowForm(false); // Close form after submission
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleUpdateService = async (id, updatedData) => {
    const dataRef = ref(database, `customerOffers/${id}`);
    try {
      await update(dataRef, updatedData);
      fetchServices(); // Refresh services after updating
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDeleteService = async (id) => {
    const dataRef = ref(database, `customerOffers/${id}`);
    try {
      await remove(dataRef);
      fetchServices(); // Refresh services after deleting
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">
        Available Services
      </h1>

      {/* Add Service Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        {showForm ? "Close Form" : "Add New Service"}
      </button>

      {/* Add Service Form */}
      {showForm && (
        <div className="mb-8 bg-white p-6 rounded shadow">
          <ServiceForm onSubmit={handleAddService} />
        </div>
      )}

      {/* Conditional Rendering */}
      {services.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          <p>No data found.</p>
          <p className="text-sm">Click "Add New Service" to add one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onDelete={() => handleDeleteService(service.id)}
              onUpdate={(updatedData) =>
                handleUpdateService(service.id, updatedData)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
