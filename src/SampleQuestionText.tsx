interface QuestionText {
  scenarioText: string;
  optTextA: string;
  optTextB: string;
  optTextC: string;
  optTextD: string;
}

const SampleQuestionText: QuestionText = {
  scenarioText:
    "You have recently taken a call from a customer praising the helpful service offered by a colleague in your team. Do you:",
  optTextA: "Tell your colleague about the feedback on a one-to-one basis.",
  optTextB: "Inform your team leader and let them give the praise personally.",
  optTextC:
    "Wait until the team meeting tomorrow and announce the feedback to everyone.",
  optTextD:
    "Email the whole company so that everyone hears about the great feedback."
};

export default SampleQuestionText;
