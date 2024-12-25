import { database } from "@/firebase.mjs";
import { get, ref, set, update, remove } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    categoryImage: "",
    description: "",
  });
  const [editCategory, setEditCategory] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `serviceCategories/${id}`));
      const updatedCategories = categories.filter(
        (category) => category[0] !== id
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setNewCategory({
      name: category[1].name,
      image: category[1].categoryImage,
      description: category[1].description,
    });
    setFormVisible(true); // Show the form for editing
  };

  const handleAddCategory = async () => {
    if (newCategory.name && newCategory.image && newCategory.description) {
      const newCategoryId = Date.now().toString();
      const newCategoryWithId = { ...newCategory, id: newCategoryId };
      try {
        await set(
          ref(database, `serviceCategories/${newCategoryId}`),
          newCategoryWithId
        );
        setCategories([...categories, [newCategoryId, newCategoryWithId]]);
        setNewCategory({ name: "", categoryImage: "", description: "" });
        setFormVisible(false); // Close the form
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleUpdateCategory = async () => {
    if (newCategory.name && newCategory.image && newCategory.description) {
      try {
        await update(ref(database, `serviceCategories/${editCategory[0]}`), {
          name: newCategory.name,
          categoryImage: newCategory.image,
          description: newCategory.description,
        });
        const updatedCategories = categories.map((category) =>
          category[0] === editCategory[0]
            ? [category[0], { ...category[1], ...newCategory }]
            : category
        );
        setCategories(updatedCategories);
        setNewCategory({ name: "", categoryImage: "", description: "" });
        setEditCategory(null); // Reset edit state
        setFormVisible(false); // Close the form
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      alert("Please fill out all fields!");
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

            <div className="flex justify-between w-full mt-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(category)}
                className="flex items-center justify-center gap-1 text-blue-500 border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-6-10l7 7m-4 0L5 18.5a2 2 0 01-1 .5L2 19l.5-2a2 2 0 01.5-1L14 6.5m4-4L15.5 2a2 2 0 011.5.5l2 2a2 2 0 010 3z"
                  />
                </svg>
                Edit
              </button>
              <Link href={`/Categories/${category[0]}`}>
                <button className="flex items-center justify-center gap-1 text-purple-500 border border-purple-500 rounded-lg px-4 py-2 hover:bg-purple-500 hover:text-white transition">
                  View Details
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category[0])}
                className="flex items-center justify-center gap-1 text-red-500 border border-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>{" "}
                Delete
              </button>

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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="border w-full px-3 py-2 rounded-lg"
                placeholder="Enter category description"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditCategory(null);
                  setNewCategory({ name: "", image: "", description: "" });
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
