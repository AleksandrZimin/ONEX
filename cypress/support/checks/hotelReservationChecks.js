import _ from 'lodash';
export class HotelReservationChecks {

   constructor() {
      this.hotelName = ''; // определяем свойство hotelName (Название отеля)
      this.hotelPrice = ''; // определяем свойство hotelPrice (Цена)
      this.newHotelPrice = '';
      this.hotelCurrency = ''; // определяем свойство hotelCurrency (Валюта)
      this.hotelAdress = ''; // Адрес отеля
      this.cityLong = ''; // Выбранное название региона первый раз
      this.cityLong2 = ''; // Выбранное название региона второй раз
      this.checkInDate = ''; // дата начала
      this.checkOutDate = ''; // дата окончания
      this.resultsCount = ''; // кол-во предложений в массиве
      this.ratingCount = ''; // сохраненное значение рейтинга
      this.reviewsCount = ''; // кол-во отзывов (пока есть баг)
      this.orderNumber = ''; // Номер заказа

   }
   
   /* Выбор URL */
   visitSite(URL){
       cy.visit(URL);
   }

   /* Выбор размера экрана */
   changeView(weight, height) {
      cy.viewport(weight, height);
   }

   /* Хардкодный таймаут */
   hardWait(time) {
      cy.wait(time);
   }

      /* ГЛАВНАЯ СТРАНИЦА */

   /* Выбор вкладки */
   hotelSearchPage() {
      cy.get('.tabs-item-hotel > span')
         .click()
   }

    /* Выбор поля "Куда" */
   inputArrivalCountry(city) {
      cy.get('#input-place')
         .should('have.attr', 'placeholder', 'Город/курорт или отель')
         .click()
         .type(city)
         .should('have.value', city)
   }

       /* Выбор региона из выпадающего списка" */
   listArrivalCountry() {
      cy.get("#hotels-search-form > div:nth-child(1) > div > div.input-place > div.autocomplete-suggestions > div:nth-child(2) > span:nth-child(1)")
         .should("be.visible")
         .invoke('text')
         .as('cityLong')
         .then((text) => {
            this.cityLong = text; // сохраняем название отеля в свойстве hotelName
            return text; // явно возвращаем название отеля из метода
         })
      cy.get('.input-place > .autocomplete-suggestions > div:nth-child(2) > span:nth-child(1)')
         .click(); 
      cy.log(this.cityLong)        
   }

      /* Проверка отображения выбранного из списка названия региона" */
   inputArrivalCountryCheck() {
      cy.get("#input-place")
         .should('have.value', this.cityLong);
   }

      /* Проверка наличия чекбокса "Мгновенное подтверждение" и его работы */
   searchHotelCheckbox() {
      cy.get('#ytHotelSearchForm_onlyAvailable')
         .should('have.attr', 'value', '1')
      cy.get('.input-only-confirmation > .checkbox')
         .click()
      cy.get('#ytHotelSearchForm_onlyAvailable')
         .should('have.attr', 'value', '0')
      cy.get('.input-only-confirmation > .checkbox')
         .click()
      cy.get('#ytHotelSearchForm_onlyAvailable')
         .should('have.attr', 'value', '1')
   }

   /* Проверка звездности по умолчанию и выбор несколько значений*/
   searchHotelStars() {
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(2) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
         .click()
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(3) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
         .click()
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(4) > label > i')
         .should('have.css', 'background-position', '0px 0px')
         .click()
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(5) > label > i')
         .should('have.css', 'background-position', '0px 0px')
         .click()
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(6) > label > i')
         .should('have.css', 'background-position', '0px 0px')
         .click()
      cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(7) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
   }

   /* Проверка текущей даты и выбор новой */
   searchHotelCheckInDate() {
      let date = new Date();
      let month = date.getMonth(); 
      let dayOfMonth = date.getDate();
      let year = date.getFullYear();
      cy.get('#inputDateHotel > .input-date_nights > .input-date_nights-text').contains('7 ночей')
      cy.get('#HotelSearchForm_checkInDate').should('have.value', `0${dayOfMonth-27}` + '.0' + `${month+2}` + '.' +  year).click() // Нужно прописать условие, чтоб учитывалось, что в месяце ограниченное кол-во дней
      cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month2 > thead > .caption > :nth-child(3) > .next').click()
      cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month2 > thead > .caption > :nth-child(3) > .next').click()
      cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month2 > thead > .caption > :nth-child(3) > .next').click()

      cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month1 > tbody > :nth-child(4) > :nth-child(1) > .day').click()
      cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month1 > tbody > :nth-child(4) > :nth-child(3) > .day').click()
      cy.get('#inputDateHotel > .date-picker-wrapper > .footer > .cl-button > .btn > span').click()
      cy.get('#inputDateHotel > .input-date_nights > .input-date_nights-text').contains('2 ночи')

      /* Обнаружен баг, при выборе дат в поле по ... - выбранная дата не сохраняется */
      // cy.get('#HotelSearchForm_checkOutDate').click()
      // .debug()
      // cy.wait(1000);
      // cy.get('#HotelSearchForm_checkOutDate').click()
      // cy.get('#inputDateHotel > .date-picker-wrapper > .month-wrapper > .month1 > tbody > :nth-child(4) > :nth-child(4) > .day').click()
      // cy.get('#inputDateHotel > .date-picker-wrapper > .footer > .cl-button > .btn > span').click()
      // cy.get('#inputDateHotel > .input-date_nights > .input-date_nights-text').contains('3 ночи')
   }

   searchHotelSaveDates() {
      /* Сохранение даты начала*/
      cy.get('#HotelSearchForm_checkInDate')
         .invoke('val')
         .as('checkInDate')
         .then((date) => {
            this.checkInDate = date; // сохраняем название отеля в свойстве hotelName
            return date; // явно возвращаем название отеля из метода
        })
      /* Сохранение даты начала*/
      cy.get('#HotelSearchForm_checkOutDate')
         .invoke('val')
         .as('checkOutDate')
         .then((date) => {
            this.checkOutDate = date; // сохраняем название отеля в свойстве hotelName
            return date; // явно возвращаем название отеля из метода
         })
      cy.log(this.checkInDate, this.checkOutDate)   
   }

   /* Выбор кол-ва туристов */
   searchHotelTourists() {
      cy.get('#hotels-search-form > :nth-child(1) > .form-block > .input-tourists > .input-tourists_head')
         .contains('2 взрослых, 0 детей')
         .click()
      cy.get('#hotels-search-form > :nth-child(1) > .form-block > .input-tourists > .input-tourists_options > [data-room="0"] > .tourists_options-adults > .delete-adults').click()
      cy.get('#hotels-search-form > :nth-child(1) > .form-block > .input-tourists > .input-tourists_head')
         .contains('1 взрослый, 0 детей')
   }

   /* Выполнение поиска*/
   searchHotelButton() {
      cy.get('#hotels-search-form > :nth-child(1) > .btn-search')
         .should('have.text', 'Найти')
         .click({ timeout: 20000 })
   }

   /* СТРАНИЦА ВЫДАЧИ */

   /* Проверка поля "Куда" */
   searchHotelCorrect() {
      cy.get('input#input-place')
         .should('have.value', this.cityLong);
   }

    /* Проверка звездности */
   searchHotelCorrectStars() {
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(2) > label > i')
         .should('have.css', 'background-position', '0px 0px')
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(3) > label > i')
         .should('have.css', 'background-position', '0px 0px')
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(4) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(5) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(6) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
       cy.get('#hotels-search-form > div:nth-child(1) > div > div.input-category > ul > li:nth-child(7) > label > i')
         .should('have.css', 'background-position', '-21px 0px')
   }

   /* Проверка дат */
   searchHotelCheckDate() {
      cy.get('#HotelSearchForm_checkInDate')
         .should('have.value', this.checkInDate)
      cy.get('#HotelSearchForm_checkOutDate')
         .should('have.value', this.checkOutDate)
      cy.log(this.checkInDate, this.checkOutDate)
   }

   /* Проверка кол-ва туристов */
   searchHotelCorrectTourists() {
      cy.get('#hotels-search-form > :nth-child(1) > .form-block > .input-tourists > .input-tourists_head')
         .contains('1 взрослый, 0 детей')
   }

   /* Страница выдачи - Проверка отображения элементов*/ 



   //Проверка выдачи, фильтров и тд
   /** Отображение карты */
   searchHotelMapVisible() {
      cy.get('.vue2leaflet-map')
      .should('be.visible')
   }

