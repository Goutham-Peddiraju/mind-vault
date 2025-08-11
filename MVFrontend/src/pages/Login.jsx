import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [red,setRed]=useState(false);

  const handleLogin = async () => {
    const res = await dispatch(loginUser({ email, password }));
    
    if (res.meta.requestStatus === "fulfilled") 
      {
        setRed(false);
        navigate("/");
      }
      else{
        setRed(true);
      }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {red && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button className="btn" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

       <p style={{ marginTop: "10px" }}>
        Don't Have Account?{" "}
        <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Register
        </Link>
      </p>

    </div>
  );
}
