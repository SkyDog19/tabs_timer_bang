'use strict';
/* jshint -W097*/

//*Переменная, определяющая дэдлайн

const deadline = new Date();

//*Функция для получения разницы между датами 
function getTimeRemaining(endtime) { //аругмент, в который помещаем любую дату
    //техническая переменная, которая существует только внутри этой функции
    const t = (Date.parse(endtime) + 180000) - Date.parse(new Date());
    /*В переменной получим разницу между той датой, что указалии в аргументе и настоящей датой,
    и за счет метода parse разница будет в милисекундах*/
    //?Теперь нам необходимо перевести разницу в дни, часы, минуты и милисекунды
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); //полученное количество милисекунд превратили в количество дней, метод math.floor() - округляет число
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); //получаем количесвто часов и чтобы оно не превышало 24, получаем остаток от делеания при делении на 24(то есть ответ будет 100% меньше чем 24)
    const minutes = Math.floor((t / (1000 * 60)) % 60); //получаем количество минут и получаем остаток от деления, который будет меньше 60
    const seconds = Math.floor((t / 1000) % 60); //так как в одной секунде 1000 милисекунд, то мы просто делим на 1000 и получаем остаток от делеания на 60
    //? Переменные используются только внутри функции, при помощи return мы вытащим их наружу
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    //!Таким образом при запуске функции мы возвращаем объект
}

//*Функция для добавленяи нуля к цифрам
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`; //если число больше нуля и меньше 10, то добавляем 0 в начале
    } else {
        return num; //если условие не выполнено, то просто возвращаем 0
    }
}

//*Сохдаём функцию для работы с таймером на странице
function setClock(selector, endtime) {
    //переменная родитель
    const timer = document.querySelector(selector);
    //id внутри родителя
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); //запускаем функцию один раз и каждый следующий запуск будет через 1 секунду(setInterval)
    //*Фнукция, которая будет обновлять таймер каждую секунду
    function updateClock() {
        const t = getTimeRemaining(endtime); //внутри функции в переменной t будет объект return

        // days.innerHTML = t.days; //обращаемся к селектору #days и присваеваем ему days из объекта return из функции getTimeRemaining
        // hours.innerHTML = t.hours; //обращаемся к селектору #hours и присваеваем ему hours из объекта return из функции getTimeRemaining
        // minutes.innerHTML = t.minutes;
        // seconds.innerHTML = t.seconds;
        // !Делаем всё тоже самое, используя функцию getZero
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            const bang = document.querySelector('.animation-bang');
            bang.classList.add('animation-bang-show');
        }
    }
}

setClock('.block-timer__body', deadline);