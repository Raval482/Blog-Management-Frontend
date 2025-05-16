import axios from "axios";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const token = sessionStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    axios("http://localhost:4000/api/usersomeData", {
      headers: { Authorization: token },
    }).then((res) => setUsers(res.data.data || []));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios(`http://localhost:4000/api/message/get/${selectedUser.id}`, {
        headers: { Authorization: token },
      }).then((res) => setMessages(res.data.data));
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    await axios.post(
      "http://localhost:4000/api/message/send",
      { receiverId: selectedUser.id, message: newMsg },
      { headers: { Authorization: token } }
    );
    setMessages([...messages, { sender: "me", message: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Sidebar */}
      <div className="col-span-1 bg-white border-r border-gray-200 overflow-y-auto shadow-md">
        <div className="p-4 border-b text-lg font-semibold text-indigo-600">Active Users</div>
        {users.map((user, i) => (
          <div
            key={i}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer hover:bg-indigo-100 transition-all flex items-center gap-3 border-b ${
              selectedUser?.id === user.id ? "bg-indigo-100" : ""
            }`}
          >
            <img
              src={
                user.userImg
                  ? `http://192.168.50.80:4000/public/uploads/${user.userImg}`
                  : `https://ui-avatars.com/api/?name=${user.name}&background=random`
              }
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
            />
            <div>
              <p className="text-gray-800 font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="col-span-3 flex flex-col bg-indigo-50 h-screen">
        {!selectedUser ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-xl">
            Select a user to start chat 💬
          </div>
        ) : (
          <>
            <div className="p-4 shadow bg-white font-semibold text-indigo-600">
              Chatting with {selectedUser.name}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === selectedUser.id
                      ? "bg-white text-left"
                      : "bg-indigo-500 text-white ml-auto"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="p-4 bg-white flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
  