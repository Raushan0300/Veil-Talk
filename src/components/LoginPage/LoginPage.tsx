import { useState } from "react";
import "./LoginPage.css";
import { postData } from "../../Config/Config";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const handleLogin = async () => {
    const body = { email: email, pass: password };
    const response = await postData("register", body, {});
    setData(response);
  };
  return (
    <div className="login-main-div">
      <div className="login-text">Welcome to Veil Talk</div>
      <input
        type="email"
        className="email-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className="email-input"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="login-btn"
        onClick={() => {
          handleLogin();
        }}>
        Log In
      </button>
    </div>
  );
};

export default LoginPage;
