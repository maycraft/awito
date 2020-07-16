/*=====================элемнты DOM====================================================*/
const btnAddAd = document.querySelector('.add__ad'), //Кнопка Подать объявление
    modalAdd = document.querySelector('.modal__add'), //Модалка добавления товара
    modalSubmit = document.querySelector('.modal__submit'), //Форма в модалке добавления товара
    modalBtnSubmit = document.querySelector('.modal__btn-submit'), //Кнопка в нутри модалки Отправить
    modalMsgWarning = document.querySelector('.modal__msg-warning'), //Сообщение о не заполненатости всех полей формы
    catalog = document.querySelector('.catalog'), // ul с картачками
    modalItem = document.querySelector('.modal__item'), //Модалка с инфой о товаре
    modal = document.querySelector('.modal'); //Общий класс для модалок

//Получаем все элементы формы для добавления товара, кроме кнопки
const formElements = [...modalSubmit.elements].filter(item => item.tagName !== 'BUTTON');
const dataBase = [];
/*========================Функции ==================================================*/

//Функция закрытия модального окна
const closeModal = (event) => {
    const target = event.target;
    //Закрываем все модальные окна при нажатии на диве
    if (target.classList.contains('modal__close') ||
        target.classList.contains('modal') || event.key == "Escape") {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
        modalItem.classList.add('hide');
        //Удаление обработчика событий
        modalAdd.removeEventListener('click', closeModal);
        modalItem.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        modalSubmit.removeEventListener('input', sendAbility);
        modalSubmit.removeEventListener('submit', sendForm);
    }
}

//Проверка заполнения полей формы
const checkForm = () => formElements.every(item => item.value);

//Функция для события отображения скрытия текста и аткивации кнопки
const sendAbility = event => {
    modalBtnSubmit.disabled = !checkForm();
    modalMsgWarning.style.display = checkForm() ? 'none' : '';
}

//Отправка формы
const sendForm = event => {
        event.preventDefault();
        const objElem = {};
        formElements.forEach(item => {
            objElem[item.name] = item.value;
        })
        dataBase.push(objElem);
        closeModal({ target: modalAdd });
        console.log(dataBase);
    }
    /*=========================Обработчики событий======================================*/

//По кнопке открываем модальное окно с добавление товара
btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    //скрываем предупреждающую надпись
    modalBtnSubmit.disabled = true;
    //Закрываем модальное окно с товаром
    modalAdd.addEventListener('click', closeModal);
    //Закрываем модальные окна по нажатию Esc
    document.addEventListener('keydown', closeModal);

    //Отображаем/скрываем предупреждающее сообщение, и делаем кнопку активной или нет
    modalSubmit.addEventListener('input', sendAbility);

    //Обрабатываем форму добавления товара
    modalSubmit.addEventListener('submit', sendForm);
});

//Зыкрываем модальное окно с добавлением товара
// modalAdd.addEventListener('click', closeModal);

//Открываем модальное окно с товаром
catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        //Закрываем модальное окно с товаром
        modalItem.addEventListener('click', closeModal);
        //Закрываем модальные окна по нажатию Esc
        document.addEventListener('keydown', closeModal);
    }
})