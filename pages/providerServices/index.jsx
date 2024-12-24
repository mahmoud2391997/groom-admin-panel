import { useState, useEffect } from "react";
import Link from "next/link";
import { get, ref, remove } from "firebase/database";
import { database } from "@/firebase.mjs";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from "@mui/material";

const ProviderServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchServices = async () => {
    const dataRef = ref(database, "providerServices");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setServices(Object.values(snapshot.val()));
        setFilteredServices(Object.values(snapshot.val()));
        setLoading(false);
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

  const handleDeleteServices = async (serviceIds) => {
    try {
      await Promise.all(
        serviceIds.map((serviceId) => remove(ref(database, `providerServices/${serviceId}`)))
      );
      setServices((prevServices) =>
        prevServices.filter((service) => !serviceIds.includes(service.serviceId))
      );
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFilteredServices(
      services.filter((service) =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, services]);

  console.log(filteredServices);

  loading && <div>Loading...</div>;
  error && <div>Error...</div>;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Provider Services</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <div className="flex justify-between mb-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteServices(selectedRowKeys)}
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
                    selectedRowKeys.length < services.length
                  }
                  checked={
                    services.length > 0 && selectedRowKeys.length === services.length
                  }
                  onChange={(event) =>
                    setSelectedRowKeys(
                      event.target.checked ? services.map((service) => service.serviceId) : []
                    )
                  }
                />
              </TableCell>
              <TableCell className="py-2 px-4 text-left">Service Name</TableCell>
              <TableCell className="py-2 px-4 text-left">Type</TableCell>
              <TableCell className="py-2 px-4 text-left">Price</TableCell>
              <TableCell className="py-2 px-4 text-left">Deposit</TableCell>
              <TableCell className="py-2 px-4 text-left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow
                key={service.serviceId}
                className="border-t"
                selected={selectedRowKeys.includes(service.serviceId)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRowKeys.includes(service.serviceId)}
                    onChange={(event) => {
                      const selectedIndex = selectedRowKeys.indexOf(service.serviceId);
                      let newSelected = [];

                      if (selectedIndex === -1) {
                        newSelected = newSelected.concat(
                          selectedRowKeys,
                          service.serviceId
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
                <TableCell className="py-2 px-4">{service.serviceName}</TableCell>
                <TableCell className="py-2 px-4">{service.serviceType}</TableCell>
                <TableCell className="py-2 px-4">${service.servicePrice}</TableCell>
                <TableCell className="py-2 px-4">${service.serviceDeposit}</TableCell>
                <TableCell className="py-2 px-4 flex space-x-2">
                  <Link href={`/providerServices/${service.serviceId}`}>
                    <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md">
                      View
                    </button>
                  </Link>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteServices([service.serviceId])}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProviderServicesPage;
