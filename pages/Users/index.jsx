import React, { useState, useEffect } from "react";
import { ref, get, set, update, remove } from "firebase/database";
import { database } from "../../firebase"; // Adjust the import based on your project structure
import UserCard from "@/components/UserCard";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formState, setFormState] = useState({
    uid: "",
    state: "",
    location: "",
    photoURL: "",
  });

  // Fetch users from Firebase
  const fetchUsers = async () => {
    const dataRef = ref(database, "users");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        setError("No data available");
        return null;
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    const getData = async () => {
      const fetchedUsers = await fetchUsers();
      if (fetchedUsers) {
        setUsers(Object.values(fetchedUsers));
      }
    };
    getData();
  }, []);

  // Search functionality
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.uid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.state?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new user
  const handleAddUser = async (newUser) => {
    if (!newUser.uid) {
      alert("UID is required!");
      return;
    }
    const userRef = ref(database, `users/${newUser.uid}`);
    try {
      await set(userRef, newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setFormState({ uid: "", state: "", location: "", photoURL: "" }); // Reset form
    } catch (error) {
      setError("Failed to add user. Please try again.");
      console.error("Error adding user:", error);
    }
  };

  // Edit user
  const handleEditUser = async (uid, updatedFields) => {
    const userRef = ref(database, `users/${uid}`);
    try {
      await update(userRef, updatedFields);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, ...updatedFields } : user
        )
      );
    } catch (error) {
      setError("Failed to edit user. Please try again.");
      console.error("Error editing user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (uid) => {
    const userRef = ref(database, `users/${uid}`);
    try {
      await remove(userRef);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
    } catch (error) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by UID or state..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full"
      />

      {/* Add User Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser(formState);
        }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="UID"
            value={formState.uid}
            onChange={(e) =>
              setFormState({ ...formState, uid: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="State"
            value={formState.state}
            onChange={(e) =>
              setFormState({ ...formState, state: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            value={formState.location}
            onChange={(e) =>
              setFormState({ ...formState, location: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={formState.photoURL}
            onChange={(e) =>
              setFormState({ ...formState, photoURL: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Add User
        </button>
      </form>

      {/* User Cards */}
      <div className="flex flex-wrap gap-4 justify-start">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.uid}
            {...user}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
