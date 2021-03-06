import '../commonCss/login-signup.css'
import './FbSignup.css'

import { useState } from "react";
//import { withRouter } from "react-router-dom";
import axios from 'axios'

const FbSignup = function({ setIsLogin, facebookProfile, setUserData }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isNameValid, setIsNameValid] = useState("empty");
  const [isUsernameValid, setIsUsernameValid] = useState("empty");
  const [isPasswordValid, setIsPasswordValid] = useState("empty");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);

  console.log("facebookProfile: ", facebookProfile);
  function changeSingupButtonState(str) {
    if (str === "")
      setIsDisabled(true);
    else if (
      isNameValid === "valid" &&
      isUsernameValid === "valid" &&
      isPasswordValid === "valid"
    ) {
      setIsDisabled(false);
    }
    else setIsDisabled(true);
  }


  function handleChangeName(event) {
    const str = event.target.value;
    setName(str);
    if (str === "") {
      setIsNameValid("empty");
    } else setIsNameValid("valid");
    changeSingupButtonState(str);
  }


  function handleChangeUsername(event) {
    const str = event.target.value;
    setIsUsernameDuplicate(false);
    setUsername(str);
    if (str === "") {
      setIsUsernameValid("empty");
    } else setIsUsernameValid("valid");
    changeSingupButtonState(str);
  }


  function handleChangePassword(event) {
    const str = event.target.value;
    setPassword(str);
    if (str === "") {
      setIsPasswordValid("empty");
    } else setIsPasswordValid("valid");
    changeSingupButtonState(str);
  }


  async function requestSignup() {
    console.log("Signup button clicked. Requesting signup...")
    const res = await axios.post(
      "https://www.fpserver.click/signup",
      {
        email: facebookProfile.email,
        username: username,
        name: name,
        password: password,
      }
    );
    console.log(res);
    if (res.data.message === "???????????? ??????") {
      console.log("Signup successful.")
      setUserData(res.data.data);
      setIsLogin(true);
    } 
    else {
      // ?????? ????????? ?????????????????? ????????????
      console.log("Signup failed.")
      const msg = res.data.message;
      if (msg === "?????? ???????????? username ?????????") {
        console.log("Duplicate username.")
        setIsUsernameDuplicate(true);
      }
    }
  }


  return (
    <div className="login-signup-container fb-signup-container">
      <div className="login-signup-box box-1">
        <h1 className="logo">Enstagram</h1>
        <img 
          src={facebookProfile.profilePicture} 
          className="fblogin-profile-pic" 
          alt="facebook profile"
        />
        <input
          className="login-signup-input-box"
          type="text"
          placeholder="??????"
          value={name}
          onChange={handleChangeName}
        />
        <input
          className="login-signup-input-box"
          type="text"
          placeholder="????????? ??????"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          className="login-signup-input-box"
          type="password"
          placeholder="????????????"
          value={password}
          onChange={handleChangePassword}
        />
        {isUsernameDuplicate ? (
          <span className="invalid-msg">
            ?????? ???????????? ????????? ???????????????.
          </span>
        ) : null}
        <button
          className={`login-signup-button fb-signup-button ${
            isDisabled ? "login-signup-button-disabled" : null
          }`}
          type="submit"
          onClick={requestSignup}
          disabled={isDisabled}
        >
          ??????
        </button>
      </div>
    </div>
  );
}

export default FbSignup