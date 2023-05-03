const fetch = require('node-fetch')

module.exports = async (url) => {
  const response = await fetch(url)
  const text = await response.text()
  const sentences = text.split('.').filter((s) => s.trim().length > 0)
  return sentences.length
}