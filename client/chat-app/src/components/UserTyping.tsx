import { useRoomContext } from "../context/room-context";

export default function UserTyping() {
  const { message, setMessage, sendMessage, isTyping } = useRoomContext();

  return (
    <div className="inputBox">
      <div>{isTyping && "Somebody is typing..."}</div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input"
        type="text"
        placeholder="Skriv ditt meddelande här"
      />
      <button className="inputButton" onClick={sendMessage}>
        Skicka
      </button>
    </div>
  );
}
