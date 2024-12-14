import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  console.log(html);

  const handleMarkdownChange = async (event) => {
    const markdownText = event.target.value;
    setMarkdown(markdownText);

    try {
      // Getting Converted markdown Text from backed Which is running in port 5000
      const response = await axios.post("http://localhost:5000/convert", {
        markdown: markdownText,
      });
      console.log(response);
      setHtml(response.data.htmlTextConversion); // Setting the data from backed to the state Variable 'html' in frontend
    } catch (error) {
      console.error("Error converting markdown:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Markdown Editor</h1>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "20px",
            border: "2px solid black", 
          }}
        >
          <h2 style={{ textAlign: "center", color: "gray", fontSize: "24px" }}>
            MarkDown Text
          </h2>
          <textarea
            style={{
              flex: 1,
              padding: "5px",
              fontSize: "20px",
              border: "none",
              outline: "none", 
              width: "100%",
              height: "80%",
              resize: "none", 
            }}
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Type Markdown Text here..."
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: "5px",
            border: "2px solid black",
            overflowY: "auto",
          }}
        >
          <h2 style={{ textAlign: "center", color: "gray" }}>Live Preview</h2>
          <div
            dangerouslySetInnerHTML={{ __html: html }} // Setting up the Raw html
          />
        </div>
      </div>
    </div>
  );
};

export default App;
