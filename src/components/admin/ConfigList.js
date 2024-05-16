// src/components/ListComponent.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'
import Header from './Header';

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
      const subString = (string, max_number)=>{
          if (string.length > max_number) {

            return string.substring(0, max_number);
          } else {

              return string;
          }
      }
      

  return (
    <>
    <Header/>
    <div className="p-4 container mx-auto lg:w-1/2 sm:lg-full">
      {/* Bảng hiển thị trên Desktop */}
      <h1 className='text-center font-bold text-3xl mb-3'>List Config</h1>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
      <div className="block lg:hidden">
        {data?.map((item, index) => (
          <div onClick={()=>handleNavigate('/admin/edit/'+item.id)} key={index} className="p-4 mb-4 bg-white shadow rounded-lg cursor-pointer">
            <div className="text-lg font-semibold text-gray-800">Title Page : {subString(item.title_page, 18)}...</div>
            <div className="text-sm text-gray-600">Token Contract : {subString(item.value_token_contract, 18)}...</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ListComponent;