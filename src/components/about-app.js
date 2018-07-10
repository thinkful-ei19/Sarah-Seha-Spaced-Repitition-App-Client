import React from "react";
import "./about-app.css";
import { connect } from "react-redux";
import { info } from "../actions/auth";

export function About(props) {
  return (
    <div className="overlay">
      <div className="content">
        <h3> Ready to learn?</h3>
        <h2>Welcome to Cookese! </h2>
        <p>
          This app utilizes a spaced repetition algorithm designed to adapt to
          users learning needs.
        </p>
        <p>
          Cookese was created to learn useful kitchen tools! If the user gives
          right answers to the questions more often those questions will be
          asked later. If the user tends to give wrong will be asked sooner.
        </p>

        <p>
          Cookese was implemented using linked list data structure to store the
          questions (pictures) in the database. When the user answers a question
          correctly the “memory value”, which is initialized as a value of 1, is
          doubled and that question moves m # of spaces back in the list.
          Otherwise, “memory value” will reset to 1 and the user will see that
          question again after the next question in queue. The better you get to
          know your kitchen tools the fewer times you will see a question!!{" "}
        </p>
        <p>Ready to get started?</p>
        <button>
          <a
            className="close"
            onClick={event => {
              props.dispatch(info(event));
            }}
          >
            Got It!
          </a>
        </button>
      </div>
    </div>
  );
}

export default connect()(About);
