import MessageList from "../../components/MessageList/MessageList.tsx";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader/Loader.tsx";

interface Message {
    message: string;
    author: string;
    datetime: string;
}


const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        };
        getAllMessages();
    }, []);


    return (
        <>
            {isLoading ? (
                <Loader/>
            ):
                <MessageList messages ={messages}/>
            }
        </>
    );
};

export default Chat;