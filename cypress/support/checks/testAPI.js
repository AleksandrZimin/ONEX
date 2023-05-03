export class TestAPI {

   visitSite(URL){
       cy.visit(URL);
   }

   /* Размер экрана */
   changeView(weight, height) {
      cy.viewport(weight, height);
   }

   searchHotelApiWait() {

     
      // cy.task('countSentences', 'https://alpha.online-express.ru/search/hotels/resultsAsync*').then((count) => {
      //    expect(count).to.equal(this.resultsCount);
      //    });

/*-----------------------------------------------------------------------------------------------------------------------*/

            // cy.wait(20000)
      // fetch('https://alpha.online-express.ru/search/hotels/resultsAsync*')
      //    .then(response => response.json())
      //    .then(data => {
      //       const hotelList = data.results;
      //       console.log(`Отелей в JSON: ${hotelList}`)
      //    });
      

      cy.intercept('GET', 'https://alpha.online-express.ru/search/hotels/resultsAsync*').as('apiRequest');
      cy.wait(20000).then((interception) => {
        try {
         //  const allJson = interception.response.body;
         //  console.log(allJson);
         const allJson = expect (interception.results).to.have.property('status').to.equal('200')
         console.log(allJson);
          if (allJson.hasOwnProperty('results')) {
            const hotels = allJson.results;
            console.log(hotels);
            const count = hotels.length;
            console.log(`Количество отелей: ${count}`);
          } else {
            console.log('No hotels found');
          }
        } catch (err) {
          console.error(err);
        }
      });
   }
   // cy.intercept('GET', 'https://alpha.online-express.ru/search/hotels/resultsAsync*')
   //          .then((response) => {
   //             console.log(response.body)
   //          })
   //   }interception


    hardWait(time) {
      cy.wait(time)
    }

   


}

export const testAPI = new TestAPI();