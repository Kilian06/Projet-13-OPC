import React from 'react';
import MainLogo from "../../assets/argentBankLogo.png"
import { Link } from 'react-router-dom';


function Header(props) {
    const userName = "kilian"
    return (
<>
<nav className="main-nav">
  <Link to="/"><div className="main-nav-logo">
      
        <img
          className="main-nav-logo-image"
          src={MainLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </div>
      </Link>
      <div>
      {userName ? 
      <Link to="/" className='main-nav-item'>
          <i class="fa fa-user-circle"></i>
          Tony{"        "}
        <a class="main-nav-item" href="./index.html">
          <i class="fa fa-sign-out"></i>
          {" "}Sign Out
        </a>
      </Link>

    
 :
      <Link to="/sign-in" className='main-nav-item'>
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
         }

  

      </div>
    </nav>
</>
    );
}

export default Header;