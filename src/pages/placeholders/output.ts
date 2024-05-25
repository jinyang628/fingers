// Summary placeholders in output page
const defaultNotesItem = { 
    topic: "Ruby Time Zone",
    goal: "Learn to correct Ruby functions for time zone error handling",
    overview: "When working with datetime strings that include UTC offsets, it's crucial to handle time zones correctly to avoid errors and ensure data consistency across different geographical locations.",
    key_concepts: [
      {
        key_concept_title: "UTC Offset",
        key_concept_explanation: "The difference in time (hours and minutes) between UTC and the local time zone, indicated in datetime strings as '+hh:mm' or '-hh:mm.'",
        key_concept_code_example: {
          key_concept_code: "offset_match = interval.match(/([+-])(\\d{2}):(\\d{2})/)",
          key_concept_language: "ruby",
        }
      },
      {
        key_concept_title: "Regex Extraction",
        key_concept_explanation: "Regular expressions can be used to extract the UTC offset from datetime strings.",
      },
    ],
    tips: [
      {
        tip_title: "Use Regex",
        tip_explanation: "Regular expressions are a powerful tool for pattern matching and string manipulation. Use them to extract the UTC offset from datetime strings.",
      },
      {
        tip_title: "Error Handling",
        tip_explanation: "Implement robust error handling to manage exceptions and ensure that the application behaves predictably under various conditions.",
      }
    ],
    mcq_practice: {
      mcq_practice_title: "Time Zone MCQ",
      mcq_practice_question: "What is the UTC offset for the time zone 'America/New_York'?",
      mcq_practice_wrong_options: ["+05:00", "-05:00", "+03:00"],
      mcq_practice_correct_option: "-04:00",
    },
    code_practice: {
      code_practice_title: "Time Zone Conversion",
      code_practice_question: "Write a Ruby function that converts a datetime string to the local time zone.",
      code_practice_half_completed_code: "def convert_to_local_timezone(datetime_str, offset)\n  // TODO: Add the missing line(s) below.",
      code_practice_fully_completed_code: "def convert_to_local_timezone(datetime_str, offset)\n  datetime = DateTime.parse(datetime_str)\n  datetime.new_offset(offset)\nend",
      code_practice_language: "ruby",
    }
};
export const defaultNotesData = [defaultNotesItem];

// Practice placeholders in output page
const defaultPracticeItem = {
    language: "javascript",
    summary_chunk:
      "Javascript is a programming language that is used in a variety of scripting languages for web development. Notably, it is used in React, Angular, and Vue.",
    question: "Initialise a basic Hello World React component named App",
    half_completed_code:
      "const App = () => // TODO: Add the missing line(s) below.",
    fully_completed_code: "const App = () => { return <h1>Hello World</h1>; }",
};
const defaultPracticeItem2 = {
    language: "python",
    summary_chunk:
        "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.",
    question: "Write a function that returns the sum of two numbers",
    half_completed_code:
        "def sum(a, b): # TODO: Add the missing line(s) below.",
    fully_completed_code: "def sum(a, b): return a + b",
};
export const defaultPracticeData = [defaultPracticeItem, defaultPracticeItem2];