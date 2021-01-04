import React, { useReducer } from 'react';
import AppContext from '..';
import AppReducer from '../../store/reducer';
import { DEFAULT_APP_STATE } from '../../store/state';

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, DEFAULT_APP_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
