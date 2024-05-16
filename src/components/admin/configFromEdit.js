import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '../../config.json'
import Header from './Header';

const ConfigFromEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imagePreviews, setImagePreviews] = useState({
        logo: null,
        imageCandidateOne: null,
        imageCandidateTwo: null,
        imageCandidateOneVs: null,
        imageCandidateTwoVs: null
    });
    const [formData, setFormData] = useState({
        language: '',
        logo: null,
        titlePage: '',
        tokenContract: '',
        valueTokenContract: '',
        imageCandidateOne: null,
        imageCandidateTwo: null,
        loremCandidateOne: '',
        loremCandidateTwo: '',
        btnVoteCandidateOne: '',
        btnVoteCandidateTwo: '',
        btnVotedCandidateOne: '',
        btnVotedCandidateTwo: '',
        nameCandidateOne: '',
        nameCandidateTwo: '',
        imageCandidateOneVs: null,
        imageCandidateTwoVs: null,
        titleAboutProject: '',
        contentAboutProject: '',
        tokenomics: '',
        totalSupplyTitle: '',
        totalSupplyNumber: '',
        lbBurn: '',
        yes: '',
        tax: '',
        zero: '',
        titleOurPartners: '',
        buyNow: '',
        titleSocialMedia: '',
        linkRaydium: '',
        linkDexscreener: '',
        linkSolana: '',
    });
    useEffect(() => {
        const fetchConfig = async () => {
          try {
            const response = await axios.get(`${config.doamin}/api/votes/${Number(id)}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
            });
            console.log('Data fetched successfully:', response.data);
            setFormData({
                language: response.data.language || '',
                titlePage: response.data.title_page || '',
                tokenContract: response.data.token_contract || '',
                valueTokenContract: response.data.value_token_contract || '',
                loremCandidateOne: response.data.lorem_candidate_one || '',
                loremCandidateTwo: response.data.lorem_candidate_two || '',
                btnVoteCandidateOne: response.data.btn_vote_candidate_one || '',
                btnVoteCandidateTwo: response.data.btn_vote_candidate_two || '',
                btnVotedCandidateOne: response.data.btn_voted_candidate_one || '',
                btnVotedCandidateTwo: response.data.btn_voted_candidate_two || '',
                nameCandidateOne: response.data.name_candidate_one || '',
                nameCandidateTwo: response.data.name_candidate_two || '',
                titleAboutProject: response.data.title_about_project || '',
                contentAboutProject: response.data.content_about_project || '',
                tokenomics: response.data.tokenomics || '',
                totalSupplyTitle: response.data.total_supply_title || '',
                totalSupplyNumber: response.data.total_supply_number || '',
                lbBurn: response.data.lb_burn || '',
                yes: response.data.yes || '',
                tax: response.data.tax || '',
                zero: response.data.zero || '',
                titleOurPartners: response.data.title_our_partners || '',
                buyNow: response.data.buy_now || '',
                titleSocialMedia: response.data.title_social_media || '',
                linkRaydium: response.data.link_raydium || '',
                linkDexscreener: response.data.link_dexscreener || '',
                linkSolana: response.data.link_solana || '',
              });
              setImagePreviews({
                logo: response.data.logo ? `${config.doamin}${response.data.logo}` : null,
                imageCandidateOne: response.data.image_candidate_one ? `${config.doamin}${response.data.image_candidate_one}` : null,
                imageCandidateTwo: response.data.image_candidate_two ? `${config.doamin}${response.data.image_candidate_two}` : null,
                imageCandidateOneVs: response.data.image_candidate_one_vs ? `${config.doamin}${response.data.image_candidate_one_vs}` : null,
                imageCandidateTwoVs: response.data.image_candidate_two_vs ? `${config.doamin}${response.data.image_candidate_two_vs}` : null,
              });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchConfig();
      }, [id]);
    

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
            setImagePreviews({
                ...imagePreviews,
                [name]: URL.createObjectURL(files[0])
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('language', formData.language);
        if (formData.logo){
            data.append('logo', formData.logo);
        }
        data.append('title_page', formData.titlePage);
        data.append('token_contract', formData.tokenContract);
        data.append('value_token_contract', formData.valueTokenContract);
        if (formData.imageCandidateOne){
            data.append('image_candidate_one', formData.imageCandidateOne);
        }
        if (formData.imageCandidateTwo){
            data.append('image_candidate_two', formData.imageCandidateTwo);
        }
        data.append('lorem_candidate_one', formData.loremCandidateOne);
        data.append('lorem_candidate_two', formData.loremCandidateTwo);
        data.append('btn_vote_candidate_one', formData.btnVoteCandidateOne);
        data.append('btn_vote_candidate_two', formData.btnVoteCandidateTwo);
        data.append('btn_voted_candidate_one', formData.btnVotedCandidateOne);
        data.append('btn_voted_candidate_two', formData.btnVotedCandidateTwo);
        data.append('name_candidate_one', formData.nameCandidateOne);
        data.append('name_candidate_two', formData.nameCandidateTwo);
        if (formData.imageCandidateOneVs){
            data.append('image_candidate_one_vs', formData.imageCandidateOneVs);
        }
        if(formData.imageCandidateTwoVs){
            data.append('image_candidate_two_vs', formData.imageCandidateTwoVs);
        }
        data.append('title_about_project', formData.titleAboutProject);
        data.append('content_about_project', formData.contentAboutProject);
        data.append('tokenomics', formData.tokenomics);
        data.append('total_supply_title', formData.totalSupplyTitle);
        data.append('total_supply_number', formData.totalSupplyNumber);
        data.append('lb_burn', formData.lbBurn);
        data.append('yes', formData.yes);
        data.append('tax', formData.tax);
        data.append('zero', formData.zero);
        data.append('title_our_partners', formData.titleOurPartners);
        data.append('buy_now', formData.buyNow);
        data.append('title_social_media', formData.titleSocialMedia);
        data.append('link_raydium', formData.linkRaydium);
        data.append('link_dexscreener', formData.linkDexscreener);
        data.append('link_solana', formData.linkSolana);
        try {
            const response = await axios.patch(`${config.doamin}/api/votes/`+Number(id), data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
            });
            if (response.status){
                navigate('/admin/config')
            }
            console.log('Form submitted successfully:', response);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const contry = [
        { language:"English", id:1 },
        { language:"China", id:2 }
    ]

    return (
      <>
        <Header/>
        <div className='container mx-auto mt-3 lg:w-1/2 sm:lg-full'>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded shadow-md" encType="multipart/form-data">
                <h1 className='text-center font-bold text-3xl'>Edit Config</h1>
            {/* Language */}
            <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                </label>
                <select value={formData.language} onChange={(e) => setFormData(prve => ({...prve, language:e.target.value}))} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {contry.map(item=>(
                        <option value={item.id}>{item.language}</option>
                    ))}
                </select>
            </div>

            {/* Logo */}
            <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-3">
                    Logo
                </label>
                <input
                    type="file"
                    name="logo"
                    id="logo"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {imagePreviews.logo && (
                    <img src={imagePreviews.logo} alt="Logo Preview" className="mt-2 h-24 w-24 object-cover rounded-md shadow" />
                )}
            </div>

            {/* Title Page */}
            <div>
                <label htmlFor="titlePage" className="block text-sm font-medium text-gray-700">
                    Title Page
                </label>
                <input
                    type="text"
                    name="titlePage"
                    id="titlePage"
                    value={formData.titlePage}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            {/* Token Contract */}
            <div>
                <label htmlFor="valueTokenContract" className="block text-sm font-medium text-gray-700">
                    Token Contract
                </label>
                <input
                    type="text"
                    name="valueTokenContract"
                    id="valueTokenContract"
                    value={formData.valueTokenContract}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Value token contract: */}
            <div>
                <label htmlFor="tokenContract" className="block text-sm font-medium text-gray-700">
                    Value token contract:
                </label>
                <input
                    type="text"
                    name="tokenContract"
                    id="tokenContract"
                    value={formData.tokenContract}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Image candidate one: */}
            <div>
                <label htmlFor="tokenContract" className="block text-sm font-medium text-gray-700">
                Image candidate one:
                </label>
                <input
                    type="file"
                    name="imageCandidateOne"
                    id="imageCandidateOne"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {imagePreviews.imageCandidateOne && (
                    <img src={imagePreviews.imageCandidateOne} alt="Image Candidate One Preview" className="mt-2 h-24 w-24 object-cover rounded-md shadow" />
                )}
            </div>
            {/* Image candidate two: */}
            <div>
                <label htmlFor="tokenContract" className="block text-sm font-medium text-gray-700">
                Image candidate two:
                </label>
                <input
                    type="file"
                    name="imageCandidateTwo"
                    id="imageCandidateTwo"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {imagePreviews.imageCandidateTwo && (
                    <img src={imagePreviews.imageCandidateTwo} alt="Image Candidate One Preview" className="mt-2 h-24 w-24 object-cover rounded-md shadow" />
                )}
            </div>
            {/* loremCandidateOne */}
            <div>
                <label htmlFor="loremCandidateOne" className="block text-sm font-medium text-gray-700">
                Lorem candidate one:
                </label>
                <input
                    type="text"
                    name="loremCandidateOne"
                    id="loremCandidateOne"
                    value={formData.loremCandidateOne}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Lorem candidate two: */}
            <div>
                <label htmlFor="loremCandidateTwo" className="block text-sm font-medium text-gray-700">
                    Lorem candidate two:
                </label>
                <input
                    type="text"
                    name="loremCandidateTwo"
                    id="loremCandidateTwo"
                    value={formData.loremCandidateTwo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Btn vote candidate one */}
            <div>
                <label htmlFor="btnVoteCandidateOne" className="block text-sm font-medium text-gray-700">
                Btn vote candidate one
                </label>
                <input
                    type="text"
                    name="btnVoteCandidateOne"
                    id="btnVoteCandidateOne"
                    value={formData.btnVoteCandidateOne}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Btn vote candidate two */}
            <div>
                <label htmlFor="btnVoteCandidateTwo" className="block text-sm font-medium text-gray-700">
                Btn vote candidate two
                </label>
                <input
                    type="text"
                    name="btnVoteCandidateTwo"
                    id="btnVoteCandidateTwo"
                    value={formData.btnVoteCandidateTwo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Btn voted candidate one: */}
            <div>
                <label htmlFor="btnVotedCandidateOne" className="block text-sm font-medium text-gray-700">
                    Btn voted candidate one:
                </label>
                <input
                    type="text"
                    name="btnVotedCandidateOne"
                    id="btnVotedCandidateOne"
                    value={formData.btnVotedCandidateOne}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Btn voted candidate two: */}
            <div>
                <label htmlFor="btnVotedCandidateTwo" className="block text-sm font-medium text-gray-700">
                    Btn voted candidate two:
                </label>
                <input
                    type="text"
                    name="btnVotedCandidateTwo"
                    id="btnVotedCandidateTwo"
                    value={formData.btnVotedCandidateTwo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Name candidate one: */}
            <div>
                <label htmlFor="nameCandidateOne" className="block text-sm font-medium text-gray-700">
                    Name candidate one:
                </label>
                <input
                    type="text"
                    name="nameCandidateOne"
                    id="nameCandidateOne"
                    value={formData.nameCandidateOne}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Name candidate two: */}
            <div>
                <label htmlFor="nameCandidateTwo" className="block text-sm font-medium text-gray-700">
                    Name candidate two:
                </label>
                <input
                    type="text"
                    name="nameCandidateTwo"
                    id="nameCandidateTwo"
                    value={formData.nameCandidateTwo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Image candidate one vs: */}
            <div>
                <label htmlFor="imageCandidateOneVs" className="block text-sm font-medium text-gray-700">
                Image candidate one vs:
                </label>
                <input
                    type="file"
                    name="imageCandidateOneVs"
                    id="imageCandidateOneVs"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {imagePreviews.imageCandidateOneVs && (
                    <img src={imagePreviews.imageCandidateOneVs} alt="Image Candidate One Preview" className="mt-2 h-24 w-24 object-cover rounded-md shadow" />
                )}
            </div>
            {/* Image candidate two vs: */}
            <div>
                <label htmlFor="imageCandidateTwoVs" className="block text-sm font-medium text-gray-700">
                    Image candidate two vs:
                </label>
                <input
                    type="file"
                    name="imageCandidateTwoVs"
                    id="imageCandidateTwoVs"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {imagePreviews.imageCandidateTwoVs && (
                    <img src={imagePreviews.imageCandidateTwoVs} alt="Image Candidate One Preview" className="mt-2 h-24 w-24 object-cover rounded-md shadow" />
                )}
            </div>
            {/* Title about project: */}
            <div>
                <label htmlFor="titleAboutProject" className="block text-sm font-medium text-gray-700">
                    Title about project:
                </label>
                <input
                    type="text"
                    name="titleAboutProject"
                    id="titleAboutProject"
                    value={formData.titleAboutProject}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Content about project: */}
            <div>
                <label htmlFor="contentAboutProject" className="block text-sm font-medium text-gray-700">
                    Content about project:
                </label>
                <textarea
                    type="text"
                    name="contentAboutProject"
                    id="contentAboutProject"
                    value={formData.contentAboutProject}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-52"
                />
            </div>
            {/* Tokenomics: */}
            <div>
                <label htmlFor="tokenomics" className="block text-sm font-medium text-gray-700">
                    Tokenomics:
                </label>
                <input
                    type="text"
                    name="tokenomics"
                    id="tokenomics"
                    value={formData.tokenomics}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Total supply title: */}
            <div>
                <label htmlFor="totalSupplyTitle" className="block text-sm font-medium text-gray-700">
                    Total supply title:
                </label>
                <input
                    type="text"
                    name="totalSupplyTitle"
                    id="totalSupplyTitle"
                    value={formData.totalSupplyTitle}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Total supply number: */}
            <div>
                <label htmlFor="totalSupplyNumber" className="block text-sm font-medium text-gray-700">
                    Total supply number:
                </label>
                <input
                    type="text"
                    name="totalSupplyNumber"
                    id="totalSupplyNumber"
                    value={formData.totalSupplyNumber}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Lb burn: */}
            <div>
                <label htmlFor="lbBurn" className="block text-sm font-medium text-gray-700">
                    Lb burn:
                </label>
                <input
                    type="text"
                    name="lbBurn"
                    id="lbBurn"
                    value={formData.lbBurn}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Yes */}
            <div>
                <label htmlFor="yes" className="block text-sm font-medium text-gray-700">
                    Yes
                </label>
                <input
                    type="text"
                    name="yes"
                    id="yes"
                    value={formData.yes}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Tax: */}
            <div>
                <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
                    Tax:
                </label>
                <input
                    type="text"
                    name="tax"
                    id="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Zero */}
            <div>
                <label htmlFor="zero" className="block text-sm font-medium text-gray-700">
                    Zero
                </label>
                <input
                    type="text"
                    name="zero"
                    id="zero"
                    value={formData.zero}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Title our partners: */}
            <div>
                <label htmlFor="titleOurPartners" className="block text-sm font-medium text-gray-700">
                    Title our partners:
                </label>
                <input
                    type="text"
                    name="titleOurPartners"
                    id="titleOurPartners"
                    value={formData.titleOurPartners}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Buy now: */}
            <div>
                <label htmlFor="buyNow" className="block text-sm font-medium text-gray-700">
                    Buy now:
                </label>
                <input
                    type="text"
                    name="buyNow"
                    id="buyNow"
                    value={formData.buyNow}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Title social media: */}
            <div>
                <label htmlFor="titleSocialMedia" className="block text-sm font-medium text-gray-700">
                    Title social media:
                </label>
                <input
                    type="text"
                    name="titleSocialMedia"
                    id="titleSocialMedia"
                    value={formData.titleSocialMedia}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Link raydium: */}
            <div>
                <label htmlFor="linkRaydium" className="block text-sm font-medium text-gray-700">
                    Link raydium:
                </label>
                <input
                    type="text"
                    name="linkRaydium"
                    id="linkRaydium"
                    value={formData.linkRaydium}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Link dexscreener: */}
            <div>
                <label htmlFor="linkDexscreener" className="block text-sm font-medium text-gray-700">
                    Link dexscreener:
                </label>
                <input
                    type="text"
                    name="linkDexscreener"
                    id="linkDexscreener"
                    value={formData.linkDexscreener}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {/* Link solana: */}
            <div>
                <label htmlFor="linkSolana" className="block text-sm font-medium text-gray-700">
                    Link solana:
                </label>
                <input
                    type="text"
                    name="linkSolana"
                    id="linkSolana"
                    value={formData.linkSolana}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            {/* Repeat similar structure for other fields */}
            
            {/* Submit Button */}
            <div>
                <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Edit
                </button>
            </div>
        </form>
    </div>
      </>
    );
};

export default ConfigFromEdit;
