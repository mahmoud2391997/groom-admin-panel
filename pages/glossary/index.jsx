// src/components/Glossary.js
import React, { useState, useEffect } from "react";

const Glossary = () => {
  // Initial glossary terms
  const [terms, setTerms] = useState([]);
  const [newTerm, setNewTerm] = useState({ term: "", definition: "" });
  const [editingTerm, setEditingTerm] = useState(null);
  const [page, setPage] = useState(1);
  const termsPerPage = 6;

  // Simulate loading glossary terms from API
  useEffect(() => {
    const fetchTerms = () => {
      // Simulated data for glossary
      const glossaryData = [
        {
          id: 1,
          term: "Fade",
          definition:
            "A haircut where the hair is shorter on the sides and back.",
        },
        {
          id: 2,
          term: "Taper",
          definition:
            "A haircut where the hair gradually shortens from the top to the bottom.",
        },
        {
          id: 3,
          term: "Buzz Cut",
          definition: "A very short, uniform haircut.",
        },
        {
          id: 4,
          term: "Pompadour",
          definition: "A hairstyle where the hair is swept upwards and back.",
        },
        {
          id: 5,
          term: "Undercut",
          definition:
            "A haircut where the sides are shaved or clipped very short while the top is left long.",
        },
        {
          id: 6,
          term: "Crew Cut",
          definition:
            "A very short haircut that is uniform on the sides and top.",
        },
        {
          id: 7,
          term: "Bald Fade",
          definition: "A fade that goes all the way down to the skin.",
        },
        {
          id: 8,
          term: "Line Up",
          definition: "A precise straight line cut along the hairline.",
        },
        {
          id: 9,
          term: "Shampoo",
          definition: "A product used for washing hair.",
        },
        {
          id: 10,
          term: "Conditioner",
          definition:
            "A product used for moisturizing and nourishing the hair.",
        },
        {
          id: 11,
          term: "Beard Trim",
          definition: "Trimming the beard to maintain a neat and clean look.",
        },
        {
          id: 12,
          term: "Shave",
          definition: "The act of removing facial hair using a razor.",
        },
        {
          id: 13,
          term: "Straight Razor",
          definition:
            "A traditional razor with a straight edge used for shaving.",
        },
        {
          id: 14,
          term: "Barber Pole",
          definition:
            "A traditional symbol for barbers, typically red, white, and blue.",
        },
        {
          id: 15,
          term: "Razor Fade",
          definition: "A fade achieved with the use of a straight razor.",
        },
        {
          id: 16,
          term: "Clipper",
          definition: "An electric tool used for cutting hair.",
        },
        {
          id: 17,
          term: "Shears",
          definition: "A pair of scissors used for cutting hair.",
        },
        {
          id: 18,
          term: "Pomade",
          definition:
            "A hair styling product that gives hair a shiny, slick appearance.",
        },
        {
          id: 19,
          term: "Gel",
          definition:
            "A hair product that provides a strong hold with a wet look.",
        },
        {
          id: 20,
          term: "Hairspray",
          definition: "A product used to hold a hairstyle in place.",
        },
        // Add more terms if necessary
      ];

      setTerms(glossaryData);
    };

    fetchTerms();
  }, []);

  // Handle term addition or update
  const handleSave = () => {
    if (editingTerm) {
      setTerms(
        terms.map((term) => (term.id === editingTerm.id ? newTerm : term))
      );
      setEditingTerm(null);
    } else {
      const newId = Date.now(); // Simple ID generation
      setTerms([...terms, { ...newTerm, id: newId }]);
    }
    setNewTerm({ term: "", definition: "" });
  };

  // Edit term
  const handleEdit = (term) => {
    setEditingTerm(term);
    setNewTerm({ term: term.term, definition: term.definition });
  };

  // Delete term
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this term?")) {
      setTerms(terms.filter((term) => term.id !== id));
    }
  };

  // Pagination logic
  const indexOfLastTerm = page * termsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
  const currentTerms = terms.slice(indexOfFirstTerm, indexOfLastTerm);

  const totalPages = Math.ceil(terms.length / termsPerPage);

  const handlePagination = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="h-screen w-full p-20">
      <h2 className="text-2xl font-bold mb-4">Manage Glossary</h2>
      <div className="mb-6 w-full">
        <input
          type="text"
          className="border p-2 mr-2"
          value={newTerm.term}
          onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
          placeholder="Enter term"
        />
        <input
          type="text"
          className="border p-2 mr-2"
          value={newTerm.definition}
          onChange={(e) =>
            setNewTerm({ ...newTerm, definition: e.target.value })
          }
          placeholder="Enter definition"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingTerm ? "Update" : "Add"} Term
        </button>
      </div>

      <table className="h-auto table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Term</th>
            <th className="px-4 py-2 text-left">Definition</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="h-auto w-full">
          {currentTerms.map((term) => (
            <tr key={term.id} className="border-b-gray-500 border-2 h-[100px]">
              <td className="px-4 py-2">{term.term}</td>
              <td className="px-4 py-2">{term.definition}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(term)}
                  className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(term.id)}
                  className="text-purple-600 border-purple-600 border-2 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-8 px-5">
        <button
          onClick={() => handlePagination("prev")}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination("next")}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Glossary;
