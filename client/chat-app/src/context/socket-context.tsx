import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


// const socket = io("http://localhost:9000");

type SocketProps = {
  children: React.ReactNode;
};

type SocketContextType = {
  socket: Socket;

};



const defaultValue = {
  room: ""

}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("UseSocket must be used within a SocketProvider");
  }
  return context.socket;
};

export const SocketProvider = ({ children }: SocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const [room, setRoom] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);




    return () => {
      newSocket.disconnect();
    };
  }, []);



  if (!socket) {
    return <div>Loading...</div>;
  }



  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
