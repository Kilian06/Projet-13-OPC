import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalChangeName from "../modalChangeName/modalChangeName"
import Modalrelog from "../modalrelog/modalrelog";
import { useDispatch } from "react-redux";
import { showModalNeedRelog, showModalChangeName} from "../../redux/redux";





function UserPage(props) {
  const firstName = useSelector((state) => state.login.userData.firstName)
  const lastName = useSelector((state) => state.login.userData.name)
  const logged = useSelector((state) => state.login.logged);
  const expiredToekn = useSelector((state) => state.login.expiredToekn);

  const authUser = window.localStorage.getItem("authUser")

  const dispatch = useDispatch();


console.log(logged)
console.log(authUser)


  console.log(lastName)
if(logged === false || authUser === false){
  return (
    <p> Veuillez vous identifier pour acceder aux informations de votre compte</p>
  )
}
 if(expiredToekn === true){
  dispatch(showModalNeedRelog())
}

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            <p>{firstName + " " + lastName}</p>
            <ModalChangeName />
            <Modalrelog />

          </h1>
          <button onClick={(e) => {
              e.preventDefault();
              dispatch(showModalChangeName());
            }
            } className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserPage;
