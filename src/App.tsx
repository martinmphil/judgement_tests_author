import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { backend } from "./ConfigAssessor";
import Assess from "./Assess";
import Author from "./Author";
import Invite from "./Invite";
import Login from "./Login";
import LogoutBttn from "./LogoutBttn";

const App: React.FC = () => {
  const [licit, setLicit] = useState(false);
  const [authorization, setAuthorization] = useState("");

  useEffect(() => {
    const a = localStorage.getItem("authorization");
    if (a) {
      setAuthorization(a);
      setLicit(true);
    }
  }, []);

  const Home = () => {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/">Assess</Link> | <Link to="/author">Author</Link> |{" "}
            <Link to="/invite">Invite</Link> |{" "}
            <LogoutBttn setLicit={setLicit} />
            <hr />
          </nav>
          <Switch>
            <Route exact path="/">
              <Assess authorization={authorization} backend={backend} />
            </Route>
            <Route path="/author">
              <Author />
            </Route>
            <Route path="/invite">
              <Invite />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };

  return licit ? (
    <Home />
  ) : (
    <main>
      <Login
        loginUrl={`${backend}login`}
        setLicit={setLicit}
        setAuthorization={setAuthorization}
      />
    </main>
  );
};

export default App;
