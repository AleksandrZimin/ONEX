import _ from 'lodash';
import { hotelReservationChecks } from "../../support/checks/hotelReservationChecks"

const url = 'https://alpha.online-express.ru/'
const city = 'Сочи'
const hotelInputName = 'Янаис' // Хургада - Empire Inn
const changeCity = 'Санкт-Петербург'
const star1 = 1;
const star2 = 2;
const email = 'uzao-rec@ya.ru';
const password = 'cde8f17e';


describe('Главная страница', () => {

  /* Главная страница */

  it('Осуществляется переход на сайт', () => {
      hotelReservationChecks.visitSite(url)
      hotelReservationChecks.hardWait(1000)
      
   })

   it('Выбор размера экрана', () => {
      hotelReservationChecks.changeView(1980,1020);
    })

    /* ГЛАВНАЯ СТРАНИЦА */

   it('Проверка названия вкладки', () => {
      hotelReservationChecks.hotelSearchPage();
    })

    it('Ввод поля "Куда"', () => {
      hotelReservationChecks.inputArrivalCountry(city);
    })

    it('Выбор из списка поле "Куда"', () => {
      hotelReservationChecks.listArrivalCountry();
    })

    it('Проверка верного выбора в поле "Куда""', () => {
      hotelReservationChecks.inputArrivalCountryCheck();
    })

    it('Проверка наличия чек бокса "Мгновенное подтверждение" и его работы', () => {
      hotelReservationChecks.searchHotelCheckbox();
    })

    it('Проверка звездности и выбор несколько значений', () => {
      hotelReservationChecks.searchHotelStars();
    })

    it('Выбор дат в календаре', () => {
      hotelReservationChecks.searchHotelCheckInDate();
    })

    it('Сохранение значений дат в переменные', () => {
      hotelReservationChecks.searchHotelSaveDates();
    })

    it('Выбор туристов', () => {
      hotelReservationChecks.searchHotelTourists();
    })

    it('Выполнение поиска', () => {
      hotelReservationChecks.searchHotelButton();
      hotelReservationChecks.hardWait(5000)
    })
  });

    /* СТРАНИЦА ВЫДАЧИ */

  describe('Страница выдачи - проверка параметров поиска', () => {

    it('Проверка корректного отображения: Поля "Куда"', () => {
      hotelReservationChecks.searchHotelCorrect();
    })

    it('Проверка корректного отображения: Звездности', () => {
      hotelReservationChecks.searchHotelCorrectStars();
    })

    it('Проверка корректного отображения: Даты начала и окончания', () => {
      hotelReservationChecks.searchHotelCheckDate();
    })

    it('Проверка корректного отображения: Туристы', () => {
      hotelReservationChecks.searchHotelCorrectTourists();
    })
  });


  describe('Страница выдачи - проверка отображения элементов', () => {

    it('Проверка отображения карты на странице выдачи', () => {
      hotelReservationChecks.searchHotelMapVisible();
    })

    it('Проверка выдачи', () => {
      hotelReservationChecks.searchHotelResultsVisible();
    })

    it('Проверка get параметров в url', () => {
      hotelReservationChecks.searchHotelGetCheck(city);
    })

    it('Проверка пагинации', () => {
      hotelReservationChecks.searchHotelPaginationCheck();
    })

    it('Фильтры: Поиск по названию отеля ', () => {
      hotelReservationChecks.searchHotelFilterCheck(hotelInputName);
    })

    it('Фильтры: Звездность ', () => {
      hotelReservationChecks.searchHoteFilterStars();
    })

    it('Фильтры: Тип питания ', () => {
      hotelReservationChecks.searchHoteFilterMeals();
    })

    it('Фильтры: Названия отображаемых фильтров', () => {
      hotelReservationChecks.searchHotelFilterName();
    })
  });


  describe('Страница выдачи - повторный поиск с изменением параметров', () => {

    it('Изменение региона поиска', () => {
      hotelReservationChecks.searchHotelChangeCity(changeCity);
      hotelReservationChecks.hardWait(1000)
    })

    it('Выбор из списка поле "Куда"', () => {
      hotelReservationChecks.searchHotelAddCityLong()
    })

    it('Выполнение поиска и отслеживание значения поля куда"', () => {
      hotelReservationChecks.searchHotelChangeInputCheck()
      hotelReservationChecks.hardWait(10000)
    })
  });


  describe('Страница выдачи - проверка после повторного поиска', () => {

    it('Дожидаемся загрузки выдачи ДОПИСАТЬ СРАВНЕНИЕ С API', () => {
      hotelReservationChecks.searchHotelApiWait();
    })

    it('Проверка отображения карты на странице выдачи', () => {
      hotelReservationChecks.searchHotelMapVisible();
    })

    it('Карточка отеля (в списке): Проверка отображения карточек', () => {
      hotelReservationChecks.searchHotelElement();
    })

    it('Карточка отеля (в списке): Проверка корректного отображения звездности', () => {
      hotelReservationChecks.hotelElementStars(star1, star2);
    })

    it('Карточка отеля (в списке): Проверка корректного отображения названия отеля', () => {
      hotelReservationChecks.hotelElementName();
    })

    it('Карточка отеля (в списке): Проверка корректного отображения стоимости отеля', () => {
      hotelReservationChecks.hotelElementPrice();
    })

    it('Карточка отеля (в списке): Проверка корректного отображения валюты стоимости', () => {
      hotelReservationChecks.hotelElementCurrency();
    })

    it('Нажать кнопку "На карте" и перейти к карточке отеля на карте', () => {
      hotelReservationChecks.hotelElementScrollMap();
    })

  });
  

  describe('Страница выдачи - проверка карточки отеля на карте', () => {

    it('Карточка отеля (на карте): Проверка отображения карточки отеля на карте и фото отеля', () => {
      hotelReservationChecks.hotelElementsOnMap();
    })

    it('Карточка отеля (на карте): Проверка корректного отображения звездности', () => {
      hotelReservationChecks.hotelElementsOnMapStars(star1, star2);
    })

    it('Карточка отеля (на карте): Проверка корректного отображения названия', () => {
      hotelReservationChecks.hotelElementsOnMapName();
    })

    it('Карточка отеля (на карте): Проверка корректного отображения цены', () => {
      hotelReservationChecks.hotelElementsOnMapPrice();
    })

    it('Карточка отеля (на карте): Проверка корректного отображения валюты и адреса', () => {
      hotelReservationChecks.hotelElementsOnMapCurrency();
    })

  });


  describe('Страница отеля - Переход', () => {

    it('Переход на страницу отеля в том же окне по кнопке "Описание"', () => {
      // найдем элемент с полем, которое нужно сохранить
      hotelReservationChecks.searchHotelOpenPage();
    })
  });


  /* СТРАНИЦА ОТЕЛЯ */


  describe('Страница отеля - Проверка отображения элементов на странице', () => {

    it('Проверка отображения всех блоков на странице отеля', () => {
      hotelReservationChecks.hotelPageElements();
    })
  });


  describe('Страница отеля - Шапка', () => {

    it('Шапка - звездность', () => {
      hotelReservationChecks.hotelPageStars(star1, star2,);
    })

    it('Шапка - Название отеля', () => {
      hotelReservationChecks.hotelPageName();
    })

    it('Шапка - Адрес и расстояние', () => {
      hotelReservationChecks.hotelPagePlace();
    })

    it('Шапка - Кнопка "На карте"', () => {
      hotelReservationChecks.hotelPageLinkMap();
    })

    it('Шапка - Кнопка "Подробное описание"', () => {
      hotelReservationChecks.hotelPageLinkText();
    })

    it('Шапка - Даты', () => {
      hotelReservationChecks.hotelPageDates();
    })

    it('Шапка - Туристы', () => {
      hotelReservationChecks.hotelPageTourist();
    })

    it('Шапка - Номер', () => {
      hotelReservationChecks.hotelPageRooms();
    })

    it('Шапка - Номер', () => {
      hotelReservationChecks.hotelPageRooms();
    })

    it('Шапка - Рейтинг', () => {
      hotelReservationChecks.hotelPageRating();
    })

    it('Шапка - Цена', () => {
      hotelReservationChecks.hotelPagePrice();
    })

    it('Шапка - Валюта', () => {
      hotelReservationChecks.hotelPageCurrency();
    })

    it('Шапка - Кнопка "Все цены"', () => {
      hotelReservationChecks.hotelPageHeaderBtn();
    })
});

  describe('Страница отеля - Галерея', () => {

    it('Галерея - Фото', () => {
      hotelReservationChecks.hotelPageGallery();
    })

    it('Галерея - Фильтры в фото', () => {
      hotelReservationChecks.hotelPageGalleryFilters();
    })
});

  describe('Страница отеля - Кнопки с картой', () => {

    it('Кнопки - Загрузить карту', () => {
      hotelReservationChecks.hotelPageGalleryFilters();
    })

    it('Кнопки - Открыть в панорамах', () => {
      hotelReservationChecks.hotelPageButtonsGoogle();
    })
});

  describe('Страница отеля - Предложения', () => {

    it('Предложения - Обозначения фильтров ', () => {
      hotelReservationChecks.hotelPageRoomFiltersInfo();
    })

    it('Предложения - Применение фильтров', () => {
      hotelReservationChecks.hotelPageRoomFilters();
    })

    it('Предложения - Выдача предложений', () => {
      hotelReservationChecks.hotelPageRoomMain();
    })

    it('Предложения - Названия колонок', () => {
      hotelReservationChecks.hotelPageRoomColumns();
    })

    it('Предложения - Список предложений', () => {
      hotelReservationChecks.hotelPageRoomsList();
    })
});

