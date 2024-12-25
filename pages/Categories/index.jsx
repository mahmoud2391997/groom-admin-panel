import { database } from "@/firebase.mjs";
import { get, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  // const [editCategory, setEditCategory] = useState(null);  const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: "Haircuts",
  //     image:
  //       "https://img.pikbest.com/photo/20241212/barber-making-hairstyle_11243110.jpg!f305cw",
  //   },
  //   {
  //     id: 2,
  //     name: "Beard Trims",
  //     image:
  //       "https://thebeardclub.com/cdn/shop/articles/Trim_Your_Beard_2_3202ea96-9f43-43af-bc17-81955f6ddabc.jpg?v=1651237993&width=1920",
  //   },
  //   {
  //     id: 3,
  //     name: "Shaves",
  //     image:
  //       "https://media.istockphoto.com/id/640276472/photo/skillful-hairdresser-using-blade-for-shaving-beard.jpg?s=612x612&w=0&k=20&c=ZvU0dU02444qcrErRk-noiD1XaUph2GoUinDK2NUGRY=",
  //   },
  //   {
  //     id: 4,
  //     name: "Hair Coloring",
  //     image:
  //       "https://www.shutterstock.com/image-photo/professional-hairdresser-dying-hair-beauty-260nw-1946344090.jpg",
  //   },
  // ]);

  const fetchCategories = async () => {
    const dataRef = ref(database, "serviceCategories");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setCategories(Object.entries(snapshot.val()));
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setNewCategory({ name: category.name, image: category.image });
    setFormVisible(true); // Show the form for editing
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.image) {
      const newCategoryWithId = { ...newCategory, id: Date.now() };
      setCategories([...categories, newCategoryWithId]);
      setNewCategory({ name: "", image: "" });
      setFormVisible(false); // Close the form
    } else {
      alert("Please fill out both fields!");
    }
  };

  const handleUpdateCategory = () => {
    if (newCategory.name && newCategory.image) {
      const updatedCategories = categories.map((category) =>
        category.id === editCategory.id
          ? { ...category, ...newCategory }
          : category
      );
      setCategories(updatedCategories);
      setNewCategory({ name: "", image: "" });
      setEditCategory(null); // Reset edit state
      setFormVisible(false); // Close the form
    } else {
      alert("Please fill out both fields!");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="mt-0 w-full">
      <h2 className="ml-10 mt-10 text-2xl font-bold">Main Categories</h2>
      <section className="grid gap-2 w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-5">
        {categories.map((category) => (
          <div
            key={category[0]}
            className="lg:h-[430px] m-auto w-[100%] flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-md"
          >
            <img
              src={category[1].categoryImage}
              alt={category[1].name}
              className="w-full h-[250px] object-cover rounded-lg"
            />
            <div className="w-full h-20 flex flex-col items-center justify-center">
              <h5 className="text-2xl leading-5 tracking-[0.16em]">
                {category[1].name}
              </h5>
            </div>
            <div className="flex justify-center w-full mt-4">
              {/* Edit Button */}
              <Link href={`/Categories/${category[0]}`}>
                <button className="flex items-center justify-center gap-1 text-purple-500 border border-purple-500 rounded-lg px-4 py-2 hover:bg-purple-500 hover:text-white transition">
                  View Details
                </button>
              </Link>

              {/* Delete Button */}
            </div>
          </div>
        ))}
      </section>

      {/* Add Category Button */}
      <div className="m-auto w-40 mt-5">
        <button
          onClick={() => setFormVisible(true)}
          className="border-2 border-purple-500 w-full py-2 rounded-lg text-purple-500 hover:bg-purple-500 hover:text-white transition"
        >
          Add Category
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter category name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={newCategory.image}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, image: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditCategory(null);
                  setNewCategory({ name: "", image: "" });
                  setFormVisible(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={
                  editCategory ? handleUpdateCategory : handleAddCategory
                }
                className="px-4 py-2 bg-purple-500 text-white rounded-lg"
              >
                {editCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
