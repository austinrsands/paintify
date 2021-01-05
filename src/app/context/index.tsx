import React, { createContext, useContext } from 'react';
import AppAction from '../store/action';
import AppState from '../store/state';

type AppContextData = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextData | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context == null) throw new Error('App context has not been initialized');
  return context;
};

export default AppContext;
