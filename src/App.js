// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

const App=()=> {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)

  return (
      <div className="App">
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={8} country={"in"} category={"general"} /></Route>
            <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={8} country={"in"} category={"business"} /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={8} country={"in"} category={"entertainment"} /></Route>
            <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={8} country={"in"} category={"science"} /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={8} country={"in"} category={"sports"} /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={8} country={"in"} category={"technology"} /></Route>

            <Route exact path="/About">
               <About key="About" />
            </Route>
          </Switch>

        </Router>

      </div>
    );
}


export default App;
