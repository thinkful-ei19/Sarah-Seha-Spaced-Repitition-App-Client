import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import { FETCH_QUESTION_SUCCESS } from '../actions/question';
import { postAnswer, toggleAnswered } from '../actions/protected-data';


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
  }
  
  
  render(){
    console.log(this.props.question)
    console.log(this.props.answered, 'in render');
    console.log(this.props.feedback, 'in render');
    // let feedbackData;
    // if(this.props.feedback===undefined || this.props.answered===false) {
    //   let feedbackData = null;
    // } else {
    //   let feedbackData = (<div>
    //     <p>{this.props.feedback.feedback}. The answer is: {this.props.feedback.answer}</p>
    //     <p>You answered correctly {this.props.feedback.correctTries} out of {this.props.feedback.totalTries} guesses for this card</p>
    //     </div>)
    // }
    // console.log(feedbackData);
    
    const feedbackData = (this.props.feedback===undefined || this.props.answered===false ) ? null : (
      // alert(`${this.props.feedback.feedback}. The answer is: ${this.props.feedback.answer}`)
    <div>
    <p>{this.props.feedback.feedback}. The answer is: {this.props.feedback.answer}</p>
    <p>You answered correctly {this.props.feedback.correctTries} out of {this.props.feedback.totalTries} guesses for this card</p>
    </div>
    );
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
        <button className="button">Submit</button>
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
  // feedback: state.feedback,
  correctAnswer: state.correctAnswer,
  answered: state.protectedData.answered,
  question: state.protectedData.data.image,
  id: state.protectedData.id,
  feedback: state.protectedData.feedback,
});

export default requiresLogin()(connect(mapStateToProps)(Question));