import React, { useEffect } from 'react';
import { HashRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import Components from './components/index.jsx';
import ScrollToTop from './components/helpers/scroll.js';

import { useDispatch, useSelector } from 'react-redux'
import { setGlobals, globalsSelector } from './components/redux/globals'

const App = () => {
  const dispatch = useDispatch();
  const { base_url, api_url } = useSelector(globalsSelector);
  console.info(base_url, api_url);

  useEffect(() => {
      dispatch(setGlobals())
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <Components />
      </ScrollToTop>
    </Router>
  );
}

export default App;