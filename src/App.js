import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './state/store';
import { GlobalStyles } from './components/atom';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <GlobalStyles />
        <Route exact path="/" render={(props) => <Home {...props} />} />
      </Provider>
    </Router>
  );
};

export default App;
