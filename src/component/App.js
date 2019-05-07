//env
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//component 主頁
import Home from './home/main';
import Edit from './edit/main';
import Profile from './profile/main';
import SignIn from './sign/SignIn';
import SignUp from './sign/SignUp';
import Select_Page from './main_select/Select_Page';
import Create_page from './main_select/Create_page';
class App extends Component {
  //00:00:00
  setStartDate = (date) => {
    let formate = date
    formate.setHours(0)
    formate.setMinutes(0)
    formate.setSeconds(0)
    return formate
  }
  //23:59:59
  setEndDate = (date) => {
    let formate = date
    formate.setHours(23)
    formate.setMinutes(59)
    formate.setSeconds(59)
    return formate
  }
  // getCookie = () => {
  //     var value = "; " + document.cookie;
  //     var parts = value.split("; " + 'language' + "=");
  //     if (parts.length == 2) {
  //       return parts
  //         .pop()
  //         .split(";")
  //         .shift();
  //     };
  // }
  componentDidMount() {
    // document.cookie = `language = 1`
    
    // console.log(this.getCookie())
    
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/edit' component={Edit}/>
          <Route path='/profile' component={Profile} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/select_page' component={Select_Page} />
          <Route path='/create_project' component={Create_page} />
        </Switch>
      </Router>
    )
  }
}



export default App


