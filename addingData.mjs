import { ref, push } from "firebase/database";
import { database } from "./firebase.mjs"; // Adjust the import as necessary
import bcrypt from "bcrypt"; // Make sure to install bcrypt: npm install bcrypt

// Function to add a customer complaint to the "admins" collection
const addCustomerComplaint = async (complaintData) => {
  const complaintsRef = ref(database, "admins");

  try {
    // Hash the password
    const saltRounds = 10; // Adjust the cost factor as needed
    const hashedPassword = await bcrypt.hash(
      complaintData.password,
      saltRounds
    );

    // Replace plain text password with the hashed password
    const complaintDataWithHashedPassword = {
      ...complaintData,
      password: hashedPassword,
    };

    // Push the data with the hashed password to Firebase
    const newComplaintRef = await push(
      complaintsRef,
      complaintDataWithHashedPassword
    );
    console.log("Complaint added successfully with ID:", newComplaintRef.key);
  } catch (error) {
    console.error("Error adding complaint:", error);
  }
};

// Example data
const complaintData = {
  email: "admin@gmail.com",
  // Could be "Pending", "In Progress", or "Resolved"
  password: "12345678", // Add password to the complaint data
};

// Add the example complaint to Firebase
addCustomerComplaint(complaintData);
