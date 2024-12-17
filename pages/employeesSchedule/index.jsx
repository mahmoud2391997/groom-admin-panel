import { useState } from "react";

function EmployeeSchedule() {
  const initialSchedules = [
    {
      id: 1,
      employee: "Mike Johnson",
      day: "Monday",
      time: "9:00 AM - 5:00 PM",
    },
    {
      id: 2,
      employee: "Emily Davis",
      day: "Tuesday",
      time: "10:00 AM - 6:00 PM",
    },
    {
      id: 3,
      employee: "John Doe",
      day: "Wednesday",
      time: "8:00 AM - 4:00 PM",
    },
    {
      id: 4,
      employee: "Sara Smith",
      day: "Thursday",
      time: "9:00 AM - 5:00 PM",
    },
    { id: 5, employee: "Tom Brown", day: "Friday", time: "10:00 AM - 6:00 PM" },
    { id: 6, employee: "Lucy Green", day: "Monday", time: "9:00 AM - 5:00 PM" },
    {
      id: 7,
      employee: "James White",
      day: "Tuesday",
      time: "10:00 AM - 6:00 PM",
    },
    {
      id: 8,
      employee: "Linda Black",
      day: "Wednesday",
      time: "8:00 AM - 4:00 PM",
    },
    // Add more schedules for testing
  ];

  const [schedules, setSchedules] = useState(initialSchedules);
  const [filteredSchedules, setFilteredSchedules] = useState(initialSchedules);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    employee: "",
    day: "",
    time: "",
  });
  const [editSchedule, setEditSchedule] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 items

  // Save new or edited schedule
  const handleSaveSchedule = () => {
    if (newSchedule.employee && newSchedule.day && newSchedule.time) {
      if (editSchedule) {
        setSchedules(
          schedules.map((schedule) =>
            schedule.id === editSchedule.id
              ? { ...editSchedule, ...newSchedule }
              : schedule
          )
        );
      } else {
        setSchedules([...schedules, { id: Date.now(), ...newSchedule }]);
      }
      resetForm();
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    }
  };

  const handleEditSchedule = (schedule) => {
    setEditSchedule(schedule);
    setNewSchedule({
      employee: schedule.employee,
      day: schedule.day,
      time: schedule.time,
    });
    setFormVisible(true);
  };

  const resetForm = () => {
    setNewSchedule({ employee: "", day: "", time: "" });
    setEditSchedule(null);
    setFormVisible(false);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = schedules.filter((schedule) =>
      Object.values(schedule)
        .join(" ")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredSchedules(filtered);
  };

  // Load more data (pagination)
  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 4); // Show 4 more items
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Employee Schedules</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border w-full px-3 py-2 rounded-lg"
          placeholder="Search by employee name, day, or time"
        />
      </div>

      {/* Table of schedules */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Employee</th>
            <th className="py-2 px-4 text-left">Day</th>
            <th className="py-2 px-4 text-left">Time</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.slice(0, visibleCount).map((schedule) => (
            <tr key={schedule.id} className="border-t">
              <td className="py-2 px-4">{schedule.employee}</td>
              <td className="py-2 px-4">{schedule.day}</td>
              <td className="py-2 px-4">{schedule.time}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEditSchedule(schedule)}
                  className="px-3 py-1 border border-purple-500 text-purple-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="px-3 py-1 border border-purple-500 text-purple-500 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More Button */}
      {filteredSchedules.length > visibleCount && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border border-purple-500 text-purple-500 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}

      {/* Add Schedule Button */}
      <div className="mt-6">
        <button
          onClick={() => setFormVisible(true)}
          className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg"
        >
          Add Schedule
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editSchedule ? "Edit Schedule" : "Add New Schedule"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Employee</label>
              <input
                type="text"
                value={newSchedule.employee}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, employee: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter employee name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Day</label>
              <input
                type="text"
                value={newSchedule.day}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, day: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter day (e.g., Monday)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time</label>
              <input
                type="text"
                value={newSchedule.time}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, time: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter time (e.g., 9:00 AM - 5:00 PM)"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSchedule}
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded-lg"
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

export default EmployeeSchedule;
