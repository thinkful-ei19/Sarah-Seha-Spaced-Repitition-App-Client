import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import { FETCH_QUESTION_SUCCESS } from '../actions/question';
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
    console.log(this.props.question)
    const feedbackData = (this.props.feedback === undefined) ? null : (
      <div>
    <p>{this.props.feedback.feedback}. The answer is: {this.props.feedback.answer}</p>
    <p>You answered {this.props.feedback.correctTries} out of {this.props.feedback.totalTries} tries for this card</p>
    </div>
    );
    console.log(this.props.answer);
    return (
      <div className="questionboard">
      <form onSubmit= {event => this.onSubmit(event)}>

        <img key={this.props.id} src={this.props.question} alt="kitchen-tools" />
        {/* <h3 className="feedback">{this.props.protectedData.feedback.feedback}</h3> */}
        <input className="userInput"
          type="text"
          name="userInput"
          />
        <button className="button">Submit</button>
      </form>
      <div className="feedback">
        {feedbackData}
      </div>
      </div>
      
)
  }
}

const mapStateToProps =state => ({
  questions: state.questions,
  // feedback: state.feedback,
  correctAnswer: state.correctAnswer,
  // protectedData: state.protectedData.feedback,
  question: state.protectedData.data.image,
  id: state.protectedData.id,
  feedback: state.protectedData.feedback
});

export default requiresLogin()(connect(mapStateToProps)(Question));