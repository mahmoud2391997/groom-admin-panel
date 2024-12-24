import React, { useEffect, useState } from "react";
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
import { get, ref, remove } from "firebase/database";
import { database } from "@/firebase.mjs";
import Link from "next/link";

const CustomerOffersPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOffers = async () => {
    const dataRef = ref(database, "customerOffers");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setOffers(Object.values(snapshot.val()));
        setFilteredOffers(Object.values(snapshot.val()));
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

  const handleDeleteOffers = async (offerIds) => {
    try {
      await Promise.all(
        offerIds.map((offerId) =>
          remove(ref(database, `customerOffers/${offerId}`))
        )
      );
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => !offerIds.includes(offer.offerId))
      );
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    setFilteredOffers(
      offers.filter((offer) =>
        offer.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, offers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Offers</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search offers"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <div className="flex justify-between mb-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteOffers(selectedRowKeys)}
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
                    selectedRowKeys.length < offers.length
                  }
                  checked={
                    offers.length > 0 &&
                    selectedRowKeys.length === offers.length
                  }
                  onChange={(event) =>
                    setSelectedRowKeys(
                      event.target.checked
                        ? offers.map((offer) => offer.offerId)
                        : []
                    )
                  }
                />
              </TableCell>
              <TableCell className="py-2 px-4 text-left">Offer Name</TableCell>
              <TableCell className="py-2 px-4 text-left">Description</TableCell>
              <TableCell className="py-2 px-4 text-left">Type</TableCell>
              <TableCell className="py-2 px-4 text-left">Price Range</TableCell>
              <TableCell className="py-2 px-4 text-left">
                Deposit Payment
              </TableCell>
              <TableCell className="py-2 px-4 text-left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOffers.map((offer) => (
              <TableRow
                key={offer.offerId}
                className="border-t"
                selected={selectedRowKeys.includes(offer.offerId)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRowKeys.includes(offer.offerId)}
                    onChange={(event) => {
                      const selectedIndex = selectedRowKeys.indexOf(offer.offerId);
                      let newSelected = [];

                      if (selectedIndex === -1) {
                        newSelected = newSelected.concat(
                          selectedRowKeys,
                          offer.offerId
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
                <TableCell className="py-2 px-4">{offer.serviceName}</TableCell>
                <TableCell className="py-2 px-4">{offer.description}</TableCell>
                <TableCell className="py-2 px-4">{offer.serviceType}</TableCell>
                <TableCell className="py-2 px-4">{offer.priceRange}</TableCell>
                <TableCell className="py-2 px-4">
                  {offer.deposit ? "Provided" : "Not Provided"}
                </TableCell>
                <TableCell className="py-2 px-4 flex space-x-2">
                  <Link href={`/customerOffers/${offer.offerId}`}>
                    <button className="px-3 py-1 text-purple-500 border-2 border-purple-500 rounded-md">
                      View
                    </button>
                  </Link>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteOffers([offer.offerId])}
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

export default CustomerOffersPage;
