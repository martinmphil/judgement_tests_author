import React, { useState } from "react";

interface Props {
  setLicit: (x: boolean) => void;
  setAuthorization: (x: string) => void;
  loginUrl: string;
}

const Login: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    localStorage.removeItem("authorization");

    fetch(props.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        const authorization = response.headers.get("authorization");

        if (authorization) {
          props.setAuthorization(authorization);
          localStorage.setItem("authorization", authorization);
        }

        if (!response.ok) {
          setErrorLoggingIn(true);
        } else if (response.ok) {
          props.setLicit(true);
        }
      })
      .catch(error => {
        setErrorLoggingIn(true);
        console.error("Login error: ", error);
      });
  };

  return (
    <section>
      <p>Please log in </p>
      <form>
        <p>
          <label htmlFor="username">e-mail:- </label>
          <input
            autoFocus
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">password:- </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        <button disabled={!validateForm()} type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>

      {errorLoggingIn && (
        <p>
          Sorry we encountered a login error. Please refresh this page and try
          again later.
        </p>
      )}
    </section>
  );
};

export default Login;
