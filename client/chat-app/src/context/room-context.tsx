import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9000";

const socket = io(SOCKET_URL);

type RoomContextType = {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  hasJoinedRoom: boolean;
  setHasJoinedRoom: (hasJoined: boolean) => void;
  users: string[];
  setRoomToLeave: React.Dispatch<React.SetStateAction<string>>;
  roomList: string[];
  sendMessage: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: string[];
  isTyping: boolean;
};

type UserProp = {
  children: React.ReactNode;
};
const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(" RoomContext must be used within a RoomProvider");
  }
  return context;
};

export const RoomProvider = ({ children }: UserProp) => {
  const [room, setRoom] = useState("");
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [users, setUsers] = useState([]);
  const [roomToLeave, setRoomToLeave] = useState("");
  const [roomList, setRoomList] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessageList([]);
    socket.emit("join_room", { room, roomToLeave });
  }, [room]);

  useEffect(() => {
    socket.on("room_list", (roomList) => {
      console.log(roomList);
      setRoomList(roomList);
    });
    socket.on("message_received", (message) => {
      setMessageList((prev) => [...prev, message]);
    });
    socket.on("user_is_typing", (isTyping) => {
      setIsTyping(isTyping);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("user_typing", { isTyping: !!message, room });
  }, [message]);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("send_message", { message, room }); // Include room info
      setMessage("");
    }
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        setRoom,
        hasJoinedRoom,
        setHasJoinedRoom,
        users,
        setRoomToLeave,
        roomList,
        message,
        setMessage,
        sendMessage,
        messageList,
        isTyping,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
