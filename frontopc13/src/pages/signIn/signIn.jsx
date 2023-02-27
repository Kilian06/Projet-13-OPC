import React from "react";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import SigninPage from "../../component/signinPage/signinPage";

/**
 * Cette fonction sert à affiché la page Sign-In ("/signin")
 * @param {*} 
 * @returns 
 */

function SignIn() {
  return (
    <>
      <Header />
      <SigninPage />
      <Footer />
    </>
  );
}

export default SignIn;
