import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config.json'
import VoteChart from './VoteChart';
import { Link } from 'react-router-dom';
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
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-center items-center p-4">
        <nav className="hidden md:flex space-x-4">
          <Link to="/admin/config" className="hover:underline">Home</Link>
          <Link to="/admin/vote" className="hover:underline">Vote</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pb-4 space-y-2">
            <Link to="/admin/config" className="block text-gray-800 hover:bg-blue-700 p-2 rounded">Home</Link>
            <Link to="/admin/vote" className="block text-gray-800 hover:bg-blue-700 p-2 rounded">Vote</Link>
          </nav>
        </div>
      )}
    </header>
        <VoteChart candidateOne={candidateOne} candidateTwo={candidateTwo}/>
    </>
  )
}

export default AdminVote