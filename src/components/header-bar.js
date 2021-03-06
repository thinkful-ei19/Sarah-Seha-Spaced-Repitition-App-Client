import React from "react";
import { connect } from "react-redux";
import { clearAuth, info } from "../actions/auth";
import { clearAuthToken } from "../local-storage";
import "./header-bar.css";

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="logout-button" onClick={() => this.logOut()}>
          Logout
        </button>
      );
    }

    return (
      <div className="header-bar">
        <div className="cookese">
          <h1 className="cookese">Cookese</h1>
        </div>
        {logOutButton}
        <button className="loginButton">
          <a
            onClick={event => {
              this.props.dispatch(event);
              console.log("clicked");
            }}
            href="/"
          >
            Login
          </a>
        </button>

        <button className="about">
          <a
            onClick={event => {
              this.props.dispatch(info(event));
              console.log("clicked");
            }}
          >
            About
          </a>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  info: state.auth.info
});

export default connect(mapStateToProps)(HeaderBar);
