// src/components/Modal.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../config.json'
import VoteChart from './admin/VoteChart';
const Modal = ({ isOpen, onClose }) => {
    const [candidateOne, setCandidateOne] = useState('')
    const [candidateTwo, setCandidateTwo] = useState('')
    
    useEffect(() => {
        const fetchConfig = async () => {
          try {
            const response = await axios.get(`${config.doamin}/api/votes`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
            });
            console.log(response)
            setCandidateOne({
                name: "Biden", votes: response.data.Biden
            })
            setCandidateTwo({
                name: "Trump", votes: response.data.Trump
            })
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchConfig();
      }, []);
  if (!isOpen) return null;
  

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 ">
    <div className="relative bg-white p-10 rounded-lg sticky w-1/2 mx-auto mt-10 shadow-lg top-0 h-auto">
        <span className="absolute top-2 right-2">
            <button
                onClick={onClose}
                className="p-2 bg-red-500 h-10 w-10 text-white rounded-full hover:bg-red-600"
            >
                &times;
            </button>
        </span>
        <VoteChart candidateOne={candidateOne} candidateTwo={candidateTwo} user={true} />
    </div>
</div>


  );
};

export default Modal;
