import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TablePagination,
} from "@mui/material";
import { get, ref } from "firebase/database";
import { database } from "@/firebase.mjs";

const CustomerComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchComplaints = async () => {
    const dataRef = ref(database, "customerComplaints");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const complaintsData = snapshot.val();
        setComplaints(Object.values(complaintsData));
        setFilteredComplaints(Object.values(complaintsData));
      } else {
        console.error("No complaints data available");
      }
    } catch (error) {
      console.error("Error fetching complaints data:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const results = complaints.filter(complaint =>
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComplaints(results);
  }, [searchTerm, complaints]);

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
        label="Search by description"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <TableContainer>
        <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell>Complaint ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComplaints
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint, index) => (
                <TableRow key={index}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.description}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredComplaints.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomerComplaintsPage;
