import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

const UserTable = () => {
  const token = sessionStorage.getItem("token");

  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleChange = (id, value) => {
    updateStatusApiFetch(id, value);
  };

  const handleOtp = (id,value) => {
    OtpVerification(id,value)
  }

  const OtpVerification = async(id,value) =>{
   const status = Boolean(value)
    try {
      const response = await axios.post(
        "http://192.168.50.80:4000/api/otp-bypass",
        { id, otpVerify: status },
        { headers: { Authorization: token } }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchApi();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const updateStatusApiFetch = async (id, value) => {
    try {
      const response = await axios.post(
        "http://192.168.50.80:4000/api/permission",
        { id, status: value },
        { headers: { Authorization: token } }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchApi();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://192.168.50.80:4000/api/all-user", {
        headers: { Authorization: token },
      });
      setUserData(response?.data?.data);
      console.log(response?.data?.data)
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.post(
        "http://192.168.50.80:4000/api/deleteUser", 
        { id: selectedUserId },
        { headers: { Authorization: token } }
      );
      if (response?.data?.success) {
        toast.success("User deleted successfully.");
        fetchApi(); 
        closeModal();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting user.");
    }
  };

  const openModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-start p-6">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full  border border-white/30">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 tracking-wide drop-shadow-md">
          👥 User List
        </h2>

        <div className="overflow-auto rounded-2xl">
          <table className="min-w-full shadow-lg rounded-2xl overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Change Status</th>
                <th className="py-3 px-6 text-left">Otp Verification</th>
                <th className="py-3 px-6 text-left">Actions</th> {/* Delete column */}
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {userData.length > 0 ? (
                userData.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-purple-50 transition-all duration-200"
                  >
                    <td className="py-3 px-6 font-semibold text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-6 font-semibold text-gray-600">
                      <img 
                        src={user.userImg && `http://192.168.50.80:4000/public/uploads/${user.userImg}`}
                        alt="User"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-md tracking-wide ${user.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : user.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 capitalize">{user.role}</td>
                    <td className="py-3 px-6">
                      <select
                        value={user.status}
                        onChange={(e) => handleChange(user._id, e.target.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-inner border-none transition-all duration-200 outline-none focus:ring-2 ${user.status === 'approved'
                            ? 'bg-green-50 text-green-800'
                            : user.status === 'pending'
                              ? 'bg-yellow-50 text-yellow-800'
                              : 'bg-red-50 text-red-800'
                          }`}
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3 px-6">
                      <select
                        value={user.otpVerify}
                        onChange={(e) => handleOtp(user._id, e.target.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-inner border-none transition-all duration-200 outline-none focus:ring-2 ${user.otpVerify
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                          }`}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => openModal(user._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-5 text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal for Delete Confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        className="bg-white w-96 mx-auto p-6 rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Are you sure?</h2>
        <p className="text-center text-gray-600 mt-2">Do you really want to delete this user?</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleDeleteUser}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
