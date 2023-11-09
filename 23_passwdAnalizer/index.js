const improvements = {
    length: "Пароль должен содержать не менее 8 символов!",
    lowReg: "Пароль должен иметь хотябы 1 букву в нижнем регистре!",
    upReg: "Пароль должен иметь хотябы 1 букву в верхнем регистре!",
    nums: "Пароль должен содержать цифру!",
    special: "Пароль должен иметь хотябы 1 специальный символ! ([ ] \ & / ^ $ . _ % @ | ! ? * + ( ) #)"
}
const minLength = 8;
const regExps = {
    lowReg: /[a-z]/g,
    upReg: /[A-Z]/g,
    nums: /[0-9]/g,
    special: /[[\]\&/^$._%@|!?*+=(\)#\\]/g
}
// слабый  - до половины условий выполнено
// средний - от половины условий выполнено
// сильный - все условия выполнены
const points = {
    length: false,
    lowReg: false,
    upReg:  false,
    nums:   false,
    special:false,
}
const levels = ["слабый", "средний", "сильный"]


// Не давать ввести неразрешённые символы
document.getElementById("passwd").addEventListener('input', (e) => {
    // найти неразрешённые символы
    let extra = e.target.value.match(/[^a-zA-Z0-9[\]\&/^$._%@|!?*+(\)#\\]/g)
    // если таковые есть
    if(extra) {
        extra.forEach(symb => {
            e.target.value = e.target.value.replace(symb, '') // удалить
        })
    }
})


let form = document.getElementById("check")
form.addEventListener('submit', formHandler)

function formHandler(e) {
    e.preventDefault()
    const password = document.getElementById("passwd").value

    // проверить по длине
    points.length = (password.length >= minLength)
    // проверить по содержимому
    for (const exp in regExps) {
        let isMatch = password.match(regExps[exp])
        points[exp] = isMatch ? true : false
    }
    // определить уровень
    let done = Object.values(points).filter(point => point == true).length

    let lvl = (done == Object.values(points).length) ? levels[2] : (
            (done > Math.floor(Object.values(points).length / 2)) ? levels[1] 
            : levels[0]
        )

    // вывести сообщение об уровне
    document.getElementById("level").innerText = `Уровень пароля: ${lvl}${lvl==levels.at(-1)?'!':''}`

    // предложить улучшения
    if(lvl != levels.at(-1)) {
        // подобрать сообщения
        let msgs = []
        for (const point in points) {
            if(!points[point]) msgs.push(improvements[point])
        }
        // вывести
        let impr = document.getElementById("improvements")
        msgs = msgs.map(msg => `<span style="margin-bottom: 10px">${msg}</span>`).join('<br>')
        impr.innerHTML = '<hr>'+msgs
    } else {
        document.getElementById("improvements").innerHTML = '' // очистить
    }
}