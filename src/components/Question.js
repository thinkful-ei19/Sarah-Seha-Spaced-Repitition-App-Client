import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import { FETCH_QUESTION_SUCCESS } from '../actions/question';
import { postAnswer, toggleAnswered, incrementCountCorrect, incrementCountTotal } from '../actions/protected-data';
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
    // this.props.dispatch(toggleAnswered(event));
    console.log(this.props.answered);
    this.props.dispatch(incrementCountTotal())
    
    console.log(this.props.correctScore, this.props.totalScore);
  }
  
  
  render(){
    console.log(this.props.question)
    console.log(this.props.answered, 'in render');
    console.log(this.props.feedback, 'in render');
    
    const feedbackData = (this.props.feedback===undefined || this.props.answered===false ) ? null : (
    <div className="feedbackboard">
    <p>{this.props.feedback.feedback}. The answer is: {this.props.feedback.answer}</p>
    <p>You answered correctly {this.props.feedback.correctTries} out of {this.props.feedback.totalTries} guesses for this card</p>
    <p>You answered correctly {this.props.correctScore} out of {this.props.totalScore} guesses for this session</p>
    </div>
    );

    // const score = (this.props.feedback===undefined || this.props.answered===false ) ? null :  (
      
    //   (this.props.feedback.feedback === 'You got it!') ?
    //     this.props.dispatch(incrementCountCorrect()) : null
    // )
    console.log(this.props.answer);
    return (
     
      <div className="questionboard">
      <form onSubmit= {event => {this.onSubmit(event), this.props.dispatch(toggleAnswered())}}>

        <img key={this.props.id} src={this.props.question} alt="kitchen-tools" />
        {(this.props.answered === true) ? null : 
        <div className="conditional-input-submit">
        <input className="userInput"
          type="text"
          name="userInput"
          />
        <button className="button-submit">Submit</button>
        </div>
        }
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
  correctAnswer: state.correctAnswer,
  answered: state.protectedData.answered,
  question: state.protectedData.data.image,
  id: state.protectedData.id,
  feedback: state.protectedData.feedback,
  totalScore: state.protectedData.totalScore,
  correctScore: state.protectedData.correctScore
});

export default requiresLogin()(connect(mapStateToProps)(Question));