import React, { useState, useEffect } from "react";

const ManageTagsModal = ({ onClose }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchingTags, setFetchingTags] = useState(true);
  const [showAddTag, setShowAddTag] = useState(false); // New state for toggling input visibility

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/auth/load-all-tags",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tags");
        }

        const data = await response.json();
        setTags(data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching tags");
      } finally {
        setFetchingTags(false);
      }
    };

    fetchTags();
  }, []);

  const handleRemoveTag = async (tagId) => {
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/auth/remove-tags/${tagId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete tag");
      }
      setTags(tags.filter((tag) => tag._id !== tagId));
    } catch (error) {
      setError(error.message || "An error occurred while removing the tag");
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim() || newTag.length > 28 || tags.length >= 25) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/add-tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagName: newTag.trim() }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add tag");
      }

      const data = await response.json();

      setTags([...tags, data.tag]);
      setNewTag("");
      setShowAddTag(false); // Close input after adding
    } catch (error) {
      setError(error.message || "An error occurred while adding the tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        <h2
          className="text-lg font-semibold mb-4"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
        >
          Manage Tags
        </h2>
        <p
          className="text-sm text-gray-600 mb-4"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            fontStyle: "normal",
            fontWeight: 400,
            color: "rgb(100, 116, 139)",
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          Easily organize and monitor sellers by tagging them with relevant
          labels. You can add up to 25 tags as needed, with each tag limited to
          28 characters.
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Tags Section */}
        {fetchingTags ? (
          <p>Loading tags...</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <div
                key={tag._id}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
              >
                <span className="text-sm text-gray-800">{tag.tagName}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => handleRemoveTag(tag._id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toggle Input Section */}
        {!showAddTag ? (
          <button
            className="w-full bg-white text-black border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setShowAddTag(true)}
          >
            + Add New Tag
          </button>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Add a new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                maxLength={28}
              />
              <button
                className={`px-3 py-1 rounded-md ${
                  loading || tags.length >= 25
                    ? "opacity-50 cursor-not-allowed bg-gray-300"
                    : "bg-stone-700 text-white hover:bg-stone-800"
                }`}
                onClick={handleAddTag}
                disabled={loading || tags.length >= 25}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
            {/* <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddTag(false)}
            >
              Cancel
            </button> */}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTagsModal;
