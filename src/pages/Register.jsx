import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        userImg: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setData((prev) => ({
            ...prev,
            userImg: e.target.files[0]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.userImg) {
            formData.append("userImg", data.userImg);
        }

        try {
            const response = await axios.post("http://192.168.50.80:4000/api/registration", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response?.data?.success) {
                localStorage.setItem("email",response?.data?.email)
                toast.success(response?.data?.message || "Registered successfully!");
                navigate("/verify-otp");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-6"
                encType="multipart/form-data"
            >
                <h2 className="text-3xl font-bold text-center text-purple-700">Register</h2>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100"
                    />
                    {data.postImage && (
                        <img
                            src={URL.createObjectURL(data.postImage)}
                            alt="Preview"
                            className="mt-3 w-24 h-24 rounded-full object-cover border-2 border-purple-400 mx-auto"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-700">
                    Already have an account?
                    <Link to="/" className="underline text-blue-800 ml-1">Login now</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
