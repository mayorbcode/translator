import React from 'react';
import { useTranslateContext } from '../contexts/ContextProvider';

const Output = () => {
  const { result, outputLanguage, handleOutputSelect, languages } = useTranslateContext();

  const languageOptions = languages.map(item => {
    return <option key={item[0]} data-value={item[0]} value={item[1].name}></option>
  })
  return (
    <div className="output">
      <div>
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
        <h2>Result</h2>
        <p className="text" style={{ padding: `${result ? '20px' : '0'}`, border: `${result ? '1px solid black' : 'none'}`}}>
          {result && result}
        </p>
      </div>
    </div>
  );
}

export default Output;