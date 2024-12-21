const UserCard = ({
  photoURL,
  notificationToken,
  notification_status,
  location,
  state,
  pincode,
  requestsThisMonth,
  uid,
  updatedOn,
  fullName,
  contactNumber,
}) => {
  // Handle location if it's an object with latitude and longitude
  const formattedLocation = location
    ? `${location.latitude}, ${location.longitude}`
    : "Location not available";

  return (
    <div className="max-w-sm w-[300px] rounded-lg overflow-hidden shadow-lg bg-white mb-4">
      <img
        src={photoURL}
        alt="User Photo"
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Name: {fullName}
        </h2>
        <div className="text-gray-600 mt-2">
          Location:
          {location ? (
            <CoordinatesToAddress
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ) : (
            "N/A"
          )}
        </div>
        <p className="text-gray-600">State: {state}</p>
        <p className="text-gray-600">Pincode: {pincode}</p>

        <div className="mt-4">
          <p className="font-medium text-gray-700">
            Notification Status:{" "}
            <span
              className={
                notification_status ? "text-green-500" : "text-red-500"
              }
            >
              {notification_status ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p className="font-medium text-gray-700">
            Requests This Month: {requestsThisMonth}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-gray-700">Contact Number: {contactNumber}</p>
          <p className="text-gray-600">Last Updated: {updatedOn}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(uid, { state: "New State" })}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(uid)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
import axios from "axios";
import { useEffect, useState } from "react";

const CoordinatesToAddress = ({ latitude, longitude }) => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        if (response.data && response.data.address) {
          const fullAddress = response.data.address;
          setAddress(
            `${fullAddress.road || ""}, ${fullAddress.city || ""}, ${
              fullAddress.state || ""
            }, ${fullAddress.country || ""}`
          );
        } else {
          setError("Unable to fetch address.");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setError("Failed to fetch address. Please try again.");
      }
    };

    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude]);

  return (
    <div>
      {error && <p>{error}</p>}
      {address ? <p>Address: {address}</p> : <p>Loading address...</p>}
    </div>
  );
};
