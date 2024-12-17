import React, { useState } from "react";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Mike Johnson",
      position: "Barber",
      phone: "123-456-7890",
      experience: "5 years",
    },
    {
      id: 2,
      name: "Emily Davis",
      position: "Stylist",
      phone: "987-654-3210",
      experience: "3 years",
    },
    {
      id: 3,
      name: "John Smith",
      position: "Barber",
      phone: "555-555-5555",
      experience: "2 years",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      position: "Stylist",
      phone: "444-444-4444",
      experience: "4 years",
    },
    // Add more employees here as needed
  ]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    phone: "",
    experience: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleEmployees, setVisibleEmployees] = useState(4);

  // Save new or edited employee
  const handleSaveEmployee = () => {
    if (
      newEmployee.name &&
      newEmployee.position &&
      newEmployee.phone &&
      newEmployee.experience
    ) {
      if (editEmployee) {
        // Update existing employee
        setEmployees(
          employees.map((employee) =>
            employee.id === editEmployee.id
              ? { ...editEmployee, ...newEmployee }
              : employee
          )
        );
      } else {
        // Add new employee
        setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
      }
      setNewEmployee({ name: "", position: "", phone: "", experience: "" });
      setEditEmployee(null);
      setFormVisible(false);
    } else {
      alert("Please fill out all fields!");
    }
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Edit employee
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setNewEmployee({
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
      experience: employee.experience,
    });
    setFormVisible(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show more employees
  const handleShowMore = () => {
    setVisibleEmployees((prev) => prev + 4);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search employees"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Position</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Experience</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.slice(0, visibleEmployees).map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="py-2 px-4">{employee.name}</td>
              <td className="py-2 px-4">{employee.position}</td>
              <td className="py-2 px-4">{employee.phone}</td>
              <td className="py-2 px-4">{employee.experience}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEditEmployee(employee)}
                  className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show More Button */}
      {filteredEmployees.length > visibleEmployees && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 text-purple-500 border-2 border-purple-500 rounded-lg"
          >
            Show More
          </button>
        </div>
      )}

      {/* Add Employee Button */}
      <div className="mt-6">
        <button
          onClick={() => setFormVisible(true)}
          className="px-6 py-3 text-purple-500 border-2 border-purple-500 rounded-lg"
        >
          Add Employee
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter employee's name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Position</label>
              <input
                type="text"
                value={newEmployee.position}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, position: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter position (e.g., Barber)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                value={newEmployee.phone}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, phone: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Experience
              </label>
              <input
                type="text"
                value={newEmployee.experience}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, experience: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter experience (e.g., 5 years)"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFormVisible(false);
                  setEditEmployee(null);
                  setNewEmployee({
                    name: "",
                    position: "",
                    phone: "",
                    experience: "",
                  });
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmployee}
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

export default Employees;
