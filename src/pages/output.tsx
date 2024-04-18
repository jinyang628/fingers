import Editor from "@/components/ui/editor";
import React, { useEffect, useState } from "react";
import { useAppContext, SummaryType, PracticeType } from "../AppContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FiEdit, FiCheck } from "react-icons/fi";

export default function Output() {
  const { data } = useAppContext();
  const { summary, practice } = data;

  const defaultPracticeItem = {
    language: "javascript",
    summary_chunk: "Javascript is a programming language that is used in a variety of scripting languages for web development. Notably, it is used in React, Angular, and Vue.",
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
  };
  const defaultPracticeData = [defaultPracticeItem];
  const defaultSummary = { content: "This is a summary" };

  const [editableSummary, setEditableSummary] = useState(
    summary || defaultSummary
  );
  const [editablePractice, setEditablePractice] = useState(
    practice || defaultPracticeData
  );
  const [editSummary, setEditSummary] = useState(false);
  const [editPractice, setEditPractice] = useState(false);

  const toggleEditSummary = () => {
    setEditSummary(!editSummary);
  };

  const toggleEditPractice = () => {
    setEditPractice(!editPractice);
  };

  const handleInputChange = (
    type: string,
    field: string,
    value: string,
    index?: number
  ) => {
    if (type === "summary") {
      setEditableSummary({ ...editableSummary, [field]: value });
    } else if (type === "practice") {
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
    return Object.entries(summary).map(([key, value], index) => (
      <div key={index} className="mb-2">
        <strong>{key}:</strong> {value}
      </div>
    ));
  };

  const formatPractice = (practice: PracticeType) => {
    if (!practice) return "No practice available";
    return practice.map((item, index) => (
      <div key={index} className="mb-4">
        <p>Language</p>
        <strong>{item.language}</strong>
        <p>Summary Chunk</p>
        <strong>{item.summary_chunk}</strong>
        <p>Question</p>
        <strong>{item.question}</strong>
        <p>Answer</p>
        <strong>{item.answer}</strong>
        <br />
      </div>
    ));
  };

  return (
    // ML will need to give the default langauge input here
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          {editSummary ? (
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={editableSummary.content}
              onChange={(e) =>
                handleInputChange("summary", "content", e.target.value)
              }
            />
          ) : (
            <div className="mb-4">{editableSummary.content}</div>
          )}
          <Button onClick={toggleEditSummary} className="py-2 px-4 rounded-md">
            {editSummary ? <FiCheck /> : <FiEdit />}
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Practice</h2>
          {editPractice
            ? editablePractice.map((item, index) => (
                <div key={index} className="mb-4">
                  Summary Chunk
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={item.question}
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
                  Answer
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={item.answer}
                    onChange={(e) =>
                      handleInputChange(
                        "practice",
                        "answer",
                        e.target.value,
                        index
                      )
                    }
                  />
                </div>
              ))
            : editablePractice.map((item, index) => (
                <div key={index} className="mb-4">
                  <strong>Language</strong>
                  <p>{item.language}</p>
                  <strong>Summary Chunk</strong>
                  <p>{item.summary_chunk}</p>
                  <strong>Question</strong>
                  <p>{item.question}</p>
                  <strong>Answer</strong>
                  <p>{item.answer}</p>
                  <br />
                </div>
              ))}
          <Button onClick={toggleEditPractice} className="py-2 px-4 rounded-md">
            {editPractice ? <FiCheck /> : <FiEdit />}
          </Button>
        </div>

        <Button
          onClick={handleRecordToDB}
          className="py-2 px-4 rounded-md mt-4"
        >
          Record Summary and Practice
        </Button>
      </div>
      <Editor defaultLanguage="javascript" />
    </div>
  );
}
