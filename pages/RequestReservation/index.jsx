import React, { useEffect, useState } from "react";
import { database } from "@/firebase.mjs";
import { get, ref } from "firebase/database";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
} from "@mui/material";
import Link from "next/link";

// ...existing code...

const RequestReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const dataRef = ref(database, "providerServiceRequestOffer");
      try {
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const requests = snapshot.val();
          setReservations(Object.values(requests));
          setFilteredReservations(Object.values(requests));
        } else {
          console.error("No reviews data available");
        }
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const results = reservations.filter((reservation) =>
      reservation.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReservations(results);
  }, [searchTerm, reservations]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Request Reservations</h1>
      <TextField
        label="Search by description"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <TableContainer component={Paper}>
        <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <TableHead>
            <TableRow className="bg-gray-200">
            
              <TableCell>Created On</TableCell>
              <TableCell>Deposit</TableCell>
              <TableCell>Deposit Amount</TableCell>
              <TableCell>Description</TableCell>
  
              <TableCell>Selected Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(reservation.createdOn).toLocaleString()}
                </TableCell>
                <TableCell>{reservation.deposit ? "Yes" : "No"}</TableCell>
                <TableCell>{reservation.depositAmount}</TableCell>
                <TableCell>{reservation.description}</TableCell>
  
                <TableCell>
                  {new Date(reservation.selectedDate).toLocaleString()}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Link href={`/customerOffers/${reservation.serviceId}`}>
                    <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md">
                      View Service
                    </button>
                  </Link>
                  <Link href={`/Users/${reservation.clientId}`}>
                    <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md ">
                      View Customer
                    </button>
                  </Link>
                  <Link href={`/Users/${reservation.providerId}`}>
                    <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md">
                      View Provider
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// ...existing code...

export default RequestReservation;
