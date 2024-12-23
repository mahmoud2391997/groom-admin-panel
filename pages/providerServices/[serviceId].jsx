import CoordinatesToAddress from "@/components/CoordinatesToAddress";
import { database } from "@/firebase.mjs";
import axios from "axios";
import { get, ref, update, remove } from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleServicePage = () => {
  const [state, setState] = useState({
    service: null,
    loading: true,
    error: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const router = useRouter();
  const { serviceId } = router.query;

  const fetchAddress = async (latitude, longitude) => {
    try {
      console.log(latitude, longitude);

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (response.data && response.data.address) {
        const fullAddress = response.data.address;
        return `${fullAddress.road || ""}, ${fullAddress.city || ""}, ${
          fullAddress.state || ""
        }, ${fullAddress.country || ""}`;
      } else {
        console.error("Unable to fetch address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const fetchSingleService = async (serviceId) => {
    const dataRef = ref(database, `providerServices/${serviceId}`);
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const service = locationToAddress(snapshot.val());
        setState({ service, loading: false, error: null });
        setEditData(service); // Initialize edit form with existing service data
      } else {
        setState({ service: null, loading: false, error: "No data available" });
      }
    } catch (error) {
      setState({
        service: null,
        loading: false,
        error: "Failed to fetch data. Please try again.",
      });
    }
  };

  function locationToAddress(obj) {
    console.log(obj);

    const address = fetchAddress(obj.location.latitude, obj.location.longitude);
    return { ...obj, locationAddress: address };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const dataRef = ref(database, `providerServices/${serviceId}`);
    try {
      await update(dataRef, editData); // Save changes back to Firebase
      setState((prevState) => ({
        ...prevState,
        service: editData,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    const dataRef = ref(database, `providerServices/${serviceId}`);
    try {
      await remove(dataRef); // Delete service from Firebase
      router.push("/services"); // Redirect to the services list or another page
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const { service, loading, error } = state;

  useEffect(() => {
    if (serviceId) {
      fetchSingleService(serviceId);
    }
  }, [serviceId]);

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
        Single Provider Service
      </h1>
      <div className="w-[95%] bg-gray-200 rounded-lg m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
          <div className="w-full h-full flex flex-col">
            <h2 className="text-3xl font-medium">Service Info</h2>
            <div className="sm:p-6 md:p-10 max-h-[650px] w-full mx-auto bg-white rounded-lg mt-7">
              {[
                {
                  label: "Service Id",
                  value: service.serviceId,
                  key: "serviceId",
                },
                {
                  label: "Service Name",
                  value: service.serviceName,
                  key: "serviceName",
                },
                {
                  label: "Service Type",
                  value: service.serviceType,
                  key: "serviceType",
                },
                {
                  label: "Service Deposit",
                  value: service.serviceDeposit,
                  key: "serviceDeposit",
                },
                {
                  label: "Service Price",
                  value: service.servicePrice,
                  key: "servicePrice",
                },
                {
                  label: "Working Hours",
                  value: service.workingHours,
                  key: "workingHours",
                },
                {
                  label: "Maximum Booking Per Day",
                  value: service.maximumBookingPerDay,
                  key: "maximumBookingPerDay",
                },
                {
                  label: "Location",
                  value: service.locationAddress,
                  key: "locationAddress",
                }, // Not editable
              ].map(({ label, key, value }, index) => (
                <div
                  key={index}
                  className="flex border-b text-[#525252] py-4 mb-4"
                >
                  <div className="w-1/2 text-left text-sm md:text-base">
                    <strong>{label}:</strong>
                  </div>
                  <div className="w-1/2 text-right text-sm md:text-base">
                    {isEditing && key !== "locationAddress" ? (
                      <input
                        type="text"
                        name={key}
                        value={editData[key] || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      value || "N/A"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <h2 className="text-3xl font-medium">Service Images</h2>
            {service.serviceImages && service.serviceImages.length > 0 ? (
              service.serviceImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Service Image ${index + 1}`}
                  className="rounded-lg shadow-md w-full mt-7 h-auto"
                />
              ))
            ) : (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <h3>No Images Provided</h3>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between p-[2.5%] pt-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="text-green-600 border-green-600 border-2 px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-red-600 border-red-600 border-2 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 border-red-600 border-2 px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleServicePage;
