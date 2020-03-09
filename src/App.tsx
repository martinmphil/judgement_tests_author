import React, { useState, useEffect } from "react";
import "./App.css";
import Assessor from "./Assessor";
import Author from "./Author";
import Login from "./Login";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  const [licit, setLicit] = useState(false);

  const handleLoggingOut = () => {
    setLicit(false);
  };

  const Home = () => {
    return (
      <Router>
        <div className="App">
          <Link to="/">Assessor</Link> | <Link to="/author">Author</Link> |{" "}
          <button onClick={handleLoggingOut}>Logout</button>
          <hr />
          <Switch>
            <Route exact path="/">
              <Assessor />
            </Route>
            <Route path="/author">
              <Author />
            </Route>
            <Route path="/logout">
              <Logout setLicit={setLicit} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };

  return licit ? <Home /> : <Login setLicit={setLicit} />;
};

export default App;
