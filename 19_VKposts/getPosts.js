import {getLSItems, setLSItems} from './localStorageAPI.js'
import getLocalStorageBusySize, {getLocalStorageData} from '../20_busyLocalStrg/index.js'


globalThis.offset = 0
globalThis.isEnd = false   // false - подгрузка нужна, true - не нужна

// ф-ция получения занятого пространства в localStorage
let getLSBusySize;

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

        setTimeout(calcLSInfo, 500) //вычислить максимальный объём хранилища
        
        return;
    } 
    else {
        let texts = items.texts
        let dates = items.dates

        /** Если кэшировано больше, чем запрошено, или столько же - страница перезагружена
         * обновить смещение
         * вывести уже загруженные посты
         * если localStorage уже был перегружен - загрузить пачку выкинутых из начала постов
         */
        if(dates.length >= offset) {
            setTimeout(calcLSInfo, 1000)  // достать/вычислить maxSizeLS
            offset = dates.length
            postsInfo = formItemsArray(items)
            showPostsInfo(postsInfo)
            return;
        } 
        /** Если кэшировано меньше, чем запрошено - новая порция данных - дописать
         * дописать данные
         * если localStorage перегрузится - вытеснить данные, загруженные первыми
         * перезаписать localStorage
         */
        else {
            addItemsToArray(dates, postsInfo, "date")
            addItemsToArray(texts, postsInfo, "text")


            //получить размер занятой в localStorage памяти
            const busySizeLS = getBusySizeLS()
            const newPartSize= calcDataSize(addItemsToArray([], postsInfo, "date")) 
                              +calcDataSize(addItemsToArray([], postsInfo, "text"))
            const free = getMaxSizeLS() - (busySizeLS + newPartSize)
            
            // вмещается ли новая порция постов
            if(free >= 0) {
                console.log(`Занято: ${busySizeLS + newPartSize} / ${getMaxSizeLS()} (Б)\nОсталось ещё: ${free} / ${getMaxSizeLS()} (Б)`)
            } else {
                /** Достигнут предел localStorage
                 * вытеснение какого кол-ва первых постов достаточно для сохранения новых?
                 * сохранить "смещение сохранённых постов"
                 * вытеснить
                 */
                let begPostId = getBegPostId()
                let offsetSize
                let delPosts = 0
                do {
                    delPosts++
                    offsetSize = calcDataSize(dates.slice(0, delPosts))
                                +calcDataSize(texts.slice(0, delPosts))
                    begPostId++
                } while(newPartSize > offsetSize)
                console.log(`Для записи ${postsInfo.length} постов (${newPartSize} Б) - требуется вытеснить ${delPosts} постов (${offsetSize} Б)`)
                
                //сохранить смещение
                localStorage.setItem("begPostId", begPostId)

                //вытеснить
                console.log(dates)
                items.dates = dates.slice(delPosts)
                items.texts = texts.slice(delPosts)
                console.log(items.dates)
            }
            // добавить новые посты
            setLSItems(formItemsArray(items))
            showPostsInfo(postsInfo)
            return;
        }        
    }
}

/** На случай необходимости подгрузить первые, вытесненные посты при перезагрузке
 *  - подгрузить первые посты задав callback=getBegPosts&offset=0&count=${offset}
 *      
 *  getBegPosts(posts)
 *      вставить в начало
 *      переписать localStorage
 *          вычислить кол-во последних постов для удаления (восполняющее размер подгруженных)
 *          убрать
 *          добавить в начало первые
 *      сбросить offset
 *      сбросить begPostId
 */


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


/* Функция для получения максимального объёма хранилища */
// рассчёт объёма
// занести в localStorage
function calcLSInfo() {
    //получить максимальный объём хранилища
    getLSBusySize = getLocalStorageBusySize(getMaxSizeLS())
    let storageInfo = getLSBusySize( getLocalStorageData() )
    // console.log(`${storageInfo.busy} / ${storageInfo.max}`) 
    
    localStorage.setItem("maxSizeLS", storageInfo.max)
    return storageInfo
}

function getMaxSizeLS() {
    return Number(localStorage.getItem("maxSizeLS"))
}
function getBusySizeLS() {
    if(!getLSBusySize) calcLSInfo()
    let storageInfo = getLSBusySize( getLocalStorageData() )
    // console.log(`${storageInfo.busy} / ${storageInfo.max}`) 
    return storageInfo.busy // перевести в байты
}
// Рассчитать размер данных в формате localStorage (строки)
function calcDataSize(data) {
    return String(data).length // в байтах
}


function getBegPostId() {
    const begPostId = Number(localStorage.getItem("begPostId"))
    return begPostId ? begPostId : 0
}