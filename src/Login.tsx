import React, { useState } from "react";

interface Props {
  setLicit: (x: boolean) => void;
}

const Login: React.FC<Props> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    props.setLicit(true);
  };

  return (
    <div>
      <p>Please log in </p>
      <form>
        <p>
          <label htmlFor="email">e-mail:- </label>
          <input
            autoFocus
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
    </div>
  );
};

export default Login;
