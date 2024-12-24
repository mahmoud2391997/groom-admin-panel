import { useState } from "react";
import PropTypes from "prop-types";

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "", // Optionally auto-generate or input
    address: "",
    dateTime: "",
    deposit: false,
    description: "",
    offerImages: [], // URLs of images
    priceRange: "",
    radius: "",
    selectedTime: "",
    serviceName: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.offerImages.length === 0) {
      alert("Please add at least one image.");
      return;
    }
    onSubmit(formData); // Pass data to the parent component
  };

  const handleImageUpload = () => {
    const newImage = prompt("Enter image URL:");
    if (newImage) {
      setFormData((prev) => ({
        ...prev,
        offerImages: [...prev.offerImages, newImage],
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Service Name</label>
        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Service Type</label>
        <input
          type="text"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium">Price Range</label>
        <input
          type="text"
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Radius (in km)</label>
        <input
          type="text"
          name="radius"
          value={formData.radius}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date & Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Selected Time</label>
        <input
          type="text"
          name="selectedTime"
          value={formData.selectedTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deposit</label>
        <input
          type="checkbox"
          name="deposit"
          checked={formData.deposit}
          onChange={handleChange}
        />
        <span className="ml-2 text-sm">Required</span>
      </div>

      <div>
        <label className="block text-sm font-medium">Offer Images</label>
        <button
          type="button"
          onClick={handleImageUpload}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded"
        >
          Add Image URL
        </button>
        <ul className="mt-2 space-y-1">
          {formData.offerImages.map((url, index) => (
            <li key={index} className="text-sm text-gray-600">
              {url}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

ServiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ServiceForm;
