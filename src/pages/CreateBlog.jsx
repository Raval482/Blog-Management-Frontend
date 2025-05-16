import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [postImage, setPostImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (postImage) {
      formData.append("postImage", postImage);
    }

    try {
      const response = await axios.post("http://192.168.50.80:4000/api/create-post", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        if (role === "admin") {
          navigate("/admin/blog");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8 tracking-wide drop-shadow-md">
          ✍️ Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Blog Title"
              className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-400 placeholder-gray-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="Write your blog message here..."
              className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-purple-400 placeholder-gray-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Upload Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-100 file:text-purple-700
                hover:file:bg-purple-200"
            />
            {postImage && (
              <img
                src={URL.createObjectURL(postImage)}
                alt="Preview"
                className="mt-3 h-32 w-32 rounded-xl object-cover border border-purple-300"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
          >
            🚀 Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
