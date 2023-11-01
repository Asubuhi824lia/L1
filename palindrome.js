document.getElementById("checkText").addEventListener("click", () => {
    let text = document.getElementById("InputText").value.toLowerCase()
    
    // Если во вводе есть не разрешённые символы
    const reg = /[^ \n\t.,:?!;\-—ёа-я]/g
    if(text.trim().length == 0 || text.match(reg)) {
        document.getElementById("TextStatus").innerHTML = "Проверьте ввод"
        document.getElementById("TextStatus").style.color = "gray"

        setTimeout(() => document.getElementById("TextStatus").innerText = "", 1000)
        return;
    }

    //оставить только буквы
    text = text.replace(/[^а-яё]/g, '')
    // text = text.replace(/ё/g, 'е')   Вариант без разделения "е" и "ё"
    
    const len = text.length

    /** Способ 1
     * 
     * Пройтись в цикле по половине массива,
     *   сравнивая элементы с разных концов
     */
    /*
    let isPalindrome;
    for (let i = 0; i < len/2; i++) {
        if(text[i] != text[len-1 - i]) {
            isPalindrome = false
            break;
        }
    }
    if(isPalindrome != false) isPalindrome = true;
    */


    /** Способ 2
     * 
     * Разделить строку на 2 массива, в завимости от:
     * строка чётная - разбить на 2 равных массива
     * строка нечётная
     *   - части учитывают центральную букву
     *   - обе части исключают центральную букву
     * 
     * Сравнить:
     * 1. Как строки (перевернув 1 из 2)
     * 2. Посимвольно
     *   - с переворотом строки
     *   - без переворота строки
     */


    //// Не учитывать центральную букву
    /*
    const part1 = text.slice(0, len/2)
    const part2 = (len % 2 != 0) ? text.slice(len/2 + 1) : text.slice(len/2)
    */
    
    /// Учитывать центральную букву
    // /*
    let part1, part2
    if(len % 2 != 0) {
        part1 = text.slice(0, len/2 + 1)
        part2 = text.slice(len/2)
    } else {
        part1 = text.slice(0, len/2)
        part2 = text.slice(len/2)
    }
    // */

    
    //Сравнить 1-ю и 2-ю перевёрнутую строки
    // let isPalindrome = part1 === part2.split('').reverse().join('')

    //Сравнить посимвольно
    //  - без переворота строки
    let isPalindrome;
    for (let i = 0; i < len/2; i++) {
        if(part1[i] != part2[Math.ceil(len/2)-1 - i]) {
            isPalindrome = false
            break;
        }
    }
    if(isPalindrome != false) isPalindrome = true;


    if(isPalindrome) {
        document.getElementById("TextStatus").innerText = "Палиндром!"
        document.getElementById("TextStatus").style.color = "green"
    } else {
        document.getElementById("TextStatus").innerText = "Не палиндром."
        document.getElementById("TextStatus").style.color = "red"
    }
})