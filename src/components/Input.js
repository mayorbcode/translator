import React from 'react';
import { useTranslateContext } from '../contexts/ContextProvider';

const Input = () => {
  const { input, handleInput, inputLanguage, handleInputSelect, languages } = useTranslateContext();

  const languageOptions = languages.map((item, index) => {
    return <option key={item[1].nativeName} data-value={item[0]} value={item[1].name}></option>
  })
  return (
    <div className="input">
      <form>
        <div>
          <label htmlFor="data">Select Input Language</label>
          <input 
            type="text" 
            list="datalist" 
            id="data" 
            name="input"
            onChange={handleInputSelect}
            value={inputLanguage}
          />
          <datalist id="datalist">
            {languageOptions}
          </datalist>
        </div>
        <div>
          <label htmlFor="input">Translate</label>
          <textarea 
            id="input"
            value={input}
            onChange={handleInput}
          />
        </div>
      </form>
    </div>
  )
}

export default Input;