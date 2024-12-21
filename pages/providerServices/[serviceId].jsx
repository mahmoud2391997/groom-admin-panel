"use client";

import { useRouter } from "next/router";
import React from "react";
const SingleServicePage = () => {
  const router = useRouter();
  const { serviceId } = router.query;

  // Mock service data
  const service = {
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
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-6 ">
      <div className="w-[95%] bg-gray-200 rounded-lg m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
          <img
            src={service.serviceImages[0]}
            alt={service.serviceName}
            className="rounded-lg shadow-md w-full h-full"
          />

          <div className=" sm:p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-lg">
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2  text-left text-sm md:text-base">
                <strong>Service Id:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.serviceId}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Service Name:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.serviceName}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Service Type:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.serviceType}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Service Deposit:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.serviceDeposit}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Service Price:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.servicePrice}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Working Hours:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.workingHours}
              </div>
            </div>
            <div className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
                <strong>Maximum Booking Per Day:</strong>
              </div>
              <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
                {service.maximumBookingPerDay}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent">

        </div>
      </div>
    </div>
  );
};

export default SingleServicePage;
