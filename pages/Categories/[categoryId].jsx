import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { database } from "@/firebase.mjs";
import { get, ref, remove, update } from "firebase/database";

function CategoryDetails() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        const categoryRef = ref(database, `serviceCategories/${categoryId}`);
        try {
          const snapshot = await get(categoryRef);
          if (snapshot.exists()) {
            setCategory(snapshot.val());
          } else {
            console.error("Category not found");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      fetchCategory();
    }
  }, [categoryId]);

  const handleDeleteService = async (serviceId) => {
    try {
      await remove(
        ref(database, `serviceCategories/${categoryId}/services/${serviceId}`)
      );
      setCategory((prevCategory) => {
        const updatedServices = { ...prevCategory.services };
        delete updatedServices[serviceId];
        return { ...prevCategory, services: updatedServices };
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditService = (serviceId) => {
    // Implement the logic to edit the service
    console.log("Edit service:", serviceId);
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-0 w-full">Single Category Details</div>
      <h2 className="ml-10 mt-10 text-2xl font-bold">{category.name}</h2>
      <p className="ml-10 mt-2">{category.description}</p>
      <section className="grid gap-4 w-full  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-5">
        {category.services &&
          Object.entries(category.services).map(([serviceId, service]) => (
            <div
              key={serviceId}
              className="lg:h-[480px] m-auto w-[100%] flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-md"
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-[250px] object-cover rounded-lg"
              />
              <div
                className="w-full h-40
               flex flex-col items-center justify-around mt-4"
              >
                <h5 className="text-2xl leading-5 tracking-[0.16em]">
                  {service.name}
                </h5>
                <p className="text-lg">${service.price}</p>
                <p className="text-sm">{service.duration} mins</p>
              </div>
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={() => handleEditService(serviceId)}
                  className="flex items-center justify-center gap-1 text-blue-500 border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(serviceId)}
                  className="flex items-center justify-center gap-1 text-red-500 border border-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default CategoryDetails;
