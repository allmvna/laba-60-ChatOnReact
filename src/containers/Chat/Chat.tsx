import MessageList from "../../components/MessageList/MessageList.tsx";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.tsx";
import MessageForm from "../../components/MessageForm/MessageForm.tsx";

interface Message {
  message: string;
  author: string;
  datetime: string;
}

interface NewMessage {
  author: string;
  message: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMessages = async (): Promise<void> => {
      try {
        const response = await fetch("http://146.185.154.90:8000/messages");
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const allMessages: Message[] = await response.json();
        setMessages(allMessages);
        if (allMessages.length > 0) {
          setLastMessage(allMessages[allMessages.length - 1].datetime);
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllMessages();
  }, []);

  useEffect(() => {
    const getLastNewMessages = async (): Promise<void> => {
      if (!lastMessage) return;

      try {
        const response = await fetch(
          `http://146.185.154.90:8000/messages?datetime=${lastMessage}`,
        );
        if (!response.ok) {
          throw new Error(
            `New messages cannot be received. Error status: ${response.status}.`,
          );
        }
        const newMessages: Message[] = await response.json();
        if (newMessages.length > 0) {
          setMessages((prevMessages) => {
            const currentDates = prevMessages.map((msg) => msg.datetime);
            const uniqNewMessages = newMessages.filter(
              (msg) => !currentDates.includes(msg.datetime),
            );
            return [...prevMessages, ...uniqNewMessages];
          });

          setLastMessage(newMessages[newMessages.length - 1].datetime);
        }
      } catch (error) {
        alert(`Error fetching new messages: ${error}`);
      }
    };

    const interval = setInterval(getLastNewMessages, 5000);
    getLastNewMessages();
    return () => clearInterval(interval);
  }, [lastMessage]);

  const onSubmitForm = async (newMessage: NewMessage) => {
    const { author, message } = newMessage;
    const data = new URLSearchParams({
      author,
      message,
    });
    try {
      const response = await fetch("http://146.185.154.90:8000/messages", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      const addedMessage: Message = await response.json();
      if (addedMessage.message && addedMessage.author) {
        setMessages((prev) => [...prev, addedMessage]);
        setLastMessage(addedMessage.datetime);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="chat-container pt-2">
          <h3 className="text-center mb-2">Chat</h3>
          <MessageList messages={messages} />
          <MessageForm onSubmit={onSubmitForm} />
        </div>
      )}
    </>
  );
};

export default Chat;
