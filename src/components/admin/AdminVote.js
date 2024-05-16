import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config.json'
import VoteChart from './VoteChart';
import { Link } from 'react-router-dom';
import Header from './Header';
function AdminVote() {
    const [candidateOne, setCandidateOne] = useState('')
    const [candidateTwo, setCandidateTwo] = useState('')
    useEffect(() => {
        const fetchConfig = async () => {
          try {
            const response = await axios.get(`${config.doamin}/api/admin/vote`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
            });
            setCandidateOne({
                name: response.data[1].candidate_name, votes: response.data[1].vote_count
            })
            setCandidateTwo({
                name: response.data[0].candidate_name, votes: response.data[0].vote_count
            })
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchConfig();
      }, []);
  return (
    <>
        <Header/>
        <div className='mb-16'>
            <VoteChart candidateOne={candidateOne} candidateTwo={candidateTwo}/>
        </div>
    </>
  )
}

export default AdminVote