import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/main';
import Edit from './edit/main';
import Profile from './profile/main';
import SignIn from './sign/SignIn';
import SignUp from './sign/SignUp';
import Select from './select/main';
import Create from './create/main';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/edit' component={Edit} />
          <Route path='/profile' component={Profile} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/select' component={Select} />
          <Route path='/create' component={Create} />
        </Switch>
      </Router>
    )
  }
}

export default App;


