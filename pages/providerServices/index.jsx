import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase"; // Adjust the import as necessary
import ProviderServiceCard from "@/components/providerServiceCard";

const YourComponent = () => {
  const [providerServices, setProviderServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProviderServices = async () => {
    const dataRef = ref(database, "providerServices"); // Updated path to 'providerServices'
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        console.log(snapshot.val()); // Logs the resolved data
        return snapshot.val(); // Return the data for further use
      } else {
        console.log("No data available");
        setError("No data available"); // Set error if no data exists
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again."); // Set error if fetching fails
    } finally {
      setLoading(false); // Ensure loading state is set to false after fetching
    }
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedServices = await fetchProviderServices();
      if (fetchedServices) {
        setProviderServices(Object.values(fetchedServices)); // Set provider services once data is fetched
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
    <div>
      <h1>Provider Services</h1>
      <div className="flex flex-wrap">
        {providerServices.map((service, index) => (
          <ProviderServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
