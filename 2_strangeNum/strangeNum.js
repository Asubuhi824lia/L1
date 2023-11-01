document.getElementById("checkNum").addEventListener("click", () => {
    const number = Number(document.getElementById("inputNum").value)
    
    let sum = 0
    for (let i = 0; i < number; i++) {
        // определить "делители" - числа, деление на которых даёт целое число
        if (number % i == 0) {
            //Сложить
            sum += i
        }
    }

    if(sum == number) {
        document.getElementById("NumStatus").innerHTML = true
        document.getElementById("NumStatus").style.color = "green"
    } else {
        document.getElementById("NumStatus").innerHTML = false
        document.getElementById("NumStatus").style.color = "blue"
    }
})