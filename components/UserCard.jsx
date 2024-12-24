import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "@/firebase.mjs";
import PropTypes from "prop-types";

const UserCard = ({ uid }) => {
  const [user, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = ref(database, `users/${uid}`);
      try {
        const snapshot = await get(userRef);
        console.log(snapshot.val());

        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setEditData(snapshot.val());
        } else {
          console.error("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const userRef = ref(database, `users/${uid}`);
    try {
      await update(userRef, editData);
      alert("User data updated successfully.");
      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update user data. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User data not found.</p>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-3xl font-medium">User Basic Info</h2>
      <div className="sm:p-6 md:p-10 h-auto w-full mx-auto bg-white rounded-lg mt-7">
        {[
          { label: "Photo URL", value: user.photoURL, key: "photoURL" },

          { label: "Bio", value: user.bio, key: "bio" },
          {
            label: "Contact Number",
            value: user.contactNumber,
            key: "contactNumber",
          },

          {
            label: "Default Address",
            value: user.defaultAddress,
            key: "defaultAddress",
          },
          { label: "Email", value: user.email, key: "email" },
          { label: "Is Blocked", value: user.isblocked, key: "isblocked" },

          {
            label: "Membership",
            value: JSON.stringify(user.membership),
            key: "membership",
          },
        ].map(({ label, key, value }, index) =>
          key == "photoURL" ? (
            isEditing ? (
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">
                  Profile Picture:
                </label>
                <input
                  type="text"
                  name="photoURL"
                  value={editData.photoURL || ""}
                  onChange={handleInputChange}
                  placeholder="Profile Picture URL"
                  className="border border-gray-300 rounded-md w-full px-2 py-1"
                />
              </div>
            ) : (
              <div className="flex flex-col mb-5">
                <div className="w-1/2 text-left text-sm md:text-base">
                  <strong>Profile Picture</strong>
                </div>
                <img
                  src={value}
                  alt="User Photo"
                  className="w-48 h-48 object-cover mt-5 rounded-t-lg"
                />
              </div>
            )
          ) : (
            <div key={index} className="flex border-b text-[#525252] py-4 mb-4">
              <div className="w-1/2 text-left text-sm md:text-base">
                <strong>{label}:</strong>
              </div>
              <div className="w-1/2 text-right text-sm md:text-base">
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={editData[key] || ""}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  value || "N/A"
                )}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex gap-2 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        )}
      </div>
      <h2 className="text-3xl font-medium mt-7">User Other Info</h2>
      <div className="sm:p-6 md:p-10 h-auto w-full mx-auto bg-white rounded-lg mt-7">
        {[
          {
            label: "Contact Number",
            value: user.contactNumber,
            key: "contactNumber",
          },
          { label: "Country", value: user.country, key: "country" },
          {
            label: "Date of Birth",
            value: user.dateOfBirth,
            key: "dateOfBirth",
          },
          {
            label: "Default Address",
            value: user.defaultAddress,
            key: "defaultAddress",
          },
          { label: "Email", value: user.email, key: "email" },
          { label: "Full Name", value: user.fullName, key: "fullName" },
          { label: "Is Blocked", value: user.isblocked, key: "isblocked" },
          { label: "Joined On", value: user.joinedOn, key: "joinedOn" },
          {
            label: "Location",
            value: `${user.location.latitude}, ${user.location.longitude}`,
            key: "location",
          },
          {
            label: "Membership",
            value: JSON.stringify(user.membership),
            key: "membership",
          },
          {
            label: "Membership Type",
            value: user.membership?.type,
            key: "membershipType",
          },
          {
            label: "Membership Expiry",
            value: user.membership?.expiry,
            key: "membershipExpiry",
          },
          {
            label: "Membership Amount",
            value: user.membership?.amount,
            key: "membershipAmount",
          },
          {
            label: "Membership Duration",
            value: user.membership?.duration,
            key: "membershipDuration",
          },
          {
            label: "Membership Start Date",
            value: user.membership?.startDate,
            key: "membershipStartDate",
          },
          {
            label: "Membership End Date",
            value: user.membership?.endDate,
            key: "membershipEndDate",
          },
          {
            label: "Membership Total Amount",
            value: user.membership?.totalAmount,
            key: "membershipTotalAmount",
          },
          {
            label: "Notification Status",
            value: user.notification_status,
            key: "notification_status",
          },
          {
            label: "is Provider",
            value: user.providerUserModel ? "Yes" : "No",
            key: "providerUserModel",
          },
          { label: "Pincode", value: user.pincode, key: "pincode" },
          {
            label: "Requests This Month",
            value: user.requestsThisMonth,
            key: "requestsThisMonth",
          },
          { label: "State", value: user.state, key: "state" },
          { label: "UID", value: user.uid, key: "uid" },
          { label: "Updated On", value: user.updatedOn, key: "updatedOn" },
        ].map(({ label, key, value }, index) => (
          <div key={index} className="flex border-b text-[#525252] py-4 mb-4">
            <div className="w-1/2 text-left text-sm md:text-base">
              <strong>{label}:</strong>
            </div>
            <div className="w-1/2 text-right text-sm md:text-base">
              {isEditing && key !== "locationAddress" ? (
                <input
                  type="text"
                  name={key}
                  value={editData[key] || ""}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                value || "N/A"
              )}
            </div>
          </div>
        ))}
      </div>
      {user.providerUserModel ? (
        <div className="w-full h-full flex flex-col mt-7">
          <h2 className="text-3xl font-medium">Provider Info</h2>
          <div className="sm:p-6 md:p-10 h-auto w-full mx-auto bg-white rounded-lg mt-7">
            {[
              {
                label: "About",
                value: user.providerUserModel.about,
                key: "about",
              },
              {
                label: "Address Line",
                value: user.providerUserModel.addressLine,
                key: "addressLine",
              },
              {
                label: "Base Price",
                value: user.providerUserModel.basePrice,
                key: "basePrice",
              },
              {
                label: "Created On",
                value: user.providerUserModel.createdOn,
                key: "createdOn",
              },
              {
                label: "Provider Location",
                value: `${user.providerUserModel.location.latitude}, ${user.providerUserModel.location.longitude}`,
                key: "providerLocation",
              },
              {
                label: "Number of Reviews",
                value: user.providerUserModel.numReviews,
                key: "numReviews",
              },
              {
                label: "Overall Rating",
                value: user.providerUserModel.overallRating,
                key: "overallRating",
              },
              {
                label: "Provider Images",
                value: user.providerUserModel.providerImages,
                key: "providerImages",
              },
              {
                label: "Provider Type",
                value: user.providerUserModel.providerType,
                key: "providerType",
              },
              {
                label: "Salon Title",
                value: user.providerUserModel.salonTitle,
                key: "salonTitle",
              },
              {
                label: "Work Day From",
                value: user.providerUserModel.workDayFrom,
                key: "workDayFrom",
              },
              {
                label: "Work Day To",
                value: user.providerUserModel.workDayTo,
                key: "workDayTo",
              },
              {
                label: "Schedule",
                value: user.providerUserModel.schedule,
                key: "schedule",
              },
            ].map(({ label, key, value }, index) =>
              key !== "schedule" ? (
                key === "providerImages" ? (
                  isEditing ? (
                    <div className="mb-4" key={index}>
                      <label className="block mb-2 font-medium text-gray-700">
                        Provider Picture:
                      </label>
                      <input
                        type="text"
                        name="photoURL"
                        value={editData.photoURL || ""}
                        onChange={handleInputChange}
                        placeholder="Profile Picture URL"
                        className="border border-gray-300 rounded-md w-full px-2 py-1"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col mb-5" key={index}>
                      <div className="w-1/2 text-left text-sm md:text-base">
                        <strong>Profile Picture</strong>
                      </div>
                      {value.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt="User Photo"
                          className="w-48 h-48 object-cover mt-5 rounded-t-lg"
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div
                    key={index}
                    className="flex border-b text-[#525252] py-4 mb-4"
                  >
                    <div className="w-1/2 text-left text-sm md:text-base">
                      <strong>{label}:</strong>
                    </div>
                    <div className="w-1/2 text-right text-sm md:text-base">
                      {isEditing ? (
                        <input
                          type="text"
                          name={key}
                          value={editData[key] || ""}
                          onChange={handleInputChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        value || "N/A"
                      )}
                    </div>
                  </div>
                )
              ) : (
                <ScheduleDisplay key={index} schedule={value} />
              )
            )}
          </div>
          <div className="flex gap-2 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

UserCard.propTypes = {
  uid: PropTypes.string.isRequired,
};

const ScheduleDisplay = ({ schedule }) => {
  if (!schedule) {
    return <p>No schedule available.</p>;
  }
  console.log(schedule);

  // Convert the schedule object to an array
  const scheduleArray = Object.values(schedule);

  console.log(scheduleArray);
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Schedule</h2>
      <ul>
        {scheduleArray.map((day) => (
          <li
            key={day.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="font-medium">{day.dayName}</span>
            {day.isEnable ? (
              day.fromTime && day.toTime ? (
                <span>
                  {day.fromTime} - {day.toTime}
                </span>
              ) : (
                <span className="text-gray-500">Not Available</span>
              )
            ) : (
              <span className="text-red-500">Disabled</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ScheduleDisplay.propTypes = {
  schedule: PropTypes.object.isRequired,
};

export default UserCard;
