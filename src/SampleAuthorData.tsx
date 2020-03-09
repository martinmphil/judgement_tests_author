interface IScenario {
  situation: string;
  optionText: string[];
  best: number;
  worst: number;
}

interface IExam {
  title: string;
  scenarios: IScenario[];
}

interface QuestionText {
  scenarioText: any;
  optTextA: any;
  optTextB: any;
  optTextC: any;
  optTextD: any;
}

const q1Text: QuestionText = {
  scenarioText:
    "You have recently taken a call from a customer praising the helpful service offered by a colleague in your team. Do you:",
  optTextA: "Tell your colleague about the feedback on a one-to-one basis.",
  optTextB: "Inform your team leader and let them give the praise personally.",
  optTextC:
    "Wait until the team meeting tomorrow and announce the feedback to everyone.",
  optTextD:
    "Email the whole company so that everyone hears about the great feedback."
};

const q2Text: QuestionText = {
  scenarioText:
    "You are working on a task for a Senior Manager that is due to be completed by the end of today. Another colleague contacts you in the morning and asks you to update a spreadsheet urgently. It will take you three hours to update the spreadsheet. However, you only have an hour spare today if you are going to complete the task for the Senior Manager by the deadline. Therefore, if you update the spreadsheet, this will delay the task you have been working on for the Senior Manager. Do you:",
  optTextA:
    "Ask your colleague to contact your manager as you’re already busy on another task and perhaps your manager could offer someone else to help.",
  optTextB:
    "Update the spreadsheet for your colleague as it is urgent and then move to the task for the Senior Manager as soon as you have finished.",
  optTextC:
    "Talk to the Senior Manager and ask if you can extend the deadline for the task you are doing for her as you need to complete an urgent task for another colleague.",
  optTextD:
    "Explain to your colleague that you can help, but you only have an hour available today so you will not be able to complete all of the updates in the time."
};

const q3Text: QuestionText = {
  scenarioText:
    "You take a call from a different energy supplier, who explains they are opening a new account for a customer and they need the final meter readings from the account the customer currently has with you. Do you:",
  optTextA:
    "Give them the most recent meter readings from the account and pass the account details to the appropriate team to close.",
  optTextB:
    "Offer to call them back, then you phone the customer to verify the final meter readings.",
  optTextC:
    "Give them the most recent meter readings and phone the customer to find out why they are moving suppliers.",
  optTextD:
    "Offer to call them back, phone the customer to verify the final readings and ask them why they are moving suppliers."
};

const q4Text: QuestionText = {
  scenarioText:
    "You are on your first placement working on a strategy project. You have informal daily meetings with your line manager and they have been very supportive in your transition into working life and in this specific project. Three months into your placement, your manager leaves suddenly to join a project in Germany, leaving you to finish the project on your own. Your only support is the department manager, who can only meet with you once a week and is not familiar with the project. You are working on your own and are finding it very demotivating. Do you:",
  optTextA:
    "Ask the department manager to identify another line manager who can give you the support you need on the project to complete it.",
  optTextB:
    "Identify the work remaining and ask the department manager to schedule in time to help you on key points and help keep you on track with deadlines.",
  optTextC:
    "Keep yourself motivated on the project by focusing on the task at hand and keep your weekly meetings with the department manager focused on issues you are unable to resolve.",
  optTextD:
    "Keep your weekly meetings with the department manager focused on your task list and find support from colleagues sitting near you in helping you settle into this role."
};

// aka examInProgress
const sampleExam: IExam = {
  title: "Generalist",
  scenarios: [
    {
      situation: q1Text.scenarioText,
      optionText: [
        q1Text.optTextA,
        q1Text.optTextB,
        q1Text.optTextC,
        q1Text.optTextD
      ],
      best: 0,
      worst: 3
    },
    {
      situation: q2Text.scenarioText,
      optionText: [
        q2Text.optTextA,
        q2Text.optTextB,
        q2Text.optTextC,
        q2Text.optTextD
      ],
      best: 2,
      worst: 1
    },
    {
      situation: q3Text.scenarioText,
      optionText: [
        q3Text.optTextA,
        q3Text.optTextB,
        q3Text.optTextC,
        q3Text.optTextD
      ],
      best: 3,
      worst: 0
    },
    {
      situation: q4Text.scenarioText,
      optionText: [
        q4Text.optTextA,
        q4Text.optTextB,
        q4Text.optTextC,
        q4Text.optTextD
      ],
      best: 1,
      worst: 3
    }
  ]
};

export default sampleExam;
