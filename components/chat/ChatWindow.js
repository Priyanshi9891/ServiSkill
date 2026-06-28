"use client";

import { useEffect, useState } from "react";

export default function ChatWindow({
  bookingId,
  currentUserId,
  currentUserName,
  receiverId,
  receiverName,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function loadMessages() {
    try {
      const res = await fetch(
        "/api/messages/conversation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
          }),
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!bookingId) return;

    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [bookingId]);

  async function sendMessage() {
    console.log({
  bookingId,
  currentUserId,
  currentUserName,
  receiverId,
  receiverName,
});
    if (!message.trim()) return;

    try {
      const res = await fetch(
        "/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            senderId: currentUserId,
            senderName: currentUserName,
            receiverId,
            receiverName,
            message,
          }),
          
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setMessage("");
      loadMessages();
    } catch (error) {
      console.log(error);
    }
  }

  // return (
  //   <div className="max-w-3xl mx-auto">

  //     <div className="mb-4">
  //       <h2 className="font-bold text-xl">
  //         Chat with {receiverName}
  //       </h2>
  //     </div>

  //     <div className="border rounded p-4 h-[500px] overflow-y-auto bg-gray-50">

  //       {messages.length === 0 ? (
  //         <p className="text-center text-gray-500">
  //           No messages yet
  //         </p>
  //       ) : (
  //         messages.map((msg) => (
  //           <div
  //             key={msg._id}
  //             className={`mb-3 ${
  //               msg.senderId === currentUserId
  //                 ? "text-right"
  //                 : "text-left"
  //             }`}
  //           >
  //             <div
  //               className={`inline-block px-4 py-2 rounded-lg max-w-[70%] ${
  //                 msg.senderId === currentUserId
  //                   ? "bg-blue-500 text-white"
  //                   : "bg-gray-200"
  //               }`}
  //             >
  //               <p className="text-xs font-bold mb-1">
  //                 {msg.senderName}
  //               </p>

  //               <p>{msg.message}</p>
  //             </div>
  //           </div>
  //         ))
  //       )}

  //     </div>

  //     <div className="flex gap-2 mt-4">

  //       <input
  //         type="text"
  //         value={message}
  //         onChange={(e) =>
  //           setMessage(e.target.value)
  //         }
  //         placeholder="Type message..."
  //         className="flex-1 border p-3 rounded"
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter") {
  //             sendMessage();
  //           }
  //         }}
  //       />

  //       <button
  //         onClick={sendMessage}
  //         className="bg-blue-600 text-white px-6 rounded"
  //       >
  //         Send
  //       </button>

  //     </div>

  //   </div>
  // );
  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-6">

    <div className="w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-6 py-5 flex items-center justify-between shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl shadow-md">
            👤
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {receiverName}
            </h2>
          </div>

        </div>

      </div>

      {/* Messages */}

      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px,#d1fae5 1px,transparent 0)",
          backgroundSize: "25px 25px",
        }}
      >

        {messages.length === 0 ? (

          <div className="h-full flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-2xl px-8 py-6">

              <p className="text-gray-500 text-lg">
                💬 No messages yet
              </p>

            </div>

          </div>

        ) : (

          messages.map((msg) => (

            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[70%] px-5 py-3 rounded-3xl shadow-md transition-all duration-200 hover:shadow-xl
                  ${
                    msg.senderId === currentUserId
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                  }`}
              >

                <p
                  className={`text-xs font-bold mb-1 ${
                    msg.senderId === currentUserId
                      ? "text-green-100"
                      : "text-green-600"
                  }`}
                >
                  {msg.senderName}
                </p>

                <p className="text-[15px] leading-relaxed break-words">
                  {msg.message}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Input */}

      <div className="bg-white border-t p-5">

        <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2 shadow-inner">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            ➤
          </button>

        </div>

      </div>

    </div>

  </div>
);
}