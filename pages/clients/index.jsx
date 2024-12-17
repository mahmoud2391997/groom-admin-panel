import React, { useState } from "react";

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890", service: "Haircut" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", service: "Beard Trim" },
    { id: 3, name: "David Johnson", phone: "555-123-4567", service: "Shave" },
    { id: 4, name: "Emily Davis", phone: "444-987-6543", service: "Haircut" },
    {
      id: 5,
      name: "Michael Brown",
      phone: "333-654-7890",
      service: "Beard Trim",
    },
  ]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save new or edited client
  const handleSaveClient = () => {
    if (newClient.name && newClient.phone && newClient.service) {
      if (editClient) {
        // Update existing client
        setClients(
          clients.map((client) =>
            client.id === editClient.id
              ? { ...editClient, ...newClient }
              : client
          )
        );
      } else {
        // Add new client
        setClients([
          ...clients,
          {
            id: Date.now(),
            name: newClient.name,
            phone: newClient.phone,
            service: newClient.service,
          },
        ]);
      }
      setNewClient({ name: "", phone: "", service: "" });
      setEditClient(null);
      setFormVisible(false);
    } else {
      alert("Please fill out all fields!");
    }
  };

  // Delete client
  const handleDeleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  // Edit client
  const handleEditClient = (client) => {
    setEditClient(client);
    setNewClient({
      name: client.name,
      phone: client.phone,
      service: client.service,
    });
    setFormVisible(true);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border w-full px-3 py-2 rounded-lg"
          placeholder="Search by name, phone, or service"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Service</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="py-2 px-4">{client.name}</td>
              <td className="py-2 px-4">{client.phone}</td>
              <td className="py-2 px-4">{client.service}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEditClient(client)}
                  className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Client Button */}
      <div className="mt-6">
        <button
          onClick={() => setFormVisible(true)}
          className="px-6 py-3 text-purple-500 border-2 border-purple-500 rounded-lg"
        >
          Add Client
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editClient ? "Edit Client" : "Add New Client"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter client's name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({ ...newClient, phone: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service</label>
              <input
                type="text"
                value={newClient.service}
                onChange={(e) =>
                  setNewClient({ ...newClient, service: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter service (e.g., Haircut)"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFormVisible(false);
                  setEditClient(null);
                  setNewClient({ name: "", phone: "", service: "" });
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClient}
                className="px-4 py-2 text-purple-500 border-2 border-purple-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
