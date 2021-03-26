import React from 'react';
import { useTranslateContext } from '../contexts/ContextProvider';

const SubmitButton = (props) => {
  const { loading, handleSubmit } = useTranslateContext();
  return (
    <div className="submit-button">
      <button
        disabled={loading}
        onClick={handleSubmit}
      >
        Translate
      </button>
    </div>
  );
}

export default SubmitButton;