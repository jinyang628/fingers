import React, { createContext, useContext, useState, ReactNode } from 'react';

type KeyConceptCode = {
  code: string;
  language: string;
}

type KeyConceptType = {
  title: string;
  explanation: string;
  code_example?: KeyConceptCode | null;
}

type ResultItemType = {
  topic: string;
  goal: string;
  overview: string;
  key_concepts: KeyConceptType[];
}
export type ResultType = ResultItemType[] | null;

type PracticeItemType = {
  language: string;
  summary_chunk: string;
  question: string;
  half_completed_code: string;
  fully_completed_code: string;
};
export type PracticeType = PracticeItemType[] | null;

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
