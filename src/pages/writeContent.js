import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../SignupWritecontent.css'
const WriteContentFromParams = () => {
  const { templateRef } = useParams();
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [competitorContent, setCompetitorContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const requestBody = {
      templateRef: templateRef,
      type: type,
      Title: title,
      mainContent: mainContent,
      CompetitorContent: competitorContent
    };
    console.log(requestBody)
    try {
      const response = await axios.post('https://contentcrafter.bulkpe.in/api/writeContent', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });

      console.log('API Response:', response.data);
      setResponseMessage('Task added successfully');
      // Handle success response
    } catch (error) {
      console.error('Error making API call:', error);
      setResponseMessage('Error adding task');
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h2 className="title">Write Content</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
          <label htmlFor="type">Type</label>
        </div>
        <div className="field">
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="title">Title</label>
        </div>
        <div className="field">
          <textarea id="mainContent" value={mainContent} onChange={(e) => setMainContent(e.target.value)} />
          <label htmlFor="mainContent">Main Content</label>
        </div>
        <div className="field">
          <textarea id="competitorContent" value={competitorContent} onChange={(e) => setCompetitorContent(e.target.value)} />
          <label htmlFor="competitorContent">Competitor Content</label>
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default WriteContentFromParams;
