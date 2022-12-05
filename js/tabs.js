'use strict';
/* jshint -W097*/

//!Создаём функционал для табов
//?Задачи
//1) Скрывать ненужные нам табы
//2) Показать нужный нам таб
//3) Назначить обработчики событий на меню для управления табов, чтоб управлять табами

//*Обращение ко всем ссылкам, на которые будет переключать табы 
const tabs = document.querySelectorAll('.manage-tabs-block__link');
//*Обращение к родителю всех табов 
const tabContent = document.querySelectorAll('.body-block-tabs__tab-item');
//*Обращение к родителю ссылок, на которые мы будет переключать табы
const tabsParent = document.querySelector('.manage-tabs-block__action-block');

//!Первым делом скрываем табы и активный класс для ссылки
function hideTabContent() {
    tabContent.forEach(item => {
        item.classList.add('tab-hide'); //добавляем класс со свойством display none
        item.classList.remove('tab-show', 'tabe-animation'); //Удаляем класс со свойством display:grid и класс, запускающий анимацию(чтоб потом анимация снова запустилась)
    });
    tabs.forEach(item => {
        item.classList.remove('link-tab-active'); //удаляем активный класс для ссылки табов
    });
}

//!Создаём функцию для показа табов 
function showTabContent(i = 0) { //по умолчанию при вызове функции будет показан первый таб(с индексом 0)
    tabContent[i].classList.add('tab-show', 'tabe-animation'); //добавляем класс со свойством display grid и с классом, запускающим анимацию(keyframe)
    tabContent[i].classList.remove('tab-hide'); //Удаляем класс со свойством display: none
    tabs[i].classList.add('link-tab-active'); //добавляем активный класс для ссылки табов
}

hideTabContent();
showTabContent();

//!При помощи делегирования событий вешаем обработчик событий на каждую ссылку для таба

tabsParent.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;

    if (target && target.classList.contains('manage-tabs-block__link')) { //если e.target существует и имеет класс manage-tabs-block__link
        tabs.forEach((item, i) => {
            if (target == item) { //если target и item при клике равны, то запускаются функции
                hideTabContent();
                showTabContent(i); //После очистки остаётся только таб и ссылка, которые имею индекс таба, на которы мы кликнули
            }
        });
    }
});

