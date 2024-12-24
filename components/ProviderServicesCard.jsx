import PropTypes from "prop-types";

const ServiceCard = ({
  serviceId, // Unique ID for the service
  address,
  description,
  cancellationPolicy,
  serviceImages,
  appointmentDuration,
  bufferTime,
  location,
  maximumBookingPerDay,
  serviceDeposit,
  serviceName,
  onUpdate, // Callback for update
  onDelete, // Callback for delete
}) => {
  return (
    <div className="bg-gray-100 max-w-sm mx-auto  border border-gray-200 rounded-lg shadow-md overflow-hidden p-3">
      {/* Image */}
      {serviceImages && serviceImages.length > 0 && (
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={serviceImages[0]}
          alt={serviceName}
        />
      )}
      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{serviceName}</h2>
        <p className="text-sm text-gray-500">
          <CoordinatesToAddress
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </p>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        {/* Additional Info */}
        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Appointment Duration:</span>{" "}
            {appointmentDuration} minutes
          </p>
          <p className="text-sm">
            <span className="font-semibold">Buffer Time:</span> {bufferTime}{" "}
            minutes
          </p>
          <p className="text-sm">
            <span className="font-semibold">Cancellation Policy:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: cancellationPolicy }} />
          </p>
          <p className="text-sm">
            <span className="font-semibold">Maximum Booking per Day:</span>{" "}
            {maximumBookingPerDay}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Deposit:</span>{" "}
            {serviceDeposit ? "Required" : "Not Required"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Address:</span> {address}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => onUpdate(serviceId)}
          >
            Update
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
            onClick={() => onDelete(serviceId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  serviceId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cancellationPolicy: PropTypes.string.isRequired,
  serviceImages: PropTypes.array.isRequired,
  appointmentDuration: PropTypes.number.isRequired,
  bufferTime: PropTypes.number.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  maximumBookingPerDay: PropTypes.number.isRequired,
  serviceDeposit: PropTypes.number.isRequired,
  serviceName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default ServiceCard;
import { useEffect, useState } from "react";
import axios from "axios";

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

CoordinatesToAddress.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};
