import React from 'react';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
import SigninPage from '../../component/signinPage/signinPage';

function SignIn(props) {
    return (
        <div>
            <Header />
            <SigninPage />
            <Footer />
        </div>
    );
}

export default SignIn;