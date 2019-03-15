import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NewCountdown from './components/NewCountdown';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <Switch>
              <Route exact path='/' component={NewCountdown} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;