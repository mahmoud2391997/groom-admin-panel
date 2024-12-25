import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { database } from "@/firebase.mjs";
import { get, ref, remove, set } from "firebase/database";

function CategoryDetails() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [category, setCategory] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "",
    imageUrl: "",
  });
  const [editServiceId, setEditServiceId] = useState(null);

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
    const service = category.services[serviceId];
    setNewService({
      name: service.name,
      price: service.price,
      duration: service.duration,
      imageUrl: service.imageUrl,
    });
    setEditServiceId(serviceId);
    setFormVisible(true);
  };

  const handleAddOrUpdateService = async () => {
    if (
      newService.name &&
      newService.price &&
      newService.duration &&
      newService.imageUrl
    ) {
      const serviceId = editServiceId || Date.now().toString();
      const serviceWithId = { ...newService, id: serviceId };
      try {
        await set(
          ref(
            database,
            `serviceCategories/${categoryId}/services/${serviceId}`
          ),
          serviceWithId
        );
        setCategory((prevCategory) => ({
          ...prevCategory,
          services: { ...prevCategory.services, [serviceId]: serviceWithId },
        }));
        setNewService({ name: "", price: "", duration: "", imageUrl: "" });
        setEditServiceId(null);
        setFormVisible(false); // Close the form
      } catch (error) {
        console.error(
          `Error ${editServiceId ? "updating" : "adding"} service:`,
          error
        );
      }
    } else {
      alert("Please fill out all fields!");
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="ml-10 mt-10 text-2xl font-bold">Category Details</h2>
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

      {/* Add Service Button */}
      <div className="m-auto w-40 mt-5">
        <button
          onClick={() => setFormVisible(true)}
          className="border-2 border-purple-500 w-full py-2 rounded-lg text-purple-500 hover:bg-purple-500 hover:text-white transition"
        >
          Add Service
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editServiceId ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter service name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter service price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                value={newService.duration}
                onChange={(e) =>
                  setNewService({ ...newService, duration: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter service duration"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={newService.imageUrl}
                onChange={(e) =>
                  setNewService({ ...newService, imageUrl: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setNewService({
                    name: "",
                    price: "",
                    duration: "",
                    imageUrl: "",
                  });
                  setFormVisible(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateService}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg"
              >
                {editServiceId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryDetails;
