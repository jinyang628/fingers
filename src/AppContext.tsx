import React, { createContext, useContext, useState, ReactNode } from 'react';

type KeyConceptType = {
  key_concept_header: string;
  key_concept_content: string;
  key_concept_code_example?: string | null;
}

type SummaryItemType = {
  topic: string;
  goal: string;
  overview: string;
  key_concepts: KeyConceptType[];
}
export type SummaryType = SummaryItemType[] | null;

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
    summary: SummaryType;
    practice: PracticeType;
  };
  setData: React.Dispatch<React.SetStateAction<{
    summary: SummaryType;
    practice: PracticeType;
  }>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppWrapperProps = {
  children: ReactNode;
};

export function AppWrapper({ children }: AppWrapperProps) {
  const [data, setData] = useState<{ summary: SummaryType; practice: PracticeType }>({
    summary: null,
    practice: null,
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
