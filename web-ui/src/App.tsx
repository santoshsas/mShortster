// src/App.tsx

import React, { useState } from 'react';
import axios from './axios-config';
import './App.css';
import {useDateFormat} from './hooks/useDateFormat'
import { AxiosResponse } from 'axios';

interface Record {
  url: string;
  createdOn: Date;
  clicked: number;
}

function App() {
  const [errors, setErrors] = useState<Array<string>>([])
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [stats, setStats] = useState<Record>();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(new Array<string>());
    try {
      const response = await axios.post<{ shortcode: string, url: string }>('/submit', { url, shortcode });
      if (response.data.shortcode) {
        setShortcode(response.data.shortcode);
      }
      if (response.data.url) {
        setShortUrl(response.data.url);
      }
    } catch (error: any) {
      setErrors([error.message])
      console.error(error);
    }
  };

  const handleStats = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const statsUrl: string = e.currentTarget.getAttribute(`href`) || ''
    try{
      const response: AxiosResponse<Record> = await axios.get(statsUrl)
      if (response.data) {
        setStats(response.data)
      }
    } catch (error: any) {
       setErrors([error.message])
    }
  }
  interface DateProp {
    date: Date
  }

function FormatDate (prop: DateProp) {
    let fdate= useDateFormat(prop.date)
    return (
      <span>
        {fdate}
      </span>
    )
  }
  
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
      { errors.map((err, i) =><div key={i} className="error-message">{err}</div>)}
      {shortcode && (
        <p>
          Shortcode: <a href={`/${shortcode}/stats`} onClick={handleStats}>{shortcode}</a>
        </p>
      )}
      {shortUrl && (
        <p>
         Short URL: <a href={shortUrl} target='blank' rel='noopener noreferrer'>{shortUrl}</a>
        </p>
      )}
      {stats && (
        <div className='stats-container'>
          <h4>Statics of the Shortcode: {shortcode}</h4>
          <div>
            <b>Original Url:</b> {stats.url}
          </div>
          <div>
            <b>Created on:</b> <FormatDate date={new Date(stats.createdOn)}/>
          </div>
          <div>
            <b>Clicks: </b>{stats.clicked}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

