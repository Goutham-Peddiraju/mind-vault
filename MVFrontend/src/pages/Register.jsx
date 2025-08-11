import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate,Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [red,setRed]=useState(false);

  const handleRegister = async () => {
    const res = await dispatch(registerUser({ name, email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      setRed(false);
      navigate("/login");
  } else {
    setRed(true); // show error alert
    alert(res.payload); // optional popup alert
  }
  ;}

  return (
    <div className="container">
      <h2>Register</h2>
      {red && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button className="btn" onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

       <p style={{ marginTop: "10px" }}>
        Already Have Account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </Link>
      </p>


    </div>
  );
}
