// загрузить данные из localStorage
function getLSItems() {
    const itemNames = {date: 'dates_loaded', text: 'texts_loaded'}
    
    let dates = localStorage.getItem(itemNames.date)
    let texts = localStorage.getItem(itemNames.text)
    if(!texts || !dates) return null; // если полей не существует

    const sep = {date: ',', text: '\n\n\n\n\n'} //separators
    let isContentWrong = false
    // перевод строки в число - во избежание некорректного перевода обратно в строку
    dates = dates.split(sep.date).map(date => {
        if(isNaN(Number(date))) isContentWrong = true;
        return Number(date)
    })
    texts = texts.split(sep.text)
    // если разделитель не корректен || на месте даты - не число
    if(isContentWrong || texts.length == 1 || dates.length == 1) return null;

    return {dates, texts}
}

// загрузить данные постов в localStorage
function setLSItems(postsInfo) {
    let texts = postsItemToArray(postsInfo, "text")
    let dates = postsItemToArray(postsInfo, "date")
    
    const itemNames = {date: 'dates_loaded', text: 'texts_loaded'}
    const sep = {date: ',', text: '\n\n\n\n\n'} //separators

    // значения - целое число, запятая как разделитель допустима
    localStorage.setItem(itemNames.date, dates.join(sep.date))
    // значения - произвольный текст, используем маловероятный разделитель
    localStorage.setItem(itemNames.text, texts.join(sep.text))
}


export {
    getLSItems,
    setLSItems
}


function postsItemToArray(posts, name) {
    let fieldArray = []
    posts.forEach(post => {
        fieldArray.push(post[name])
    })
    return fieldArray
}