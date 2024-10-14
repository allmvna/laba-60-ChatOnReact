import * as React from "react";
import dayjs from "dayjs";

interface Message {
  message: string;
  author: string;
  datetime: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <>
      {messages.length > 0 ? (
        messages.map((sms, index) => (
          <div
            key={index}
            className="container border border-light rounded mb-2"
          >
            <div className="p-2 text-white">
              <strong className="text-danger me-2">Author:</strong>
              {sms.author}
              <br />
              <strong className="text-primary me-2">Дата:</strong>
              {dayjs(sms.datetime).format("DD/MM/YYYY HH:mm")}
              <br />
              <strong className="text-success me-2">Message:</strong>
              {sms.message}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">Нет сообщений.</p>
      )}
    </>
  );
};

export default MessageList;
