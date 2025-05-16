// components/ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ open, setOpen, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fade-in">
        <h3 className="text-xl font-bold text-red-600 mb-4 text-center">
          Are you sure you want to delete this post?
        </h3>
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-tr from-red-500 to-red-600 text-white font-bold hover:shadow-lg hover:scale-105 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
