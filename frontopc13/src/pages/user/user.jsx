import React from "react";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import UserPage from "../../component/userPage/userPage";


/**
 * Cette fonction sert à afficher le contenu de la page User ("/user")
 * @param {*}  
 * @returns 
 */
function User() {
  return (
    <div>
      <Header />
      <UserPage />
      <Footer />
    </div>
  );
}

export default User;
