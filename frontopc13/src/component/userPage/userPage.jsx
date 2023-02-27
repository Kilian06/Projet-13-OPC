import React from "react";
import { useSelector } from "react-redux";
import ModalChangeName from "../modalChangeName/modalChangeName";
import Modalrelog from "../modalrelog/modalrelog";
import { useDispatch } from "react-redux";
import { showModalChangeName } from "../../redux/redux";
/**
 * Page qui permet d'afficher les informations de l'utilisateur suite à la connexion
 * @returns le contenu de la page d'un utilisateur
 */
function UserPage() {
  const firstName = useSelector((state) => state.login.userData.firstName); // Récupère le prenom du state
  const lastName = useSelector((state) => state.login.userData.name); // Récupère le nom du state
  const logged = useSelector((state) => state.login.logged); // Récupère si le user est loggé via le state
  const authUser = window.localStorage.getItem("authUser"); // Récupère si le user est loggé via le localStorage
  const dispatch = useDispatch();

  // permet d'afficher le message si le user n'est pas connecté
  if (logged === false || authUser === false) {
    return (
      <p>
        {" "}
        Veuillez vous identifier pour acceder aux informations de votre compte
      </p>
    );
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
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(showModalChangeName());
            }}
            className="edit-button"
          >
            Edit Name
          </button>
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