   /** Отображение выдачи */
   searchHotelResultsVisible() {
      /** Отображение выдачи - сравнение кол-ва отелей на фронте и в массиве API */
      cy.get('#onex-list_result').should('be.visible')
      cy.get('.onex-list_item').should('be.visible')
      cy.get('.onex-list_aside-panel-items > :nth-child(1)').should('have.text', 'Отели:')
      cy.get('.onex-list_aside-panel-items > :nth-child(2)')
         .should('be.visible')
         .invoke('text')
         .then(text => {
            const length = text.length;
            cy.wrap(length).should('be.within', 1, 4);
       })

       cy.log('Пишу большую проверку Api и фактической выдачи' ) 
      //  cy.get('.onex-list_aside-panel-items > :nth-child(2)')
      //  .invoke('text') // получим текст элемента
      //  .then((text) => {
      //    const numberOfHotelsInUI = parseInt(text); // преобразуем текст в число
      //       cy.request('GET', '/search/hotels')
      //          .its('body')
      //          .then((response) => {
      //             console.log(response)
      //          const numberOfHotelsInAPI = response.length;
      //          expect(numberOfHotelsInUI).to.equal(numberOfHotelsInAPI); // сравниваем значения
      //    });
      // });

      // cy.get('.onex-list_aside-panel-items > :nth-child(2)').invoke('text').then((hotelsCount) => {
      //    // Отправляем запрос к API для получения количества отелей
      //    cy.request('GET', '/search/hotels').then((response) => {
      //      // Проверяем, что количество отелей на выдаче соответствует количеству отелей, полученных через API
      //      expect(hotelsCount).to.equal(response.body.length.toString());
      //    });
      //  });


   }
   /** Проверка гет параметров */
   searchHotelGetCheck(city) {
      cy.url().should('include', 'search/hotels/resultsAsync?')
      // cy.url().should('include', `place=${city}`) // В Url нет читаемого названия города
      cy.url().should('include', 'categories=1,2')
      cy.url().should('include', `checkInDate=${this.checkInDate}`)
      cy.url().should('include', `checkOutDate=${this.checkOutDate}`)
   }

   /** Проверка пагинации */
   searchHotelPaginationCheck() {
      cy.get("#onex-list_result > div:nth-child(1) > div.pagination > ul").then($ul => {
         if ($ul.children().length >= 6) { // если больше 6 элементов проводить проверку, 4 - управление, 2 страницы
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(1)').should('have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(2)').should('have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(3)').should('have.class', 'pagination_item--active')
            cy.get(':nth-child(1) > .pagination > ul > .pagination_arrow-next').should('not.have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:last-child()').should('not.have.class', 'pagination_item--disabled').click()
            cy.get(':nth-child(1) > .pagination > ul > .pagination_arrow-next').should('have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:last-child()').should('have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(2)').should('not.have.class', 'pagination_item--disabled')
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(3)').should('not.have.class', 'pagination_item--active')
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(1)').should('not.have.class', 'pagination_item--disabled').click()
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(3)').should('have.class', 'pagination_item--active')
            cy.get(':nth-child(1) > .pagination > ul > .pagination_arrow-next').click()
            cy.get(':nth-child(1) > .pagination').find('ul > li:nth-child(3)').should('not.have.class', 'pagination_item--active')
         }else {
            // Пропускаем тест, если в диве меньше или равно двух элементов
            cy.log('Пропуск теста, так как в диве нет более двух элементов');
            cy.wrap(null).should('be.null'); // пустая команда, чтобы тест был пропущен
          }
      }) 
   }

   /** Проверка отображения и работы фильтров */
   searchHotelFilterCheck(hotelInputName) {
      cy.get('.onex-list_aside-panel_filters').should('be.visible') // отображаются фильтры
      /** Проверка поиска по названию отеля */
      cy.get('.filter-input') 
         .should('be.visible')
         .click()
         .type(hotelInputName) // вписываем название отеля
         .wait(1000)   

      cy.get('.onex-list_item_description-name > a > span').should('contain', hotelInputName) // проверяем что в выдаче есть отель с таким названием
      cy.get('.onex-list_item_description-name > a > span').its('length').should('be.gt', 0) // кол-во отолей 1 или больше

      cy.get('.filter-input') // очищаем поле название отеля
         .click()
         .clear()

      cy.wait(1000)
   }

   /** Проверка звездности */
   searchHoteFilterStars() {
      cy.get('#filterTypeAll').should('not.be.checked');
      cy.get('#category5').should('not.be.checked');
      cy.get('#category4').should('not.be.checked');
      cy.get('#category3').should('not.be.checked');
      cy.get('#category2').should('be.checked');
      cy.get('#category1').should('be.checked');
      cy.get('#category0').should('not.be.checked');
   }

  /** Проверка типов питания */
   searchHoteFilterMeals() {
      cy.get('#meals').should('be.visible')  
      cy.get('#meals1').should('not.be.checked');
      cy.get('#meals2').should('not.be.checked');
      cy.get('#meals3').should('not.be.checked');
      cy.get('#meals4').should('not.be.checked');
   }

     /** Проверка названия фильтров обязательные */
   searchHotelFilterName() {
      cy.get('#onex-list_aside-panel').scrollIntoView({duration: 1000})
    
      cy.get("#onex-list_aside-panel")
        .find('.onex-list_aside-panel_filters > :nth-child(3) > .filter-tab_header > :nth-child(1)')
        .should('have.text', 'Расстояние до центра', { timeout: 2000, failOnTimeout: false  })
        .then(($elem) => {
          if ($elem.length === 0) {
            console.log('Элемент "Расстояние до центра" не найден')
          }
        })
    
      cy.get("#onex-list_aside-panel")
        .find(':nth-child(7) > .filter-tab_header > div > span')
        .should('have.text', 'Лучшие отели в городе',  { timeout: 2000, failOnTimeout: false  })
        .then(($elem) => {
          if ($elem.length === 0) {
            console.log('Элемент "Лучшие отели в городе" не найден')
          }
        })
    
      cy.get("#onex-list_aside-panel")
        .find('.onex-list_aside-panel_filters > :nth-child(4) > .filter-tab_header > :nth-child(1)')
        .should('have.text', 'Категория',  { timeout: 2000, failOnTimeout: false  })
        .then(($elem) => {
          if ($elem.length === 0) {
            console.log('Элемент "Категория" не найден')
          }
        })
    
      cy.get("#onex-list_aside-panel")
        .find('.onex-list_aside-panel_filters > :nth-child(5) > .filter-tab_header > :nth-child(1)')
        .should('have.text', 'Тип питания',  { timeout: 2000, failOnTimeout: false  })
        .then(($elem) => {
          if ($elem.length === 0) {
            console.log('Элемент "Тип питания" не найден')
          }
        })
    
      cy.get("#onex-list_aside-panel")
         .find(':nth-child(6) > .filter-tab_header > :nth-child(1) > :nth-child(1)')
         .then(($elem) => {
            if ($elem.text().trim() === 'Лучшие для ...') {
               cy.wrap($elem).as('filterBestFor');
               console.log('Элемент "Лучшие для..." Найден')
            } else {
               console.log('Элемент "Лучшие для..." не найден')
            }
         });
    
      cy.get("#onex-list_aside-panel")
        .find("div:nth-child(7) > div > div > span")
        .should('have.text', 'Лучшие отели в городе',  { timeout: 2000, failOnTimeout: false  })
        .then(($elem) => {
          if ($elem.length === 0) {
            console.log('Элемент "Лучшие отели в городе" не найден')
          }
        })
    }     

     /** Изменение города "Куда" */
   searchHotelChangeCity(changeCity) {
      cy.scrollTo('top', {duration: 1000})
      cy.get('#input-place')
         .should('have.value', this.cityLong) // Проверяем значение
         .scrollIntoView({ timeout: 2000 })
         .click()
         .clear(this.cityLong) // Очищаем старое значение
         .type(changeCity)  // Вписываем новое значение

      cy.get('#input-place')   
         .should('have.value', changeCity) // Проверяем новое значение
         .dblclick()
         .focus()
   }

     /** Выбор длинного названия */
   searchHotelAddCityLong() {
      cy.get("#hotels-search-form > div:nth-child(1) > div > div.input-place > div.autocomplete-suggestions > div:nth-child(2) > span:nth-child(1)")
         .should("be.visible")
         .invoke('text')
         .as('cityLong')
         .then((text) => {
            this.cityLong2 = text; // сохраняем название отеля в свойстве hotelName
            return text; // явно возвращаем название отеля из метода
         })

      cy.get('.input-place > .autocomplete-suggestions > div:nth-child(2) > span:nth-child(1)')
         .click(); // Выбор элемента из списка
      cy.log(this.cityLong2) 
   }

     /** Проверка корректного изменения поля "Куда"  и запуск поиска*/
   searchHotelChangeInputCheck() {
      cy.get('#input-place')
         .invoke('val')
         .then((val1) => {

            cy.get('#hotels-search-form > :nth-child(1) > .btn-search').click()
            cy.wait(3000)
    
      cy.get('#input-place')
          .invoke('val')
          .should((val2) => {
            expect(val1).to.eq(val2)
          })
      })
   }



