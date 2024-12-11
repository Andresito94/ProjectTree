import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PrivatePage() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    const decodedToken = jwtDecode(jwtToken);
    setCurrentUser(decodedToken.id);
  }, []);

  const handleLogout = () => {
    // Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {currentUser}</h1>
      <h1>Private Page</h1>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
