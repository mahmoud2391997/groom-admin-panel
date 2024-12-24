import { database } from "@/firebase.mjs";
import { get, ref, remove, update } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SingleServicePage = () => {
  const [state, setState] = useState({
    service: null,
    loading: true,
    error: null,
    isEditing: false,
  });
  const router = useRouter();
  const { serviceId } = router.query;

  const fetchSingleService = async (serviceId) => {
    const dataRef = ref(database, `customerOffers/${serviceId}`);
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setState({
          service: snapshot.val(),
          loading: false,
          error: null,
          isEditing: false,
        });
      } else {
        setState({
          service: null,
          loading: false,
          error: "No data available",
          isEditing: false,
        });
      }
    } catch (error) {
      setState({
        service: null,
        loading: false,
        error: "Failed to fetch data. Please try again.",
        isEditing: false,
      });
      console.error("Error fetching data:", error);
    }
  };

  const handleEditToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isEditing: !prevState.isEditing,
    }));
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDelete) {
      try {
        await remove(ref(database, `customerOffers/${serviceId}`));
        alert("Service deleted successfully.");
        router.push("/"); // Redirect to homepage or list page
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    try {
      const dataRef = ref(database, `customerOffers/${serviceId}`);
      await update(dataRef, state.service);
      alert("Service updated successfully.");
      setState((prevState) => ({ ...prevState, isEditing: false }));
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service. Please try again.");
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchSingleService(serviceId);
    }
  }, [serviceId]);

  const { service, loading, error, isEditing } = state;

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
              {isEditing ? (
                <form>
                  {[
                    { label: "Service Name", key: "serviceName" },
                    { label: "Service Type", key: "serviceType" },
                    { label: "Address", key: "address" },
                    { label: "Radius", key: "radius" },
                    { label: "Description", key: "description" },
                  ].map(({ label, key }, index) => (
                    <div key={index} className="flex border-b py-4 mb-4">
                      <label className="w-1/2 text-left text-sm md:text-base">
                        {label}:
                      </label>
                      <input
                        type="text"
                        className="w-1/2 text-right text-sm md:text-base border p-2 rounded"
                        value={service[key]}
                        onChange={(e) =>
                          setState((prevState) => ({
                            ...prevState,
                            service: {
                              ...prevState.service,
                              [key]: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  ))}
                </form>
              ) : (
                Object.entries(service).map(([key, value]) =>
                  key !== "location" ? (
                    <div key={key} className="flex border-b py-4 mb-4">
                      <div className="w-1/2 text-left text-sm md:text-base">
                        <strong>{key}:</strong>
                      </div>
                      <div className="w-1/2 text-right text-sm md:text-base">
                        {value || "N/A"}
                      </div>
                    </div>
                  ) : null
                )
              )}
            </div>
          </div>
          <div className="w-full h-full">
            <h2 className="text-3xl font-medium">Service Images</h2>
            {service.serviceImages ? (
              service.serviceImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={service.serviceName}
                  className="rounded-lg shadow-md w-full h-[90%] mt-7"
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
            <button
              onClick={handleSave}
              className="text-green-600 border-green-600 border-2 px-4 py-2 rounded mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="text-red-600 border-red-600 border-2 px-4 py-2 rounded mr-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleServicePage;