   /** Ожидание загрузки API и сохранение кол-во предложений в переменную */
   


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
      cy.wait('@apiRequest', { timeout: 30000 }).then((interception) => {
        try {
          const allJson = interception.response.body;
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

     /** Проверка карточки отеля в списке */

     /** Карточки отеля отображается */
   searchHotelElement() {

      cy.get("#onex-list_result-list").find('.onex-list_item').first().as('firstHotel')
      .should('be.visible') // карточка отображается

      cy.get('@firstHotel')
         .find('.onex-list_item_image > img') // Картинка отображается
         .should('be.visible') 
         .should('have.attr', 'src') 

         /* Проверка отображения названия отеля и ссылки */
      cy.get('@firstHotel')
         .find(".onex-list_item_description > div.onex-list_item_description-name")
         .should('be.visible')
      cy.get('@firstHotel')
         .find(".onex-list_item_description > div.onex-list_item_description-name > a")
         .should('have.attr', 'href') 
         .and('include', '/search/hotels/hotel?placeType=Hotel')

      /* Проверка Адреса и дистанции  */
      cy.get("#onex-list_result-list > div:nth-child(1) > div.onex-list_item_description > div.onex-list_item_description-address > span:nth-child(1)")
         .should('be.visible')
         .invoke('text')
         .as('resultsCount')
         .then((address) => {
            this.hotelAdress = address; 
            console.log(`Адрес отеля: ${this.hotelAdress}`)
            return address; // явно возвращаем адрес
         });

      cy.get('.onex-list_item_description-address > .distance')
         .contains(/.+/) // ищем текст внутри дочернего элемента
         .should('be.visible'); // проверяем, что текст видим на странице
         
         /* Проверка кнопки "На карте" */
      cy.get('@firstHotel')
         .find(".onex-list_item_description > div.onex-list_item_description-links > ul > li:nth-child(1) > a > span")
         .contains('На карте') // ищем текст внутри дочернего элемента
         .should('be.visible'); // проверяем, что текст видим на странице

         /* Проверка кнопки "Описание" */
      cy.get('@firstHotel')
         .find(".onex-list_item_description > div.onex-list_item_description-links > ul > li:nth-child(2) > a")
         .should('be.visible')
         .should('have.attr', 'target', '_blank')
         .should('have.attr', 'href')
         .and('include', '/search/hotels/hotel?placeType=Hotel')

      /* Проверка кнопки "Выбрать" */         
      cy.get('@firstHotel')
         .find(".onex-list_item_price > div.onex-list_item_price-book-container > a")
         .should('be.visible')
         .should('have.attr', 'target', '_blank')
         .should('have.attr', 'href')
         .and('include', '/search/hotels/hotel?placeType=Hotel')        
   }

      /* Проверка звездности*/
   hotelElementStars(star1, star2) {
      cy.get('#onex-list_result-list > div:nth-child(1) > div.onex-list_item_description > div.onex-list_item_description-stars') // выбираем элемент с классом "onex-list_item_description-stars"
         .find('.i-star-rate-full') // находим все элементы с классом "i-star-rate-full" внутри выбранного элемента
         .should('be.visible')
         .should('have.length.within', star1, star2) // проверяем, что количество найденных элементов находится в диапазоне от 1 до 2
   }

   /* Сохраняем название отеля в переменную*/
   hotelElementName() {
      cy.get("#onex-list_result-list > div:nth-child(1) > div.onex-list_item_description > div.onex-list_item_description-name > a > span")
         .should('be.visible')
         .contains(/.+/) // ищем текст внутри дочернего элемента
         .invoke('text')
         .as('hotelName')
         .then((name) => {
            this.hotelName = name; // сохраняем название отеля в свойстве hotelName
            // return name; // явно возвращаем название отеля из метода
            console.log(`Название отеля: ${this.hotelName}`);
            return name; 
         });
   }

   /* Сохраняем цену отеля в переменную*/
   hotelElementPrice() {
      cy.get("#onex-list_result-list")
         .find('.onex-list_item')
         .first()
         .as('firstHotel')
      // cy.get('@firstHotel')
      //    .find('.onex-list_item_price > span > span > span.ex-price__value')
      cy.get("#onex-list_result-list > div:nth-child(1) > div.onex-list_item_price > span > span > span.ex-price__value")
         .should('be.visible')
         .invoke('text')
         .then((price) => {
            this.hotelPrice = price; // сохраняем цену отеля в свойстве hotelPrice
            console.log(`Цена отеля: ${this.hotelPrice}`);
            return price;
         });
   }

   

   /* Сохраняем валюту в переменную*/
   hotelElementCurrency() {
      cy.get("#onex-list_result-list")
         .find('.onex-list_item')
         .first()
         .as('firstHotel')
      cy.get('@firstHotel').find('.onex-list_item_price > span > span > span.ex-price__currency')
         .should('be.visible')
         .contains(/.+/) // ищем текст внутри дочернего элемента
         .invoke('text')
         .as('hotelCurrency')
         .then((Currency) => {
            this.hotelCurrency = Currency; // сохраняем название отеля в свойстве hotelName
            console.log(`Валюта отеля: ${this.hotelCurrency}`);
            return Currency; // явно возвращаем название отеля из метода
         });
   }

   /* Нажимаем на кнопку "На карте" и переходим к карте*/
   hotelElementScrollMap() {
      cy.get("#onex-list_result-list").find('.onex-list_item').first().as('firstHotel')
      cy.get('@firstHotel').find(".onex-list_item_description > div.onex-list_item_description-links > ul > li:nth-child(1) > a")
         .should('be.visible')
         .click() // Нажимаем на кнопку
      cy.get('#ex-map').scrollIntoView() // Прокручиваем к элементу
      cy.get('#ex-map').should('be.visible') // Проверяем, что элемент видим на странице
   }


   /* КАРТОЧКА ОТЕЛЯ НА КАРТЕ */


   /* Исследовать карточку отеля на карте */
   /* Карточка отеля и фото отображается */
   hotelElementsOnMap() {
      cy.get('.leaflet-popup')
         .find('.ex-map__infowindow')
         .first().as('elementMap')
         .should('be.visible')

      cy.get('@elementMap')
         .find('.ex-map__infowindow-image')
         .should('be.visible')
         .should('have.attr', 'style')
         .and('include', 'background-image')
      }

   hotelElementsOnMapStars(star1, star2,) {  

      cy.get('.ex-title > .ex-stars')
         .find('.icon-star-filled')
         .should('be.visible')
         .should('have.length.within', star1, star2) // проверяем, что количество найденных элементов находится в диапазоне от 1 до 2
     }

   hotelElementsOnMapName() {  
      cy.get('.ex-title__text > .ex-link > span')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelName.trim()); // проверяем, что текст соответствует значению hotelName
          });
      }

   hotelElementsOnMapPrice() {  
      cy.get('.ex-link > .ex-price > .ex-price__content > .ex-price__value') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelPrice.trim()); // проверяем, что текст соответствует значению hotelPrice
          }); 
      }

      hotelElementsOnMapCurrency() {  
      cy.get('.ex-link > .ex-price > .ex-price__content > .ex-price__currency')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelName
       }); 

      cy.get('.ex-map__infowindow-address')
         .should('be.visible')
         .contains(/.+/)
   }


   /* СТРАНИЦА ОТЕЛЯ */


   searchHotelOpenPage() {
      cy.get("#onex-list_result-list > div:nth-child(1) > div.onex-list_item_description > div.onex-list_item_description-links > ul > li:nth-child(2) > a")
         .invoke('removeAttr', 'target')
         .click({ timeout: 10000 });
   }

   /* Отображение всех элементов на странице */
   hotelPageElements() {
      cy.wait(10000)
      cy.get('.hotel-page__header').should('be.visible')
      cy.get('.hotel-page__gallery').should('be.visible')
      cy.get('.hotel-map__show-map').should('be.visible')
      cy.get('.hotel-map__button').should('be.visible')
      cy.wait(3000)
      cy.get('.accommodations__info').should('be.visible')
      cy.get('.accomodations__block').should('be.visible')
      cy.get('.table__body > :nth-child(1)').should('be.visible')
      cy.get('.hotel-page__text').should('be.visible')
      cy.get('.content__price').should('be.visible')
      cy.get('.table__body > :nth-child(1)') //.scrollIntoView()
   }

   /* Проверка звездности */
   hotelPageStars(star1, star2,) {  
      cy.get('.hotel-name__stars')
         .find('.hotel-name__stars__item')
         .should('be.visible')
         .should('have.length.within', star1, star2) // проверяем, что количество найденных элементов находится в диапазоне от 1 до 2
     }

     /* Проверка Названия отеля */
   hotelPageName() {  
      cy.get(".hotel-page__header > div > .hotel-page__name > .hotel-name.hotel-name--big > span")
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelName.trim()); // проверяем, что текст соответствует значению hotelName
          });
   }

   /* Проверка адреса и дистанции */
   hotelPagePlace() {
      // cy.get('.hotel-page__address > span')
      // cy.get(".hotel-page__header > div > .hotel-page__name > .hotel-page__address")
      //    .find('span')
      //    .invoke('text')
      //    .then((text) => {
      //       expect(text.trim()).to.include(this.hotelAddress.trim()); // проверяем, что текст содержит значение hotelAddress
      //       console.log(addr)
      //    });

      cy.get('.hotel-page__header > div > div.hotel-page__name > div.hotel-page__address > span')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.include(this.hotelAdress.trim()); 
         });
         
      cy.get('.hotel-page__address')
         .contains('км от центра')
   }

   /* Проверка кнопки на карте */
   hotelPageLinkMap() {
      cy.get(':nth-child(1) > .mapdesc__link')
         .should('be.visible')
         .should('have.attr', 'href', '#')
         .click({ timeout: 3000 })

      cy.get(".hotel-map > .hotel-map__map")
         .should('be.visible')   
      cy.wait(3000)
      cy.scrollTo('top', {duration: 1000})
   }

   /* Проверка кнопки описание */
   hotelPageLinkText() {
      cy.get(':nth-child(2) > .mapdesc__link')
         .should('be.visible')
         .click({ timeout: 3000 })
      cy.get('.hotel-page__text')
         .should('be.visible')    
      cy.wait(3000)
      cy.scrollTo('top', {duration: 1000})
   }

   /* Проверка корректности дат */
   hotelPageDates() {
      cy.get('.search-params__text > :nth-child(1)')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.checkInDate.trim()); // проверяем, что текст соответствует значению checkInDate
          });

      cy.get('.search-params__text > :nth-child(2)')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.checkOutDate.trim()); // проверяем, что текст соответствует значению checkOutDate
          }); 
   }

   /* Проверка туристов */
   hotelPageTourist() {
      cy.get('.search-params > .search-params__item')
         .find('.search-params__text')
         .should('be.visible')
         .contains('1 Взрослый', {matchCase: false})
   }

   /* Проверка номеров */
   hotelPageRooms() {
      cy.get(':nth-child(3) > .search-params__text')
         .should('be.visible')
         .contains('1 Номер', {matchCase: false})
   }

   /* Проверка рейтинга (Дописать логику, что если есть рейтинг у отеля то проверять и остальные страницы - или вывести в отдельный кейс, а лучше и то и то) */
   hotelPageRating() {
      cy.get('.hotel-page__rating > span')
         .should('be.visible')
         .should('have.text', 'Оценка туристов:')
      cy.get(".hotel-page__header > div > div.hotel-page__info > div.hotel-page__rating > div")
         .should('exist')
         .should('have.css', 'opacity')
         .then((opacity) => {
            if (opacity === '1') {
               cy.get('.hotel-page__header > div > div.hotel-page__info > div.hotel-page__rating > div > .trustyou-badge__value').should('be.visible');
            } else {
               cy.log('Рейтинг не отображается у данного отеля');
               console.log('Рейтинг не отображается у данного отеля');
            }
         });
   }

   /* Сравнение цены отеля */
   // hotelPagePrice() {
   //    cy.get(':nth-child(3) > span > .checkbox').click({ timeout: 2000 })
   //    cy.get(".hotel-page__header > div > div.hotel-page__price > div > div.hotel-price__price")
   //      .should('be.visible')
   //      .invoke('text')
   //      .then((text) => {
   //        const price = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
   //        const priceWithoutSpaces = price.replace(/\s/g, '');
   //        const hotelPriceTrimmed = this.hotelPrice.toString().trim();
   //        expect(priceWithoutSpaces).to.equal(hotelPriceTrimmed); // сравниваем цену с переменной this.hotelPrice, приводя ее к строковому типу
   //      })

