import {getLSItems, setLSItems} from './localStorageAPI.js'


globalThis.offset = 0
globalThis.isEnd = false   // false - подгрузка нужна, true - не нужна


globalThis.getPosts = function (posts) {
    
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
    console.log(items, postsInfo)

    /* Если записи отсутствуют либо некорректны - перезаписать */
    if(!items) {
        setLSItems(postsInfo)
        showPostsInfo(postsInfo)
        return;
    }


    /** Если кэшировано больше, чем запрошено, или столько же - страница перезагружена
     * обновить смещение
     * вывести уже загруженные посты
     */
    let texts = items.texts
    let dates = items.dates
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
    setLSItems(formItemsArray(items))

    // добавить новые посты
    showPostsInfo(postsInfo)

    return;
}


function showPostsInfo(postsInfo) {

    //вспомогательная ф-ция
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return `${date.toLocaleDateString("ru", options)} в ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    }

    const fragment = document.createDocumentFragment();
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


// дописать в valArray данные posts по полю name
function addItemsToArray(valArray, posts, name) {
    posts.forEach((post) => {valArray.push(post[name])})
    return valArray
}

function formItemsArray(items) {
    // получить имена полей
    let names = []
    for (const key in items) names.push(key)
    
    // сформировать массив объектов
    let posts = Array()
    for (let i = 0; i < items[names[0]].length; i++) {
        let post = {}
        names.forEach((key, ind) => post[key.slice(0, key.length-1)] = items[names[ind]][i])
        posts.push(post)
    }

    return posts
}