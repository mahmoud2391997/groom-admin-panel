import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { get, ref, remove } from "firebase/database";
import { database } from "@/firebase.mjs";
import Link from "next/link";

const UserPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const dataRef = ref(database, "users");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      } else {
        setError("No data available");
        return null;
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteUsers = async (userIds) => {
    try {
      await Promise.all(
        userIds.map((userId) => remove(ref(database, `users/${userId}`)))
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !userIds.includes(user.uid))
      );
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const handleAddOrEditUser = (values) => {
    if (editingUser) {
      // Update existing user logic
      console.log("Edit user:", { ...editingUser, ...values });
    } else {
      // Add new user logic
      handleAddUser(values);
    }
    setIsModalVisible(false);
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Users Listing</h1>
      <div className="flex justify-between mb-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteUsers(selectedRowKeys)}
          disabled={selectedRowKeys.length === 0}
        >
          Delete Selected
        </Button>
      </div>
      <TableContainer>
        <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRowKeys.length > 0 &&
                    selectedRowKeys.length < users.length
                  }
                  checked={
                    users.length > 0 && selectedRowKeys.length === users.length
                  }
                  onChange={(event) =>
                    setSelectedRowKeys(
                      event.target.checked ? users.map((user) => user.uid) : []
                    )
                  }
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.uid}
                selected={selectedRowKeys.includes(user.uid)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRowKeys.includes(user.uid)}
                    onChange={(event) => {
                      const selectedIndex = selectedRowKeys.indexOf(user.uid);
                      let newSelected = [];

                      if (selectedIndex === -1) {
                        newSelected = newSelected.concat(
                          selectedRowKeys,
                          user.uid
                        );
                      } else if (selectedIndex === 0) {
                        newSelected = newSelected.concat(
                          selectedRowKeys.slice(1)
                        );
                      } else if (selectedIndex === selectedRowKeys.length - 1) {
                        newSelected = newSelected.concat(
                          selectedRowKeys.slice(0, -1)
                        );
                      } else if (selectedIndex > 0) {
                        newSelected = newSelected.concat(
                          selectedRowKeys.slice(0, selectedIndex),
                          selectedRowKeys.slice(selectedIndex + 1)
                        );
                      }

                      setSelectedRowKeys(newSelected);
                    }}
                  />
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.contactNumber}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.pincode}</TableCell>
                <TableCell>{user.requestsThisMonth}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/Users/${user.uid}`}>
                      <Button variant="text">View</Button>
                    </Link>
                    <Button
                      className="text-red-600 border-red-600 border-2 px-4 py-2 rounded mr-2"
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteUsers([user.uid])}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {editingUser ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target);
              const values = Object.fromEntries(formData.entries());
              handleAddOrEditUser(values);
            }}
          >
            <TextField
              margin="dense"
              name="fullName"
              label="Full Name"
              type="text"
              fullWidth
              defaultValue={editingUser ? editingUser.fullName : ""}
              required
            />
            <TextField
              margin="dense"
              name="contactNumber"
              label="Contact Number"
              type="text"
              fullWidth
              defaultValue={editingUser ? editingUser.contactNumber : ""}
              required
            />
            <TextField
              margin="dense"
              name="state"
              label="State"
              type="text"
              fullWidth
              defaultValue={editingUser ? editingUser.state : ""}
            />
            <TextField
              margin="dense"
              name="pincode"
              label="Pincode"
              type="text"
              fullWidth
              defaultValue={editingUser ? editingUser.pincode : ""}
            />
            <TextField
              margin="dense"
              name="requestsThisMonth"
              label="Requests This Month"
              type="number"
              fullWidth
              defaultValue={editingUser ? editingUser.requestsThisMonth : ""}
            />
            <DialogActions>
              <Button onClick={() => setIsModalVisible(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editingUser ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPage;
