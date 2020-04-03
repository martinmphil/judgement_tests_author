import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { backend } from "./ConfigAssessor";
import Assess from "./Assess";
import Author from "./Author";
import Invite from "./Invite";
import Login from "./Login";
import Edit from "./Edit";
import Create from "./Create";
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
            <Link to="/invite">Invite</Link> | <Link to="/edit">Edit</Link> |{" "}
            <Link to="/create">New Exam</Link> |{" "}
            <LogoutBttn setLicit={setLicit} />
            <hr />
          </nav>
          <Switch>
            <Route exact path="/">
              <Assess authorization={authorization} />
            </Route>
            <Route path="/author">
              <Author authorization={authorization} />
            </Route>
            <Route path="/invite">
              <Invite authorization={authorization} />
            </Route>
            <Route path="/edit">
              <Edit authorization={authorization} />
            </Route>
            <Route path="/create">
              <Create authorization={authorization} />
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
