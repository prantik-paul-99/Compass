import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
  const host = "http://localhost:5000";
  const [user, setUser] = useState(null);

  // Fetch Information of Logged In User
  const getUser = async () => {
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const currUser = JSON.parse(JSON.stringify(json));
    setUser(currUser);
  };

  // getUser();

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
