import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const changes = (event) => {
        const { name, value } = event.target;
        setData((preData) => ({
            ...preData,
            [name]: value
        }));
    };

    const submit = async (event) => {
        event.preventDefault()
        const obj = {
            email: data.email,
            password: data.password
        };
        try {
            const response = await axios.post("http://192.168.50.80:4000/api/login", obj)

            const status = response?.data?.data?.status
            const role = response?.data?.data?.role
            const token = response?.data?.token
            const userId = response?.data?.data?._id
            
            sessionStorage.setItem("status", status)
            sessionStorage.setItem("role", role)
            sessionStorage.setItem("token", token)
            sessionStorage.setItem("id", userId)

            if (response?.data?.success) {
                toast.success(response?.data?.message)
                if (role === "admin") {
                    navigate("/admin/dashboard")
                } else {
                    navigate("/dashboard")
                }
            } else {
                toast.error(response?.data?.message)
            }
            
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-6" >

                <h2 className="text-3xl font-bold text-center text-purple-700">Login</h2>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={data.email}
                        onChange={changes}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        name="password"
                        value={data.password}
                        onChange={changes}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Submit
                </button>

                <p>You have no Account Lets's <Link to="/register" className='underline text-blue-800' > Register now</Link></p>
            </form>
        </div>
    );
};

export default Login;
