import React, { createContext, useContext, useEffect, useState } from "react";
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

interface LoadingContextProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingContextProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

// Create custom hook useLoaiding
export const useLoading = () => useContext(LoadingContext);