/* Сравнение цены отеля с логикой, что если цены не равны, то создается новая переменная*/
   hotelPagePrice() {
      cy.get(".hotel-page__header > div > div.hotel-page__price > div > div.hotel-price__price")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const priceWithoutSpaces = price.replace(/\s/g, '');
            const hotelPriceTrimmed = this.hotelPrice.toString().trim();
            if (priceWithoutSpaces !== hotelPriceTrimmed) {
            this.newHotelPrice = priceWithoutSpaces;
            console.log(`Страница отеля (Шапка): Цена отеля ИЗМЕНИЛАСЬ = ${priceWithoutSpaces}`)
            } else {
               expect(priceWithoutSpaces).to.equal(hotelPriceTrimmed); // сравниваем цену с переменной
               console.log(`Страница отеля (Шапка): Цена отеля не изменилась = ${this.hotelPrice.trim()}`)
            }
            
         })
      }

    /* Сравнение валюты отеля */
   hotelPageCurrency() {
      cy.get(".hotel-page__header > div > div.hotel-page__price > div > div.hotel-price__price > span:nth-child(2) > span")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelName
         });
   }

   /* Отображение кнопки */
   hotelPageHeaderBtn() {
      cy.get('.center > .hotel-page__price > .btn')
         .should('be.visible')
         .should('have.attr', 'href', '#accomodations')
         .click({ timeout: 3000 })

      cy.get('#accomodations')  
         .should('be.visible') 
      cy.scrollTo('top', {duration: 1000})
   }

   /* Калерея с фото отеля */
   hotelPageGallery() {
      cy.get('.hotel-page__gallery')
         .should('be.visible')
      
      cy.get('[data-index="0"]')
         .should('have.attr', 'data-index', '0')
         .find('img')
         .click()

      cy.get('.hotel-page__images-modal')
         .should('be.visible')
         .should('have.class', 'ex-modal--active')

      cy.get('.ex-modal__content > .swiper-button-next')  
         .should('be.visible')
         .click()
      cy.get(".ex-modal.hotel-page__images-modal.ex-modal--active > div > .swiper-container.swiper-container-horizontal > div > .swiper-slide.swiper-slide-active")   
         .should('have.attr', 'data-index', '1') 
     
      cy.get('.ex-modal__close')   
         .should('be.visible')
         .click()
   }

   /* Фильтры у галереи с фото */
   hotelPageGalleryFilters() {
      cy.get('.hotel-gallery__filter')
         .should('be.visible')  

      cy.get('.hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > div > span')
         .should('have.text', 'Фотографии отеля')
         
      cy.get(".hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > ul > li:nth-child(1)")
         .should('be.visible')
         .should('have.class', 'active-filter')

      cy.get(".hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > ul > li:nth-child(2)")  
         .should('be.visible')
         .should('not.have.class', 'active-filter')
         .click()

      cy.get(".hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > ul > li:nth-child(1)")
         .should('be.visible')
         .should('not.have.class', 'active-filter') 
         
      cy.get(".hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > ul > li:nth-child(2)") 
         .should('be.visible')
         .should('have.class', 'active-filter')  
         
      cy.get(".hotel-page__gallery > div.hotel-gallery > div.hotel-gallery__filter > ul > li:nth-child(1)")
         .should('be.visible')
         .click({ timeout: 1000 })
         .should('have.class', 'active-filter')
   }

   /* Кнопки с картой */
   hotelPageButtons() {
      cy.get('.hotel-map__links')
         .should('be.visible')

      cy.get(".hotel-map > div.hotel-map__links > button") 
         .should('have.text', 'Загрузить карту')
         .click({ timeout: 1000 })
         .should('have.text', 'Скрыть карту')
      cy.get(".hotel-map > .hotel-map__map")
         .scrollIntoView()
         .should('have.attr', 'style')
         .should('have.css', 'position: relative')
      cy.get(".hotel-map > div.hotel-map__links > button") 
         .should('have.text', 'Скрыть карту')
         .click({ timeout: 1000 })
   }

   /* Кнопка с панорамой */
   hotelPageButtonsGoogle() {
      cy.get(".hotel-map > div.hotel-map__links > a")
         .should('contain', 'Открыть в панорамах')
         .should('have.attr', 'href')
         .and('include', 'maps.google.com');
    }
   
    /* Фильтры над предложениями (Обозначения) */
    hotelPageRoomFiltersInfo() {
      cy.get('.accommodations__info')
         .should('be.visible')

      cy.get('.accommodations__symbols > .text--bold')
         .should('be.visible')
         .should('have.text', 'Информирующие знаки:')

      cy.get('.accommodations__symbols > :nth-child(2) > :nth-child(2)')
         .should('be.visible')
         .should('have.text', 'Скорость подтверждения (мгновенно/под запрос)')

      cy.get('.accommodations__symbols > :nth-child(3) > :nth-child(2)')
         .should('be.visible')
         .should('have.text', 'Оформление визы через сайт (возможно/невозможно)')
    }

    /* Фильтры над предложениями */
   hotelPageRoomFilters() {
      cy.get("#accomodations > .accomodations__list > .accommodations__info > .accomodations__filters > :nth-child(1)")
         .contains('Визовая поддержка')
         .should('be.visible')
      // cy.get('.accomodations__filters > :nth-child(1) > :nth-child(1) > span > .checkbox')
      //    .should('be.visible')

      cy.get("#accomodations > .accomodations__list > .accommodations__info > .accomodations__filters > :nth-child(1)")
         .contains('Возвратные')
         .should('be.visible')

      // cy.get("#accomodations > div.accomodations__list > div.accomodations__block > div.accomodations__info")
      //    .should('be.visible')

      cy.get("#accomodations > .accomodations__list > .accommodations__info > .accomodations__filters > :nth-child(1)")
         .contains('Группировать предложения')
         .should('be.visible')
         .click({ timeout: 3000 })

      cy.get("#accomodations > div.accomodations__list > div.accomodations__block > div.accomodations__info")
         .should('not.exist')

      cy.get("#accomodations > .accomodations__list > .accommodations__info > .accomodations__filters > :nth-child(1)")
         .contains('Группировать предложения')
         .should('be.visible')
         .click({ timeout: 3000 })
      // cy.get('.accomodations__filters > :nth-child(1) > :nth-child(1) > span > .checkbox')
      //    .click({ timeout: 3000 })   

      cy.get("#accomodations > div.accomodations__list > div.accomodations__block > div.accomodations__info")
         .should('be.visible')

      cy.get("#accomodations > div.accomodations__list > div.accommodations__info > div.accomodations__filters > div:nth-child(2)")
         .contains('Фильтр по питанию')
         .should('be.visible')

      cy.get("#accomodations > div.accomodations__list > div.accommodations__info > div.accomodations__filters > div:nth-child(2)")
         .contains('Валюта: RUB')
         .should('be.visible')
   }

   /* Главный блок предложений */
   hotelPageRoomMain() {

      cy.get('.accomodations__image > img')
         .should('be.visible')
         .should('have.attr', 'src')

      cy.get("#accomodations > div.accomodations__list > div.accomodations__block > div.accomodations__info > div.accomodations__about > div > ul > li > div > span")
         .should('be.visible')

      cy.get(':nth-child(2) > .accomodations__info > .accomodations__about > .accomodations__about-item > .list > .list__item > [style="cursor: pointer;"] > :nth-child(1)')
         .contains('Подробная информация о номере')
         .should('be.visible')
         .trigger('mouseover', { timeout: 3000 })
         .click({ timeout: 3000 })

      cy.get(".accomodations__info > div.accomodations__about > div > ul > li > div > div")
         .should('exist')
         .should('be.visible')

      cy.get(':nth-child(2) > .accomodations__info > .accomodations__image > img')
         .click({ timeout: 1000 })

      cy.get(':nth-child(2) > .accomodations__info > .accomodations__about > .accomodations__about-item > .list > .list__item > .list__item-icon > .icon-terms')
         .should('be.visible')
   }

   /* Названия колонок */
   hotelPageRoomColumns() {
      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--name > span')
         .should('be.visible')
         .should('have.text', 'Размещение')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--name > .icon-bed')
         .should('be.visible')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--meal > span')
         .should('be.visible')
         .should('have.text', 'Питание')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--meal > .icon-meal')
         .should('be.visible')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--supplier > span')
         .should('be.visible')
         .should('have.text', 'Отмена')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--supplier > .icon-close-circled')
         .should('be.visible')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--confirmation > span')
         .should('be.visible')
         .should('have.text', 'Подтверждение')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--confirmation > .icon-ok-circled-inversed')
         .should('be.visible')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--price > span')
         .should('be.visible')
         .should('have.text', 'Цена')

      cy.get(':nth-child(2) > .table > .table__head > .table__row > .accomodations__cell--price > .icon')
         .should('be.visible')
   }

   /* Список предложений */
   hotelPageRoomsList() {

     if (cy.get('.table__body > :nth-child(1)').should('be.visible')) {
         cy.get('.table__body > :nth-child(1) > .accomodations__cell--name > span')
            .contains(/.+/) // ищем текст внутри дочернего элемента
            .should('be.visible'); // проверяем, что текст видим на странице

         cy.get('.table__body > :nth-child(1) > .accomodations__cell--meal > span')
            .contains(/.+/) // ищем текст внутри дочернего элемента
            .should('be.visible'); // проверяем, что текст видим на странице

         cy.get('.table__body > :nth-child(1) > .accomodations__cell--supplier > span')
            .should('be.visible')
            .contains('Бесплатная отмена до');

         cy.get(':nth-child(1) > .accomodations__cell--confirmation > :nth-child(1)')
            .should('exist')
            .should('be.visible')
          cy.get(':nth-child(1) > .accomodations__cell--confirmation > :nth-child(2)', { timeout: 1000 })
            .should('exist');

         cy.get(':nth-child(1) > .accomodations__cell--confirmation > :nth-child(3)')
            .should('exist')
            .should('be.visible')

            /* Проверка что цена равна цене на странице отеля*/
            cy.get(':nth-child(2) > .table > .table__body > :nth-child(1) > .accomodations__cell--price > .accomodation__price > .accomodation__main-price > :nth-child(1)')
            .first()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
              if (text.trim() === this.hotelPrice.trim()) {
                expect(text.trim()).to.eq(this.hotelPrice.trim());
                console.log(`Страница отеля (Предложение): Цена отеля не изменилась и составляет = ${this.hotelPrice.trim()}`)
              } else {
                expect(text.trim()).to.eq(this.newHotelPrice.trim());
                console.log(`Страница отеля (Предложение): Цена отеля ИЗМЕНИЛАСЬ = ${this.newHotelPrice.trim()}`) 
              }
            });
         cy.get(':nth-child(2) > .table > .table__body > :nth-child(1) > .accomodations__cell--price > .accomodation__price > .accomodation__main-price > .accomodation__currency')
            .scrollIntoView()
            .should('be.visible') 
            .invoke('text')
            .then((text) => {
               expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
             });

         cy.get('.accomodations__row')
            .its('length')
            .should('be.gt', 3)
            .then(() => {
               cy.get('.accomodations__show-more').should('be.visible');
            });

     } else {

      cy.get("#accomodations > div.accomodations__list > div.accomodation__noresults > span")
         .should('be.visible')
         .should('have.text', 'По данным фильтрам нет подходящих результатов.')
     }
   }

   /* Описание отеля */
   hotelPageAboutText() {
      cy.get('#hotel-about')
         .scrollIntoView()
         .should('be.visible')

      cy.get("#hotel-about > p")
         .contains(/.+/) // ищем текст внутри дочернего элемента
         .should('be.visible'); // проверяем, что текст видим на странице

      cy.get('.factGroupContainer')
         .should('be.visible')

   }

   /* Цена в подвале */
   hotelPageAboutFooterPrice() {
      cy.get('.content__price > .hotel-page__price > .hotel-price > .hotel-price__price > :nth-child(2)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const priceWithoutSpaces = price.replace(/\s/g, '');
            const hotelPriceTrimmed = this.hotelPrice.toString().trim();
            if(priceWithoutSpaces === hotelPriceTrimmed) {
               expect(priceWithoutSpaces).to.equal(hotelPriceTrimmed); // сравниваем цену с переменной this.hotelPrice, приводя ее к строковому типу
               console.log(`Страница отеля (Подвал): Цена отеля не изменилась и составляет = ${this.hotelPrice.trim()}`)
            } else {
               expect(priceWithoutSpaces).to.equal(this.newHotelPrice.toString().trim()); // сравниваем цену с переменной this.newHotelPrice, приводя ее к строковому типу
               console.log(`Страница отеля (Подвал): Цена отеля ИЗМЕНИЛАСЬ = ${this.newHotelPrice.trim()}`)
            }
         }); 
   }
   
   /* Валюта в подвале */
   hotelPageAboutFooterCurrency() {
      cy.get('.content__price > .hotel-page__price > .hotel-price > .hotel-price__price > :nth-child(2) > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelName
         });
   }

   /* Кнопка в подвале */
   hotelPageAboutFooterBtn() {
      cy.get("#hotel-about > div.content__price > div > a")
         .should('be.visible')
         .should('have.attr', 'href', '#accomodations')
         .click({ timeout: 3000 })
   }

   /* Переход к бронированию первого предложения */
   hotelPageGetRoom() {
      cy.get("#accomodations > div.accomodations__list > div:nth-child(2) > div.table.accomodations__table > div.table__body.accomodations__table-body > div:nth-child(1) > a.table__cell.accomodations__cell--price")
         .scrollIntoView()
         .invoke('removeAttr', 'target')
         .click({ timeout: 5000 })
   }


   /* СТРАНИЦА БРОНИРОВАНИЯ */

   /* Отображение элементов на странице */
   reservePageElements() {
      cy.get('.ex-hotel-booking__head')
         .should('be.visible')

      cy.get('#hotel-booking')
         .should('be.visible')

      cy.get('.ex-hotel-booking__tourists')
         .should('be.visible')

      cy.get('.ex-hotel-booking__tourists')
         .should('be.visible')

      cy.get('.ex-hotel-booking__accept > .ex-checkbox > label')
         .should('be.visible')

      cy.get('.ex-hotel-booking__booking-buttons > .ex-btn')
         .should('be.visible')
   }

   /* Отображение заголовка на странице */
   reservePageH1() {
      cy.get('.ex-title')
         .contains('Бронирование отеля')
         .should('be.visible')
   }
      
   /* Проверка звездности */
   reservePageStars(star1, star2) {
      cy.get(".ex-hotel-booking__head > .ex-center.ex-center--justify > div:nth-child(1) > div > div.ex-stars.text--gold")
         .find('.icon-star-filled')
         .should('be.visible')
         .should('have.length.within', star1, star2) // проверяем, что количество найденных элементов находится в диапазоне от 1 до 2
  }
   
  /* Проверка Названия отеля */
  reservePageName() {  
      cy.get(".ex-hotel-booking__head > .ex-center.ex-center--justify > :nth-child(1) > div > .ex-title__text > span")
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelName.trim()); // проверяем, что текст соответствует значению hotelName
         });
}

