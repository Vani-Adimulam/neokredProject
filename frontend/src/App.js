import React, { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  console.log(html); 

  const handleMarkdownChange = async (event) => {
    const markdownText = event.target.value;
    setMarkdown(markdownText);

    try {
      // Getting Converted markdown Text from backed Which is running in port 5000
      const response = await axios.post('http://localhost:5000/convert', {
        markdown: markdownText,
      });
      console.log(response); 
      setHtml(response.data.htmlTextConversion); // Setting the data from backed to the state Variable 'html' in frontend
    } catch (error) {
      console.error('Error converting markdown:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <textarea
        style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Type Markdown Text here..."
      />
      <div
        style={{
          flex: 1,
          padding: '10px',
          borderLeft: '1px solid #ddd',
          overflowY: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: html }} // Setting up the Raw html
      />
    </div>
  );
};

export default App;
