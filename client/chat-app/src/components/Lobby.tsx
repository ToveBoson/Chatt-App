import "../styling/Lobby.css";
import { useRoomContext } from "../context/room-context";
import NewRoom from "./NewRoom";
import UserTyping from "./UserTyping";

export default function Lobby() {
  const { setRoom, setRoomToLeave, roomList, messageList } = useRoomContext();

  return (
    <div className="lobby">
      <h1 className="headerLobby">Lobby</h1>
      <div className="chat-container">
        <div className="sidebar">
          <div className="createRoomHeader">
            <NewRoom />

            <button className="lobbyButton">Log out</button>
          </div>
          <h2>Rooms:</h2>
          <ul>
            {roomList.map((roomItem) => (
              <li
                onClick={() =>
                  setRoom((prev) => {
                    setRoomToLeave(prev);
                    return roomItem;
                  })
                }
                key={roomItem}
              >
                {roomItem}
              </li>
            ))}
          </ul>
        </div>

        <div className="chat">
          <div className="messages">
            {messageList.map((message, i) => (
              <p key={i}>{message}</p>
            ))}
          </div>

          <UserTyping />
        </div>
      </div>
    </div>
  );
}
