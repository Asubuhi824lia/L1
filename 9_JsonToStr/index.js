const json = {
    "author": "Достоевский Ф.М.",
    "books": [
        {
            "genre": "Романы",
            "titles": [
                "Игрок",
                "Идиот",
                "Бесы",
                "Подросток",
                "Братья Карамазовы"
            ]
        },
        {
            "genre": "Повести",
            "titles": [
                "Двойник",
                "Неточка Незванова",
                "Село Степанчиково и его обитатели",
                "Записки из Мёртвого дома",
                "Записки из подполья"
            ]
        },
        {
            "genre": "Рассказы",
            "titles": [
                "Как опасно предаваться честолюбивым снам",
                "Господин Прохарчин",
                "Ползунков",
                "Честный вор",
                "Скверный анекдот"
            ]
        },
        {
            "genre": "Публицистика и критика, очерки",
            "titles": [
                "Петербургская летопись ",
                "Рассказы Н.В. Успенского",
                "Столетняя",
                "Приговор",
                "Пушкин"
            ]
        },
        {
            "genre": "Стихотворения",
            "titles": [
                "Божий дар",
                "На европейские события в 1854 году",
                "На первое июля 1855 года",
                "На коронацию и заключение мира",
                "Эпиграмма на баварского полковника"
            ]
        },
        {
            "genre": "Пьесы",
            "titles": [
                "Борьба нигилизма с честностью (офицер и нигилистка)"
            ]
        }
    ]
}


function getTab(tabSize) {
    let tab = ''
    for (let i = 0; i < tabSize; i++) {
        tab += ' '
    }
    return tab
}
function jsonToStr(json, tabSize = 0, lvl = 1) {
    // Проверка на валидность JSON-а
    if(typeof json !== 'object') return null;


    let tab = getTab(tabSize*lvl)
    let scopeTab = getTab(tabSize*(lvl-1))
    //нужен ли \n
    let n = tabSize==0?'':'\n'
    
    let isArray = Array.isArray(json)
    let str = isArray ? `[${n}` : `{${n}`
    
    //для определение положения элемента в объекте
    let index = 0
    let len = Object.keys(json).length
    
    for(let field in json) {
        // правило выставления запятых элемента
        let col = (index === len-1) ? '':','
    
        /// формат записи строчки
        // значение - примитив
        if(typeof json[field] !== 'object') {
            // массива
            if(isArray) str += `${tab}\"${json[field]}\"${col}${n}`
            // обЪекта
            else str += `${tab}\"${field}\":\"${json[field]}\"${col}${n}`
        }
        // значение - сложный тип
        else {
            // массива
            if(isArray) str += `${tab}${jsonToStr(json[field], tabSize, lvl+1)}${col}${n}` 
            // объекта
            else str += `${tab}\"${field}\":${jsonToStr(json[field], tabSize, lvl+1)}${col}${n}`
        }

        index++
    }

    // Дошли до когца массива / объекта - закрываем скобкой
    // if(field == json.length-1) 
    str += Array.isArray(json) ? `${scopeTab}]`:`${scopeTab}}`
    return str
}

console.log(jsonToStr(json, 4))