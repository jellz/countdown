import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NewCountdown from './components/NewCountdown';
import Countdown from './components/Countdown';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <Switch>
              <Route exact path='/' component={NewCountdown} />
              <Route path='/:slug' component={Countdown} />
            </Switch>
            <div className='footer'>
              <a href='/'>new countdown</a>
              <br />
              site made by <a href='https://danielgulic.com'>Daniel Gulic</a>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
