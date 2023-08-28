// import React from 'react';
import '../css/Questionnaire.css';
import { useState, useEffect } from 'react';

const Questionnaire = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [responses, setResponses] = useState({}); // Store responses as question index => response

  const handleResponseChange = (questionIndex, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: response,
    }));
  };

  const handleSubmit = () => {
    // Save responses to local storage
    localStorage.setItem('responses', JSON.stringify(responses));
    alert('Responses saved successfully!');
    // Clear radio inputs
    setResponses({});
  };

  useEffect(() => {
    // Retrieve saved questions from local storage
    const savedQuestions = JSON.parse(
      localStorage.getItem('questions') || '[]'
    );
    setQuestionsList(savedQuestions);
  }, []);
  return (
    <>
      <div className="Questionnaire__Header">
        <h3>Questionnaire</h3>
      </div>
      {/* <div className="Questionnaire__Content">
        <div className="rating-container">
          <p className="rating-text">I find this statement to be:</p>

          <div className="rating-option">
            <label>
              Agree
              <input type="radio" name="rating" value="agree" />
            </label>
          </div>
          <div className="rating-option">
            <label>
              Neutral
              <input type="radio" name="rating" value="neutral" />
            </label>
          </div>
          <div className="rating-option">
            <label>
              Disagree
              <input type="radio" name="rating" value="disagree" />
            </label>
          </div>
        </div>
      </div> */}

      <div className='Questionanaire__Content'>
        {questionsList.map((question, index) => (
          <div key={index} className="rating-container">
            <p className="rating-text">{question}</p>
            <div className="rating-option">
              <label className="radio-label">
              Agree
                <input
                className='radio-btn'
                  type="radio"
                  name={`response_${index}`}
                  value="agree"
                  checked={responses[index] === 'agree'}
                  onChange={() => handleResponseChange(index, 'agree')}
                />
               
              </label>
              <label>
              Neutral
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="neutral"
                  checked={responses[index] === 'neutral'}
                  onChange={() => handleResponseChange(index, 'neutral')}
                />
                
              </label>
              <label>
              Disagree
                <input
                  type="radio"
                  name={`response_${index}`}
                  value="disagree"
                  checked={responses[index] === 'disagree'}
                  onChange={() => handleResponseChange(index, 'disagree')}
                />
              </label>
            </div>
          </div>
        ))}
        <button className="response-submit__btn" onClick={handleSubmit}>
          Submit
        </button>
        
      </div>
    </>
  );
};

export default Questionnaire;
