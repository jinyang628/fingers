import Editor from "@/components/ui/editor";
import React, { useState } from "react";
import { useAppContext, ResultType } from "../AppContext";
import { Button } from "@/components/ui/button";
import { defaultNotesData } from "../components/placeholders/output";
import TextBolder from "@/lib/textBolder";
import MCQ from "@/components/ui/mcq";
import ThankYou from "@/components/thankyou";

export default function Output() {
  const { data } = useAppContext();
  const { result } = data;

  const [editableNotes, setEditableNotes] = useState<ResultType>(
    result || defaultNotesData
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <div className="flex flex-col justify-between items-start p-4 border-2 border-slate-600 rounded-xl">
        <h2 className="text-4xl font-semibold mb-2">Today's bite😁</h2>
        {
          editableNotes && editableNotes.map((item, index) => (
              <div key={index} className="mb-4 w-full">
                <div className="flex flex-row justify-between items-center gap-4 mt-4">
                  <h3 className="text-xl font-semibold uppercase text-[#3453FB]">
                    {item.topic}
                  </h3>
                </div>
                <p className="text-lg font-medium mb-6">{item.goal}</p>
                <h4 className="text-xl font-bold text-[#3453FB]">Context</h4>
                <p className="mb-6">{item.context}</p>
                <h4 className="text-xl font-bold text-[#3453FB]">Overview</h4>
                <p className="mb-6">{item.overview}</p>
                <h3 className="text-xl font-semibold mb-4 text-[#3453FB]">Key Concepts</h3>
                {item.key_concepts.map((concept, conceptIndex) => (
                  <div key={conceptIndex}>
                    <h4 className="text-lg font-semibold">{concept.key_concept_title}</h4>
                    <TextBolder text={concept.key_concept_explanation} />
                    {concept.key_concept_code_example && (
                      <Editor
                        defaultLanguage={concept.key_concept_code_example.key_concept_language}
                        defaultValue={concept.key_concept_code_example.key_concept_code}
                        isPractice={false}
                      />
                    )}
                  </div>
                ))}
                <h3 className="text-xl font-semibold mt-5 text-[#3453FB]">Tips</h3>
                {item.tips && item.tips.map((tip, tipIndex) => (
                  <div key={tipIndex}>
                    <h4 className="font-semibold">{tip.tip_title}</h4>
                    <p>{tip.tip_explanation}</p>
                  </div>
                ))}
                {item.mcq_practice && (
                  <MCQ
                    title={item.mcq_practice.mcq_practice_title}
                    question={item.mcq_practice.mcq_practice_question}
                    options={[...item.mcq_practice.mcq_practice_wrong_options, item.mcq_practice.mcq_practice_correct_option]}
                    correctAnswer = {item.mcq_practice.mcq_practice_correct_option}
                    onAnswer={(isCorrect) => console.log(isCorrect)}
                  />
                )}
                {item.code_practice && (
                  <div>
                    <h3 className="text-xl font-semibold mt-5 text-[#3453FB]">Test yourself!</h3>
                    <h3 className="text-lg font-semibold">{item.code_practice.code_practice_title}</h3>
                    <p>{item.code_practice.code_practice_question}</p>
                    <div className="flex flex-row gap-4 justify-end">
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
                <ThankYou />
              </div>
          ))
        }
      </div>
    </div>
  );
}
