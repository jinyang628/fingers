import React, { createContext, useContext, useState, ReactNode } from 'react';

type KeyConceptCode = {
  key_concept_code: string;
  key_concept_language: string;
}

type KeyConceptType = {
  key_concept_title: string;
  key_concept_explanation: string;
  key_concept_code_example?: KeyConceptCode | null;
}

type TipType = {
  tip_title: string;
  tip_explanation: string;
}

type McqPracticeType = {
  mcq_practice_title: string;
  mcq_practice_question: string;
  mcq_practice_wrong_options: string[];
  mcq_practice_correct_option: string;
};

type CodePracticeType = {
  code_practice_title: string;
  code_practice_question: string;
  code_practice_half_completed_code: string;
  code_practice_fully_completed_code: string;
  code_practice_language: string;
};

type ResultItemType = {
  topic: string;
  goal: string;
  context: string;
  overview: string;
  key_concepts: KeyConceptType[];
  tips?: TipType[];
  mcq_practice?: McqPracticeType;
  code_practice?: CodePracticeType;
}
export type ResultType = ResultItemType[] | null;


type AppContextType = {
  data: {
    result: ResultType;
  };
  setData: React.Dispatch<React.SetStateAction<{
    result: ResultType;
  }>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppWrapperProps = {
  children: ReactNode;
};

export function AppWrapper({ children }: AppWrapperProps) {
  const [data, setData] = useState<{ result: ResultType }>({
    result: null,
  });

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppWrapper');
  }
  return context;
}
