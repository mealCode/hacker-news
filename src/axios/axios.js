const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0'
});