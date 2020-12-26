import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,

} from '@material-ui/core';
import './userPhotos.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      photo: [],
      counter: 0,
    };
    fetch('http://localhost:3000/photosOfUser/'+this.props.match.params.userId)
    .then(response => response.json())
    .then(data => this.setState({photo:data}));
  }

  Comment(comment){
    var retComment=comment.map( (user)=>
    <CardContent>

    <Link align="center" style={{ textDecoration: 'none',align:"center"}} to={"/users/"+user.user._id}>
    <Typography gutterBottom variant="h6" align="left" color="secondary">
      {user.user.first_name+" "+user.user.last_name}
    </Typography>
    </Link>

    <Typography gutterBottom variant="caption" >
    {user.date_time}
    </Typography>
    <Typography variant="body1">
      {user.comment}
    </Typography>
    </CardContent>
     );
     return retComment;

  }
  noComment(){
    return(
      <CardContent>
      <Typography variant="caption">
        No comment
      </Typography>
      </CardContent>
    );
  }
  Photo(){
    var photo=this.state.photo;
    var list=photo.map( (ob,i) =>(
      <Card>
      <CardActionArea>
        <CardMedia
          height="350"

          component="img"
          image={"http://localhost:3000/images/"+ob.file_name}
          key={i}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>{ob.date_time}</p>
          </Typography>
          {(typeof ob.comments !== "undefined" ) ? this.Comment(ob.comments): this.noComment()}
        </CardContent>
      </CardActionArea>
      </Card>
    ) );
    return list;
  }
  main(){
    var photo=this.Photo();
    return(
      <div>{photo[this.state.counter]}</div>
    );
  }
  Prev = () =>{
    var user=this.Photo();
    if(this.state.counter>0){
      this.setState((state) => ({counter: state.counter - 1}));
      console.log(this.state.counter);
    }
    else this.setState((state) => ({counter: user.length-1}));
  }
  Next = () =>{
    var user=this.Photo();
    if(this.state.counter<user.length-1){
      this.setState((state) => ({counter: state.counter + 1}));
      console.log(this.state.counter);
    }
    else this.setState((state) => ({counter: 0}));;
  }
  render() {
    return (

      <div className="container" >
        <div className="prev">
          <Button variant="contained" color="primary" onClick={this.Prev}>
            Previous
          </Button>
        </div>
        <div className="photo">{this.main()}</div>
        <div className="next">
          <Button variant="contained" color="primary" onClick={this.Next}>
            Next
          </Button>
        </div>
      </div>

    );
  }
}

export default UserPhotos;
