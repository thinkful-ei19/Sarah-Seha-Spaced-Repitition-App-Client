import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { userAnswerWrong, userAnswerCorrect } from '../actions/question';


class Question extends Component {
  onSubmit(event) {
    event.preventDefault();
  
  let answer = this.props.questions;
  console.log(answer);
  let userAnswer= event.target.userInput.value.toLowerCase();
  //console.log(userAnswer);
  event.target.userInput.value="";

  if(answer === userAnswer) {
    this.props.dispatch(userAnswerCorrect());
  }else{
    this.props.dispatch(userAnswerWrong());
  }
  }

  render(){
    const feedback = this.props.feedback !== null ? this.props.feedback : undefined;
    const correctAnswer = this.props.correctAnswer !== null ? this.props.correctAnswer : undefined;
    return (
      <div className="questionboard">
      <form onSubmit= {event => this.onSubmit(event)}>
        <h3 className="feedback">{feedback}</h3>
        <h3 className="feedback">{correctAnswer}</h3>
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
  feedback: state.feedback,
  correctAnswer: state.correctAnswer
});

export default requiresLogin()(connect(mapStateToProps)(Question));