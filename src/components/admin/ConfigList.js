// src/components/ListComponent.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'

const ListComponent = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${config.doamin}/api/configs`);
            setData(res.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };
      const handleNavigate = (path) => {
        return navigate(path);
      };

      const deleteConfig = async (id) => {
        const confirmation = window.confirm("Do you want to delete this record?");
        
        if (confirmation) {
          try {
            const res = await axios.delete(`${config.domain}/api/votes/` + Number(id));
            console.log('Record deleted successfully:', res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Deletion cancelled by user.');
        }
      }
      

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
    <div className="p-4 container mx-auto lg:w-1/2 sm:lg-full">
      {/* Bảng hiển thị trên Desktop */}
      <h1 className='text-center font-bold text-3xl mb-3'>List Config</h1>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Title Page</th>
              <th className="py-2 px-4 text-left">Token Contract</th>
              <th className="py-2 px-4 text-left">operation</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr onClick={()=>handleNavigate('/admin/edit/'+item.id)} key={index} className="border-b cursor-pointer">
                <td className="py-2 px-4 ">{index+1}</td>
                <td className="py-2 px-4 text-blue-600">{item.title_page}</td>
                <td className="py-2 px-4">{item.token_contract}</td>
                <td className="py-2 px-4 text-red-600" onClick={()=>deleteConfig(item.id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dạng cột hiển thị trên Mobile */}
      <div className="block md:hidden">
        {data?.map((item, index) => (
          <div key={index} className="p-4 mb-4 bg-white shadow rounded-lg">
            <div className="text-lg font-semibold text-gray-800">{item.title}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ListComponent;