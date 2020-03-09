import React, { useEffect } from "react";

interface Props {
  setLicit: (x: boolean) => void;
}

const Logout: React.FC<Props> = props => {
  useEffect(() => {
    props.setLicit(false);
  });

  return <p>You are now logged out.</p>;
};

export default Logout;
