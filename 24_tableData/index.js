// Получить данные
// 1) целиком
// 2) порцией


const titles = ["N","fname","lname","tel","address","city","state","zip"]
fetchData()

// Функция подгрузки данных
/** Другие варианты
 * 
 * 1) 1 смена страницы - 1 запрос, брать только нужное число из всех данных
 * Преимущество: меньшая затрата памяти
 * Недостатки: 
 *      запрос большого кол-ва данных ожидать долго, 
 *      доп вычисления страницы и сортировки каждую смену страницы
 *
 * 2) п.1, только сортировка и лимитированная выдача - на стороне сервера
 * Преимущество: меньшие затраты клиентской памяти и мощности, времени запроса
 * Недостаток: необходимость в постоянном интернет-соединении
 */
let fullData = []
let dataParts = []
async function fetchData() {
    // получить данные
    let data = await fetch("http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true")
    // привести в формат объекта
    data = await data.json()
    
    // массив полных данных - для сортировки
    fullData = data
    // массив частей данных - для постраничного вывода
    for(let i=0; i < data.length/50; i++) {
        dataParts.push(data.slice(i*50, (i+1)*50))
    }

    // вывести страницу
    setPageData()
    // вывести пагинацию
    setPagination()
}

// Заменить текущие строки на новые
let curPage = 1
/** Другой вариант
 * 
 * Преимущество: элементы замещаются не целиком, лишь текстом.
 * Недостаток: больше кода, +логика определения страницы, +логика обновления данных.
 * 
 * ЕСЛИ поля ещё не выставлены (1-й запуск) - сделать также
 * ЕСЛИ поля уже выставлены - заменить значения на новые
 * ЕСЛИ выставлено больше полей, чем нужно (конечная страница)
 *     1) удалить ненужное;
 *     2) заменить значения;
 */
function setPageData(page = 1) {
    curPage = page

    // очистить содержимое tbody
    document.querySelector("#info tbody").innerHTML = ''

    // троеточие - как показатель, что перед текущими данными есть другие
    if(page > 1) {
        let th = document.createElement('th')
        th.setAttribute("colspan", "8") //занять всю строку
        th.innerText = "..."

        let tr = document.createElement('tr')
        tr.append(th)
        
        document.querySelector("#info tbody").append(tr)
    } 

    // получить данные страницы
    let pageData = dataParts[page-1]
    
    // для каждой строчки информации
    pageData.forEach((rowInfo, rowId) => {
        let tr = document.getElementById("tableRow").content.cloneNode(true)
        // заполнить каждую ячейку шаблона данными
        Array.from(tr.querySelectorAll("td")).forEach((td, index) => {
            td.innerHTML = (index == 0) ? 50*(page-1) + (rowId+1) : rowInfo[titles[index]]
        })
        // вставить
        document.querySelector("#info tbody").append(tr)
    })    
}

function setPagination() {
    // для всех страниц
    dataParts.forEach((data, page) => {
        // создать элемент пагинации
        let pagNum = document.getElementById("pagNum").content.cloneNode(true)
        pagNum.querySelector(".pagNum").innerText = page+1
        // По умолчанию выделять 1-ю
        if(page+1 == 1) pagNum.querySelector(".pagNum").classList.add("pag-selected")

        // слушатель для смены страницы
        pagNum.querySelector(".pagNum").addEventListener("click", (e) => {
            // игнорировать, если выбрана та же страница
            let isCur = false
            Array.from(document.getElementsByClassName("pagNum")).map((element, num) => {
                if(element.classList.contains("pag-selected") && num == page) {
                    isCur = true
                    return
                }
            });
            if(isCur) return
            
            // обновить данные
            setPageData(page+1) 
            // обновить выделенный пункт
            Array.from(document.getElementsByClassName("pag-selected")).forEach(pagNum => {
                pagNum.classList.remove("pag-selected")
            })
            e.target.classList.add("pag-selected")
        })

        document.getElementById("pagination").append(pagNum)
    })
}


document.getElementById("increase").addEventListener('click', () => {
    // отсортировать
    fullData = fullData.sort((a,b) => {return (a.fname < b.fname)? -1:1})
    for(let i=0; i < fullData.length/50-1; i++) {
        dataParts[i] = fullData.slice(i*50, (i+1)*50)
    } 
    // обновить информацию о странице
    setPageData(curPage)
})

document.getElementById("decrease").addEventListener('click', () => {
    // отсортировать
    fullData = fullData.sort((a,b) => {return (a.fname > b.fname)? -1:1})
    for(let i=0; i < fullData.length/50-1; i++) {
        dataParts[i] = fullData.slice(i*50, (i+1)*50)
    } 
    // обновить информацию о странице
    setPageData(curPage)
})