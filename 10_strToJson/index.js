const str = `{
    "author": "Достоевский Ф.М.",
    "smth": "smth",
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
}`


// Все ли скобки парные? 
// имеют ли элементы объекта вид "ключ-значение"
// имеет ли элементы массива вид "значение"
// все ли "ключи" и "значения" заключены в двойные кавычки?
const errList = {
    scopes: "Скобки некорректны!",
    separator: "Формат разделения key и value объекта некорректен!",
    key: "Формат имени объекта некорректен!",
    data: "Формат написания данных некорректен!",
    field: "Формат написания поля объекта некорректен!"
}

function getObjKeyFromStr(content) {
    if(content[0] != '"') throw new Error(`${errList.data}\n${content}`)
    return content.slice(1, content.indexOf('"', 1))
}
function isWrapCorrect(str, lvl) {
    // объект?
    if(lvl == 1 && 
        (str[0] != '{' && str.at(-1) != '}') 
    ||
        (lvl > 1 
            && ((str[0] != '{' || str.at(-1) != '}') 
            &&  (str[0] != '[' || str.at(-1) != ']'))
        )) 
    {
        throw new Error(`${errList.scopes}, ${str[0]}, ${str.at(-1)}, ${str}`)
    }

    // убираем "обёртку" 
    return str.slice(1, str.length-1).trim()
}

function strToJson(str, lvl=1) {

// убедиться в правильности обёртки
    let content = isWrapCorrect(str, lvl)
    
// Переходим к получению полей
    let obj = Object()
    do {
    // если не 1-я строка в объекте
        if(content[0] == ',') content = content.slice(1).trim()

    // получить имя объекта
        let key = getObjKeyFromStr(content)
        content = content.slice(content.indexOf('"', 1)+1).trim()
        
    // проверка наличия разделителя
        if(content[0] != ':') throw new Error(`${errList.separator}\n${content}`)
        content = content.slice(1).trim()

    // проверить тип данных
        let value = (content.indexOf(',') == -1) ? content : content.slice(0, content.indexOf(',')) //получить вторую часть строки
        // строка?
        if(content[0] == '"') {
            value = content.slice(1, content.indexOf('"', 1))
            content = content.slice(content.indexOf('"', 1) +1).trim()
        }
        // логическое?
        else if(value == 'false' || value == 'true') {
            value = Boolean(value)
            content = content.slice(content.indexOf(',') +1).trim()
        }
        // число?
        else if(value.match(/[^0-9]/g) == null) {
            content = content.slice(value.length).trim()
            value = Number(value)
        }
        // объект || массив?
        else if(content[0] == '{') {
            const result = strToObj(content, lvl)
            content = result.content
            value   = result.value
        }
        // массив?
        else if(content[0] == '[') {
            const result = strToArray(content, lvl)
            content = result.content
            value   = result.value
        }
        else {
            throw new Error(`${errList.data}, ${content}`)
        }
        
        obj[key] = value;
    } while(content)
        
    
    return obj;
}

function strToObj(content, lvl) {
    // получить границу объекта
        let bracket = findClosedBracketIndex(content)
        
    // Вернуть объект
        return {
            value: strToJson(content.slice(0, bracket+1), lvl+1),
            content: content.slice(bracket+1) // убрать текущий объект из содержимого
        }
}
function strToArray(content, lvl) {

    // получить границу массива
    let bracket = findClosedBracketIndex(content)
    // устранить скобки
    content = content.slice(1, bracket).trim()

    let array = Array()
    // если объект - strToObj
    // если массив - strToArray
    if(content[0] == '{' || content[0] == '[') {
        // узнать кол-во объектов / массивов
        let elems = getElemsCount(content)

        for(let e = 0; e < elems; e++) {
            //выделить объект
            let elEnd = findClosedBracketIndex(content)+1

            // объект?
            if(content[0] == '{') {
                let value = strToObj(content.slice(0, elEnd), lvl+1).value
                array.push(value)
            }
            // массив?
            else {
                let result = strToArray(content.slice(0, elEnd), lvl+1)
                array.push(result.value)
            }
            
            // оставить только непроверенное
            content = content.slice(elEnd).trim()
            //проверка на запятую
            
            if((content[0] != ',' && e != elems-1) || (e == elems && content.length>0)) 
                throw new Error(`${errList.field} "${content}"`)
            else 
                content = content.slice(1).trim()
        }
    }
    // иначе - значение
    else {
        array = content.split(',') 
        array = array.map(elem => elem.trim())

        // если строка не обрамлена кавычками - Ошибка!
        array = array.map(e => {
            if(e[0] != '"' || e.at(-1) != '"') throw new Error(errList.data)
            else return e.slice(1, e.length-1)
        })
    }
    
    return {
        value: array,
        content: content.slice(bracket+1) // убрать текущий объект из содержимого
    }
}

// получить кол-во элементов в массиве
function getElemsCount(content) {
    // получить порядок скобок
    let brackets = content.match(/[[\]{\}]/g)

    let count = 0
    for(; count < brackets.length; count++) {
        // найти расположение закрывающей скобки i-го элемента
        let closed_id = findClosedBracketOrder(content, brackets)
        // отделить оставшееся
        brackets = brackets.slice(closed_id)    
    }
    
    return count
}
// найти индекс закрывающей скобки
function findClosedBracketIndex(content) {
    // получить порядок скобок
    let brackets = content.match(/[[\]{\}]/g)

    // найти расположение главной закрывающей скобки
    let closed_id = findClosedBracketOrder(content, brackets)

    // найти индекс
    let bracket = 0
    for(let i=1; i<closed_id; i++) {
        bracket = content.indexOf(brackets[i], bracket)
    }
    return bracket;
}
// найти порядок главной закрывающей скобки в последовательности
function findClosedBracketOrder(content, seqBrackets) {
    let opened = Array(content[0]) 
    let closed_num = 1

    for(let i=1; i < seqBrackets.length; i++) {
        if(seqBrackets[i] == '[' || seqBrackets[i] == '{') {
            opened.push(seqBrackets[i])
        }
        else if(seqBrackets[i] == '}') {
            if(opened.at(-1) == '{') opened.pop() // скобка закрыта
            else { //Ошибка! неверное соотношение 
                throw new Error(`${errList.scopes}\n${content}`)
            }
        }
        else {
            if(opened.at(-1) == '[') opened.pop() // скобка закрыта
            else { //Ошибка! неверное соотношение
                throw new Error(`${errList.scopes}\n${content}`)
            }
        }
        
        closed_num++
        // пока не дошли до закрывающей 1-ю
        if(opened.length == 0) break;
    }

    if(opened.length != 0) { // Ошибка! не хватает закрывающих
        throw new Error(`${errList.scopes}\n${content}`)
    } else
        return closed_num
}


console.log(strToJson(str))
