import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ProviderServicesPage = () => {
  const router = useRouter();

  // Mock services data
  const [services, setServices] = useState([
    {
      serviceId: "202412172200386190080094",
      serviceName: "hjkkk",
      serviceType: "Nails",
      servicePrice: 2233,
      serviceDeposit: 999,
      workingHours: 8,
      maximumBookingPerDay: 8,
      serviceImages: [
        "https://firebasestorage.googleapis.com/v0/b/groom202406-web.appspot.com/o/users%2FJr2L02JH5TeHo1iELFEhrG9ucoQ2%2FproviderServiceImages%2F1734462029037.jpg?alt=media&token=493357d8-4eb0-4775-b54e-1e4ecfd2ed7e",
      ],
      userId: "Jr2L02JH5TeHo1iELFEhrG9ucoQ2",
    },
    {
      serviceId: "202412172300487290080105",
      serviceName: "Hair Cut",
      serviceType: "Hair",
      servicePrice: 1500,
      serviceDeposit: 500,
      workingHours: 6,
      maximumBookingPerDay: 5,
      serviceImages: ["https://via.placeholder.com/150"],
      userId: "Jr2L02JH5TeHo1iELFEhrG9ucoQ2",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to single service page
  const handleViewService = (serviceId) => {
    console.log(serviceId);

    router.push(`/providerServices/${serviceId}`);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Provider Services</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Service Name</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Deposit</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.serviceId} className="border-t">
              <td className="py-2 px-4">{service.serviceName}</td>
              <td className="py-2 px-4">{service.serviceType}</td>
              <td className="py-2 px-4">${service.servicePrice}</td>
              <td className="py-2 px-4">${service.serviceDeposit}</td>
              <td className="py-2 px-4 flex space-x-2">
                <Link href={`/providerServices/${service.serviceId}`}>
                  <button
                    onClick={() => {
                      console.log("asdasd");
                    }}
                    className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                  >
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderServicesPage;
