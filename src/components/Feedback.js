import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

class Feedback extends Component{
    render(){
        // let feedback = this.props.feedback;
        // console.log(feedback);
        // const feedback = (this.props.feedback.feedback === 'Sorry try again') ? <h2 
            
        
        // if(this.props.protectedData.feedback !== undefined) {
        //     <h3 className="feedback">{this.props.protectedData.feedback.feedback}</h3>
        // }
        // const feedback = this.props.feedback.feedback ? this.props.feedback : this.props.protectedData;
        // if(this.props.totalQuestion === 0){
        //     return null;
        // }
        // console.log(this.props.totalTries)
        return (
            <div className="feedbackboard">
            {/* <h2 className="feedback-header">{this.props.protectedData.feedback.feedback}</h2>
            <p>You have guessed {this.props.protectedData.feedback.correctTries} out of {this.props.totalTries} </p> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    correctAnswer:state.question.score,
    totalQuestion:state.question.totalscore,
    feedback: state.protectedData.feedback
    // correctTries: state.protectedData.feedback.correctTries,
    // totalTries: state.protectedData.feedback.totalTries
})

export default requiresLogin()(connect(mapStateToProps)(Feedback));