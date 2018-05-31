import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { FETCH_QUESTION_SUCCESS } from '../actions/question';
import { postAnswer } from '../actions/protected-data';


class Question extends Component {
  onSubmit = (event) => {
    event.preventDefault();
  
    let correctAnswer = this.correctAnswer;
    // console.log(correctAnswer);
    let userAnswer = event.target.userInput.value.toLowerCase();
    console.log(userAnswer);
    this.props.dispatch(postAnswer({
      answer: userAnswer}));
    event.target.userInput.value="";

    // if (correctAnswer === userAnswer) {
    //   this.props.dispatch(userAnswerCorrect());
    // }else{
    //   this.props.dispatch(userAnswerWrong());
    // }
  }

  render(){
    this.correctAnswer = this.props.answer;
    return (
      <div className="questionboard">
      <form onSubmit= {event => this.onSubmit(event)}>

        <img key={this.props.id} src={this.props.image} alt="kitchen-tools" />
        <h3 className="feedback">{this.props.feedback}</h3>
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