describe('Страница отеля - Подвал', () => {

    it('Подвал - Описание отеля', () => {
      hotelReservationChecks.hotelPageAboutText();
    })

    it('Подвал - Цена', () => {
      hotelReservationChecks.hotelPageAboutFooterPrice();
    })

    it('Подвал - Валюта', () => {
      hotelReservationChecks.hotelPageAboutFooterCurrency();
    })

    it('Подвал - Кнопка "Все цены"', () => {
      hotelReservationChecks.hotelPageAboutFooterBtn();
    })
});


/* СТРАНИЦА БРОНИРОВАНИЯ */


  describe('Переход на страницу бронирования', () => {


    it('Переход к бронированию первого предложения"', () => {
      hotelReservationChecks.hotelPageGetRoom();
    })

      it('Отображение элементов на странице', () => {
        hotelReservationChecks.reservePageElements();
      })
});


  describe('Страница бронирования - Шапка', () => {

    it('Шапка - Заголовок', () => {
      hotelReservationChecks.reservePageH1();
    })

    it('Шапка - Звездность', () => {
      hotelReservationChecks.reservePageStars(star1, star2);
    })

    it('Шапка - Название отеля', () => {
      hotelReservationChecks.reservePageName();
    })

    it('Шапка - Адрес и дистанция', () => {
      hotelReservationChecks.reservePagePlace();
    })

    it('Шапка - Ссылка "На карту"', () => {
      hotelReservationChecks.reservePageLinkMap();
    })

    it('Шапка - Ссылка "Подробное описание"', () => {
      hotelReservationChecks.reservePageLinkAbout();
    })

    it('Шапка - Туристы', () => {
      hotelReservationChecks.reservePageTourist();
    })

    it('Шапка - Номер', () => {
      hotelReservationChecks.reservePageMoreRoom();
    })

    it('Шапка - Питание', () => {
      hotelReservationChecks.reservePageMeals();
    })

    it('Шапка - Цена', () => {
      hotelReservationChecks.reservePagePrice();
    })

    it('Шапка - Валюта', () => {
      hotelReservationChecks.reservePageCurency();
    })
 });

    describe('Страница бронирования - Информация о туристах', () => {

 it('Информация о туристах - Заголовок', () => {
      hotelReservationChecks.reservePageInfoH1();
    })

    it('Информация о туристах - Турист 1', () => {
      hotelReservationChecks.reservePageTouristsInfo();
    })

    it('Информация о туристах - Страховка', () => {
      hotelReservationChecks.reservePageInsurance();
    })
});    

