import React, { createContext, useContext, useReducer } from "react";
export const context = createContext();
const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <div>
      <context.Provider value={useReducer(reducer, initialState)}>
        {children}
      </context.Provider>
    </div>
  );
};

export default StateProvider;
export const useStateValue = () => useContext(context);
