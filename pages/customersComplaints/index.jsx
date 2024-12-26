import { useState, useEffect } from "react";
import { database } from "@/firebase.mjs";
import { ref, onValue, set } from "firebase/database";
import {
  TextField,
  TablePagination,
} from "@mui/material";

function CustomerComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const [newComplaint, setNewComplaint] = useState({
    resolutionDetails: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const complaintsRef = ref(database, "customersComplaints");
    onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComplaints(Object.values(data));
        setFilteredComplaints(Object.values(data));
      }
    });
  }, []);

  useEffect(() => {
    const results = complaints.filter(complaint =>
      complaint.complaintDetails.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComplaints(results);
  }, [searchTerm, complaints]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Complaints</h1>
      <TextField
        label="Search by complaint details"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
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
          {filteredComplaints
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((complaint) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredComplaints.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Remove the "Add Complaint" button */}
      {/* Remove the form for adding/editing complaints */}
    </div>
  );
}

export default CustomerComplaints;
