const UserCard = ({
  photoURL,
  notificationToken,
  notification_status,
  location,
  state,
  pincode,
  requestsThisMonth,
  uid,
  updatedOn,
}) => {
  // Handle location if it's an object with latitude and longitude
  const formattedLocation = location
    ? `${location.latitude}, ${location.longitude}`
    : "Location not available";

  return (
    <div className="max-w-sm w-[300px] rounded-lg overflow-hidden shadow-lg bg-white mb-4">
      <img
        src={photoURL}
        alt="User Photo"
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">User ID: {uid}</h2>
        <p className="text-gray-600 mt-2">Location: {formattedLocation}</p>
        <p className="text-gray-600">State: {state}</p>
        <p className="text-gray-600">Pincode: {pincode}</p>

        <div className="mt-4">
          <p className="font-medium text-gray-700">
            Notification Status:{" "}
            <span
              className={
                notification_status ? "text-green-500" : "text-red-500"
              }
            >
              {notification_status ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p className="font-medium text-gray-700">
            Requests This Month: {requestsThisMonth}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-gray-700">
            Notification Token: {notificationToken}
          </p>
          <p className="text-gray-600">Last Updated: {updatedOn}</p>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
