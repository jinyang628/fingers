import Editor from "@/components/ui/editor";
import React, { useEffect, useState } from "react";
import { useAppContext, SummaryType, PracticeType } from "../AppContext";
import { Button } from "@/components/ui/button";

export default function Output() {
  const { data } = useAppContext();
  const { summary, practice } = data;

  const [editableSummary, setEditableSummary] = useState<SummaryType>(
    summary || {}
  );
  const [editablePractice, setEditablePractice] = useState<PracticeType>(
    practice || []
  );

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
        {formatSummary(summary as SummaryType)}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Practice</h2>
        {formatPractice(practice as PracticeType)}
      </div>

      <div className="mt-6">
        <Button onClick={handleRecordToDB} className="py-2 px-4 rounded-md">
          Record Summary and Practice
        </Button>
      </div>
      </div>
      <Editor defaultLanguage="javascript" />
    </div>
  );
}
