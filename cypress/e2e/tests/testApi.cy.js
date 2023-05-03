// import _ from 'lodash';
// module.exports = (on, config) => {
//    on('task', {
//      countSentences: require('./countSentences'),
//    });
//  };
 
import { testAPI } from "../../support/checks/testAPI"



describe('Тест выдачи отелей API', () => {

   /* Страница выдачи отелей */
 
   it('Осуществляется переход на сайт', () => {
    testAPI.visitSite('https://alpha.online-express.ru/search/hotels/resultsAsync?place=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%20%28%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%20%D0%B8%20%D0%BE%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8%29&placeId=1801238&placeType=Region&checkInDate=17.07.2023&checkOutDate=19.07.2023&rooms=1-0&meals=0,1,2,3,4&onlyAvailable=1&searchAsync=1&ignoreCache=0&categories=1,2'),
    testAPI.hardWait(10000)
    }),
 
    it('Выбор размера экрана', () => {
      testAPI.changeView(1980,1020);
     })
     
     it('Тест API', () => {
      testAPI.searchHotelApiWait();
    })
});