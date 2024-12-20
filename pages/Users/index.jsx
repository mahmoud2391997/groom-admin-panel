import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase"; // Adjust the import as necessary
import UserCard from "@/components/UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProviderServices = async () => {
    const dataRef = ref(database, "providerServices"); // Updated path to 'providerServices'
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        console.log(snapshot.val()); // Logs the resolved data
        setServices(snapshot.val()); // Set services state with fetched data
      } else {
        console.log("No data available");
        setError("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is set to false after fetching
    }
  };
  // Fetch data once component mounts
  useEffect(() => {
    const getData = async () => {
      const fetchedUsers = await fetchUsers();
      if (fetchedUsers) {
        setUsers(Object.values(fetchedUsers)); // Set the users after data is fetched
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">User List</h1>
      <div className="flex flex-wrap gap-4 justify-around">
        {users.map((user) => (
          <UserCard key={user.uid} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
