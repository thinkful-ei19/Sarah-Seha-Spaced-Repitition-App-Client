import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./landing-page.css";

import LoginForm from "./login-form";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing">
      <div className="loginbox">
        <h2>Cookese</h2>
        <LoginForm />
        <div className="signup">
          <Link to="/register" className="signup-button">
            Sign Up
          </Link>
        </div>
        <div className="demo-account">
          <span>Username: demouser</span>
          <span>Password: demodemo</span>
        </div>
      </div>
      <div className="infoaboutapp">
        Cookese was created to learn useful kitchen tools! If the user gives
        right answers to the questions more often those questions will be asked
        later. If the user tends to give wrong will be asked sooner. The better
        you get to know your kitchen tools the fewer times you will see a
        question!! If you would like to learn more please click "About" button!
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
