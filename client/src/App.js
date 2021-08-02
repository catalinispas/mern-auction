import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import QuestionListComponent from './components/QuestionListComponent';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QuestionComponent from './components/QuestionComponent';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact={true}>
                <QuestionListComponent />
              </Route>
              <Route path='/:questionId'>
                <QuestionComponent />
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
