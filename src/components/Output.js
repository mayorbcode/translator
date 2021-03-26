import React from 'react';
import { useTranslateContext } from '../contexts/ContextProvider';

const Output = () => {
  const { result, outputLanguage, handleOutputSelect, languages } = useTranslateContext();

  const languageOptions = languages.map(item => {
    return <option key={item[0]} data-value={item[0]} value={item[1].name}></option>
  })
  return (
    <div className="output">
      <div className="select">
          <label htmlFor="data1">Select Output Language</label>
          <input 
            type="text" 
            list="datalist1" 
            id="data1" 
            name="output"
            value={outputLanguage}
            onChange={handleOutputSelect}
          />
          <datalist id="datalist1">
            {languageOptions}
          </datalist>
        </div>
      <div className="result">
        <p>Translation</p>
        <p className="text">
          {result && result}
        </p>
      </div>
    </div>
  );
}

export default Output;