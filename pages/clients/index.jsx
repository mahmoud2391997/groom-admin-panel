import { useState } from "react";

function Clients() {
  const [clients, setClients] = useState([
    {
      id: "FwSSCIr8iBRSSl6302Cy9YXoBnZ2",
      name: "John Doe",
      phone: "123-456-7890",
      service: "Haircut",
      location: "36.171566009502634, -115.13909570424758",
      state: "Gambela Region",
      pincode: "10000",
      notificationStatus: "Disabled",
      requestsThisMonth: 0,
      notificationToken:
        "d_8R1vo4QsOTJKtpV1zMWd:APA91bGpLfcwc3Ywxyj7r0W0Oh26XuKRuMQW44pVPjgreXpmlb3v3YvrjjXmgfA4q8IfbTBwm4rTz5q0kIn-hn4C4EUvnAT9T7w5Rp9FmL6g_MmxTXhnlxY",
      lastUpdated: "0",
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

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveClient = () => {
    if (newClient.name && newClient.phone && newClient.service) {
      if (editClient) {
        setClients(
          clients.map((client) =>
            client.id === editClient.id
              ? { ...editClient, ...newClient }
              : client
          )
        );
      } else {
        setClients([
          ...clients,
          {
            id: Date.now().toString(),
            ...newClient,
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

  const handleDeleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

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
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">State</th>
            <th className="py-2 px-4 text-left">Notification Status</th>
            <th className="py-2 px-4 text-left">Requests This Month</th>
            <th className="py-2 px-4 text-left">Last Updated</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="py-2 px-4">{client.name}</td>
              <td className="py-2 px-4">{client.phone}</td>
              <td className="py-2 px-4">{client.service}</td>
              <td className="py-2 px-4">{client.location}</td>
              <td className="py-2 px-4">{client.state}</td>
              <td className="py-2 px-4">{client.notificationStatus}</td>
              <td className="py-2 px-4">{client.requestsThisMonth}</td>
              <td className="py-2 px-4">{client.lastUpdated}</td>
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

      <div className="mt-6">
        <button
          onClick={() => setFormVisible(true)}
          className="px-6 py-3 text-purple-500 border-2 border-purple-500 rounded-lg"
        >
          Add Client
        </button>
      </div>

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
