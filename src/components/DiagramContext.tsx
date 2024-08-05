import React, { createContext, useContext, useRef, useState } from "react";

const DiagramContext = createContext(null);

export const DiagramProvider = ({ children }) => {
  const diagramWrapperInstanceRef = useRef(null);
  const [diagramSelectedItems, setDiagramSelectedItems] = useState([]);

  const updateDiagramWrapperInstanceRef = (newRef) => {
    diagramWrapperInstanceRef.current = newRef;
  };

  return (
    <DiagramContext.Provider
      value={{
        diagramWrapperInstanceRef,
        diagramSelectedItems,
        setDiagramSelectedItems,
        updateDiagramWrapperInstanceRef,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};

export const useDiagramContext = () => useContext(DiagramContext);
