import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [votes, setVotes] = useState({ person1: 0, person2: 0 });
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleVote = (person) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [person]: prevVotes[person] + 1
    }));
  };

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
    try {
      const token = await handleCaptcha();
      setCaptchaVerified(true);
      alert("Captcha verified, proceeding with the purchase.");
      // Handle the buy action here
    } catch (error) {
      alert("Please complete the captcha verification.");
    }
  };


  const copyToClipboard = (text, content) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("coppy thành công")
            
        })
        .catch(err => {
          alert("coppy thất bại")
        });
};


  return (
    <div className="background" >
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">Logo</span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a href="#vote-trump" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Vote Trump</a>
                <a href="#vote-biden" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Vote Biden</a>
                <a href="#tokenomics" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Tokenomics</a>
                <a href="#buy-now" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Buy Now</a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">EN</a>
              <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">VN</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-50">
        <h1 className="text-4xl font-bold mb-8 text-center  p-5 rounded-2xl mt-5 bg-gradient-to-r from-blue-500 via-blue-400 via-orange-400 to-orange-500">US Presidential Candidates</h1>
        <div className="text-center mb-8">
          <p onClick={()=>copyToClipboard("abfdsdasd")} className="text-lg font-medium bg-gradient-to-r p-5 rounded-2xl from-blue-500 via-blue-400 via-orange-400 to-orange-500">
            Token Contract: 9H2E...5oVD
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container">
          <div id="vote-trump" className="bg-white p-6 rounded-lg shadow-md text-center lg:mt-16 sm:nt-0">
            <img 
              src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS6HuPXKLP6UfXBrzMz42_2w-8nPjgCVZNmoA2AcNt_KXR8vcMdMra-IijGBznEsxwEFIwzRSRTlRE5kDM' 
              alt="Trump" 
              className="w-48 h-48 mx-auto object-cover object-center rounded-lg" 
            />
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleVote('person1')}
            >
              Vote for Trump
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <img 
                src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS6HuPXKLP6UfXBrzMz42_2w-8nPjgCVZNmoA2AcNt_KXR8vcMdMra-IijGBznEsxwEFIwzRSRTlRE5kDM' 
                alt="Trump" 
                className="w-28 h-28 object-cover object-center rounded-full mx-2" 
              />
              <img 
                src='https://t4.ftcdn.net/jpg/03/14/06/47/360_F_314064760_kYuSNOW983FhCgbnCsiXvevPDcK3ZyG9.jpg'
                alt="Person"
                className="w-24 h-24 object-cover object-center  mx-2"
              />
              <img 
                src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcStpnv_tQ4R7IwFANRwU3wv6K76_5jcrwiQgn40GdwgDQ0b7Xz7Dhycce6WR4zRFSlcAvgqAzUtQ4B0wdA' 
                alt="Biden" 
                className="w-28 h-28 object-cover object-center rounded-full mx-2" 
              />
            </div>
            <h2 className="text-2xl font-semibold"><span className='text-red-600'>Trump</span> vs <span className='text-blue-500'>Biden</span></h2>
          </div>
          <div id="vote-biden" className="bg-white p-6 rounded-lg shadow-md text-center lg:mt-16 sm:nt-0">
            <img 
              src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcStpnv_tQ4R7IwFANRwU3wv6K76_5jcrwiQgn40GdwgDQ0b7Xz7Dhycce6WR4zRFSlcAvgqAzUtQ4B0wdA' 
              alt="Biden" 
              className="w-48 h-48 mx-auto object-cover object-center rounded-lg" 
            />
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleVote('person2')}
            >
              Vote for Biden
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center mt-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">About the Project</h2>
          <p className="text-gray-700 mb-4">
            This project is designed to engage the community in a unique way, allowing people to vote for their preferred US presidential candidate using tokens. Our goal is to create a fun and interactive experience while highlighting the importance of civic engagement.
          </p>
          <p className="text-gray-700 mb-4">
            With our tokenomics system, we ensure transparency and fairness in the voting process. Every vote is recorded on the blockchain, ensuring that the results are tamper-proof and verifiable.
          </p>
          <p className="text-gray-700 mb-4">
            Join us in this exciting journey and make your voice heard! Participate in the voting, learn about tokenomics, and be a part of a community that values integrity and innovation.
          </p>
        </div>
        <div id="tokenomics" className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r p-5 rounded-2xl from-blue-500 via-blue-400 via-orange-400 to-orange-500">Tokenomics</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:gap-8 sm:gap-0">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg" alt="Total Supply" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
              <p className="text-lg font-medium">Total supply</p>
              <p className="text-red-500 lg:text-xl sm:text-xs">549,129,817</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg" alt="LB Burn" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
              <p className="text-lg font-medium">LB Burn</p>
              <p className="text-green-500 text-xl">YES</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg" alt="Tax" className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 object-cover object-center mx-auto mb-4" />
              <p className="text-lg font-medium">Tax</p>
              <p className="text-yellow-500 text-xl">ZERO</p>
            </div>
          </div>
          <button
            id="buy-now"
            className="bg-red-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-red-600"
            onClick={handleBuyNow}
          >
            BUY NOW
          </button>
        </div>
        <div className="text-center mt-8 mb-2">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r p-5 rounded-2xl from-blue-500 via-blue-400 via-orange-400 to-orange-500">Follow us on Social Media</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" className="text-blue-600 hover:underline">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:underline">
              <img src="https://images2.thanhnien.vn/528068263637045248/2023/7/24/f1x5vdqx0aa9sgt-16901896163331463104829.jpg" alt="Twitter" className="w-8 h-8 rounded-lg" />
            </a>
            <a href="https://instagram.com" className="text-pink-500 hover:underline">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
