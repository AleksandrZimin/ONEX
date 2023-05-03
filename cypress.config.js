const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // регистрация задачи с именем 'countSentences'
        countSentences: (url) => {
          // возвращает результат выполнения задачи
          return new Promise((resolve, reject) => {
            // здесь можно выполнить нужную логику
            // и передать результат в resolve()
          });
        }
      });
    },

    projectId: "usaz4k",
  // The rest of the Cypress config options go here...

    baseUrl: 'https://alpha.online-express.ru',
    defaultCommandTimeout: 40000,
    viewportHeight: 1020,
    viewportWidth: 1980,
    watchForFileChanges: false, 
    testIsolation: false,
  },
  
  
});

