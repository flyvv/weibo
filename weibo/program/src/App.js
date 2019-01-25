import React, { Component } from 'react';
import dispatcher from "./store/dispatcher"
import './App.css';
import store from "./store/index"
import Context from "./components/context"
import CommentOn from "./components/commentOn"
import "./style/weibo.css"
class App extends Component {
  constructor(){
    super()
    this.state=store.getState();
    store.on("add",()=>{
      this.setState(
        store.getState()
      )
    })
  }
  render() {
  
    return (
      <div className="App">
      <Context/>
      <CommentOn/>
     
      </div>
    );
  }
  handleClick(){
    let action ={
      type:"ADD_NUM"
    }
    dispatcher.dispatch(action)
  }
}

export default App;
