const axios = require('axios');

module.exports = async (url) => {
  const response = await axios.get(url);
  const text = response.data;
  const sentences = text.split(/[.|!|?]+/).filter((sentence) => sentence.trim().length > 0);
  return sentences.length;
};

module.exports = countSentences;