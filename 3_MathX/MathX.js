
/* Вычисление всех простых чисел до числа N */
//(может быть как частью primNumbs(), так и её заменой)
// /*  Возвращает результат 
function primNums(N) {
    //
    // Дробные и отрицательные числа - не натуральные
    // 1 - имеет лишь один делитель
    //
    if(N < 2 || N%1 != 0) return [];
    

    let primes = Array()
    //Проверка последовательности
    for(let i = 2; i <= N; i++) {
        //Замыкание внутренней функции
        if(isPrime(i)) primes.push(i)
    }
    return primes;
}
// */
// /* Вычисление всех простых чисел до числа N */
//возврат - замкнутой на массив последовательности внутренней функции
function primNumbs() {
    /** ((Opt.
     * Замкнуть ф-цию поиска primNums(N)
     *  на внутренний массив, 
     *      хранящий все найдённые простые числа 
     *      за последовательность вызовов))
     */
    let totalPrimes = []
    const getPrimes = (N) => {
    
        if(N < 2 || N%1 != 0) return [];  //объяснено в primNums(N)

        ///Не хранится ли нужная последовательность уже?
        //  ((Возможна оптимизация алгоритмом поиска))
        if(totalPrimes.length > 0 && N <= totalPrimes.at(-1)) {
            if(N == totalPrimes.at(-1)) return totalPrimes;

            let index
            totalPrimes.forEach((num, ind) => {
                if(ind < totalPrimes.length-1) {
                    // Поиск нужной части массива
                    if(N >= num && N < totalPrimes[ind+1]) {
                        index = ind
                        return;
                    }
                }
            })
            console.log(N+' exist', totalPrimes)
            return totalPrimes.slice(0, index+1)
        }

        ///Нет? - Довысчитываем последовательность.
        //  ((Возможна оптимизация созданием ф-ции primNums(N, start),
        //   где start = totalPrimes.at(-1) => вернёт лишь неизвестную часть последовательности))
        const resPrimes = primNums(N)
        
        ///Записать новые числа
        // totalPrimes = [...resPrimes]
        for(let i = totalPrimes.length; i < resPrimes.length; i++)
            totalPrimes.push(resPrimes[i])
        return totalPrimes
    }
    return getPrimes;
}
// */
const isPrime = (n) => {
    //Достаточно проверить делители в диапазоне [0, sqrt(i)]
    for(let j=2; j*j <= n; j++) {
        // n делится на числа, помимо 1 и n?
        if(n%j == 0) return false;
    }
    return true;
}


/* вычисление N-го простого числа */
//возврат - замкнутой на массив последовательности внутренней функции
function primN() {
    let primes = []

    const getPrimes = (N) => {
        if(primes.length >= N) return primes[N-1];

        // i - кол-во найденных простых чисел
        // j - проверяемое число
        for(let i = primes.length-1; primes.length < N; i++) {
            for(let j = (primes.length==0)? 2:(primes[i]+1); ; j++) {
                if(isPrime(j)) {
                    primes.push(j)
                    break;
                }
            }
        }
        console.log(N + ' added new', primes)
        return primes[N-1];
    }
    return getPrimes;
}


/* вычисление всех чисел в ряду Фибоначчи до числа N */
//замыкание - на внутреннюю функцию, возвращает - значение
function fibNums(N) {
    if(N%1 != 0 || N < 0) return;  //объяснено в primNums(N)
    if(N == 0) return 0;
    if(N == 1) return 1;
    
    let fibs = [0, 1]

    // замыкание на локальном массиве и индексе
    const getFibNum = (i) => {
        return fibs[i-1] + fibs[i-2]
    }

    for(let i = 2; getFibNum(i) <= N; i++) fibs.push( getFibNum(i) )

    return fibs;
}


// вычисление N-го числа в ряду Фибоначчи
//замыкание - на внутреннюю функцию, возвращает - значение
function fib(N) {
    if(N%1 != 0 || N < 1) return;  //объяснено в primNums(N)
    if(N == 1) return 0;
    if(N == 2) return 1;
    
    let fibs = [0, 1]

    // замыкание на локальном массиве и индексе
    const addFibNum = (i) => {
        fibs.push( fibs[i-1] + fibs[i-2] )
    }

    for(let i = 3; i <= N; i++) addFibNum(i-1)

    return fibs[N-1];
}



// export {
//     getPrimNum,
//     getPrimNums,
//     fibNums,
//     fib
// }