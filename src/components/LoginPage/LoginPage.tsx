import axios from "axios";
import "./LoginPage.css";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async () => {
    const response = await axios.post("https://veil-talk-backend.vercel.app/api/register", { email, password });
    const data=response.data;
    console.log(data);
  };
  return (
    <div className="login-main-div">
      <div className="login-text">Welcome to Veil Talk</div>
      <input
        type="email"
        className="email-input"
        placeholder="Email"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <input
        type="password"
        className="email-input"
        placeholder="Password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <button className="login-btn" onClick={()=>{handleLogin()}}>Log In</button>
    </div>
  );
};

export default LoginPage;
