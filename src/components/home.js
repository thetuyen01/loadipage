import React, { useState, useEffect, useRef } from 'react';
import Flag from 'react-world-flags';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from '../config.json'
import VS from '../assets/vs.jpg'
import Modal from './Modal';
function Home() {
    const [language, setLanguage] = useState('English');
    const [votes, setVotes] = useState({ person1: localStorage.getItem('personbtn1')? Number(localStorage.getItem('personbtn1')):0, person2: localStorage.getItem('personbtn2')? Number(localStorage.getItem('personbtn2')):0 });
    const [isBouncing, setIsBouncing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${config.doamin}/api/configs`, {
            params: { language: language }
          });
          console.log(res.data[0]);
          setData(res.data[0]);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [language]);
    const partners = [
      {
        name: 'Raydium',
        logo: 'https://cdn.coin68.com/images/20240209084051-83f15054-0369-4d4e-b2c5-27b6398482d7-102.jpg',
        alt: 'raydium Logo',
        link:data?.link_raydium
      },
      {
        name: 'Dexscreener',
        logo: 'https://play-lh.googleusercontent.com/XNljDSnh_XmM53mREFo6SLXQDtedBh01bvNC7ReCLJSq-Nx2uCtg5pDGKH0OMLq4Uszh',
        alt: 'dexscreener Logo',
        link:data?.link_dexscreener
      },
      {
        name: 'Solana',
        logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
        alt: 'solana Logo',
        link:data?.link_solana
      },
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsBouncing(prev => !prev);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuRef, buttonRef]);
  
    const handleCaptcha = async () => {
      return new Promise((resolve, reject) => {
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute('6Le9edspAAAAAE-2G3IxBEMel1d2_lq7YHiHomBh', { action: 'LOGIN' });
            resolve(token);
          } catch (error) {
            reject(error);
          }
        });
      });
    };
  
    const handleBuyNow = async () => {
      // try {
      //   const token = await handleCaptcha();
      //   toast.success("Captcha verified, proceeding with the purchase.");
      //   // Handle the buy action here
      // } catch (error) {
      //   toast.error("Please complete the captcha verification.");
      // }
      window.open('https://dexview.com', '_blank');
    };
  
    const copyToClipboard = (text) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => {
            toast.success('Copied to clipboard!');
          },
          (err) => {
            toast.error('Could not copy text: ');
          }
        );
      } else {
        // Trường hợp trình duyệt không hỗ trợ clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success('Copied to clipboard!');
        } catch (err) {
          toast.error('Fallback: Could not copy text: ');
        }
        document.body.removeChild(textArea);
      }
    };
  
    const submitVote = async(country) => {
      try{
        const res = await axios.post(`${config.doamin}/api/votes`, {
          language:country
        });
        console.log(res)
      }catch(error){
        console.log(error)
      }
    }
  
    
  
    const handleVote = async (person) => {
      const lastVotedPerson = localStorage.getItem('votedPerson');
  
      if (lastVotedPerson) {
          if (person === lastVotedPerson) {
              return toast.warning(`You have already voted for Mr. ${person}`);
          } else {
              return toast.warning(`You can only vote once. You already voted for Mr. ${lastVotedPerson}`);
          }
      }
  
      localStorage.setItem('votedPerson', person);
  
      if (person === "Trump") {
          await submitVote("English")
          toast.success("You just voted for Mr. Trump, thank you");
          setVotes((prevVotes) => ({
              ...prevVotes,
              person1: prevVotes['person1'] + 1
          }));
          localStorage.setItem('personbtn1', votes.person1 + 1);
      } else {
          await submitVote("China")
          toast.success("You just voted for Mr. Biden, thank you");
          setVotes((prevVotes) => ({
              ...prevVotes,
              person2: prevVotes['person2'] + 1
          }));
          localStorage.setItem('personbtn2', votes.person2 + 1);
      }
      openModal()
  };
  
  
    return (
      <div className="background">
        <Modal isOpen={isModalOpen} onClose={closeModal} >
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
        </Modal>
        <ToastContainer
            className='sticky-toast'
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div>
                <a href="/" className="flex items-center py-4 px-2">
                  <img className='w-16 h-16 mx-auto object-cover object-center rounded-lg' src={`${config.doamin}`+data?.logo} alt="" />
                </a>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  ref={buttonRef}
                  className="mobile-menu-button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a onClick={()=>setIsOpen(false)} href="#vote-trump" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">{data?.btn_vote_candidate_one}</a>
                <a onClick={()=>setIsOpen(false)} href="#vote-biden" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">{data?.btn_vote_candidate_two}</a>
                <a onClick={()=>setIsOpen(false)} href="#tokenomics" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">{data?.tokenomics}</a>
                <a onClick={()=>setIsOpen(false)} href="#OurPartners" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">{data?.title_our_partners}</a>
                <a onClick={()=>setIsOpen(false)} href="#buy-now" className="py-4 px-2  font-semibold hover:text-blue-500 transition duration-300 text-orange-600">{data?.buy_now}</a>
              </div>
              <div className="ml-12 hidden md:flex items-center space-x-3 ">
                <Flag onClick={()=>setLanguage('English')} code="us" style={{ width: 45, height: 50 }} alt="USA Flag" />
                <Flag onClick={()=>setLanguage('China')} code="cn" style={{ width: 40, height: 30 }} alt="China Flag" />
              </div>
            </div>
          </div>
          <div ref={menuRef} className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <a onClick={()=>setIsOpen(false)} href="#vote-trump" className="block py-2 px-4 text-sm hover:bg-gray-200">{data?.btn_vote_candidate_one}</a>
            <a onClick={()=>setIsOpen(false)} href="#vote-biden" className="block py-2 px-4 text-sm hover:bg-gray-200">{data?.btn_vote_candidate_two}</a>
            <a onClick={()=>setIsOpen(false)} href="#tokenomics" className="block py-2 px-4 text-sm hover:bg-gray-200">{data?.tokenomics}</a>
            <a onClick={()=>setIsOpen(false)} href="#OurPartners" className="block py-2 px-4 text-sm hover:bg-gray-200">{data?.title_our_partners}</a>
            <a onClick={()=>setIsOpen(false)} href="#buy-now" className="block py-2 px-4 text-sm hover:bg-gray-200 text-orange-600">{data?.buy_now}</a>
            <div className="flex justify-center space-x-4 mt-4">
              <Flag onClick={()=>setLanguage('English')} code="us" style={{ width: 45, height: 50 }} alt="USA Flag" />
              <Flag onClick={()=>setLanguage('China')} code="cn" className='mt-2' style={{ width: 38, height: 33 }} alt="China Flag" />
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-50">
        <div className="text-center mb-8 p-5 rounded-sm shadow-orange-700 shadow-md mt-5 bg-gradient-to-r from-blue-500 via-blue-400 via-orange-600 to-orange-600">
            <h1 className="text-4xl font-bold text-white mb-8">
                {data?.title_page}
            </h1>
            <p onClick={() => copyToClipboard(data?.value_token_contract)} className="text-sm font-bold text-white">
                {data?.token_contract}: {data?.value_token_contract}
            </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container">
          <div id="vote-biden" className={`bg-white p-6 rounded-lg shadow-md text-center ${isBouncing ? 'bouncing' : ''} lg:mt-16 sm:mt-0`}>
              <img 
                src={`${config.doamin}`+data?.image_candidate_two}
                alt="Biden" 
                className="w-48 h-48 mx-auto object-cover object-center rounded-lg" 
              />
              <p className="text-gray-700 mb-4">{data?.lorem_candidate_two}</p>
              <button
                  disabled={votes.person2 > 0 ? true : false}
                  className={`${
                    votes.person2 > 0 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                  } px-4 py-2 rounded`}
                  onClick={() => handleVote('Biden')}
              >
                  {
                    votes.person2 > 0? data?.btn_voted_candidate_two:data?.btn_vote_candidate_two
                  } 
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center mb-12">
              <div className="flex justify-center items-center mb-4">
                
                <img 
                  src={`${config.doamin}`+data?.image_candidate_two_vs}
                  alt="Biden" 
                  className="w-28 h-28 object-cover object-center rounded-full mx-2" 
                />
                <div className='flex flex-col'>
                    <img 
                    src='https://t4.ftcdn.net/jpg/03/14/06/47/360_F_314064760_kYuSNOW983FhCgbnCsiXvevPDcK3ZyG9.jpg'
                    alt="Person"
                    className="w-24 h-24 object-cover object-center  mx-2"
                    />
                    <img src={VS} alt="vss" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4"/>
                </div>
                <img 
                  src={`${config.doamin}`+data?.image_candidate_one_vs} 
                  alt="Trump" 
                  className="w-28 h-28 object-cover object-center rounded-full mx-2" 
                />
              </div>
              <h2 className="text-2xl font-semibold"><span className='text-red-600'>{data?.name_candidate_two}</span> vs <span className='text-blue-500'>{data?.name_candidate_one}</span></h2>
            </div>

            <div id="vote-trump" className={`bg-white p-6 rounded-lg shadow-md text-center ${!isBouncing ? 'bouncing' : ''} lg:mt-16 sm:mt-0`}>
              <img 
                src={`${config.doamin}`+data?.image_candidate_one} 
                alt="Trump" 
                className="w-48 h-48 mx-auto object-cover object-center rounded-lg" 
              />
              <p className="text-gray-700 mb-4">{data?.lorem_candidate_one}</p>
              <button
                  disabled={votes.person1 > 0 ? true : false}
                  className={`${
                    votes.person1 > 0 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600 '
                  } px-4 py-2 rounded`}
                  onClick={() => handleVote('Trump')}
              >
                  {
                    votes.person1 > 0? data?.btn_voted_candidate_one:data?.btn_vote_candidate_one
                  } 
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center mt-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{data?.title_about_project}</h2>
            <p className="text-gray-700 mb-4">
            {data?.content_about_project}
            </p>
          </div>
          <div id="tokenomics" className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-12 text-white bg-gradient-to-r p-5 shadow-orange-700 shadow-md mt-5 bg-gradient-to-r from-blue-500 via-blue-400 via-orange-600 to-orange-600">{data?.tokenomics}</h2>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:gap-8 sm:gap-0">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={VS} alt="Total Supply" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
                <p className="text-lg font-medium">{data?.total_supply_title}</p>
                <p className="text-red-500 lg:text-xl sm:text-xs">{data?.total_supply_number}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={VS} alt="LB Burn" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
                <p className="text-lg font-medium">{data?.lb_burn}</p>
                <p className="text-green-500 text-xl">{data?.yes}</p>
                
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={VS} alt="Tax" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
                <p className="text-lg font-medium">{data?.tax}</p>
                <p className="text-yellow-500 text-xl">{data?.zero}</p>
              </div>
            </div>
            {/*  */}
            <div id='OurPartners' className="bg-beige p-8">
              <h2 className="text-2xl font-semibold mb-12 text-white bg-gradient-to-r p-5 shadow-orange-700 shadow-md mt-5 bg-gradient-to-r from-blue-500 via-blue-400 via-orange-600 to-orange-600">{data?.title_our_partners}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((partner, index) => (
                  <a target="_blank" rel="noopener noreferrer" href={partner.link} key={index} className="flex flex-col items-center bg-white rounded-lg shadow-md p-6">
                    <img src={partner.logo} alt={partner.alt} className="h-16 mb-4" />
                    <span className="text-xl font-semibold text-center">{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>
            {/*  */}
            <button
              id="buy-now"
              className="bg-red-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-red-600"
              onClick={handleBuyNow}
            >
              {data?.buy_now}
            </button>
          </div>
          <div className="text-center mt-8 mb-2">
        <h2 className="text-2xl font-semibold mb-12 text-white  bg-gradient-to-r p-5 shadow-orange-700 shadow-md mt-5 bg-gradient-to-r from-blue-500 via-blue-400 via-orange-600 to-orange-600">
          {data?.title_social_media}
        </h2>
        <div className="flex justify-center space-x-4">
          <a target="_blank" rel="noopener noreferrer" href="https://facebook.com" className="text-blue-600 hover:underline">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-8 h-8" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com" className="text-blue-400 hover:underline">
            <img src="https://images2.thanhnien.vn/528068263637045248/2023/7/24/f1x5vdqx0aa9sgt-16901896163331463104829.jpg" alt="Twitter" className="w-8 h-8 rounded-lg" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://instagram.com" className="text-pink-500 hover:underline">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://telegram.org" className="text-blue-400 hover:underline">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="w-8 h-8 rounded-lg" />
          </a>
          {/* <a target="_blank" rel="noopener noreferrer" href="https://raydium.io" className="hover:underline">
            <img src="https://cdn.coin68.com/images/20240209084051-83f15054-0369-4d4e-b2c5-27b6398482d7-102.jpg" alt="Raydium" className="w-8 h-8 rounded-lg" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://dexscreener.com" className="hover:underline">
            <img src="https://play-lh.googleusercontent.com/XNljDSnh_XmM53mREFo6SLXQDtedBh01bvNC7ReCLJSq-Nx2uCtg5pDGKH0OMLq4Uszh" alt="Dexscreener" className="w-8 h-8 rounded-lg" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://solana.com" className="hover:underline">
            <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" alt="Solana" className="w-8 h-8 rounded-lg" />
          </a> */}
        </div>
      </div>
  
        </div>
      </div>
    );
}

export default Home;