import { Server as SocketServer } from "socket.io";

export function setupSocket(server: any) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("new user connected");

    socket.data.username = socket.handshake.auth.username;
    socket.on("join_room", (data) => {
      socket.leave(data.roomToLeave);
      socket.join(data.room);
      const roomList = getRoomList(io.sockets.adapter.rooms);

      console.log(roomList);

      io.emit("room_list", roomList);
    });

    socket.on("send_message", ({ message, room }) => {
      io.to(room).emit("message_received", message);
    });

    socket.on("user_typing", ({ isTyping, room }) => {
      socket.to(room).emit("user_is_typing", isTyping);
    });

    socket.on("disconnect", () => {
      const roomList = getRoomList(io.sockets.adapter.rooms);
      io.emit("room_list", roomList);
    });
  });

  function getRoomList(mapOfSets: any) {
    const arrayOfObjects: string[] = [];

    if (!mapOfSets.has("Lobby")) {
      mapOfSets.set("Lobby", new Set());
    }

    for (const [key, set] of mapOfSets) {
      if (!set.has(key)) {
        Array.from(set).map((socketId: any) => {
          const socket = io.sockets.sockets.get(socketId);
          return socket ? socket.data.username : "Unknown";
        });

        arrayOfObjects.push(key);
      }
    }

    return arrayOfObjects;
  }
}
