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
  Button,
} from "@mui/material";
import { get, ref, remove } from "firebase/database";
import { database } from "@/firebase.mjs";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchReviews = async () => {
    const dataRef = ref(database, "reviews");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        setReviews(Object.entries(reviewsData));
        setFilteredReviews(Object.entries(reviewsData));
      } else {
        console.error("No reviews data available");
      }
    } catch (error) {
      console.error("Error fetching reviews data:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const results = reviews.filter((review) =>
      review[1].comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(results);
  }, [searchTerm, reviews]);

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

  const handleDeleteReview = async (timestamp) => {
    try {
      await remove(ref(database, `reviews/${timestamp}`));
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>
      <TextField
        label="Search by comment"
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
              <TableCell>Reviewer Name</TableCell>
              <TableCell>Reviewer Type</TableCell>
              <TableCell>Reviewed User Name</TableCell>
              <TableCell>Reviewed User Type</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReviews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((review, index) => (
                <TableRow key={index}>
                  <TableCell>{review[1].reviewerName}</TableCell>
                  <TableCell>{review[1].reviewerType}</TableCell>
                  <TableCell>{review[1].reviewedUserName}</TableCell>
                  <TableCell>{review[1].reviewedUserType}</TableCell>
                  <TableCell>{review[1].serviceName}</TableCell>
                  <TableCell>{review[1].rating}</TableCell>
                  <TableCell>{review[1].comment}</TableCell>
                  <TableCell>
                    {new Date(review[1].timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteReview(review[0])}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredReviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ReviewsPage;
