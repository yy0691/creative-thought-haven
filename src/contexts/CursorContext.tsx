import React, { createContext, useState, useContext } from 'react';

type CursorContextType = {
  showCursor: boolean;
  toggleCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showCursor, setShowCursor] = useState(true);

  const toggleCursor = () => {
    setShowCursor(prev => !prev);
  };

  return (
    <CursorContext.Provider value={{ showCursor, toggleCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}; 