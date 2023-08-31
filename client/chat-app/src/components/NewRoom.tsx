import { useState } from "react";

import { useRoomContext } from "../context/room-context";

export default function NewRoom() {
  const [newRoomName, setNewRoomName] = useState("");
  const { setRoom, setRoomToLeave } = useRoomContext();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(newRoomName);

    setRoom((prev) => {
      setRoomToLeave(prev);
      return newRoomName;
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter room name"
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      <button type="submit">Create Room</button>
    </form>
  );
}
