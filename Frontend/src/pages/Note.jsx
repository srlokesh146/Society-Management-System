import React, { useEffect, useState } from "react";
import { FaEdit, FaEllipsisV } from "react-icons/fa";
import { CreateNote, GetNotes, UpdateNote } from "../services/notesService";
import { toast } from "react-hot-toast";

const initialNotes = [
  {
    id: 1,
    title: "Rent or Mortgage",
    date: "2024-01-07",
    description:
      "A visual representation of your spending categories visual representation.",
  },
  {
    id: 2,
    title: "Housing Costs",
    description:
      "A visual representation of your spending categories visual representation.",
  },
  {
    id: 3,
    title: "Property Taxes",
    description:
      "A visual representation of your spending categories visual representation.",
  },
  {
    id: 4,
    title: "Maintenance Fees",
    description:
      "A visual representation of your spending categories visual representation.",
  },
  {
    id: 5,
    title: "Rent or Transportation",
    description:
      "A visual representation of your spending categories visual representation.",
  },
];

function Note() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentNote, setCurrentNote] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const checkFormFilled = (note) => {
    return (
      note?.title?.trim() !== "" &&
      note?.description?.trim() !== "" &&
      note?.date?.trim() !== ""
    );
  };

  const handleNoteChange = (field, value) => {
    const updatedNote = {
      ...currentNote,
      [field]: value,
    };
    setCurrentNote(updatedNote);
    setIsFormFilled(checkFormFilled(updatedNote));
  };

  const handleCreateNote = () => {
    setModalType("create");
    setCurrentNote({ title: "", description: "", date: "" });
    setIsModalOpen(true);
    setIsFormFilled(false);
  };

  const handleEditNote = (note) => {
    setModalType("edit");
    setCurrentNote({ ...note });
    setIsModalOpen(true);
    setIsFormFilled(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (modalType === "create") {
      try {
        const response = await CreateNote(currentNote);
        fetchNotes();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (modalType === "edit") {
      const updateData = {
        title: currentNote.title,
        description: currentNote.description,
        date: currentNote.date,
      };
      try {
        const response = await UpdateNote(currentNote._id, updateData);
        fetchNotes();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setDropdownOpen(false);
      }
    }
    handleCloseModal();
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const fetchNotes = async () => {
    try {
      const response = await GetNotes();
      setNotes(response.data.Note);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Note</h1>
        <button
          onClick={handleCreateNote}
          className="px-4 py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-md hover:opacity-90"
        >
          Create Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-[#5678E9] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium">{note.title}</h3>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(note._id)}
                  className="hover:opacity-80"
                >
                  <FaEllipsisV />
                </button>
                {dropdownOpen === note._id && (
                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md hover:bg-gray-50 shadow-lg z-10">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700  flex items-center gap-2 font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <p className="text-gray-500 text-sm">Description</p>
                <p className="text-sm text-gray-600">{note.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {modalType === "create" ? "Create Note" : "Edit Note"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={currentNote?.title || ""}
                    onChange={(e) => handleNoteChange("title", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentNote?.description || ""}
                    onChange={(e) =>
                      handleNoteChange("description", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg h-24"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    defaultValue={
                      currentNote?.date
                        ? new Date(currentNote.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleNoteChange("date", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormFilled}
                    className={`w-full py-3 text-sm font-medium rounded-lg transition-all duration-300
                      ${
                        isFormFilled
                          ? " bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90"
                          : "bg-[#F6F8FB] text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {modalType === "save" ? "save" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
