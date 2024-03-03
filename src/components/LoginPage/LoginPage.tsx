import { useState } from "react";
import "./LoginPage.css";
import { patchData, postData } from "../../Config/Config";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [registered, setRegistered] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<any>("");
  const [passError, setPassError] = useState<any>("");
  const [saveName, setSaveName]=useState<boolean>(false);
  const [name, setName]=useState<string>("");
  const [age, setAge]=useState<string>("");
  const [gender, setGender]=useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = async () => {
    if (isValidEmail(email)) {
      setEmailError("");
      setLoading(true);
      const body = { email: email };
      const response = await postData("register", body, {});
      if (response) {
        setData(response);
        setRegistered(true);
      }
    } else {
      setEmailError("Invalid Email Address");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const body = { email: email, pass: password };
    const response = await postData("login", body, {});
    if (response.success) {
      console.log(response);
      setPassError("");
      if(response?.data?.reg){
        setSaveName(true);
      }
    } else if (!response.success) {
      setPassError(response.message);
    }
    setLoading(false);
  };

  const handleRegistration=async()=>{
    setLoading(true);
    const body={email: email, name:name, age:age, gender:gender};
    const response=await patchData("registration", body, {});
    if(response){
      console.log(response);
    }
    setLoading(false);
  }
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
      {emailError && <div className="errormsg">{emailError}</div>}
      {registered && (
        <input
          type="password"
          className="pass-input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      )}
      {passError && <div className="errormsg">{passError}</div>}
      {saveName&&(
        <input
        type="text"
        className="pass-input"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}/>
      )}
      {saveName&&(
        <input
        type="text"
        className="pass-input"
        placeholder="Age"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}/>
      )}
      {saveName&&(
        <input
        type="text"
        className="pass-input"
        placeholder="Gender"
        value={gender}
        onChange={(e) => {
          setGender(e.target.value);
        }}
        />
      )}
      <button
        className="login-btn"
        onClick={() => {
          if (!data.status) {
            handleNext();
          } else if (data?.status === 1 || data?.status === 2) {
            handleLogin();
            if(saveName){
              handleRegistration();
            }
          }
        }}>
        {loading ? (
          <Bounce
            color="white"
            size={20}
          />
        ) : !registered ? (
          "Next"
        ) : data.status === 1 ? (
          "Login"
        ) : (
          saveName?"SignUp":"Register"
        )}
      </button>
    </div>
  );
};

export default LoginPage;
