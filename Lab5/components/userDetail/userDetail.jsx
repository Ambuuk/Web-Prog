import React from 'react';
import {
  Typography,
  Button
} from '@material-ui/core';
import './userDetail.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user: [],
    };
  }

  user(){
    fetch('http://localhost:3000/user/'+this.props.match.params.userId)
     .then(response => response.json())
     .then(data => this.setState({user:data}));
     var user = this.state.user;
     return(
       <Typography variant="h4">
        <p>Full Name: {user.first_name} {user.last_name} </p>
        <p>Location: {user.location}</p>
        <p>Description: {user.description}</p>
        <p>Occupation: {user.occupation}</p>
        <Link style={{textDecoration: 'none'}}
        to={"/photos/"+this.props.match.params.userId}>
          <Button variant="contained" color="primary">Photos</Button>
        </Link>
       </Typography>
     )
  }

  render() {
    return (
      <div>
      {this.user()}
      </div>
    );
  }
}

export default UserDetail;
