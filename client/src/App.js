import React, { useState } from 'react';
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
import Login from './components/Login';
import { AuthContext } from './components/AuthContext';

// Main app
function App() {
  const [value, setValue] = useState(sessionStorage.getItem('token'));
  return (
    <div className='App'>
      <AuthContext.Provider value={{ value, setValue }}>
        <Router>
          <Container className='container'>
            <NavBar />
            <Switch>
              <Route path='/' exact={true} component={ItemList}></Route>
              <Route path='/bids/:itemId' component={Item}></Route>
              <Route path='/newauction' component={CreateAuction}></Route>
              <Route path='/login' component={Login}></Route>
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
