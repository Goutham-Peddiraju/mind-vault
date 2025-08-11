import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const isLoggedIn = sessionStorage.getItem("token");
  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <nav className="navbar">
    <h1>MindVault</h1>
    {isLoggedIn ? (
      <div className="navbt">
      
      <button className="btn" onClick={() => navigate("/change-password")}> change password </button>
      <button className="btn" onClick={handleLogout}> Logout </button>
      </div>
    ) : (
      <div className="auth-buttons">
        <button className="btn" onClick={() => navigate("/login")}>Login</button>
        <button className="btn" onClick={() => navigate("/register")}>Register</button>
      </div>
    )}
  </nav>
);
}
