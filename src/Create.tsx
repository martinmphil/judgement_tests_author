import React, { useState } from "react";

import "./Create.css";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
}

const Create: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);

  // TO REMOVE
  const handler = () => {
    setExamId(-1);
  };

  return (
    <main>
      <p>
        Create {examId} {backend}
      </p>
      <button onClick={handler}>TO RMEOVE</button>
    </main>
  );
};

export default Create;
