import React, { useEffect, useState } from "react";
import "./Message.css";
import Swal from "sweetalert2";
import API from "../components/Api";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setMessages(data.messages);
      } else {
        Swal.fire("Error", "Failed to fetch messages", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, );

  // Delete Message
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/message/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          Swal.fire("Deleted!", "Message has been deleted.", "success");
          fetchMessages(); // Refresh list
        } else {
          Swal.fire("Error", "Delete failed", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  return (
    <div className="message-container">
      <h2 className="message-title">📩 Received Messages</h2>

      {loading ? (
        <p className="loading-text">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="empty-text">No messages yet.</p>
      ) : (
        <div className="message-grid">
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="message-header">
                <h3>{msg.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(msg._id)}
                >
                  Delete
                </button>
              </div>

              <p className="email">
                <strong>Email:</strong> {msg.email}
              </p>

              <p className="message-text">{msg.message}</p>

              <small className="date">
                {new Date(msg.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Message;