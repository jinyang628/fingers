import Editor from "@/components/ui/editor";
import React, { useState } from "react";
import { useAppContext, SummaryType, PracticeType } from "../AppContext";
import { Button } from "@/components/ui/button";
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
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Summary</h2>
        {
          editableSummary && editableSummary.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row justify-between items-center gap-4 my-4">
                  <h3 className="text-3xl font-semibold underline">
                    {item.topic}
                  </h3>
                </div>
                <p className="text-2xl font-extrabold pt-3">{item.goal}</p>
                <p className="mb-6">{item.overview}</p>
                {item.key_concepts.map((concept, conceptIndex) => (
                  <div key={conceptIndex}>
                    <h4 className="font-semibold italic">{concept.title}</h4>
                    <p>{concept.explanation}</p>
                    {concept.code_example && (
                      <Editor
                        defaultLanguage={concept.code_example.language}
                        defaultValue={concept.code_example.code}
                        isPractice={false}
                      />
                    )}
                  </div>
                ))}
                </div>
          ))
        }
      </div>

      <div className="mt-6 p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Practice</h2>
        {
          editablePractice && editablePractice.map((item, index) => (
              <div key={index} className="mb-28">
                <div className="flex flex-row justify-between items-center gap-4 my-4">
                  <h3 className="text-2xl font-semibold underline">
                    Question {index + 1}
                  </h3>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={toggleShowAnswer}
                      className="py-2 px-4 rounded-md w-32"
                    >
                      {showAnswer ? "Hide Answer" : "Reveal Answer"}
                    </Button>
                  </div>
                </div>
                <p>{item.summary_chunk}</p>
                <p className="font-extrabold pt-3">{item.question}</p>
                <div className="my-4 mb-8 border-2 border-slate-600 rounded-xl">
                  <Editor
                    defaultLanguage={editablePractice[index].language}
                    defaultValue={editablePractice[index].half_completed_code}
                    isPractice={true}
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
