import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
}
from '@material-ui/core';
import './userList.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data: [],
      // data: window.cs142models.userListModel(),
    }
    fetch('http://localhost:3000/user/list')
    .then(response => response.json())
    .then(data => this.setState({data: data }));
  }

  render() {
    return (
      <div>
        <List component="nav">
          <Typography variant="h5" color="inherit" align="center" style={{padding:"10px"}}>
            User List:
          </Typography>

          {this.state.data.map((userName,i)=>(
            <ListItem className="userList" align="center" key={i}>

                <Link style={{ textDecoration: 'none',color: 'black',align:"center",}}
                to={"/users/"+userName._id}> <span>{userName.first_name}
                  </span> <span>{userName.last_name}</span>
                </Link>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;
