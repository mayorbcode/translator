import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

export const TranslateContext = React.createContext();

export const useTranslateContext = () => useContext(TranslateContext);

const ContextProvider = ({children}) => {
  const [languages, setLanguages] = useState([]);
  const [inputLanguage, setInputLanguage] = useState('');
  const [outputLanguage, setOutputLanguage] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getLanguages = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.cognitive.microsofttranslator.com/languages?api-version=3.0');
      // console.log(response.data.translation);
      const languagesArray = Object.entries(response.data.translation);
      // console.log(languagesArray);
      // console.log(languagesArray[0]);
      setLanguages(languagesArray);
    }
    catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getLanguages();
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleInputSelect = (e) => {
    // console.log(e.target.value);
    setInputLanguage(e.target.value);
  }
  const handleOutputSelect = (e) => {
    // console.log(e.target.value);
    setOutputLanguage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = "https://translator-endpoint.herokuapp.com/translate";
    const fromArray = languages.find(language => language[1].name === inputLanguage);
    const from = fromArray ? fromArray[0] : null;
    const toArray = languages.find(language => language[1].name === outputLanguage);
    const to = toArray ? toArray[0] : null;
    // console.log(from);
    // console.log(to);
      if (from !== null && to !== null) {
        try {
          setLoading(true);
          setError('');
          const data = [
            {
              'text': input
            }
          ]
          const params = {
            'api-version': '3.0',
            'from': from,
            'to': to
          }
          const response = await axios.post(apiURL, data, { params })
          // console.log(response.data);
          // console.log(response.data[0].translations[0].text);
          setResult(response.data[0].translations[0].text);
        }
        catch (err) {
          console.log(err.message);
        }
      }
      else if (from === null) {
        return setError('Could not find selected input language');
      }
      else if (to === null) {
        return setError('Could not find selected output language');
      }
      setLoading(false);
  }

  const value = {
    languages,
    inputLanguage,
    setInputLanguage,
    outputLanguage,
    setOutputLanguage,
    input,
    setInput,
    result,
    loading,
    handleInput,
    handleSubmit,
    handleInputSelect,
    handleOutputSelect,
    error
  };

  return (
    <TranslateContext.Provider value={value}>
      {children}
    </TranslateContext.Provider>
  )
}

export default ContextProvider;