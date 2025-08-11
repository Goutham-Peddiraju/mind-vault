import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(changePassword({ oldPassword,  newPassword }));
    if (res.payload?.success) {
      setMessage("Password changed successfully!");
      navigate("/login");
    } else {
      setMessage(res.payload?.message || "Failed to change password");
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit" >Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
