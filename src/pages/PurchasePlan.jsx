import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  { name: "Free", value: "free", blogs: 2, color: "bg-gray-100", price: "₹0" },
  { name: "Bronze", value: "bronze", blogs: 4, color: "bg-yellow-100", price: "₹199" },
  { name: "Silver", value: "silver", blogs: 10, color: "bg-blue-100", price: "₹399" },
  { name: "Gold", value: "gold", blogs: 15, color: "bg-orange-100", price: "₹599" },
  { name: "Diamond", value: "dimond", blogs: "Unlimited", color: "bg-purple-100", price: "₹999" }
];

const PurchasePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    if (!selectedPlan) return setMessage("Please select a plan");

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:4000/api/purchase-plan",
        { newPlan: selectedPlan },
        { headers: { Authorization: token } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Choose Your Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.value}
            onClick={() => setSelectedPlan(plan.value)}
            className={`rounded-xl shadow-lg cursor-pointer transition-all transform hover:scale-105 border-2 ${
              selectedPlan === plan.value ? "border-indigo-600" : "border-transparent"
            }`}
          >
            <div className={`${plan.color} p-6 rounded-t-xl`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-between">
                {plan.name}
                {selectedPlan === plan.value && <FaCheckCircle className="text-green-600" />}
              </h3>
              <p className="text-sm text-gray-600">Create <span className="font-semibold">{plan.blogs}</span> blog posts</p>
            </div>
            <div className="p-4 bg-white rounded-b-xl flex justify-between items-center">
              <span className="text-lg font-bold text-indigo-600">{plan.price}</span>
              <button
                className={`text-sm px-4 py-1 rounded-full ${
                  selectedPlan === plan.value ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {selectedPlan === plan.value ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handlePurchase}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
        >
          Purchase Selected Plan
        </button>
      </div>

      {message && (
        <p className="text-center mt-6 text-lg font-medium text-green-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default PurchasePlan;
