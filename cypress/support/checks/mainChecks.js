export class MainChecks {

   visitSite(URL){
       cy.visit(URL);
   }

   /* Размер экрана */
   changeView(weight, height) {
      cy.viewport(weight, height);
   }

   /* Реклама */
   closePopup() {
      cy.get('.banner-popup__window > .banner-popup__close').click()
   }

   /** Подпишись */
   closePopupSub() {
      cy.get('big').click()
   }

   /* Хардкодный таймаут} */
   hardWait(time) {
      cy.wait(time);
   }

   /* Кнопка Найти */
   searchBtn() {
      cy.get('.form-group-line > .btn-search').click()
   }

   /* Проверка значения по умолчанию поля откуда */
   departureInput() {
      cy.get('#tour-city-from').click()
      .should("have.value", "Москва")
   }

   


}

export const mainChecks = new MainChecks();