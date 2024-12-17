import { useState } from "react";

const BarbershopServiceDashboard = () => {
  // State for services
  const [services, setServices] = useState([
    {
      name: "Hair cut",
      category: "Uncategorized",
      startTime: "21:00",
      endTime: "20:00",
      client: "20",
      status: "Active",
    },
    {
      name: "Hair Style",
      category: "Uncategorized",
      startTime: "09:00",
      endTime: "15:00",
      client: "15",
      status: "Pending",
    },
    {
      name: "Hair Trimming",
      category: "Uncategorized",
      startTime: "10:00",
      endTime: "10:00",
      client: "10",
      status: "Active",
    },
    {
      name: "Clean Shaving",
      category: "Shaving",
      startTime: "20:00",
      endTime: "20:00",
      client: "20",
      status: "Active",
    },
    {
      name: "Beard Trimming",
      category: "Shaving",
      startTime: "20:00",
      endTime: "15:00",
      client: "15",
      status: "Cancelled",
    },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for showing the "Add Service" modal and form data
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    startTime: "",
    endTime: "",
    client: "",
    status: "Active",
  });

  // State for editing a service
  const [editingService, setEditingService] = useState(null);

  // Filtered services based on search query
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new service
  const handleAddService = () => {
    if (
      newService.name &&
      newService.category &&
      newService.startTime &&
      newService.endTime &&
      newService.client
    ) {
      if (editingService) {
        // Update the service if it's being edited
        setServices(
          services.map((service) =>
            service.name === editingService.name ? newService : service
          )
        );
        setEditingService(null); // Reset the editing state
      } else {
        // Add a new service if not editing
        setServices([...services, newService]);
      }

      // Reset form state
      setNewService({
        name: "",
        category: "",
        startTime: "",
        endTime: "",
        client: "",
        status: "Active",
      });

      // Close the modal
      setShowAddService(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handle editing a service
  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      startTime: service.startTime,
      endTime: service.endTime,
      client: service.client,
      status: service.status,
    });
    setShowAddService(true);
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-4 py-2 text-purple-500 border border-purple-500 rounded-md mr-4 hover:bg-purple-500 hover:text-white">
              Filter
            </button>
            <button
              onClick={() => {
                setNewService({
                  name: "",
                  category: "",
                  startTime: "",
                  endTime: "",
                  client: "",
                  status: "Active",
                });
                setShowAddService(true);
                setEditingService(null);
              }}
              className="ml-4 px-4 py-2 text-purple-500 border border-purple-500 rounded-md hover:bg-purple-500 hover:text-white"
            >
              Add Service
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Start Time</th>
                <th className="px-6 py-3 text-left">End Time</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{service.name}</td>
                  <td className="px-6 py-3">{service.category}</td>
                  <td className="px-6 py-3">{service.startTime}</td>
                  <td className="px-6 py-3">{service.endTime}</td>
                  <td className="px-6 py-3">{service.client}</td>
                  <td
                    className={`px-6 py-3 ${
                      service.status === "Active"
                        ? "text-green-500"
                        : service.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {service.status}
                  </td>
                  <td className="px-6 py-3 text-blue-500 cursor-pointer">
                    <button onClick={() => handleEditService(service)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Service Form Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                placeholder="Enter service name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.category}
                onChange={(e) =>
                  setNewService({ ...newService, category: e.target.value })
                }
                placeholder="Enter service category"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Start Time
              </label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.startTime}
                onChange={(e) =>
                  setNewService({ ...newService, startTime: e.target.value })
                }
                placeholder="Enter start time"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.endTime}
                onChange={(e) =>
                  setNewService({ ...newService, endTime: e.target.value })
                }
                placeholder="Enter end time"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Client</label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.client}
                onChange={(e) =>
                  setNewService({ ...newService, client: e.target.value })
                }
                placeholder="Enter number of clients"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="border w-full px-3 py-2 rounded-lg"
                value={newService.status}
                onChange={(e) =>
                  setNewService({ ...newService, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowAddService(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {editingService ? "Save Changes" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarbershopServiceDashboard;
