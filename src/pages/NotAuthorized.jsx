// /src/pages/NotAuthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200 p-4">
      <h1 className="text-5xl font-bold text-red-700 mb-4">403 - Not Authorized</h1>
      <p className="text-xl text-gray-700 mb-6 text-center">
        आप इस पेज को एक्सेस करने के लिए अधिकृत नहीं हैं। कृपया अपने रोल की जाँच करें।
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg transition duration-300"
      >
        वापस होम पर जाएँ
      </Link>
    </div>
  );
};

export default NotAuthorized;
