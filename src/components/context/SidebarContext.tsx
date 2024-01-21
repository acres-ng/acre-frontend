import React, { createContext, useState, useContext, ReactNode } from 'react';

type AppContextType = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  
    const contextValue: AppContextType = {
      isSidebarOpen,
      openSidebar,
      closeSidebar,
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
    
 
};

const useGlobalContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useGlobalContext abeg');
    }
    return context;
  };

export { AppProvider, useGlobalContext};
