// Функция добавления элемента в указанный контейнер
function addDivStyle(parent = document.querySelector('body')) {
    // создать новый DOM-элемент
    let div = document.createElement('div')
    // добавить в DOM
    parent.append(div)
    // установить стиль с помощью CSS-класса
    Array.from(document.getElementsByTagName('div')).forEach(elem => {
        elem.classList.add('inserted-elem')
    })
}