/* Проверка Адреса отеля */
   reservePagePlace() {
      cy.get(".ex-hotel-booking__head > .ex-center.ex-center--justify > :nth-child(1) > p > :nth-child(1)")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelAdress.trim()); // проверяем, что текст соответствует значению hotelName
         });

      cy.get(':nth-child(1) > p > :nth-child(3)')
         .contains('км от центра')
   }

   /* Проверка карты */
   reservePageLinkMap() {
      cy.get('#toMap')
         .should('be.visible')
         .should('have.attr', 'href')
         .and('include', 'https://alpha.online-express.ru/search/hotels/hotel?place')
   }

   /* Проверка дат */
   reservePageLinkAbout() {
      cy.get('#dateArrival')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.checkInDate.trim()); // проверяем, что текст соответствует значению hotelName
          });

      cy.get('.ex-line > :nth-child(2) > :nth-child(2)')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.checkOutDate.trim()); // проверяем, что текст соответствует значению hotelName
          }); 
   }

   /* Проверка кол-во туристов */
   reservePageTourist() {
      cy.get('.text--nowrap')
         .contains('1 Взрослый', {matchCase: false})
         .should('be.visible')
   }

   /* Проверка кол-во номеров */
   reservePageMoreRoom() {
      cy.get('.ex-hotel-booking__head-room-name')
         .contains(/.+/)
         .should('be.visible')
   }

   /* Проверка типа питания */
   reservePageMeals() {
      cy.get(':nth-child(4) > .ex-line > :nth-child(2) > span')
         .contains(/.+/)
         .should('be.visible')
   }

   /* Проверка цены */
   reservePagePrice() {
      cy.get('.price-block > .ex-price > .ex-price__content > .ex-price__value')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            if (text.trim() === this.hotelPrice.trim()) {
               expect(text.trim()).to.eq(this.hotelPrice.trim());
               console.log(`Бронирование (Шапка): Цена отеля не изменилась и составляет = ${this.hotelPrice.trim()}`)
             } else {
               expect(text.trim()).to.eq(this.newHotelPrice.trim());
               console.log(`Бронирование (Шапка): Цена отеля ИЗМЕНИЛАСЬ = ${this.newHotelPrice.trim()}`) 
             }
         }); 
   }

   /* Проверка валюты */
   reservePageCurency() {
      cy.get('.price-block > .ex-price > .ex-price__content > .ex-price__currency')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelName
         }); 
   }

