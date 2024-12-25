import { useState, useEffect } from "react";
import { database } from "@/firebase.mjs";
import { ref, onValue, set } from "firebase/database";

function CustomerComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const [newComplaint, setNewComplaint] = useState({
    resolutionDetails: "",
  });

  useEffect(() => {
    const complaintsRef = ref(database, "customersComplaints");
    onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComplaints(Object.values(data));
      }
    });
  }, []);

  const handleSaveComplaint = () => {
    if (newComplaint.resolutionDetails) {
      const timestamp = editComplaint ? editComplaint.timestamp : Date.now();
      const updatedComplaint = {
        ...editComplaint,
        ...newComplaint,  // Update the resolution details
        timestamp,
      };

      set(ref(database, `customersComplaints/${editComplaint ? editComplaint.timestamp : timestamp}`), updatedComplaint);

      setNewComplaint({ resolutionDetails: "" });
      setEditComplaint(null);
      setFormVisible(false);
    } else {
      alert("Please fill out the resolution details!");
    }
  };

  const handleEditComplaint = (complaint) => {
    setEditComplaint(complaint);
    setNewComplaint({
      status: complaint.status,
      resolutionDetails: complaint.resolutionDetails,
    });
    setFormVisible(true);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Complaints</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 text-left">Complaint Details</th>
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Provider Info</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Resolution Details</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.timestamp} className="border-t">
              <td className="py-2 px-4">{complaint.complaintDetails}</td>
              <td className="py-2 px-4">{complaint.customerName}</td>
              <td className="py-2 px-4">
                <div>id : {complaint.serviceProvider.providerId}</div>
                <div>name : {complaint.serviceProvider.providerName}</div>
                <div>contact : {complaint.serviceProvider.contact}</div>
              </td>
              <td className="py-2 px-4">{complaint.status}</td>
              <td className="py-2 px-4">{complaint.resolutionDetails}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEditComplaint(complaint)}
                  className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                >
                  Edit
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
          Add Complaint
        </button>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editComplaint ? "Edit Complaint" : "Add New Complaint"}
            </h2>
            {editComplaint && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={newComplaint.status}
                  onChange={(e) =>
                    setNewComplaint({
                      ...newComplaint,
                      status: e.target.value,
                    })
                  }
                  className="border w-full px-3 py-2 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Resolution Details
              </label>
              <input
                type="text"
                value={newComplaint.resolutionDetails}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    resolutionDetails: e.target.value,
                  })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter details of the resolution (if any)"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFormVisible(false);
                  setEditComplaint(null);
                  setNewComplaint({
                    resolutionDetails: "",
                  });
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveComplaint}
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

export default CustomerComplaints;
