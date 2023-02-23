import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModalNeedRelog, reset } from "../../redux/redux";
import { useNavigate } from "react-router-dom";

function Modalrelog(props) {
  const showModal = useSelector((state) => state.login.modal.needrelog);


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
                dispatch(hideModalNeedRelog());
                dispatch(reset());
                Navigate("/sign-in");
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
