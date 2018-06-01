import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="landing">
            {/* <img className="landingImage" src={require('../images/gadgets.jpg')} alt="kitchen-tools" /> */}
            <div className="loginbox">
            <h2>Cookese</h2>
            <LoginForm />
            <Link to="/register" className="signup-button hoverable">Sign Up</Link>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
