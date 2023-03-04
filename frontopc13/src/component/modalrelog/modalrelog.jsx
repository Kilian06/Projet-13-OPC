import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/redux";
import { useNavigate } from "react-router-dom";

/**
 * Fonction qui permet d'afficher la modal lorsqu'un relog est necessaire
 * @returns 
 */

function Modalrelog() {
  const showModal = useSelector((state) => state.login.expiredToekn); // récupère l'information d'un statut 201
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  if (showModal === true) {
    return (
      <div className="modal">
          <div className="modalrelogBg"></div>
          <div className="modalrelogContent">
            <p>
              Nous avons besoin de vous réauthentifier pour effectuer cette
              action.
            </p>
            <button
              className="transaction-button"
              onClick={(e) => {
                e.preventDefault();
                dispatch(reset());
                Navigate("/login");
              }}
            >
              Se reconnecter
            </button>
          </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Modalrelog;
