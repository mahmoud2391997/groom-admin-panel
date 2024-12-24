import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CoordinatesToAddress = ({ latitude, longitude }) => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        if (response.data && response.data.address) {
          const fullAddress = response.data.address;
          setAddress(
            `${fullAddress.road || ""}, ${fullAddress.city || ""}, ${
              fullAddress.state || ""
            }, ${fullAddress.country || ""}`
          );
        } else {
          setError("Unable to fetch address.");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setError("Failed to fetch address. Please try again.");
      }
    };

    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude]);

  return (
    <div>
      {error && <p>{error}</p>}
      {address ? <p>Address: {address}</p> : <p>Loading address...</p>}
    </div>
  );
};

CoordinatesToAddress.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default CoordinatesToAddress;
