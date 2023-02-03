import React from 'react';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
import UserPage from '../../component/userPage/userPage'

function User(props) {
    return (
        <div>
            <Header />
            <UserPage />
            <Footer />
        </div>
    );
}

export default User;