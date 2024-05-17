import Editor from "@/components/ui/editor";
import ReactDOMServer from 'react-dom/server';
import React, { useState } from "react";
import { useAppContext, SummaryType, PracticeType } from "../AppContext";
import { Button } from "@/components/ui/button";
import { FiEdit, FiCheck } from "react-icons/fi";

export default function Output() {
  const { data } = useAppContext();
  const { summary, practice } = data;

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
  const defaultPracticeData = [defaultPracticeItem, defaultPracticeItem2];
  
  const defaultSummaryItem = { 
    topic: "Ruby Time Zone",
    goal: "Learn to correct Ruby functions for time zone error handling",
    overview: "When working with datetime strings that include UTC offsets, it's crucial to handle time zones correctly to avoid errors and ensure data consistency across different geographical locations.",
    key_concepts: [
      {
        key_concept_title: "UTC Offset",
        key_concept_content: "The difference in time (hours and minutes) between UTC and the local time zone, indicated in datetime strings as '+hh:mm' or '-hh:mm.'",
        key_concept_code_example: "offset_match = interval.match(/([+-])(\\d{2}):(\\d{2})/)",
      },
      {
        key_concept_title: "Regex Extraction",
        key_concept_content: "Regular expressions can be used to extract the UTC offset from datetime strings.",
        key_concept_code_example: "hours, minutes = offset[1..2].ti_i, offset[4..5].to_i\ntotal_seconds= hours * 3600 + minutes * 60\noffset_seconds = offset[0] == '+' ? total_seconds : -total_seconds\nTime.at(time.to_i + offset_seconds).utc",
      },
    ],
  };
  const defaultSummaryData = [defaultSummaryItem];

  const [editableSummary, setEditableSummary] = useState<SummaryType>(
    summary || defaultSummaryData
  );

  const [editablePractice, setEditablePractice] = useState<PracticeType>(
    practice || defaultPracticeData
  );
  const [editSummary, setEditSummary] = useState(false);
  const [editPractice, setEditPractice] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleEditSummary = () => {
    setEditSummary(!editSummary);
  };

  const toggleEditPractice = () => {
    setEditPractice(!editPractice);
  };
  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  const handleInputChange = (
    type: string,
    field: string,
    value: string,
    index?: number
  ) => {
    if (type === "summary") {
      setEditableSummary({ ...editableSummary, [field]: value });
    } else if (type === "practice" && editablePractice) {
      const updatedItems = editablePractice.map((item, idx) => {
        if (idx === index) {
          return { ...item, [field]: value }; // Update the specific field of the practice item
        }
        return item;
      });
      setEditablePractice(updatedItems);
    }
  };

  // replace this with the actual logic to push to db
  const handleRecordToDB = async () => {
    const response = await fetch("/api/record-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: editableSummary,
        practice: editablePractice,
      }),
    });

    if (response.ok) {
      console.log("Data recorded successfully");
    } else {
      console.error("Failed to record data");
    }
  };

  const formatSummary = (summary: SummaryType) => {
    if (!summary) return "No summary available";
    const summaryElements = Object.entries(summary).map(([key, value]) => (
      <div key={key} className="">
        <strong>{key}:</strong> {value}
      </div>
    ));
  
    return summaryElements;
  };

  return (
    // ML will need to give the default langauge input here
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Summary</h2>
        {editSummary && editableSummary != null ? (
          <textarea
            className="w-full h-60 p-2 border border-gray-300 rounded mb-4"
            value={ReactDOMServer.renderToString(formatSummary(editableSummary))}
            onChange={(e) =>
              handleInputChange("summary", "content", e.target.value)
            }
          />
        ) : (
          <div className="mb-4">{formatSummary(editableSummary)}</div>
        )}
        <Button onClick={toggleEditSummary} className="py-2 px-4 rounded-md">
          {editSummary ? <FiCheck /> : <FiEdit />}
        </Button>
      </div>

      <div className="mt-6 p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Practice</h2>
        {editPractice && editablePractice
          ? editablePractice.map((item, index) => (
              <div key={index} className="mb-4">
                Language
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.language}
                  onChange={(e) =>
                    handleInputChange(
                      "practice",
                      "language",
                      e.target.value,
                      index
                    )
                  }
                />
                Context
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.summary_chunk}
                  onChange={(e) =>
                    handleInputChange(
                      "practice",
                      "summary_chunk",
                      e.target.value,
                      index
                    )
                  }
                />
                Question
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.question}
                  onChange={(e) =>
                    handleInputChange(
                      "practice",
                      "question",
                      e.target.value,
                      index
                    )
                  }
                />
                Half-completed code
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.half_completed_code}
                  onChange={(e) =>
                    handleInputChange(
                      "practice",
                      "half_completed_code",
                      e.target.value,
                      index
                    )
                  }
                />
                Fully-completed code
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.fully_completed_code}
                  onChange={(e) =>
                    handleInputChange(
                      "practice",
                      "fully_completed_code",
                      e.target.value,
                      index
                    )
                  }
                />
                <div className="flex flex-row align-middle gap-4">
                  <Button
                    onClick={toggleEditPractice}
                    className="py-2 px-4 rounded-md"
                  >
                    {editPractice ? <FiCheck /> : <FiEdit />}
                  </Button>
                  <Button
                    onClick={toggleShowAnswer}
                    className="py-2 px-4 rounded-md w-32"
                  >
                    {showAnswer ? "Hide Answer" : "Reveal Answer"}
                  </Button>
                  <Button
                    onClick={handleRecordToDB}
                    className="py-2 px-4 rounded-md"
                  >
                    Record Summary and Practice
                  </Button>
                </div>
                <div className="my-4 mb-8">
                  <Editor
                    defaultLanguage={editablePractice[index].language}
                    defaultValue={editablePractice[index].half_completed_code}
                    answer={editablePractice[index].fully_completed_code}
                    showAnswer={showAnswer}
                  />
                </div>
              </div>
            ))
          : editablePractice &&
            editablePractice.map((item, index) => (
              <div key={index} className="mb-28">
                <div className="flex flex-row justify-between items-center gap-4 my-4">
                  <h3 className="text-2xl font-semibold underline">
                    Question {index + 1}
                  </h3>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={toggleEditPractice}
                      className="py-2 px-4 rounded-md"
                    >
                      {editPractice ? <FiCheck /> : <FiEdit />}
                    </Button>
                    <Button
                      onClick={toggleShowAnswer}
                      className="py-2 px-4 rounded-md w-32"
                    >
                      {showAnswer ? "Hide Answer" : "Reveal Answer"}
                    </Button>
                    <Button
                      onClick={handleRecordToDB}
                      className="py-2 px-4 rounded-md"
                    >
                      Record Summary and Practice
                    </Button>
                  </div>
                </div>
                <p>{item.summary_chunk}</p>
                <p className="font-extrabold pt-3">{item.question}</p>
                <div className="my-4 mb-8 border-2 border-slate-600 rounded-xl">
                  <Editor
                    defaultLanguage={editablePractice[index].language}
                    defaultValue={editablePractice[index].half_completed_code}
                    answer={editablePractice[index].fully_completed_code}
                    showAnswer={showAnswer}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
