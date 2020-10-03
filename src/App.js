import React from 'react';
import Home from './Home'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/" exact component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;