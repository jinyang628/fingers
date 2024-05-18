// Summary placeholders in output page
const defaultSummaryItem = { 
    topic: "Ruby Time Zone",
    goal: "Learn to correct Ruby functions for time zone error handling",
    overview: "When working with datetime strings that include UTC offsets, it's crucial to handle time zones correctly to avoid errors and ensure data consistency across different geographical locations.",
    key_concepts: [
      {
        key_concept_header: "UTC Offset",
        key_concept_content: "The difference in time (hours and minutes) between UTC and the local time zone, indicated in datetime strings as '+hh:mm' or '-hh:mm.'",
        key_concept_code_example: "offset_match = interval.match(/([+-])(\\d{2}):(\\d{2})/)",
      },
      {
        key_concept_header: "Regex Extraction",
        key_concept_content: "Regular expressions can be used to extract the UTC offset from datetime strings.",
      },
    ],
};
export const defaultSummaryData = [defaultSummaryItem];

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