import Editor from "@/components/ui/editor";
import React, { useState } from "react";
import { useAppContext, ResultType } from "../AppContext";
import { Button } from "@/components/ui/button";
import { defaultNotesData } from "./placeholders/output";

export default function Output() {
  const { data } = useAppContext();
  const { result } = data;

  const [editableNotes, setEditableNotes] = useState<ResultType>(
    result || defaultNotesData
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Notes</h2>
        {
          editableNotes && editableNotes.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row justify-between items-center gap-4 my-4">
                  <h3 className="text-3xl font-semibold underline">
                    {item.topic}
                  </h3>
                </div>
                <p className="text-2xl font-extrabold pt-3">{item.goal}</p>
                <p className="mb-6">{item.overview}</p>
                <h3 className="text-2xl font-semibold mb-5">Key Concepts</h3>
                {item.key_concepts.map((concept, conceptIndex) => (
                  <div key={conceptIndex}>
                    <h4 className="font-semibold italic">{concept.key_concept_title}</h4>
                    <p>{concept.key_concept_explanation}</p>
                    {concept.key_concept_code_example && (
                      <Editor
                        defaultLanguage={concept.key_concept_code_example.key_concept_language}
                        defaultValue={concept.key_concept_code_example.key_concept_code}
                        isPractice={false}
                      />
                    )}
                  </div>
                ))}
                <h3 className="text-2xl font-semibold mb-2 mt-5">Tips</h3>
                {item.tips && item.tips.map((tip, tipIndex) => (
                  <div key={tipIndex}>
                    <h4 className="font-semibold italic">{tip.tip_title}</h4>
                    <p>{tip.tip_explanation}</p>
                  </div>
                ))}
                {item.mcq_practice && (
                  <div>
                    <h3 className="text-2xl font-semibold italic mt-5">{item.mcq_practice.mcq_practice_title}</h3>
                    <p>{item.mcq_practice.mcq_practice_question}</p>
                    <ul>
                      {item.mcq_practice.mcq_practice_wrong_options.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                      ))}
                    </ul>
                    <p>Correct Answer: {item.mcq_practice.mcq_practice_correct_option}</p>
                  </div>
                )}
                {item.code_practice && (
                  <div>
                    <h3 className="text-2xl font-semibold italic mt-5">{item.code_practice.code_practice_title}</h3>
                    <p>{item.code_practice.code_practice_question}</p>
                    <div className="flex flex-row gap-4">
                      <Button
                        onClick={toggleShowAnswer}
                        className="py-2 px-4 rounded-md w-32"
                      >
                        {showAnswer ? "Hide Answer" : "Reveal Answer"}
                      </Button>
                    </div>
                    <div className="my-4 mb-8 border-2 border-slate-600 rounded-xl">
                      <Editor
                        defaultLanguage={item.code_practice.code_practice_language}
                        defaultValue={item.code_practice.code_practice_half_completed_code}
                        isPractice={true}
                        answer={item.code_practice.code_practice_fully_completed_code}
                        showAnswer={showAnswer}
                      />
                    </div>
                  </div>
                )}
              </div>
          ))
        }
      </div>
    </div>
  );
}
