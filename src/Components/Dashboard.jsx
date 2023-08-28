// import React from 'react';
import '../css/DashBoard.css';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Dashboard = () => {
  const [questionsCount, setQuestionsCount] = useState(0);
  const [agreementCount, setAgreementCount] = useState(0);
  const [disagreementCount, setDisagreementCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem('questions') || '[]'
    );
    setQuestionsCount(savedQuestions.length);

    const savedResponses = JSON.parse(
      localStorage.getItem('responses') || '{}'
    );

    let agree = 0;
    let disagree = 0;
    let neutral = 0;

    Object.values(savedResponses).forEach((response) => {
      if (response === 'agree') {
        agree++;
      } else if (response === 'disagree') {
        disagree++;
      } else if (response === 'neutral') {
        neutral++;
      }
    });

    setAgreementCount(agree);
    setDisagreementCount(disagree);
    setNeutralCount(neutral);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth > 800 ? 800 : window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize chartWidth on load

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClearData = () => {
    // Clear all data from local storage
    localStorage.clear();
    setQuestionsCount(0);
    setAgreementCount(0);
    setDisagreementCount(0);
    setNeutralCount(0);
    alert('All data cleared!');
  };

  return (
    <>
      <div className="Dashboard__Header">
        <h3>Dashboard</h3>
      </div>

      <div className="Graph__Container">
        <BarChart width={chartWidth} height={300} 
          
          data={[
            { name: 'Agree', count: agreementCount },
            { name: 'Disagree', count: disagreementCount },
            { name: 'Neutral', count: neutralCount },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#e66568d9' }} />
          <YAxis tick={{ fill: '#e66568d9' }} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#c8d2f3"
            stroke="#e66568d9"
            strokeWidth={1}
            width={'0.025rem'}
          />
        </BarChart>
      </div>

      <div className="Dashboard__Content">
        <h4>
          Number of Questions <br />{' '}
          <span className="Dashboard__Number">{questionsCount}</span>
        </h4>
        <h4>
          Agreements <br />{' '}
          <span className="Dashboard__Number">{agreementCount}</span>
        </h4>
        <h4>
          Disagreements <br />{' '}
          <span className="Dashboard__Number">{disagreementCount} </span>
        </h4>
        <h4>
          Neutral <br />{' '}
          <span className="Dashboard__Number">{neutralCount} </span>
        </h4>

        <button className="Dashboard__Btn" onClick={handleClearData}>
          Clear All Data
        </button>
      </div>
    </>
  );
};

export default Dashboard;
