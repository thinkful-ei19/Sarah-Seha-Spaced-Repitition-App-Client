import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData, fetchNextQuestion, toggleAnswered } from '../actions/protected-data';
import Question from './Question';
import Feedback from './Feedback'

export class Dashboard extends React.Component {
//toggle next/submit if state=question button will be submit have an onClick() that will dispatch postAnswer()
//toggle next/submit if state=answered button will be next and onClick will dispatch fetchProtectedData() (which is the same as fetchQuestion())
    

    onClickhandler() {
        //check on state 
        this.props.dispatch(fetchProtectedData());
        this.props.dispatch(toggleAnswered());
        console.log(this.props.answered);
    }
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        const answered = this.props.answered;
        let currQuestion = this.props.question;
        console.log(currQuestion);
        
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Hello, {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    {currQuestion ? <Question {...currQuestion} /> : null }
                    <Feedback />
                    <button className="next" onClick={() => this.onClickhandler(fetchProtectedData())}>Next</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        protectedData: state.protectedData,
        question: state.protectedData.data.image,
        feedback: state.protectedData.feedback,
        answered: state.protectedData.answered
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
