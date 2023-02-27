import React from "react";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import HomePage from "../../component/homePage/homePage";
/**
 * Cette fonction est utilisé pour affiché le contenu de la page d'acceuil ("/")
 * @param {*} 
 * @returns 
 */
function Home() {
  return (
    <div>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default Home;
