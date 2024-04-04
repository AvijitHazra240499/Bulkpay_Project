import React, { useState } from 'react';
import axios from 'axios';

const GenerateImages = () => {
  const [projectRef, setProjectRef] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleGenerateImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://contentcrafter.bulkpe.in/api/getImage',
        {
          projectRef: projectRef,
          title: title
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        }
      );
      console.log('API Response:', response.data);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error making API call:', error);
      setResponseMessage('Error occurred while generating images');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Images</h2>
      <div style={{ marginBottom: '20px' }}> {/* Added margin-bottom style */}
        <label htmlFor="projectRef">Project Reference:</label>
        <input
          type="text"
          id="projectRef"
          value={projectRef}
          onChange={(e) => setProjectRef(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '20px' }}> {/* Added margin-bottom style */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateImages} disabled={isLoading}>
        {isLoading ? 'Generating Images...' : 'Generate Images'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default GenerateImages;
