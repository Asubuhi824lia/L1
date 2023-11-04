const persons =  [    
    { name: 'John', age: 25 },
    { name: 'Jelly', age: 12 },
    { name: 'Jack', age: 25 },
    { name: 'Garry', age: 30 },
    { name: 'Andy', age: 14 },
    { name: 'Sarah', age: 14 },
    { name: 'Larry', age: 25 }
]


// Вспомогательные функции
//формирование новой формы ввода || сортировака JSON-объекта 
const createInputs = (person) => {

    // name
    let label1 = document.createElement('label')
    let inputName = document.createElement('input')
    inputName.setAttribute("value", person.name)
    inputName.setAttribute("type", 'text')
    label1.append('name', inputName)

    // age
    let label2 = document.createElement('label')
    let inputAge = document.createElement('input')
    inputAge.setAttribute("value", person.age)
    inputAge.setAttribute("type", 'number')
    inputAge.setAttribute("min", '0')
    label2.append('age', inputAge)

    // section
    let section = document.createElement('section')
    section.setAttribute("class", 'person')
    section.append(label1, label2)

    return section;
}
function sortJsonPersonsToObj(people) {
    let array = JSON.parse(people)

    return array.sort((a, b) => {
        // 1-е число больше следующего? 
        if(a.age > b.age) return 1; // переставляем
        
        // возраст равен?
        if(a.age == b.age)
            return (a.name > b.name) ? 1:-1 // сортируем по именам
        
        // a и b в порядке возрастания?
        return -1; // оставить
    })
}


// вывод дефолтного списка
persons.forEach(person => {
    document.getElementById("InputArray").append( createInputs(person) )
})


// 
let isSorted = false;   // Opt.: false когда изменилось кол-во или содержимое элементов
document.getElementById("AddFieldBtn").addEventListener("click", () => {
    // Добавить поле, навесить слушатели
    persons.push({ name: '', age: '' })
    document.querySelector(".person input[type='text']").addEventListener("blur", e => checkName(e, persons.length))
    document.querySelector(".person input[type='number']").addEventListener("blur", e => checkAge(e, persons.length))
    
    isSorted = false
    document.getElementById("InputArray").append( createInputs({name:'',age: ''}) )
})

document.getElementById("sortBtn").addEventListener("click", () => {
    // Получить DOM элементы
    let personsEls = document.getElementsByClassName("person")
    // проверить количество на приемлимость 
    if(personsEls.length < 2) alert('Нечего сортировать!')

    // перевести информацию в вид массива объектов
    let personsList = Array.from(personsEls).map(el => {
        return {name: el.childNodes[0].lastChild.value, age: el.childNodes[1].lastChild.value}
    })


    /** Варианты оптимизации
     * 0) Обновлять массив значений
     * 1)* Если часть начальной и/или конечной последовательности уже в нужном порядке
     *    - заменить только часть значений
     * 2) Флаг isSorted
     *    - false когда изменилось кол-во или содержимое элементов
     */  

    if(isSorted) {
        // Opt.: исключить бессмысленные перерисовки
        alert('Массив уже в отсортированном виде!')
        return;
    } else {
        let sortedList = sortJsonPersonsToObj(JSON.stringify(personsList))
        isSorted = true

        // Отобразить в нужном порядке
        console.log(sortedList)
        sortedList.forEach((person, ind) => {
            personsEls[ind].childNodes[0].lastChild.value = person.name
            personsEls[ind].childNodes[1].lastChild.value = person.age
        })
    }  
})


// прослушивать изменения input (name)
Array.from(document.querySelectorAll(".person input[type='text']")).forEach((input, ind) => {
    input.addEventListener("blur", e => checkName(e, ind))
});

// прослушивать изменения input (age)
Array.from(document.querySelectorAll(".person input[type='number']")).forEach((input, ind) => {
    input.addEventListener("blur", e => checkAge(e, ind))
});


function checkName(e) {
    e.target.value = e.target.value.trim() //убрать пробелы вокруг

    if(e.target.value == persons[ind].name) return;
    else {
        // обновить, если значение поменялось
        persons[ind].name = e.target.value
        isSorted = false
    }
}
function checkAge(e) {
    e.target.value = e.target.value.trim() //убрать пробелы вокруг

    if(e.target.value == persons[ind].age) return;
    else {
        // обновить, если значение поменялось
        persons[ind].age = e.target.value
        isSorted = false
    }
}