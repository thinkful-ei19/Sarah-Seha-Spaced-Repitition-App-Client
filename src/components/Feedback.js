import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

class Feedback extends Component{
    render(){
        if(this.props.totalQuestion === 0){
            return null;
        }
        console.log(this.props.totalQuestion)
        return (
            <div className="feedbackboard">
            <p>You got {this.props.correctAnswer} out of {this.props.totalQuestion} </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    correctAnswer:state.question.score,
    totalQuestion:state.question.totalScore
})

export default requiresLogin()(connect(mapStateToProps)(Feedback));