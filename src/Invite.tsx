import React, { useState } from "react";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const Assessor: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleSent, setSingleSent] = useState(false);
  const [errorSingleInvite, setErrorSingleInvite] = useState(false);
  const [batchInvitees, setBatchInvitees] = useState("");

  const changeName = (event: { target: { value: any } }) => {
    setSingleName(event.target.value);
  };

  const changeEmail = (event: { target: { value: any } }) => {
    setSingleEmail(event.target.value);
  };

  const changeInvitees = (event: { target: { value: any } }) => {
    setBatchInvitees(event.target.value);
  };

  const singleInvite = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (examId > 0 && singleName.length > 0 && singleEmail.length > 0) {
      fetch(`${backend}candidates/send-invite-email/${examId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: props.authorization,
        },
        body: JSON.stringify([
          {
            email: singleEmail,
            name: singleName,
          },
        ]),
      })
        .then((response) => {
          if (!response.ok) {
            setErrorSingleInvite(true);
            console.log(response.json());
          } else {
            setSingleSent(true);
          }
        })
        .catch((error) => {
          setErrorSingleInvite(true);
          console.error("Error:", error);
        });
    } else {
      setErrorSingleInvite(true);
    }
  };

  return (
    <main>
      <h1>Invite</h1>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />

      {errorSingleInvite && (
        <p className="error-warning">
          Sorry we experienced an error sending a single invite to "{singleName}
          " for exam number {examId}.
        </p>
      )}

      {examId > 0 && <h2>Exam number {examId}</h2>}

      {examId > 0 && (
        <form onSubmit={singleInvite}>
          <h3>Single invitee for exam number {examId}</h3>
          <fieldset>
            <legend>Please enter name and email</legend>
            <label htmlFor="name">Candidate name:- </label>
            <input
              value={singleName}
              onChange={changeName}
              type="text"
              id="name"
              name="name"
            ></input>
            <br />
            <label htmlFor="email">Candidate email:- </label>
            <input
              value={singleEmail}
              onChange={changeEmail}
              type="email"
              id="email"
              name="email"
            ></input>
            <div>
              <button type="submit">Send</button>
              <span>single invite to:- {singleName}</span>
            </div>
          </fieldset>
        </form>
      )}

      {singleSent && (
        <p className="success-message">
          Your invite to "{singleName}" for exam number {examId} has been sent.
        </p>
      )}

      {examId > 0 && (
        <form>
          <h3>Batch invitees for exam number {examId}</h3>
          <fieldset>
            <legend>
              Please enter{" "}
              <a href="https://en.wikipedia.org/wiki/Comma-separated_values">
                CSV
              </a>{" "}
              for lastname, firstname, email
            </legend>
            <label htmlFor="invitees">Invitees:- </label> <br />
            <textarea
              name="invitees"
              id="invitees"
              cols={80}
              rows={20}
              defaultValue={batchInvitees}
              onChange={changeInvitees}
            ></textarea>
          </fieldset>
        </form>
      )}
    </main>
  );
};

export default Assessor;
