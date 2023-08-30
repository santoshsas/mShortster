// src/axios-config.js

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API host and port
});

export default instance;
