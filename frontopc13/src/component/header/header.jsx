import React from "react";
import MainLogo from "../../assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {reset} from "../../redux/redux"



function Header() {
  const userName = useSelector((state) => state.login.userData.firstName)
  const dispatch = useDispatch();


  const logOut = () => {
    console.log("logout")
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
          {userName ? (<div>

            <Link to="/" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userName}{"        "}</Link>
              <Link className="main-nav-item" to="/" onClick={logOut}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </div>
          ) : (
            <Link to="/sign-in" className="main-nav-item">
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
