import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/redux";
import { useNavigate } from "react-router-dom";

function SigninPage(props) {
    const token = useSelector((state) => state.login.token)
    const email = useSelector((state) => state.login.userData.email)
    const errorLog = useSelector((state) => state.login.errorLog)
    const logged = useSelector((state) => state.login.logged)


  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const [log, setLog] = useState("");
  const [mdp, setMdp] = useState("")

  function redirect(){
    if(logged){
      Navigate("/user")
    }
  }
  useEffect(() => {
    console.log("useeffect")
    redirect()
  },[logged])

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <p>tony@stark.com</p>
          <p>password123</p>
          <form
            onSubmit={(e) => {
              console.log("onsub");
              e.preventDefault();
              dispatch(loginUser(log, mdp));
              ;
            }}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username"
              onChange={(e) => setLog(e.target.value)}/>
              
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" 
              onChange={(e) => setMdp(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
            <p>{errorLog === true ? "Une erreur d'indentifiant est detectée, veuillez essayer de vous connecter à nouveau" : ""}</p>
          </form>
        </section>
      </main>
    </>
  );
}

export default SigninPage;
