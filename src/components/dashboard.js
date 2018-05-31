import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData, fetchNextQuestion } from '../actions/protected-data';
import Question from './Question';
import Feedback from './Feedback'

export class Dashboard extends React.Component {
//toggle next/submit if state=question button will be submit have an onClick() that will dispatch postAnswer()
//toggle next/submit if state=answered button will be next and onClick will dispatch fetchProtectedData() (which is the same as fetchQuestion())

    onClick(id) {
        //check on state 
        this.props.dispatch(fetchProtectedData());
    }
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        /*
        // console.log(this.props.protectedData);
        // console.log(this.props)
        
        let questions = this.props.protectedData.data.map((question, index) => {
            return(
                <li key={question.id}><img src={question.image} alt="kitchen-tools"/></li>
            )
        }) 
*/
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
                    <button className="next" onClick={() => this.onClick(fetchProtectedData())}>Next</button>
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
        question: state.protectedData.data.image
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
