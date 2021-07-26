import "../commonCss/login-signup.css";
import "./Signup.css";

import Footer from "../components/Footer.js";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { validateEmail } from "../validator/validator";
import axios from 'axios'

const Signup = function({ setIsLogin, handleFacebookLogin, setUserData }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState("empty");
  const [isNameValid, setIsNameValid] = useState("empty");
  const [isUsernameValid, setIsUsernameValid] = useState("empty");
  const [isPasswordValid, setIsPasswordValid] = useState("empty");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);

  let history = useHistory();

  function changeSingupButtonState(str) {
    if (str === "") setIsDisabled(true);
    else if (
      isEmailValid === "valid" &&
      isNameValid === "valid" &&
      isUsernameValid === "valid" &&
      isPasswordValid === "valid"
    ) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  };


  function handleChangeEmail(event) {
    const str = event.target.value;
    setIsEmailDuplicate(false);
    setEmail(str);
    if (str === "") setIsEmailValid("empty");
    else if (!validateEmail(str)) setIsEmailValid("invalid");
    else setIsEmailValid("valid");
    changeSingupButtonState(str);
  };


  function handleChangeName(event) {
    const str = event.target.value;
    setName(str);
    if (str === "") {
      setIsNameValid("empty");
    } else setIsNameValid("valid");
    changeSingupButtonState(str);
  };


  function handleChangeUsername(event) {
    const str = event.target.value;
    setIsUsernameDuplicate(false);
    setUsername(str);
    if (str === "") {
      setIsUsernameValid("empty");
    } else setIsUsernameValid("valid");
    changeSingupButtonState(str);
  };


  function handleChangePassword(event) {
    const str = event.target.value;
    setPassword(str);
    if (str === "") {
      setIsPasswordValid("empty");
    } else setIsPasswordValid("valid");
    changeSingupButtonState(str);
  };


  async function requestSignup() {
    console.log("Signup button clicked. Requesting signup...")
    const res = await axios.post(
      "https://www.fpserver.click/signup",
      {
        email: email,
        username: username,
        name: name,
        password: password,
      }
    );
    console.log(res);

    if (res.data.message === "회원가입 성공") {
      console.log("Signup successful.")
      setUserData(res.data.data);
      setIsLogin(true);
    } 
    else {
      // 어떤 정보가 중복이었는지 알려주기
      console.log("Signup failed.")
      const msg = res.data.message;
      console.log(msg);

      if (msg === "이미 존재하는 email 입니다") {
        console.log("Duplicate email.")
        setIsEmailDuplicate(true);
      } 
      else if (msg === "이미 존재하는 username 입니다") {
        console.log("Duplicate username.")
        setIsUsernameDuplicate(true);
      }
    }
  }

  return (
    <div>
      <div className="login-signup-container">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <span className="signup-text">
            친구들의 사진과 동영상을 보려면 가입하세요.
          </span>
          <button 
            className="signup-facebook-login-button"
            onClick={()=>handleFacebookLogin(history)}
          >
            <FontAwesomeIcon
              className="facebook-icon"
              icon={faFacebookSquare}
            />
            Facebook으로 로그인
          </button>
          <div className="line"></div>
          <span className="or-text">또는</span>
          <input
            className={`login-signup-input-box signup-input-1`}
            type="text"
            placeholder="이메일 주소"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="login-signup-input-box "
            type="text"
            placeholder="성명"
            value={name}
            onChange={handleChangeName}
          />
          <input
            className="login-signup-input-box "
            type="text"
            placeholder="사용자 이름"
            value={username}
            onChange={handleChangeUsername}
          />
          <input
            className="login-signup-input-box "
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
          />
          {isEmailValid === "invalid" ? (
            <span className="invalid-msg">
              잘못된 이메일입니다. 다시 확인하세요.
            </span>
          ) : null}
          {isEmailDuplicate ? (
            <span className="invalid-msg">이미 존재하는 이메일입니다.</span>
          ) : null}
          {isUsernameDuplicate ? (
            <span className="invalid-msg">
              이미 존재하는 사용자 이름입니다.
            </span>
          ) : null}
          <button
            className={`login-signup-button signup-button ${
              isDisabled ? "login-signup-button-disabled" : null
            }`}
            type="submit"
            onClick={requestSignup}
            disabled={isDisabled}
          >
            가입
          </button>
        </div>
        <div className="login-signup-box box-2">
          <span className="no-account">
            계정이 있으신가요?{" "}
            <Link to="/" className="login-signup-link">
              로그인
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
