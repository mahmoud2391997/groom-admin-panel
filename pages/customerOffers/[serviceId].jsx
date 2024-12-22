import { database } from "@/firebase.mjs";
import { get, ref } from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleServicePage = () => {
  const [state, setState] = useState({
    service: null,
    loading: true,
    error: null,
  });
  const router = useRouter();
  const { serviceId } = router.query;

  const fetchSingleService = async (serviceId) => {
    const dataRef = ref(database, `customerOffers/${serviceId}`);
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setState({ service: snapshot.val(), loading: false, error: null });
      } else {
        setState({ service: null, loading: false, error: "No data available" });
      }
    } catch (error) {
      setState({
        service: null,
        loading: false,
        error: "Failed to fetch data. Please try again.",
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchSingleService(serviceId);
    }
  }, [serviceId]);

  const { service, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!service) {
    return <div>No service data found.</div>;
  }

  return (
    <div className="w-full p-6">
      <h1 className="ml-[2.5%] mb-5 text-5xl font-semibold">
        Single Customer Offer
      </h1>
      <div className="w-[95%] bg-gray-200 rounded-lg m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
          <div className="w-full h-full flex flex-col">
            <h2 className="text-3xl font-medium">Service Info</h2>
            <div className="sm:p-6 md:p-10 w-full mx-auto bg-white rounded-lg mt-7">
              {[
                { label: "Service Id", value: service.id },
                { label: "Service Name", value: service.serviceName },
                { label: "Service Type", value: service.serviceType },
                {
                  label: "Service Deposit",
                  value: service.deposit ? "Yes" : "No",
                },
                { label: "Service Price Range", value: service.priceRange },
                { label: "Working Hours", value: "Not Specified" }, // Adjust based on actual data
                { label: "Maximum Booking Per Day", value: "Not Specified" }, // Adjust based on actual data
                { label: "Address", value: service.address },
                { label: "Radius", value: service.radius },
                { label: "Selected Time", value: service.selectedTime },
                { label: "User ID", value: service.userId },
                { label: "Description", value: service.description },
                {
                  label: "Date/Time",
                  value: new Date(service.dateTime).toLocaleString(),
                },
                {
                  label: "Location",
                  value: `Lat: ${service.location.latitude}, Lng: ${service.location.longitude}`,
                },
              ].map(({ label, value }, index) => (
                <div
                  key={index}
                  className="flex border-b text-[#525252] py-4 mb-4"
                >
                  <div className="w-1/2 text-left text-sm md:text-base">
                    <strong>{label}:</strong>
                  </div>
                  <div className="w-1/2 text-right text-sm md:text-base">
                    {value || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full">
            <h2 className="text-3xl font-medium">Service Images</h2>

            {service.serviceImages ? (
              service.serviceImages?.map((image) => {
                <img
                  src={image}
                  alt={service.serviceName}
                  className="rounded-lg shadow-md w-full h-[90%] mt-7"
                />;
              })
            ) : (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <h3>No Images Provided</h3>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between p-[2.5%] pt-0">
          <button className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded mr-2">
            Edit
          </button>
          <button className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded mr-2">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleServicePage;
