import { useRoomContext } from "../context/room-context";
import { useUserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { username, setUsername } = useUserContext();
  const { setRoom, setHasJoinedRoom } = useRoomContext();

  const navigate = useNavigate();

  const loginUser = () => {
    if (username !== "") {
      setRoom("Lobby");
      setHasJoinedRoom(true);
    }

    navigate("/chat", { replace: true });
  };

  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1 className="headerHome">Chatt App</h1>

        <div className="inputContainer">
          <input
            className="inputHomePage"
            placeholder="Type in username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
          />
          <button onClick={loginUser} className="inputBtn">
            Start chat
          </button>
        </div>
      </div>
    </div>
  );
}
