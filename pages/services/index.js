import React from "react";

const BarbershopServiceDashboard = () => {
  return (
    <div className="flex h-[100vh]" style={{ width: "calc(100% - 256px)" }}>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Service</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-md border-gray-300 mr-4"
            />
            <button className="px-4 py-2 bg-purple-700 text-white rounded-md">
              Filter
            </button>
            <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md">
              Add Service
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Start Time</th>
                <th className="px-6 py-3 text-left">End Time</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair cut</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">21:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Style</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">09:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-yellow-500">Pending</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Trimming</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">10:00</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Clean Shaving</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Beard Trimming</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-red-500">Cancelled</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair cut</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">21:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Style</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">09:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-yellow-500">Pending</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Trimming</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">10:00</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Clean Shaving</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Beard Trimming</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-red-500">Cancelled</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair cut</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">21:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Style</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">09:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-yellow-500">Pending</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hair Trimming</td>
                <td className="px-6 py-3">Uncategorized</td>
                <td className="px-6 py-3">10:00</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Clean Shaving</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3">20</td>
                <td className="px-6 py-3 text-green-500">Active</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Beard Trimming</td>
                <td className="px-6 py-3">Shaving</td>
                <td className="px-6 py-3">20:00</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3">15</td>
                <td className="px-6 py-3 text-red-500">Cancelled</td>
                <td className="px-6 py-3 text-blue-500 cursor-pointer">Edit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button className="px-4 py-2 bg-gray-300 rounded-md">Previous</button>
          <div className="flex items-center space-x-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BarbershopServiceDashboard;
