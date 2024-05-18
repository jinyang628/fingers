import Editor from "@/components/ui/editor";
import React, { useState } from "react";
import { useAppContext, SummaryType, PracticeType } from "../AppContext";
import { Button } from "@/components/ui/button";
import { FiEdit, FiCheck } from "react-icons/fi";
import { defaultPracticeData, defaultSummaryData } from "./placeholders/output";

export default function Output() {
  const { data } = useAppContext();
  const { summary, practice } = data;

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
    if (type === "summary" && editableSummary) {
      const updatedItems = editableSummary.map((item, idx) => {
        if (idx == index) {
          return { ...item, [field]: value };
        }
        return item
      });
      setEditableSummary(updatedItems);
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

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Summary</h2>
        {
          editSummary && editableSummary
          ? editableSummary.map((item, index) => (
              <div key={index} className="mb-4">
                Topic
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.topic}
                  onChange={(e) =>
                    handleInputChange(
                      "summary",
                      "topic",
                      e.target.value,
                      index
                    )
                  }
                />
                Goal
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.goal}
                  onChange={(e) =>
                    handleInputChange(
                      "summary",
                      "goal",
                      e.target.value,
                      index
                    )
                  }
                />
                Overview
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={item.overview}
                  onChange={(e) =>
                    handleInputChange(
                      "summary",
                      "overview",
                      e.target.value,
                      index
                    )
                  }
                />
                Key Concepts
                {item.key_concepts.map((concept, conceptIndex) => (
                  <div key={conceptIndex} className="mb-4">
                    Key Concept Title
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded"
                      value={concept.key_concept_header}
                      onChange={(e) =>
                        handleInputChange(
                          "summary",
                          `key_concepts.${conceptIndex}.key_concept_title`,
                          e.target.value,
                          index
                        )
                      }
                    />
                    Key Concept Content
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded"
                      value={concept.key_concept_content}
                      onChange={(e) =>
                        handleInputChange(
                          "summary",
                          `key_concepts.${conceptIndex}.key_concept_content`,
                          e.target.value,
                          index
                        )
                      }
                    />
                    Key Concept Code Example
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded"
                      value={concept.key_concept_code_example || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "summary",
                          `key_concepts.${conceptIndex}.key_concept_code_example`,
                          e.target.value,
                          index
                        )
                      }
                    />
                  </div>
                ))}
                <div className="flex flex-row align-middle gap-4">
                  <Button
                    onClick={toggleEditSummary}
                    className="py-2 px-4 rounded-md"
                  >
                    {editSummary ? <FiCheck /> : <FiEdit />}
                  </Button>
                  <Button
                    onClick={handleRecordToDB}
                    className="py-2 px-4 rounded-md"
                  >
                    Record Summary and Practice
                  </Button>
                </div>
              </div>
            ))
          : editableSummary &&
            editableSummary.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row justify-between items-center gap-4 my-4">
                  <h3 className="text-2xl font-semibold underline">
                    {item.topic}
                  </h3>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={toggleEditSummary}
                      className="py-2 px-4 rounded-md"
                    >
                      {editSummary ? <FiCheck /> : <FiEdit />}
                    </Button>
                    <Button
                      onClick={handleRecordToDB}
                      className="py-2 px-4 rounded-md"
                    >
                      Record Summary and Practice
                    </Button>
                  </div>
                </div>
                <p className="font-extrabold pt-3">{item.goal}</p>
                <p className="mb-6">{item.overview}</p>
                {item.key_concepts.map((concept, conceptIndex) => (
                  <div key={conceptIndex}>
                    <h4 className="font-semibold">{concept.key_concept_header}</h4>
                    <p>{concept.key_concept_content}</p>
                    {concept.key_concept_code_example && (
                      <div className="my-4 mb-8 border-2 border-slate-600 rounded-xl">
                        <pre>{concept.key_concept_code_example}</pre>
                      </div>
                    )}
                  </div>
                ))}
                </div>
            ))
        }
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
