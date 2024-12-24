import React from "react";
import UserCard from "@/components/UserCard"; // Import your UserCard component
import { useRouter } from "next/router";

const PageLayout = () => {
  const router = useRouter();
  const { userId } = router.query;
  const handleEditUser = (uid, editedData) => {
    console.log("Edited User:", uid, editedData);
  };

  const handleDeleteUser = (uid) => {
    console.log("Deleted User:", uid);
  };
  const { serviceId } = router.query;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <h1 className="ml-[2.5%] m-5 text-5xl font-semibold">
        Single User Profile
      </h1>

      {/* Main Content */}
      <main className="flex-grow overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          <UserCard uid={userId} />
        </div>
      </main>

      {/* Footer */}
    </div>
  );
};

export default PageLayout;
