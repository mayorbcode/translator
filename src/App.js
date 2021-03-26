import React from 'react';
import './App.css';
import Input from './components/Input';
import Output from './components/Output';
import { useTranslateContext } from './contexts/ContextProvider';

const App = (props) => {
  const { error } = useTranslateContext();

  return (
    <div className="app">
      <div className="error">
        {error.length > 0 && <h2>{error}</h2>}
      </div>
      <div className="boxes">
        <Input />
        <Output />
      </div>
    </div>
  );
}

export default App;