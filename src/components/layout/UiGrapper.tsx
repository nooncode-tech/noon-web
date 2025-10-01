import React from "react";

interface UiGrapperProps {
  children: React.ReactNode; // define que el componente puede recibir contenido como hijos
}

const UiGrapper: React.FC<UiGrapperProps> = ({ children }) => {
  return <div className="h-full m-2.5 overflow-auto rounded-md border border-[var(--secondary-border-color)]  bg-[var(--principal-background-color)] shadow-xs">{children}</div>;
};

export default UiGrapper;
