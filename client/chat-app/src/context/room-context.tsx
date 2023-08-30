import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL);

//utgångspunkt - tom string - skall fyllas på när man 1. Går till Lobby, 2. går in i ett döpt rum
const defaultValue = {
  room: ""

}

type RoomContextType = {
  room: string;
  setRoom: (room: string) => void;
  hasJoinedRoom: boolean;
  setHasJoinedRoom: (hasJoined: boolean) => void;
  users: string[];
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
  const [room, setRoom] = useState(""); //Tagit bort lobby som sträng
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    socket.emit("join_room", room);
  }, [room])


  return (
    <RoomContext.Provider
      value={{ room, setRoom, hasJoinedRoom, setHasJoinedRoom, users }}
    >
      {children}
    </RoomContext.Provider>
  );
};
