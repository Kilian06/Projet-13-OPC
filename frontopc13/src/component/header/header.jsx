import React from "react";
import MainLogo from "../../assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {reset, relog} from "../../redux/redux"
import { useSelector } from "react-redux";



function Header() {
  var userNameState = useSelector((state) => state.login.userData.firstName)
  var logged = useSelector((state) => state.login.logged)
  const authUser = window.localStorage.getItem("authUser")


  const dispatch = useDispatch();
  if(authUser === "true"){
    dispatch(relog())
  }

  const logOut = () => {
    dispatch(reset())
  }


  return (
    <>
      <nav className="main-nav">
        <Link to="/">
          <div className="main-nav-logo">
            <img
              className="main-nav-logo-image"
              src={MainLogo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </div>
        </Link>
        <div>
          {logged === true || authUser === "true" ? (<div>

            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userNameState}{"        "}</Link>
              <Link className="main-nav-item" to="/" onClick={logOut}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </div>
          ) : (
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
