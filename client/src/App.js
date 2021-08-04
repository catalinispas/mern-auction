import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';

import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true}></Route>
            <Route path='/:questionId'></Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
