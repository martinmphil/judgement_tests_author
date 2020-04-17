import React, { useState } from "react";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
}

const AddExam: React.FC<Props> = (props) => {
  const [examTitle, setExamTitle] = useState("");
  const [errorAddingExam, setErrorAddingExam] = useState(false);
  const [examId, setExamId] = useState(0);
  const [showOutro, setShowOutro] = useState(false);

  const addingExam = () => {
    const postBody = { title: examTitle };

    fetch(`${backend}exams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: props.authorization,
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorAddingExam(true);
        } else {
          setShowOutro(true);
          return response.json();
        }
      })
      .then((data) => {
        setExamId(data.examNumber);
      })
      .catch((error) => {
        setErrorAddingExam(true);
        console.error("Error:", error);
      });
  };

  const titleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setExamTitle(event.target.value);
  };

  const Outro = () => {
    const reloadPage = () => {
      window.location.reload();
    };
    return (
      <section>
        <p>
          Please go to <a href="add-question">add question</a> and then pick
          your exam number {examId} titled "{examTitle}".
        </p>

        <button onClick={reloadPage}>Add another exam</button>
      </section>
    );
  };

  return (
    <main>
      <h1>Add Exam</h1>

      {errorAddingExam && (
        <p className="error-warning">
          Sorry we experienced an error creating a new exam. Please try again
          later.
        </p>
      )}

      <section>
        <label htmlFor="title">Please enter your exam title: </label>
        <input type="text" id="title" name="title" onChange={titleChange} />
        <div>
          <button onClick={addingExam}>Add Exam</button>
        </div>
      </section>

      {showOutro && <Outro />}
    </main>
  );
};

export default AddExam;
