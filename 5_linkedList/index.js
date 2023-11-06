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
JSON.parse(JSON.stringify(json))


class LinkedListNode {
    constructor(value, next = null) {
        this.value = typeof value == 'object' ? JSON.parse(JSON.stringify(value)) : value
        this.next = next
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    //добавление с head
    prepend(value){
        // next нового узла - текущий head
        const newNode = new LinkedListNode(value, this.head)
        // обновляем head
        this.head = newNode

        // если ещё нет tail, делаем
        if(!this.tail) this.tail = newNode

        // возврат всего списка
        return this
    }

    /* Функция преобразования массива в связанный список */
    fromJson(json) {
        //Убеждаемся, что в json есть список (ищем 1-й)
        const values = this.#hasArray_json(json)
        if(values == null) return null;

        values.forEach(value => this.prepend(value))
        return this
    }
    #hasArray_json(json) {
        for (const field in json) {
            if (Array.isArray(json[field])) {
                return json[field];
            }
        }
        return null;
    }
}


let listMethod = new LinkedList()
console.log('\nvia class method:\n\n', listMethod.fromJson(json))

let listFunc = new LinkedList()
console.log('\nvia function:\n\n',fromJson(listFunc, json))


function fromJson(list, json) {
    //Убеждаемся, что в json есть список (ищем 1-й)
    const hasArray = function(json) {
        for (const field in json) {
            if (Array.isArray(json[field])) {
                return json[field];
            }
        }
        return null;
    }    
    const data = hasArray(json)
    if(data == null) return null;
    
    data.forEach((value => list.prepend(value)))
    return list;
}