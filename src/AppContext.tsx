import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  data: {
    summary?: string;
    practice?: string;
  };
  setData: React.Dispatch<React.SetStateAction<{
    summary?: string;
    practice?: string;
  }>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppWrapperProps = {
  children: ReactNode;
};

export function AppWrapper({ children }: AppWrapperProps) {
  const [data, setData] = useState({
    summary: '',
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
