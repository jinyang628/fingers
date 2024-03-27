import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  data: {
    summary: Record<string, string> | null;
    practice: string | null;
  };
  setData: React.Dispatch<React.SetStateAction<{
    summary: Record<string, string> | null;
    practice: string | null;
  }>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppWrapperProps = {
  children: ReactNode;
};

export function AppWrapper({ children }: AppWrapperProps) {
  const [data, setData] = useState<{ summary: Record<string, string> | null; practice: string | null }>({
    summary: null,
    practice: '',
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
