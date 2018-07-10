import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./registration-page.css";
import RegistrationForm from "./registration-form";

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home-login">
      <div className="login-container">
        <RegistrationForm />
        <Link style={{ display: "none" }} to="/">
          Login
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
