import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { userAnswerWrong, userAnswerCorrect } from '../actions/question';


class Question extends Component {
  onSubmit(event) {
    event.preventDefault();
  
  let answer = this.props.questions.state.questions;
  let userAnswer= event.target.userInput.value.toLowercaser();
  event.target.userInput.value="";

  if(answer === userAnswer) {
    this.props.dispatch(userAnswerCorrect());
  }else{
    this.props.dispatch(userAnswerWrong());
  }
  }

  render(){
    return (
      <div className="questionboard">
      <form>
        {/* <h3 className="feedback">{}</h3>
        <h3 className="feedback">{}</h3> */}
        <input className="userInput"
          type="text"
          name="userInput"
          />
        <button className="button">Submit</button>
      </form>
      </div>
      
)
  }
}

const mapStateToProps =state => ({
  questions: state.questions,

});

export default requiresLogin()(connect(mapStateToProps)(Question));