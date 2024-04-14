import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, List } from "antd";
import axios from 'axios';
import { io } from 'socket.io-client';
import "./chat.css";
import { baseUrl } from '../../envirment';

const socket = io("http://localhost:4000");

interface IMessage {
  _id: string;
  userId: string;
  message: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/chat/getChats?recieverId=${id}&senderId=${JSON.parse(localStorage.getItem("user") || '{}')._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setChatHistory(res.data.data.chat);
      } catch (error) {
        // setLoading(false);
        console.log(error);
      }
    };

    getChats();

    socket.emit("joinRoom", { userId: JSON.parse(localStorage.getItem("user") || '{}')._id, roomId:id });

    socket.on("receiveMessage", (data: IMessage) => {
      setChatHistory(prev => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [id]);

  const sendChats = () => {
    const messageData = {
      roomId :id,
      message,
      userId: JSON.parse(localStorage.getItem("user") || '{}')._id,
    };
    console.log(messageData);
    
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={chatHistory}
        renderItem={(item: IMessage, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              description={`${item.userId}: ${item.message}`}
            />
          </List.Item>
        )}
      />
      <div className="input-chat-container">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          suffix={
            <Button onClick={sendChats} style={{ color: "blueviolet" }}>
              Send
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Chat;
