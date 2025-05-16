import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, Clock, XCircle } from "lucide-react";

const BlogCard = ({ blog, handleRefresh }) => {
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const user_Id = sessionStorage.getItem("id");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(blog.title);
  const [updatedDescription, setUpdatedDescription] = useState(blog.description);

  const imageBaseUrl = "http://localhost:4000/public/post/";

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/delete-post",
        { id: selectedId },
        { headers: { Authorization: token } }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        handleRefresh();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChangeStatus = async (id, status) => {
    if (status === "rejected") {
      setSelectedId(id);
      setIsRejectModalOpen(true);
    } else {
      await updateStatus(id, status, "");
    }
  };

  const updateStatus = async (id, status, comment = "") => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blog-permission",
        { id, status, comment },
        { headers: { Authorization: token } }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        handleRefresh();
        setIsRejectModalOpen(false);
        setRejectComment("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleRejectSubmit = () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide a comment for rejection.");
      return;
    }
    updateStatus(selectedId, "rejected", rejectComment);
  };

  const handleEditClick = () => {
    setUpdatedTitle(blog.title);
    setUpdatedDescription(blog.description);
    setIsEditModalOpen(true);
  };

  const updateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("id", blog._id);
      formData.append("title", updatedTitle);
      formData.append("description", updatedDescription);
      if (updatedImage) {
        formData.append("postImage", updatedImage);
      }

      const response = await axios.post("http://localhost:4000/api/update-post", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      });

      if (response?.data?.success) {
        toast.success("Blog updated successfully!");
        handleRefresh();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const statusBadge = {
    approved: {
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle size={16} className="inline-block mr-1" />,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock size={16} className="inline-block mr-1" />,
    },
    rejected: {
      color: "bg-red-100 text-red-800",
      icon: <XCircle size={16} className="inline-block mr-1" />,
    },
  };

  return (
    <>
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200 transition-transform hover:shadow-xl hover:-translate-y-1 duration-300">
        {/* Blog Image */}
        <div className="relative w-full h-60 bg-gray-100">
          {blog.postImage ? (
            <img
              src={`${imageBaseUrl}${blog.postImage}`}
              alt="Blog Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold text-lg">
              No Image
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Title and Status */}
          <div className="flex justify-between items-start mb-4 ">
            <h2 className="text-xl font-semibold text-indigo-700 leading-tight ">{blog.title}</h2>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`text-xs px-1 py-1 rounded-full font-medium capitalize shadow ${statusBadge[blog.status].color} w-24 h-8 flex items-center justify-center`}
              >
                <span className="text-xs">{statusBadge[blog.status].icon}</span> {blog.status}
              </span>

              {/* Edit/Delete Buttons */}

            </div>
          </div>
          <div className="flex gap-2 justify-between items-center ">
            <div>
              {/* Admin Status Dropdown */}
              {role === "admin" && (
                <div className="mb-4">
                  <label className="block text-sm text-gray-500 font-medium mb-1">Change Status</label>
                  <select
                    value={blog.status}
                    onChange={(e) => handleChangeStatus(blog._id, e.target.value)}
                    className={` py-2 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 ${blog.status === "approved"
                      ? "bg-green-50 border-green-300 text-green-800"
                      : blog.status === "pending"
                        ? "bg-yellow-50 border-yellow-300 text-yellow-800"
                        : "bg-red-50 border-red-300 text-red-800"
                      }`}
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
            <div className='flex gap-2'>
              {blog.userId === user_Id && (
                <button
                  onClick={handleEditClick}
                  className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                  Edit
                </button>
              )}
              {(blog.userId === user_Id || role === "admin") && (
                <button
                  onClick={() => handleDeleteClick(blog._id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-5 whitespace-pre-line break-all">{blog.description}</p>



          {/* Comment Section */}
          {blog.comment ? (
            <div className="p-4 bg-gray-50 border-l-4 border-indigo-400 rounded-md shadow-sm text-sm text-gray-800">
              <strong className="text-indigo-600">Comment:</strong> {blog.comment}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-md shadow-sm text-sm text-gray-500">
              No Comment
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-red-100 to-purple-200 flex items-center justify-center px-4">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-red-600 text-center mb-3 tracking-wide drop-shadow-md">
              Are you sure you want to delete?
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">This action cannot be undone.</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300 font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-red-100 to-purple-200 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-red-600 text-center mb-4 tracking-wide drop-shadow-md">
              Reject Blog
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Rejection Reason</label>
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  placeholder="Write reason for rejection..."
                  rows={4}
                  className="w-full border px-4 py-3 bg-white/90 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-red-300 placeholder-gray-400 transition"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => {
                    setIsRejectModalOpen(false);
                    setRejectComment("");
                  }}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300 font-bold"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-8">
            <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide drop-shadow-md">
              ✍️ Edit Blog
            </h2>
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Title</label>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Enter Blog Title"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-300 placeholder-gray-400 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Description</label>
                <textarea
                  rows={5}
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Write your blog description..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-indigo-300 placeholder-gray-400 transition"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Upload Blog Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                  className="block w-full text-sm text-gray-700
            file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition"
                />
              </div>
            </div>

            {/* Save Changes */}
            <div className="flex justify-center gap-4 pt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={updateBlog}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300 font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
