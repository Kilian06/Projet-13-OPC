import React, { useState } from "react";
import { updateUser } from "../../redux/redux";
import { useDispatch, useSelector } from "react-redux";
import { hideModalChangeName } from "../../redux/redux";

function ModalChangeName(props) {
  const [newName, setNewName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");

  const showModal = useSelector((state) => state.login.modal.changeName);

  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();

  if (showModal === true) {
    return (
      <div className="modal">
        <div className="modalBg"></div>
        <div className="modalContent">
          <form
            className="modalContentForm"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(updateUser(token, newName, newFirstName));
              dispatch(hideModalChangeName());
            }}
          >
            <p>Veuillez saisir vos nouvelles informations</p>
            <label htmlFor="newFirst">Nouveau Prenom</label>
            <input
              type="text"
              minLength={2}
              required
              id="newFirst"
              onChange={(e) => setNewFirstName(e.target.value)}
            ></input>
            <label htmlFor="newLast">Nouveau Nom</label>
            <input
              type="text"
              minLength={2}
              required
              id="newLast"
              onChange={(e) => setNewName(e.target.value)}
            ></input>
            <button className="transaction-button" type="submit">
              Valider
            </button>
            <button
              className="transaction-button"
              onClick={(e) => {
                e.preventDefault();
                dispatch(hideModalChangeName());
              }}
            >
              Retour
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default ModalChangeName;
