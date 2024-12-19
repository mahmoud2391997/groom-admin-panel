// components/ServiceCard.js
import React from "react";

const ServiceCard = ({
  id, // Add an ID to uniquely identify the service
  address,
  dateTime,
  deposit,
  description,
  offerImages,
  priceRange,
  radius,
  selectedTime,
  serviceName,
  serviceType,
  onUpdate, // Callback for update
  onDelete, // Callback for delete
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-3">
      {/* Image */}
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={offerImages[0]}
        alt={serviceName}
      />
      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{serviceName}</h2>
        <p className="text-sm text-gray-500">{serviceType}</p>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        {/* Additional Info */}
        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Price Range:</span> {priceRange}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Radius:</span> {radius} km
          </p>
          <p className="text-sm">
            <span className="font-semibold">Selected Time:</span> {selectedTime}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date & Time:</span> {dateTime}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Address:</span> {address}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Deposit:</span>{" "}
            {deposit ? "Required" : "Not Required"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => onUpdate(id)}
          >
            Update
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
