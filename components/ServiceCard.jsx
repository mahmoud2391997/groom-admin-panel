// components/ServiceCard.js
import React from "react";

const ServiceCard = ({
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
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <img
        className="w-full h-48 object-cover"
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
            <span className="font-semibold">Radius:</span> {radius}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Time:</span> {selectedTime}
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
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
