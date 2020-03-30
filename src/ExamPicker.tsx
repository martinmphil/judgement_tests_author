import React, { useState } from "react";

interface Props {
  setExam: (x: boolean) => void;
}

const ExamPicker: React.FC<Props> = props => {
  return <article>Pick an exam</article>;
};

export default ExamPicker;