/* Информация о туристах */
   reservePageInfoH1() {
      cy.get("#hotel-booking > .ex-form__block.ex-hotel-booking__tourists > .ex-form__block-header > span:nth-child(1)")
         .should('be.visible')
         .should('have.text', 'Информация о туристах') 

      cy.get("#hotel-booking > .ex-form__block.ex-hotel-booking__tourists > .ex-form__block-header > span:nth-child(2)")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Заполняется только латиницей'.trim()); // проверяем, что текст соответствует значению hotelName
         });    
   }

   /* Информация Турист 1 */
   reservePageTouristsInfo() {
      cy.get('.ex-tourist__head > :nth-child(1)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Турист 1');
         });

      cy.get('.ex-tourist__head-room-name') 
         .contains(/.+/)
         .should('be.visible')

         /* Имя */
      cy.get(':nth-child(2) > :nth-child(3) > .ex-input')
         .find('#HotelBookingTouristForm_0_name')
         .should('be.visible')
         .focus()
         .type('Aleksandr')

         /* Фамилия */
      cy.get(':nth-child(2) > :nth-child(4) > .ex-input')
         .find('#HotelBookingTouristForm_0_surname')
         .should('be.visible')
         .focus()
         .type('Zimin')

         /* Пол */
      cy.get('.input-sex')
         .should('be.visible')

      cy.get(':nth-child(5) > label')
         .should('be.visible')

      cy.get(':nth-child(2) > .ex-form__date-picker > .ex-date')
         .should('be.visible')

      cy.get('#ex-form-group__passportNumber--0 > .ex-input')
         .should('be.visible')
   }

   /* Отмена страховки */
   reservePageInsurance() {
      cy.get(':nth-child(5) > label')
         .should('be.visible')
         
      cy.get(".ex-form__row > .js-birthday-form-group")
         .should('be.visible')

      cy.get(".ex-form__row > .js-birthday-form-group")
         .should('be.visible')

      cy.get('#ex-form-group__passportNumber--0')
         .should('be.visible')

      cy.get(".ex-form__row.ex-tourist__head > div:nth-child(5) > label > span")
         .click()

      cy.get(".ex-form__row > .js-birthday-form-group")
         .should('have.css', 'display', 'none')

      cy.get('#ex-form-group__passportNumber--0')
         .should('have.css', 'display', 'none')

      cy.get('span > .tooltipped')
         .trigger('mouseover', { timeout: 5000, force: true })
         .should('have.attr', 'data-tooltip', 'Обращаем Ваше внимание на важность введения корректных всех данных туристов (фамилии, имени, дат рождения туристов и номера паспорта) при выборе данной опции. После бронирования данные туристов в страховом полисе изменить будет невозможно.');
         // Проверка видимости ::before псевдоэлемента не поддерживается в Cypress, поскольку это не реальный элемент DOM.
   }

   /* Условия */
   reservePageСonditionsH1() {
      cy.get('.ex-hotel-booking__penalties > :nth-child(1) > :nth-child(1)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Условия аннуляции и модификации');
         });

      cy.get(".ex-hotel-booking__penalties > .ex-form__block-header > .tooltipped") 
         .trigger('mouseover', { timeout: 5000, force: true })
         .should('have.attr', 'data-tooltip', 'Перед бронированием вам необходимо дождаться загрузки условий изменения и аннулирования заявок, а затем согласиться с ними.');
         // Проверка видимости ::before псевдоэлемента не поддерживается в Cypress, поскольку это не реальный элемент DOM. 
   }
   /* Информация */
   reservePageСonditionsMainInfo() {
      cy.get('li > .text--bold')
         .should('be.visible')

      cy.get('.ex-hotel-booking__info')
         .should('be.visible')
      
      cy.get('.ex-hotel-booking__info > .ex-form__block-header > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Важная информация от поставщика');
         });

      cy.get('.ex-hotel-booking__remarks > .ex-form__block-header > :nth-child(1)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Пожелания');
         })

      cy.get('.ex-hotel-booking__remarks > .ex-form__block-header > .ex-help-info')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('заполняется на английском языке');
         })

      cy.get('.ex-hotel-booking__remarks > .ex-form__block-header > .tooltipped')
         .trigger('mouseover', { timeout: 5000, force: true })
         .should('have.attr', 'data-tooltip', 'Обращаем Ваше внимание, что удовлетворение запросов не гарантируется и всегда остается на усмотрение отеля.');
         // Проверка видимости ::before псевдоэлемента не поддерживается в Cypress, поскольку это не реальный элемент DOM. 

      cy.get('#HotelBookingForm_remark')
         .should('be.visible')
   }

   /* Подвал бронирования */
   reservePageFooter() {
      cy.get('.ex-hotel-booking__booking-buttons > .ex-btn')
      .should('be.visible')
      .should('have.class', 'btn-disabled');

      cy.get('.ex-hotel-booking__accept > .ex-checkbox > label > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('С условиями аннуляции бронирования ознакомлен и согласен');
         })
      
         cy.get('.ex-hotel-booking__accept > .ex-checkbox > label > span')
         .contains('С условиями аннуляции бронирования ознакомлен и согласен')
         .click({ timeout: 5000 })

      cy.get('.ex-hotel-booking__booking-buttons > .ex-btn')
         .should('be.visible')
         .should('not.have.class', 'btn-disabled', { timeout: 5000 });

         /* Цена */
      cy.get('.price-block__no-insurance > .ex-price > .ex-price__content > .ex-price__value')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            if (text.trim() === this.hotelPrice.trim()) {
               expect(text.trim()).to.eq(this.hotelPrice.trim());
               console.log(`Бронирование (Подвал): Цена отеля не изменилась и составляет = ${this.hotelPrice.trim()}`)
             } else {
               expect(text.trim()).to.eq(this.newHotelPrice.trim());
               console.log(`Бронирование (Подвал): Цена отеля ИЗМЕНИЛАСЬ = ${this.newHotelPrice.trim()}`) 
             }
         }); 

         /* Валюта */
      cy.get('.price-block__no-insurance > .ex-price > .ex-price__content > .ex-price__currency')
         .should('be.visible') 
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });   
   }

   /* ОПЛАТА */

   reservePageOnPay() {
      cy.get('.ex-hotel-booking__booking-buttons > .ex-btn')
         .scrollIntoView()
         .invoke('removeAttr', 'target')
         .click({ timeout: 5000 })
   }

     /* Авторизация */
     authModal() {
      cy.get('.auth-modal__window')
         .should('be.visible') 

      // cy.get(':nth-child(1) > .auth-form__group')
      //    .should('be.visible')
      //    .invoke('text')
      //    .then((text) => {
      //       expect(text.trim()).to.eq('Для продолжения вам необходимо войти или зарегистироваться.');
      //    })

      cy.get(':nth-child(1) > .auth-form__group')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.replace(/\s/g,'')).to.eq('Дляпродолжениявамнеобходимовойтиилизарегистрироваться.');
         });

      cy.get(':nth-child(3) > .auth-button')
         .should('be.visible') 

      cy.get(':nth-child(2) > .auth-button')
         .should('be.visible') 

      cy.get(':nth-child(1) > .auth-button')
         .should('be.visible')
         .click({ timeout: 3000 })
     }

     authSignIn(email, password) {
      cy.get('.auth-modal__window')
         .should('be.visible')
         
      cy.get('.auth-modal__header')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Вход в личный кабинет');
         })

      cy.get('#auth-sign-in-email')
         .should('be.visible')
         .click()
         .type(email)

      cy.get('#auth-sign-in-password')
         .should('be.visible')
         .click()
         .type(password)

      cy.get(':nth-child(3) > .auth-link')
         .should('be.visible')
      cy.get(':nth-child(2) > .auth-link')
         .should('be.visible')
      cy.get('.auth-button')
         .should('be.visible')


     }
     

   /* Страница оплаты */
   

   /********************Удалить*********************/
   
   visitUrlSaveCookies(URL) {
      // cy.getCookies().then((cookies) => {
         // переходим на новую страницу
         cy.visit(URL);
       
         // устанавливаем все куки на новой странице
         // cookies.forEach((cookie) => {
         //   cy.setCookie(cookie.name, cookie.value, {
         //     domain: cookie.domain,
         //     path: cookie.path,
         //     secure: cookie.secure,
         //     httpOnly: cookie.httpOnly,
         //     expiry: cookie.expiry,
         //   });
         // });
       
         // выполняем проверки на новой странице
         // ...
      //  });
   }
   
   saveCookies() {
      cy.setCookie('myCookie', 'value', { domain: 'https://alpha.online-express.ru'});
   }

   paymentPageAuth(email, password) {
      cy.get('#auth-sign-in-email')
         .should('be.visible')
         .click()
         .type(email)

      cy.get('#auth-sign-in-password')
         .should('be.visible')
         .click()
         .type(password)

      cy.get('.auth-button')
         .should('be.visible')
         .click({ timeout: 10000 })
      }

      
         
