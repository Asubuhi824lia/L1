/* console - тестинг MathX */

{console.log('\nN-е простое число')
    const getPrimNum = primN()      // получен локальный getPrimes(N: Number)
    console.log('11:', getPrimNum(11))
    console.log('15:', getPrimNum(15))
    console.log('7:', getPrimNum(7))
    console.log('10:', primN()(10))
}

{console.log('\nПоследовательность простых чисел до числа N')
    const getPrimNums = primNumbs() // получен локальный getPrimes(N: Number)
    console.log(getPrimNums(11))
    console.log(getPrimNums(15))
    console.log(getPrimNums(7))
    console.log(10, primNumbs()(10))
}

{console.log('\nN-е число Фиббоначи')
    console.log(fib(11))
    console.log(fib(15))
    console.log(fib(7))
}

{console.log('\nN-я последовательность чисел Фиббоначи')
    console.log(fibNums(11))
    console.log(fibNums(15))
    console.log(fibNums(7))
}


/* Интерфейс */

document.getElementById("checkFibNum").addEventListener('click', () => {
    //получить N
    const N = Number(document.getElementById("fibNum").value)

    //вычислить N-е число Фиббоначи
    const F = fib(N)

    //вывести
    document.getElementById("fibNumStatus").innerHTML = F
})

document.getElementById("checkFibNumbs").addEventListener('click', () => {
    //получить N
    const N = Number(document.getElementById("fibNumbs").value)

    //вычислить N-ю последовательность чисел Фиббоначи
    const F = fibNums(N)

    //вывести
    document.getElementById("fibNumbsStatus").innerHTML = F.map((f => `<span> ${f}</span>`))
})


document.getElementById("checkPrimNum").addEventListener('click', () => {
    //получить N
    const N = Number(document.getElementById("primNum").value)

    //вычислить N-го простого числа
    const getPrimNum = primN() 
    const prime = getPrimNum(N)

    //вывести
    document.getElementById("primNumStatus").innerHTML = prime
})

document.getElementById("checkPrimNumbs").addEventListener('click', () => {
    //получить N
    const N = Number(document.getElementById("primNumbs").value)

    //вычислить все простые числа до числа N
    const getPrimNum = primNumbs() 
    const primes = getPrimNum(N)

    //вывести
    document.getElementById("primNumbsStatus").innerHTML = primes.map((prime => `<span> ${prime}</span>`))
})