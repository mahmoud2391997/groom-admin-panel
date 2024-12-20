import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ProviderServicesCard";
import { get, ref, remove, push, set } from "firebase/database";
import { database } from "@/firebase";

const ServiceList = () => {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const fetchProviderServices = async () => {
    const dataRef = ref(database, "providerServices");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setServices(snapshot.val());
      } else {
        setError("No data available");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    const serviceRef = ref(database, `providerServices/${serviceId}`);
    try {
      await remove(serviceRef);
      setServices((prevServices) => {
        const updatedServices = { ...prevServices };
        delete updatedServices[serviceId];
        return updatedServices;
      });
    } catch (error) {
      setError("Failed to delete service. Please try again.");
    }
  };

  const handleOpenPopup = (service = null) => {
    setCurrentService(service);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setCurrentService(null);
    setShowPopup(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (service) => {
    try {
      if (service.serviceId) {
        // Find the existing service
        const existingService = services[service.serviceId];

        // Identify only the changed fields
        const updatedFields = Object.keys(service).reduce((acc, key) => {
          if (service[key] !== existingService[key]) {
            acc[key] = service[key];
          }
          return acc;
        }, {});

        if (Object.keys(updatedFields).length > 0) {
          // Update only the changed fields
          const serviceRef = ref(
            database,
            `providerServices/${service.serviceId}`
          );
          await update(serviceRef, updatedFields);
        }
      } else {
        // Add new service
        const newServiceRef = push(ref(database, "providerServices"));
        service.serviceId = newServiceRef.key;
        await set(newServiceRef, service);
      }
      setServices((prevServices) => ({
        ...prevServices,
        [service.serviceId]: service,
      }));
      handleClosePopup();
    } catch (error) {
      setError("Failed to save service. Please try again.");
    }
  };

  useEffect(() => {
    fetchProviderServices();
  }, []);

  const filteredServices = Object.values(services).filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-auto p-4">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => handleOpenPopup()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.serviceId}
            serviceId={service.serviceId}
            address={service.address}
            description={service.description}
            cancellationPolicy={service.cancellationPolicy}
            serviceImages={service.serviceImages}
            appointmentDuration={service.appointmentDuration}
            bufferTime={service.bufferTime}
            location={service.location}
            maximumBookingPerDay={service.maximumBookingPerDay}
            serviceDeposit={service.serviceDeposit}
            serviceName={service.serviceName}
            onUpdate={() => handleOpenPopup(service)}
            onDelete={() => handleDelete(service.serviceId)}
          />
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {currentService ? "Edit Service" : "Add Service"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const service = {
                  serviceId: currentService?.serviceId || null,
                  serviceName: formData.get("serviceName"),
                  description: formData.get("description"),
                  location: formData.get("location"),
                  appointmentDuration: formData.get("appointmentDuration"),
                  bufferTime: formData.get("bufferTime"),
                  maximumBookingPerDay: formData.get("maximumBookingPerDay"),
                  serviceDeposit: formData.get("serviceDeposit"),
                  cancellationPolicy: formData.get("cancellationPolicy"),
                };
                handleSubmit(service);
              }}
            >
              <input
                name="serviceName"
                defaultValue={currentService?.serviceName || ""}
                placeholder="Service Name"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="description"
                defaultValue={currentService?.description || ""}
                placeholder="Description"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
              <input
                name="location"
                defaultValue={currentService?.location || ""}
                placeholder="Location"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                name="appointmentDuration"
                defaultValue={currentService?.appointmentDuration || ""}
                placeholder="Appointment Duration"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                name="bufferTime"
                defaultValue={currentService?.bufferTime || ""}
                placeholder="Buffer Time"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                name="maximumBookingPerDay"
                defaultValue={currentService?.maximumBookingPerDay || ""}
                placeholder="Max Bookings Per Day"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                name="serviceDeposit"
                defaultValue={currentService?.serviceDeposit || ""}
                placeholder="Service Deposit"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <textarea
                name="cancellationPolicy"
                defaultValue={currentService?.cancellationPolicy || ""}
                placeholder="Cancellation Policy"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
