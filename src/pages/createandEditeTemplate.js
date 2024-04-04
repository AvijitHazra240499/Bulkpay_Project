import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CreateTemplateWithFileUpload.css';

const CreateTemplateWithFileUpload = () => {
  const [file, setFile] = useState(null);
  const [templateRef, setTemplateRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadableContentURL, setDownloadableContentURL] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [downloadableContent, setDownloadableContent] = useState('');
  const [editableContent, setEditableContent] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const isHTMLFile = (file) => {
    return file && file.type === 'text/html';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage('Please select a file');
      return;
    }

    if (!isHTMLFile(file)) {
      setErrorMessage('Please upload a valid HTML file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://contentcrafter.bulkpe.in/api/CreateTemplate', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setTemplateRef(response.data.result.template_ref);
      console.log(response.data.result)
      setDownloadableContentURL(response.data.result.html);
      setShowPreview(true);
      setErrorMessage('');
    } catch (error) {
      setTemplateRef('');
      setErrorMessage('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  const handleHtmlChange = (event) => {
    console.log(event.target.innerHTML)
    setEditableContent(event.target.innerHTML);
  };

  useEffect(() => {
    const fetchHTMLContent = async () => {
      try {
        const response = await axios.get(`https://api.codetabs.com/v1/proxy?quest=${downloadableContentURL}`);
        setDownloadableContent(response.data);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    if (downloadableContentURL) {
      fetchHTMLContent();
    }
  }, [downloadableContentURL]);

  const downloadHtmlFile = () => {
    const element = document.createElement('a');
    const file = new Blob([editableContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'edited_file.html';
    document.body.appendChild(element); // Required for Firefox
    element.click();
  };

  return (
    <div>
      <h2>Create Template with File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {templateRef && (
        <div>
          <p>Template created successfully!</p>
          <p>Template Reference: {templateRef}</p>
          
          <a href={downloadableContentURL} target='_blank'><button>Download HTML</button></a>
          {showPreview && (
            <div className="preview-container">
              <div
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: editableContent || downloadableContent }}
                onBlur={handleHtmlChange}
              />
              <button onClick={downloadHtmlFile}>Download Edited HTML File</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateTemplateWithFileUpload;