describe('Страница бронирования - Условия', () => {

      it('Условия - Заголовок', () => {
      hotelReservationChecks.reservePageСonditionsH1();
    })

    it('Условия - Информация', () => {
      hotelReservationChecks.reservePageСonditionsMainInfo();
    })

    it('Условия - Подвал', () => {
      hotelReservationChecks.reservePageFooter();
    })
  
});


/* СТРАНИЦА ОПЛАТЫ*/
describe('Авторизация туристом перед оплатой', () => {

  it('Нажать кнопку "Забронировать', () => {
    hotelReservationChecks.reservePageOnPay();
  })

  it('Модальное окно авторизации - Нажать "Войти"', () => {
    hotelReservationChecks.authModal();
  })

    it('Модальное окно авторизации - Авторизация туристом', () => {
    hotelReservationChecks.authSignIn(email, password);
  })
});

describe('Страница оплаты', () => {

  it('Страница оплаты - переход', () => {
    hotelReservationChecks.visitUrlSaveCookies('https://alpha.online-express.ru/office/orders/347272');
  })

  it('Страница оплаты - Авторизация', () => {
    hotelReservationChecks.paymentPageAuth(email, password);
  })

  it('Страница оплаты - Элементы', () => {
    hotelReservationChecks.paymentPageElements();
  })

  it('Страница оплаты - Заказ №', () => {
    hotelReservationChecks.paymentOrderNumber();
  })

  it('Страница оплаты - Оплата', () => {
    hotelReservationChecks.paymentOrderPay();
  })

  it('Страница оплаты - Оплата QR кодом', () => {
    hotelReservationChecks.paymentOrderPayQr();
  })

  it('Страница оплаты - Доп услуги', () => {
    hotelReservationChecks.paymentOrderAddMore();
  })

  it('Страница оплаты - Блок с ценой', () => {
    hotelReservationChecks.paymentPriceInfo();
  })

  it('Страница оплаты - Оценка: "Палец вверх"', () => {
    hotelReservationChecks.paymentRateUs();
  })

  it('Страница оплаты - Проверка статуса оплаты', () => {
    hotelReservationChecks.paymentPayStatus();
  })

  it('Страница оплаты - Проверка отображения номера заказа в Url', () => {
    hotelReservationChecks.paymentUrlOrder();
  })

  it('Страница оплаты - Итоговая цена', () => {
    hotelReservationChecks.paymentTotalPrice();
  })

  it('Страница оплаты - Валюта', () => {
    hotelReservationChecks.paymentTotalPriceCurrency();
  })

  it('Страница оплаты - Тултип состава стоимости', () => {
    hotelReservationChecks.paymentPriceTooltip();
  })

  it('Страница оплаты - Блок с отелем', () => {
    hotelReservationChecks.paymentHotelBlock();
  })

 });
