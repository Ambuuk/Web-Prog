import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      uphotos:[],
    }
  }

  render() {
    // var user = window.cs142models.userModel(props.match.params.userId);
    // console.log(user);
    var username;
    var text;
    if(window.location.href.slice(40, 45) === "users"){
      fetch('http://localhost:3000/user/'+ window.location.href.slice(46, 70))
      .then(response => response.json())
      .then(data => this.setState({uphotos: data }));

      username = this.state.uphotos.first_name+"'s ";
      text ="information";
    }
    else if(window.location.href.slice(40, 45) === "photo"){
      fetch('http://localhost:3000/user/'+window.location.href.slice(47, 71))
    .then(response => response.json())
    .then(data => this.setState({ uphotos: data }));
      username = this.state.uphotos.first_name+"'s ";
      text ="photo";
    }else
    {
      text= "Welcome "
      username = "";
    }
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar justify="space-between">
        <div className="toolbar-left">
          <Typography  variant="h5" color="inherit" align="left">
              Ambuuk
          </Typography>
        </div>
        <div className="toolbar-right">
          <Typography  variant="h5" color="inherit" align="right" className="toolbar-right">
            {username+" "+text}

          </Typography>
        </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
