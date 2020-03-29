import React, { useState } from "react";
import "./App.css";
import Assess from "./Assess";
import Author from "./Author";
import Invite from "./Invite";
import Login from "./Login";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { backend } from "./ConfigAssessor";

const App: React.FC = () => {
  const [licit, setLicit] = useState(false);

  const handleLoggingOut = () => {
    setLicit(false);
  };

  const Home = () => {
    return (
      <Router>
        <div className="App">
          <Link to="/">Assess</Link> | <Link to="/author">Author</Link> |{" "}
          <Link to="/invite">Invite</Link> |{" "}
          <button onClick={handleLoggingOut}>Logout</button>
          <hr />
          <Switch>
            <Route exact path="/">
              <Assess />
            </Route>
            <Route path="/author">
              <Author />
            </Route>
            <Route path="/invite">
              <Invite />
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
