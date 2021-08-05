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

// Components
import ItemList from './components/ItemList';
import NavBar from './components/NavBar';
import Item from './components/Item';
import CreateAuction from './components/CreateAuction';

// Main app
function App() {
  return (
    <div className='App'>
      <Router>
        <Container className='container'>
          <NavBar />
          <Switch>
            <Route path='/' exact={true} component={ItemList}></Route>
            <Route path='/bids/:itemId' component={Item}></Route>
            <Route path='/newAuction' component={CreateAuction}></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
