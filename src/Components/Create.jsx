// import React from 'react'
import '../css/Create.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';

const Create = () => {
  const [question, setQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddQuestion = () => {
    if (question.trim() !== '') {
      const updatedQuestionsList = [...questionsList, question];
      setQuestionsList(updatedQuestionsList);
      setQuestion('');

      // Save to local storage
      localStorage.setItem('questions', JSON.stringify(updatedQuestionsList));
    }
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setQuestion(questionsList[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== -1 && question.trim() !== '') {
      const updatedQuestionsList = [...questionsList];
      updatedQuestionsList[editingIndex] = question;
      setQuestionsList(updatedQuestionsList);
      setEditingIndex(-1);
      setQuestion('');

      // Save to local storage
      localStorage.setItem('questions', JSON.stringify(updatedQuestionsList));
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestionsList = questionsList.filter((_, i) => i !== index);
    setQuestionsList(updatedQuestionsList);

    // Save to local storage
    localStorage.setItem('questions', JSON.stringify(updatedQuestionsList));
  };

  useEffect(() => {
    // Retrieve saved questions from local storage
    const savedQuestions = JSON.parse(
      localStorage.getItem('questions') || '[]'
    );
    setQuestionsList(savedQuestions);
  }, []);

  return (
    <div className='Create__Container'>
      <div className="Create__Header">
        <h3>Creating a Questionnaire</h3>
      </div>
      <div className="Create__Content">
        <input
          type="text"
          placeholder="Enter a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {editingIndex !== -1 ? (
          <button onClick={handleSaveEdit}>Save</button>
        ) : (
          <button onClick={handleAddQuestion}>Add</button>
        )}
      </div>
      <div className="Create__List-Question">
        <h3>List of Questions</h3>
        <div className="Create__List-Questions">
          <ul>
            {questionsList.map((q, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <input
                    className="Create__List-Edit-Input"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                ) : (
                  <p className="Create__List__p">
                    {q}
                    <span className="Create__List__Icons">
                      <FontAwesomeIcon
                        className="icon-edit"
                        icon={faEdit}
                        size="lg"
                        onClick={() => handleEditQuestion(index)}
                      />
                      <FontAwesomeIcon
                        className="icon-delete"
                        icon={faTrashAlt}
                        size="lg"
                        onClick={() => handleDeleteQuestion(index)}
                      />
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Create;
