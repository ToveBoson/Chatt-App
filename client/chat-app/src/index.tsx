import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/user-context";
import { RoomProvider } from "./context/room-context";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <RoomProvider>
        <App />
      </RoomProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
