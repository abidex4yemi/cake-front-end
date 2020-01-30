import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStyles } from './components/atom';
import Home from './components/pages/Home';

export const App = () => {
  return (
    <Router>
      <div>
        <GlobalStyles />
        <Route exact path="/" render={(props) => <Home {...props} />} />
      </div>
    </Router>
  );
};

export default App;
