import { ref, set } from "firebase/database";
import { database } from "./firebase.mjs";

const categoryId = "cat1";
const serviceId = "serv1";

set(ref(database, `customersComplaints`), {
  comp1: {
    customerId: "cust1",
    customerName: "John Doe",
    serviceProvider: {
      providerId: "prov1",
      providerName: "Jane Smith",
      contact: "jane.smith@example.com",
    },
    complaintDetails: "Service delay",
    timestamp: 1708735200000,
    status: "Pending",
    resolutionDetails: "",
  },
  comp2: {
    customerId: "cust2",
    customerName: "Emily Johnson",
    serviceProvider: {
      providerId: "prov2",
      providerName: "Robert Brown",
      contact: "robert.brown@example.com",
    },
    complaintDetails: "Unprofessional behavior",
    timestamp: 1708745200000,
    status: "Resolved",
    resolutionDetails: "Apology issued and service fee refunded.",
  },
  comp3: {
    customerId: "cust3",
    customerName: "Michael Clark",
    serviceProvider: {
      providerId: "prov3",
      providerName: "Sophia Williams",
      contact: "sophia.williams@example.com",
    },
    complaintDetails: "Overcharged for service",
    timestamp: 1708755200000,
    status: "In Progress",
    resolutionDetails: "",
  },
  comp4: {
    customerId: "cust4",
    customerName: "Sara Evans",
    serviceProvider: {
      providerId: "prov4",
      providerName: "Liam Martinez",
      contact: "liam.martinez@example.com",
    },
    complaintDetails: "Incomplete grooming service",
    timestamp: 1708765200000,
    status: "Pending",
    resolutionDetails: "",
  },
  comp5: {
    customerId: "cust5",
    customerName: "David Wilson",
    serviceProvider: {
      providerId: "prov5",
      providerName: "Olivia Taylor",
      contact: "olivia.taylor@example.com",
    },
    complaintDetails: "Damaged property during service",
    timestamp: 1708775200000,
    status: "Resolved",
    resolutionDetails: "Replacement item provided and apology issued.",
  },
  comp6: {
    customerId: "cust6",
    customerName: "Laura Adams",
    serviceProvider: {
      providerId: "prov6",
      providerName: "Ethan Harris",
      contact: "ethan.harris@example.com",
    },
    complaintDetails: "Rude customer service",
    timestamp: 1708785200000,
    status: "In Progress",
    resolutionDetails: "",
  },
  comp7: {
    customerId: "cust7",
    customerName: "James Anderson",
    serviceProvider: {
      providerId: "prov7",
      providerName: "Emma Walker",
      contact: "emma.walker@example.com",
    },
    complaintDetails: "Service provider didn't show up",
    timestamp: 1708795200000,
    status: "Pending",
    resolutionDetails: "",
  },
  comp8: {
    customerId: "cust8",
    customerName: "Sophia Turner",
    serviceProvider: {
      providerId: "prov8",
      providerName: "Noah Carter",
      contact: "noah.carter@example.com",
    },
    complaintDetails: "Incorrect charges on invoice",
    timestamp: 1708805200000,
    status: "Resolved",
    resolutionDetails: "Invoice corrected and charges refunded.",
  },
  comp9: {
    customerId: "cust9",
    customerName: "Benjamin Lee",
    serviceProvider: {
      providerId: "prov9",
      providerName: "Ava Lewis",
      contact: "ava.lewis@example.com",
    },
    complaintDetails: "Service quality not as promised",
    timestamp: 1708815200000,
    status: "In Progress",
    resolutionDetails: "Follow-up service scheduled for customer.",
  },
  comp10: {
    customerId: "cust10",
    customerName: "Chloe White",
    serviceProvider: {
      providerId: "prov10",
      providerName: "Lucas Hall",
      contact: "lucas.hall@example.com",
    },
    complaintDetails: "Excessive waiting time",
    timestamp: 1708825200000,
    status: "Pending",
    resolutionDetails: "",
  },
});
