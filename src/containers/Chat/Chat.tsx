import MessageList from "../../components/MessageList/MessageList.tsx";
import {useEffect, useState} from "react";

interface Message {
    message: string;
    author: string;
    datetime: string;
}


const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const getAllMessages = async (): Promise<void> => {
            try {
                const response = await fetch('http://146.185.154.90:8000/messages');
                if (!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                }
                const allMessages: Message[] = await response.json();
                setMessages(allMessages);
            } catch (error) {
                alert(error);
            }
        };
        getAllMessages();
    }, []);


    return (
        <>
            <MessageList messages ={messages}/>
        </>
    );
};

export default Chat;