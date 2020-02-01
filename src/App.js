import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStorePersisted from './state/store';
import { Footer } from './components/molecules';
import Navbar from './components/molecules/Navbar/Navbar';
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
          <Navbar />
          <GlobalStyles />
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/dashboard" component={requiresAuth(Dashboard)} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />

          <Footer />
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
