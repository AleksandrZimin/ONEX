// в файле cypress/plugins/index.js
const countSentences = require('./countSentences')

module.exports = (on, config) => {
  on('task', {
    countSentences: (url) => {
      return countSentences(url).catch((err) => {
        console.error(err)
        return 0 // возвращаем 0 в случае ошибки
      })
    },
  })
}