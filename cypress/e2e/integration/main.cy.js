/// <reference types="Cypress" />
import { mainChecks } from "../../support/mainChecks"


describe('main page', () => {
   it('Переходим на сайт', () => {
      mainChecks.visitSite('https://online-express.ru/'),
      mainChecks.hardWait(10000)
   }),

   it('Выбор размера экрана', () => {
      mainChecks.changeView(1980,1250);
    })

   // it('close popup', () => {
   //    const bannerPopup = document.querySelector('.banner-popup');
   //    if(bannerPopup.classList.contains('.banner-popup--is-showed') ) {
   //       mainChecks.closePopup()
   //    } 
   //    return
   // })

   it('Проверка значения по умолчанию поля Откуда', () => {
      mainChecks.departureInput();
    })

})
