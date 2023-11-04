/**
 * 
 * @param {String} nom_singular  // nominative
 * @param {String} parent_singular 
 * @param {String} parent_plural 
 */
function numNounEnding(nom_singular, parent_singular, parent_plural) {
    return (num) => {
        let mod = Math.abs(num)
        // 1, 21,31... 
        if(mod%10 == 1 && mod%100-mod%10 != 10) return `${num} ${nom_singular}`
        // 2,3,4, 22,23,24,32... 
        if((mod%10 == 2 || mod%10 == 3 || mod%10 == 4) && mod%100-mod%10 != 10) return `${num} ${parent_singular}`
        // 5,6,7,8,9,0... 11,12,13,14 
        else return `${num} ${parent_plural}`
    }
}


let wordForms = [false, false, false]
Array.from(document.querySelectorAll("#getWordForms input")).forEach((input, index) => {
    input.addEventListener("blur", e => {
        e.target.value = e.target.value.trim()
        if(e.target.value.length != 0) {
            wordForms[index] = e.target.value   // записать значение

            // Если не осталось незаполненных полей
            if( wordForms.filter(val => val === false).length == 0 ) {
                console.log(wordForms.filter(val => val === false).length)

                window.getWordForms = numNounEnding(wordForms[0], wordForms[1], wordForms[2])
                document.querySelector("#setWordForms input").removeAttribute("disabled")

                Array.from(document.querySelectorAll("#getWordForms input")).forEach(input => input.setAttribute("disabled","disabled"))
            }
        }
        else wordForms[index] = false
    })
})

document.querySelector("#setWordForms input").addEventListener("input", input => {
    if(input.target.value.length > 0) document.querySelector("#setWordForms button").removeAttribute("disabled")
    else document.querySelector("#setWordForms button").setAttribute("disabled","disabled")
})

document.querySelector("#setWordForms button").addEventListener("click", () => {
    let num = document.querySelector("#setWordForms input").value
    console.log( window.getWordForms(num) )
    document.querySelector("#result").innerText = window.getWordForms(num)
})


{
    const getEnding = numNounEnding("сообщение", "сообщения", "сообщений")
    console.log(getEnding(1))
    console.log(getEnding(11))
    console.log(getEnding(21))
    console.log(getEnding(111))
    console.log(getEnding(31))
    console.log(getEnding(5))
    console.log(getEnding(6))
    console.log(getEnding(0))
    console.log(getEnding(11))
    console.log(getEnding(12))
    console.log(getEnding(14))
    console.log(getEnding(24))
    console.log(getEnding(25))
    console.log(getEnding(26))
    console.log(getEnding(27))
    console.log(getEnding(137))
}