/***************************************************/
   
/* Отображаемые элементы */
paymentPageElements() {

      cy.get('.content__result') // весь контент
         .should('be.visible')

      cy.get('.order_title')  // Первый блок
         .should('be.visible')

      cy.get('.order_number') // Номер заказа блок
         .should('be.visible')

      cy.get('.order_number__number > span') // Номер заказа текст
         .should('be.visible')

      cy.get('.order_arrow-add') // Добавить услуги
         .should('be.visible')

      cy.get('.order_add') // Услуги которые можно добавить
         .should('be.visible')

      cy.get('.order-info_row')  // Блок с ценой и контактами
         .should('be.visible')

      cy.get('.order-payment-status__status--status--default') // Ожидание оплаты
         .should('be.visible')

      cy.get('.order-info_summary > .has-popover') // Цена
         .should('be.visible')
      
      cy.get('.order-info_service') // Блок с отелем и туристами
         .should('be.visible')

      cy.get('.order-info_service > :nth-child(1)') // Информация об отеле с аннулированием
         .should('be.visible')

      cy.get(':nth-child(2) > .has-popover > span') // Штрафы
         .should('be.visible')

      cy.get('.order-info_service > :nth-child(3)') // Информация об отеле с ценой
         .should('be.visible')

      cy.get('.order-info_service-price') // Цена
         .should('be.visible')

         cy.get('.order-info_tourists') // Туристы
         .should('be.visible')

      cy.get('.ooc-chat') // Чат
         .should('be.visible')
   }

   /* Сохранение номера заказа */
   paymentOrderNumber() {
      cy.get('.order_number')
         .should('be.visible')
         .as('order')

      cy.get("#content > div > div > div.order.ex-order > div.order_title > div.order_number.order_number--wide > p")
         .should('have.text', 'Заказ №:')   

      cy.get('@order')
         .find('.order_number__number > span')
         .invoke('text')
         .as('orderNumber')
         .then((text) => {
            this.orderNumber = text; // сохраняем название отеля в свойстве orderNumber
            return text; // явно возвращаем название отеля из метода
         })
      }

      /* Проверка способов оплаты */
      paymentOrderPay() {
      // cy.wait(50000)
      cy.get(".order_title > div.order_number.order_number--wide > .payment-links")
         .should('be.visible')

      cy.get(".order_title > div.order_number.order_number--wide > .payment-links > .payment-links__header > span")
         .should('have.text', 'Способы оплаты:')

      cy.get('.order-pay-qr-code__link')  
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Оплата по QR-коду');
         }) 

      cy.get('.order-pay > .order-pay__link')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Банковская карта');
         })

      cy.get('.order-invoice > .order-invoice__link')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Платежные системы');
         })
      cy.get('.payment-links__invoice-link')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Безналичная оплата');
         })
   }

   /* Оплата QR кодом */
   paymentOrderPayQr() {
      cy.get('.order-pay-qr-code')
         .should('be.visible')
         .trigger('mouseover')
         .wait(1000) // ожидаем 1 секунду, чтобы попап успел загрузиться
         .click()
         .wait(3000) // ожидаем 3 секунды, чтобы попап успел загрузиться

      // cy.get(".order.ex-order > .order_title > div.order_number.order_number--wide > .order-pay-email > div > .ex-popover__wrap")
      //    .should('have.text', 'Введите ваш E-mail для получения чека об оплате')

      // cy.get(".order.ex-order > .order_title > div.order_number.order_number--wide > .order-pay-email > div > .ex-popover__wrap > .ex-popover__head > span")
      //    .should('be.visible') 
      //    .invoke('val')
      //    .then((text) => {
      //       const orderNumber = parseFloat(this.orderNumber.trim());
      //       const currentPrice = parseFloat(text.trim());
      //       if (currentPrice === orderNumber) {
      //          expect(currentPrice).to.eq(orderNumber);
      //          console.log(`Цена совпадает = ${orderNumber}`);
      //       } 
      //       else if (currentPrice > orderNumber - 1) {
      //          expect(currentPrice).to.be.closeTo(orderNumber - 1, 0.01);
      //          console.log(`Цена округлена на ${orderNumber} - ${currentPrice}`);
      //       } 
      //       else {
      //          console.log(`Цена не совпадает`);
      //       }
      //    });

   }

   /* Проверка доп услуг */
   paymentOrderAddMore() {

      cy.get('[data-service="hotel"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/?order=${this.orderNumber.trim()}#hotel`)

      cy.get('[data-service="avia"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/?order=${this.orderNumber.trim()}#avia`)

      cy.get('[data-service="insurance"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/?order=${this.orderNumber.trim()}#insurance`)

      cy.get('[data-service="transfer"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/?order=${this.orderNumber.trim()}#transfer`)

      cy.get('[data-service="visa"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/search/visas/add?order=${this.orderNumber.trim()}`)

      cy.get('[data-service="excursion"] > a')
         .should('be.visible')
         .should('have.attr', 'href', `/?order=${this.orderNumber.trim()}#excursion`)
   }
   
   paymentPriceInfo() {

      let date = new Date();
      let month = date.getMonth(); 
      let dayOfMonth = date.getDate();
      let year = date.getFullYear()

      cy.get(".order.ex-order > .order-info > .order-info_row > .order-info_agency > :nth-child(1)")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.include(`${dayOfMonth}`+'.0'+`${month+1}`+'.'+`${year}`);
         })

      cy.get('.popover-container-js > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Частное лицо');
         })

      cy.get('.order-info_agency > :nth-child(3)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('+7 (495) 662-99-40');
         })

      cy.get(".order.ex-order > div.order-info > div.order-info_row > div.order-info_manager > p:nth-child(1)")
         .should('have.text', 'Менеджер:')
         
      cy.get(".order.ex-order > div.order-info > div.order-info_row > div.order-info_manager > p:nth-child(2)")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Зимин Александр Владимирович');
         })

      cy.get(".order.ex-order > div.order-info > div.order-info_row > div.order-info_manager > p:nth-child(3) > span") 
         .should('have.text', '89858098957') 
   }

   paymentRateUs() {
      cy.get(".order.ex-order > div.order-info > div.order-info_row > div.order-info_rate-us > div").as('rating')
      cy.get('@rating')
         .find('.order-rate-us__title')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Оцените наш сервис:');
         })

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_rate-us > div > .order-rate-us__thumbs > div.order-rate-us__thumb.order-rate-us__thumbs-up")
         .should('be.visible')
         .click({ timeout: 3000, force: true })

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_rate-us > div > .order-rate-us__thumbs > div.order-rate-us__thumb.order-rate-us__thumbs-up")
         .should('have.class', 'order-rate-us__thumb--is-selected')

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_rate-us > div > .order-rate-us__thumbs > .order-rate-us__thumbs-down")
         .should('not.have.class', 'order-rate-us__thumb--is-selected')
   }

   paymentPayStatus() {
      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-payment-status > div > .order-payment-status__status.order-payment-status__status--status--default")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq('Ожидание оплаты');
         })

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-payment-status > div")
         // .trigger('mouseover', { timeout: 5000, force: true })

         .then($el => {
            const pseudoEl = Cypress.$($el.get(0), ':before')[0];
            const content = window.getComputedStyle(pseudoEl, ':before').getPropertyValue('content');
            expect(content.trim()).to.exist;
          })
   }

   paymentUrlOrder() {
      cy.url().then(url => {
         cy.wrap(url).should('contain',`/office/orders/${this.orderNumber.trim()}`);
       });
   }

   paymentTotalPrice() {
      /* Проверка цены */
      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_summary.popover-container-js > p.has-popover.has-summary-popover")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price2 = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const totalPrice = price2.replace(/\s/g, '');
            const savePrice = this.hotelPrice.trim();
            const savePriceNew = this.newHotelPrice.trim();
            if (totalPrice === savePrice) {
            expect(totalPrice).to.equal(savePrice); // сравниваем цену с переменной
            console.log(`Страница оплаты: Цена отеля не изменилась = ${savePrice}`)
            return savePrice
            } 
            else if(totalPrice === savePriceNew) {
               expect(totalPrice).to.equal(savePriceNew); // сравниваем цену с переменной
               console.log(`Страница оплаты: Цена отеля не изменилась = ${savePriceNew}`)
               return savePriceNew
            }
            console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice}`)
            console.log(`Цена отеля первая = ${savePrice}`)
            console.log(`Цена отеля новая = ${savePriceNew}`)  
         })
   }

   paymentTotalPriceCurrency() {
      /* Проверка валюты */
      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_summary.popover-container-js > p.has-popover > :nth-child(1)")
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });
   }

   paymentPriceTooltip() {
      /* Открытие тултипа */
      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_summary > .has-popover > .icon-question")
         .should('be.visible')
         .click()

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_summary > div")
         .as('pricePopup')
         .should('have.css', 'display', 'flex')
      
         /* Заголовок тултипа */
      cy.get("@pricePopup")
         .find('div > .pen-top > label')
         .should('have.text', 'Состав стоимости')

         /* Колонки тултипа */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(1) > div:nth-child(1)')
         .should('have.text', 'Услуга')
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(1) > div:nth-child(2)')
         .should('have.text', 'Оплатить')
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(1) > div:nth-child(3)')
         .should('have.text', 'К получению')

         /* Информация о услуге тултипа */
         /* Название отеля и адрес */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(2) > div:nth-child(1)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.include(`${this.hotelName.trim()}, ${this.hotelAdress.trim()}`); 
         });

         /* Стоимость */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(2) > div:nth-child(2)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const totalPrice = price.replace(/\s/g, '');
            const savePrice = this.hotelPrice.trim();
            const savePriceNew = this.newHotelPrice.trim();
            if (totalPrice === savePrice) {
            expect(totalPrice).to.equal(savePrice); // сравниваем цену с переменной
            console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePrice}`)
            return savePrice
            } 
            else if(totalPrice === savePriceNew) {
               expect(totalPrice).to.equal(savePriceNew); // сравниваем цену с переменной
               console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePriceNew}`)
               return savePriceNew
            }
            console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice}`)
         })

         /* Валюта */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(2) > div:nth-child(2) > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });

         /* Стоимость */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(2) > div:nth-child(3)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price2 = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const totalPrice2 = price2.replace(/\s/g, '');
            const savePrice2 = this.hotelPrice.trim();
            const savePriceNew2 = this.newHotelPrice.trim();
            if (totalPrice2 === savePrice2) {
            expect(totalPrice2).to.equal(savePrice2); // сравниваем цену с переменной
            console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePrice2}`)
            return savePrice2
            } 
            else if(totalPrice2 === savePriceNew2) {
               expect(totalPrice2).to.equal(savePriceNew2); // сравниваем цену с переменной
               console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePriceNew2}`)
               return savePriceNew2
            }
            console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice2}`)
         })

         /* Валюта */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(2) > div:nth-child(3) > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });

         /* Итого */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(3) > div:nth-child(1)')
         .should('have.text', 'Итого:')

         /* Стоимость */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(3) > div:nth-child(2)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price2 = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const totalPrice2 = price2.replace(/\s/g, '');
            const savePrice2 = this.hotelPrice.trim();
            const savePriceNew2 = this.newHotelPrice.trim();
            if (totalPrice2 === savePrice2) {
            expect(totalPrice2).to.equal(savePrice2); // сравниваем цену с переменной
            console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePrice2}`)
            return savePrice2
            } 
            else if(totalPrice2 === savePriceNew2) {
               expect(totalPrice2).to.equal(savePriceNew2); // сравниваем цену с переменной
               console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePriceNew2}`)
               return savePriceNew2
            }
            console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice2}`)  
         })
         
         /* Валюта */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(3) > div:nth-child(2) > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });

         /* Стоимость */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(3) > div:nth-child(3)')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            const price2 = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
            const totalPrice2 = price2.replace(/\s/g, '');
            const savePrice2 = this.hotelPrice.trim();
            const savePriceNew2 = this.newHotelPrice.trim();
            if (totalPrice2 === savePrice2) {
            expect(totalPrice2).to.equal(savePrice2); // сравниваем цену с переменной
            console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePrice2}`)
            return savePrice2
            } 
            else if(totalPrice2 === savePriceNew2) {
               expect(totalPrice2).to.equal(savePriceNew2); // сравниваем цену с переменной
               console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePriceNew2}`)
               return savePriceNew2
            }
            console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice2}`)  
         })
           
         /* Валюта */
      cy.get("@pricePopup")
         .find('div > div.pen-bottom > div > div:nth-child(3) > div:nth-child(3) > span')
         .should('be.visible')
         .invoke('text')
         .then((text) => {
            expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
         });

         /* Закрытие тултипа */
      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_row > .order-info_summary > .has-popover > .icon-question")
         .should('be.visible')
         .click()
   }

   paymentHotelBlock() {
      cy.get("#content > div > div > .ex-order > .order-info > .order-info_service > :nth-child(1) > .order-info_service-icon > i")
         .should('have.class', 'icon-hotel')

      cy.get("#content > div > div > .ex-order > .order-info > .order-info_service > :nth-child(1) > .order-info_service-type")
         .should('be.visible')

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_service.ex-order__service > :nth-child(1) > ul > .link-disabled > .has-tooltip")
         .should('have.attr', 'data-tooltip', 'Ремарки по бронированию')

      cy.get("#content > div > div > .order.ex-order > .order-info > .order-info_service.ex-order__service > :nth-child(1) > ul > :nth-child(2) > .has-popover.has-penalties-popover > span")
         .should('have.text', 'Штрафы')
         .click()

      cy.get("#content > div > div > .ex-order > .order-info > .order-info_service.ex-order__service > :nth-child(1) > ul > :nth-child(2) > .popover.popover-bottom.tooltip-penalties")
         .should('have.css', 'display', 'flex')

      cy.get("#content > div > div > .ex-order > .order-info > .ex-order__service > :nth-child(1) > ul > :nth-child(2) > .tooltip-penalties > div > .pen-top > label")
         .should('have.text', 'Штрафные санкции')

      // cy.get("#content > div > div > .ex-order > .order-info > .ex-order__service > :nth-child(1) > ul > :nth-child(2) > .tooltip-penalties > div > .pen-bottom > div > :nth-child(1) > :nth-child(2)")
      //    .should('be.visible')
      //    .invoke('text')
      //    .then((text) => {
      //       expect(text.trim()).to.eq(`с ${this.checkInDate.trim()}`); 
      //    });

      // cy.get("#content > div > div > .ex-order > .order-info > .ex-order__service > :nth-child(1) > ul > :nth-child(2) > .tooltip-penalties > div > .pen-bottom > div > :nth-child(2) > span")
      //    .should('be.visible')
      //    .invoke('text')
      //    .then((text) => {
      //       const price2 = text.replace(/[^\d]/g, ''); // удаляем из текста все, кроме цифр
      //       const totalPrice2 = price2.replace(/\s/g, '');
      //       const savePrice2 = this.hotelPrice.trim();
      //       const savePriceNew2 = this.newHotelPrice.trim();
      //       if (totalPrice2 === savePrice2) {
      //       expect(totalPrice2).to.equal(savePrice2); // сравниваем цену с переменной
      //       console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePrice2}`)
      //       return savePrice2
      //       } 
      //       else if(totalPrice2 === savePriceNew2) {
      //          expect(totalPrice2).to.equal(savePriceNew2); // сравниваем цену с переменной
      //          console.log(`Страница оплаты (Тултип): Цена отеля не изменилась = ${savePriceNew2}`)
      //          return savePriceNew2
      //       }
      //       console.log(`Цена отеля ИЗМЕНИЛАСЬ = ${totalPrice2}`)  
      //    })

      // cy.get("#content > div > div > .ex-order > .order-info > .ex-order__service > :nth-child(1) > ul > :nth-child(2) > .tooltip-penalties > div > .pen-bottom > div > :nth-child(2) > span > span")
      //    .should('be.visible')
      //    .invoke('text')
      //    .then((text) => {
      //       expect(text.trim()).to.eq(this.hotelCurrency.trim()); // проверяем, что текст соответствует значению hotelCurrency
      //    });
   }
}

export const hotelReservationChecks = new HotelReservationChecks();

