function addDivStyle() {
    // создать новый DOM-элемент
    let div = document.createElement('div')
    // добавить в DOM
    document.querySelector('body').append(div)
    // установить стиль с помощью CSS-класса
    Array.from(document.getElementsByTagName('div')).forEach(elem => {
        elem.classList.add('inserted-elem')
    })
}