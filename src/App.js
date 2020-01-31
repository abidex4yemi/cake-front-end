import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStorePersisted from './state/store';
import { Header, Footer } from './components/molecules';
import { GlobalStyles } from './components/atom';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import { Dashboard } from './components/pages/Dashboard';
import { Login } from './components/pages/Login';
import requiresAuth from './components/HOC/requireAuth';

const { store, persistor } = reduxStorePersisted();

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/dashboard" component={requiresAuth(Dashboard)} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />

          <Footer>
            <p>&copy; 2020</p>
            <p>Made by Yemi</p>
          </Footer>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
