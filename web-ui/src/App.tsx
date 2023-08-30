// src/App.tsx

import React, { useState } from 'react';
import axios from './axios-config';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ shortcode: string }>('/submit', { url, shortcode });
      if (response.data.shortcode) {
        setShortcode(response.data.shortcode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = async () => {
    try {
      const response = await axios.get(`/${shortcode}`);
      setRedirectUrl(response.request.responseURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>URL Shortening App</h1>
      <form className="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Desired Shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortcode && (
        <p>
          Shortcode: <a href={`/${shortcode}`}>{shortcode}</a>
        </p>
      )}
      {redirectUrl && (
        <p>
          Redirecting to: <a href={redirectUrl}>{redirectUrl}</a>
        </p>
      )}
      {shortcode && (
        <button onClick={handleRedirect}>Test Redirect</button>
      )}
    </div>
  );
}

export default App;

