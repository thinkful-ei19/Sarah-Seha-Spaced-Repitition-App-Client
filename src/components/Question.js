import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

class Question extends Component {

  render(){
    return (
      
    )
  }
}
export default requiresLogin()(connect(mapStateToProps)(Question));