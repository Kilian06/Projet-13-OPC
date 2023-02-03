import React from 'react';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
import HomePage from '../../component/homePage/homePage';

function Home(props) {
    return (
        <div>
            <Header />
            <HomePage />
            <Footer />
        </div>
    );
}

export default Home;