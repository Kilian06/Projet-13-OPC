import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function UserPage(props) {
  const firstName = useSelector((state) => state.login.userData.firstName)
  const lastName = useSelector((state) => state.login.userData.name)
  const logged = useSelector((state) => state.login.logged)
  const Navigate = useNavigate()



  console.log(lastName)
if(!logged){
  return (
    <p> Veuillez vous identifier pour acceder aux informations de votre compte</p>
  )
}

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            <p>{firstName + " " + lastName}</p>
          </h1>
          <button className="edit-button">Edit Name</button>
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
