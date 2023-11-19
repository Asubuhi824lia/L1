let offset = 0
let isEnd = false   // false - подгрузка нужна, true - не нужна


function getPosts(posts) {
    
    if(posts.response.count <= offset) isEnd = true; // подгружены ли посты до конца?

    // выделить нужную информацию
    let postsInfo = posts.response.items.map(post => {
        const {text, date} = post
        return {text, date}
    });

/**Запись в localStorage - в виде массивов "dates_loaded" и "texts_loaded"
     *  1-й запуск - создать массивы "dates_loaded" и "texts_loaded"
     *      поле "dates_loaded"/"texts_loaded" - существует?
     *      поле "dates_loaded"/"texts_loaded" - массив? (нет разделителей = Ошибка)
     *      поле "dates_loaded" - хранит лишь числа?
     *  последующие- получить массив, добавить элементы, перезаписать
     */
    
    // Считать с localStorage
    let items = getLSItems()
    const itemNames = {date: 'dates_loaded', text: 'texts_loaded'}

    /* Если записи отсутствуют либо некорректны - перезаписать */
    if(!items) {
        let texts = postsItemToArray(postsInfo, "text") 
        let dates = postsItemToArray(postsInfo, "date")

        // значения - целое число, запятая как разделитель допустима
        localStorage.setItem(itemNames.date, dates)
        // значения - произвольный текст, используем маловероятный разделитель
        localStorage.setItem(itemNames.text, texts.join('\n\n\n\n\n'))
        // вывести посты
        showPostsInfo(postsInfo)
        return;
    }


    let texts = items.texts
    let dates = items.dates
    // let dates = postsItemToArray(postsInfo, "date")
    console.log(dates.length)    

    /** Если кэшировано больше, чем запрошено, или столько же - страница перезагружена
     * обновить смещение
     * вывести уже загруженные посты
     */
    if(dates.length >= offset) {
        offset = dates.length
        postsInfo = formItemsArray(items)
        showPostsInfo(postsInfo)
        return;
    } 
    /** Если кэшировано меньше, чем запрошено - новая порция данных - дописать
     * дописать данные
     * перезаписать localStorage
     */
    addItemsToArray(dates, postsInfo, "date")
    addItemsToArray(texts, postsInfo, "text")

    localStorage.setItem(itemNames.date, dates)
    localStorage.setItem(itemNames.text, texts.join('\n\n\n\n\n'))

    // вывести часть постов
    postsInfo = formItemsArray(items)
    showPostsInfo(postsInfo)
    return;
}


function showPostsInfo(postsInfo) {
    const fragment = document.createDocumentFragment();
    console.log(postsInfo)
    
    postsInfo.forEach(post => {
        post.date = new Date(post.date * 1000) //из миллисекунд в дату
        post.date = formatDate(post.date) //привести к нужному формату
        
        // сформировать элемент поста
        let article = document.getElementById("postTmp").content.cloneNode(true)
        article.querySelector("time").innerHTML = `<b>${post.date}</b>`
        article.querySelector("p").textContent = post.text
        fragment.append(article)
    })

    document.getElementById('container').appendChild(fragment);

}
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return `${date.toLocaleDateString("ru", options)} в ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

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
function setItemsToLS(postsInfo) {
    let texts = postsItemToArray(postsInfo, "text")
    let dates = postsItemToArray(postsInfo, "date")
    
    const itemNames = {date: 'dates_loaded', text: 'texts_loaded'}
    const sep = {date: ',', text: '\n\n\n\n\n'} //separators
    // значения - целое число, запятая как разделитель допустима
    localStorage.setItem(itemNames.date, dates.join(sep.date))
    // значения - произвольный текст, используем маловероятный разделитель
    localStorage.setItem(itemNames.text, texts.join(sep.text))
}

function postsItemToArray(posts, name) {
    let fieldArray = []
    posts.forEach(post => {
        fieldArray.push(post[name])
    })
    return fieldArray
}
// дописать в valArray данные posts по полю name
function addItemsToArray(valArray, posts, name) {
    // добавить новые посты
    posts.forEach((post) => {valArray.push(post[name])})
    return valArray
}

function formItemsArray(items) {
    //получить имена полей
    let names = []
    for (const key in items) names.push(key)
    let posts = Array()
    for (let i = 0; i < items[names[0]].length; i++) {
        let post = {}
        names.forEach((key, ind) => post[key.slice(0, key.length-1)] = items[names[ind]][i])
        posts.push(post)
    }

    return posts
}