import * as React from "react";
import { useState } from "react";

interface NewMessage {
  author: string;
  message: string;
}

interface MessageFormProps {
  onSubmit: (newMessage: NewMessage) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [newMessage, setNewMessage] = useState<NewMessage>({
    author: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.author.trim() || !newMessage.message.trim()) {
      return alert("Please fill in all the fields.");
    }

    onSubmit(newMessage);
    setNewMessage({
      author: "",
      message: "",
    });
  };

  return (
    <>
      <div className="container d-flex justify-content-center text-white align-items-center my-2">
        <div
          className="bg-dark p-4 rounded shadow-sm"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <form id="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author:
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                id="author"
                value={newMessage.author}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, author: e.target.value })
                }
              />
            </div>

            <div className="mb-3 text-white">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <textarea
                className="form-control bg-dark text-white border-secondary"
                id="message"
                style={{ height: "100px" }}
                value={newMessage.message}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, message: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit" className="btn btn-light">
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
