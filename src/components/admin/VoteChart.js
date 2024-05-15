// src/components/VoteChart.js
import React from 'react';
import VS from '../../assets/vs.jpg'

const VoteChart = ({candidateOne, candidateTwo, user}) => {


  const totalVotes = candidateOne?.votes + candidateTwo?.votes;
  const candidateOnePercentage = ((candidateOne?.votes / totalVotes) * 100).toFixed(2);
  const candidateTwoPercentage = ((candidateTwo?.votes / totalVotes) * 100).toFixed(2);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Voting Results</h2>
      <img src={VS} alt="vss" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4"/>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-semibold">{candidateOne?.name}</span>
        <span className="text-xl font-semibold">{candidateTwo?.name}</span>
      </div>
      <div className="relative w-full h-8 bg-gray-200 rounded-full mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: `${candidateOnePercentage}%` }}
        >
          {candidateOnePercentage}%
        </div>
        <div
          className="absolute top-0 right-0 h-full bg-red-500 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: `${candidateTwoPercentage}%`, left: `${candidateOnePercentage}%` }}
        >
          {candidateTwoPercentage}%
        </div>
      </div>
      {
        user? null:(<div className="flex items-center justify-between mt-2">
        <span className="text-lg">{candidateOne?.votes} votes ({candidateOnePercentage}%)</span>
        <span className="text-lg">{candidateTwo?.votes} votes ({candidateTwoPercentage}%)</span>
      </div>)
      }
      
    </div>
  );
};

export default VoteChart;
