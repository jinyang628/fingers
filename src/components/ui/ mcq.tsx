import React, { useState, useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Button } from '@mui/material';

type MCQProps = {
  title: string;
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
};

export default function MCQ({ title, question, options, correctAnswer, onAnswer }: MCQProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    // Function to shuffle the options
    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Shuffle options on component mount
    setShuffledOptions(shuffleArray([...options]));
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === correctAnswer;
    onAnswer(isCorrect);
    setFeedback(isCorrect ? "Correct answer!" : "Wrong answer. Try again!");
    setSubmitted(true);
  };

  return (
    <>
      <h3 className="text-2xl font-semibold mt-5">{title}</h3>
      <FormControl component="fieldset">
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup value={selectedOption} onChange={handleChange}>
          {shuffledOptions.map((option, index) => (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedOption}>
          Submit
        </Button>
        {submitted && <p className="mt-2">{feedback}</p>}
      </FormControl>
    </>
  );
};
