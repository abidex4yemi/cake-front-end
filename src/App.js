import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NavLink } from 'react-router-dom';

import store from './state/store';
import { Header, Footer } from './components/molecules';
import { GlobalStyles } from './components/atom';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header>
          <NavLink to="/">
            <img
              src="https://image.flaticon.com/icons/svg/660/660503.svg"
              alt="logo"
            />
          </NavLink>

          <ul>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
          </ul>
        </Header>
        <GlobalStyles />

        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />

        <Footer>
          <p>&copy; 2020</p>
          <p>Made by Yemi</p>
        </Footer>
      </Provider>
    </Router>
  );
};

export default App;
