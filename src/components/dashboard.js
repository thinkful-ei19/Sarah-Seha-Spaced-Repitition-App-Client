import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Question from './Question'

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        console.log(this.props.protectedData);
        console.log(this.props)
        let questions = this.props.protectedData.data.map((question, index) => {
            return(
                <li key={question.id}><img src={question.image} alt="kitchen-tools"/></li>
            )
        })
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    {/* <p>Protected Data: {this.props.protectedData.data}</p> */}
                    <ul>{questions}</ul>
                    <Question /> 
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
        // answer: state.protectedData.data.answer,
        questions: state.questions
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
