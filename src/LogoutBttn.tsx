import React, { useEffect } from "react";

interface Props {
  setLicit: (x: boolean) => void;
}

const LogoutBttn: React.FC<Props> = props => {
  const handleLoggingOut = () => {
    props.setLicit(false);
    localStorage.removeItem("authorization");
    window.location.assign("/");
  };

  return <button onClick={handleLoggingOut}>Logout</button>;
};

export default LogoutBttn;
