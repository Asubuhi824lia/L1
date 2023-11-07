// функция вывода указанного количества секунд посекундно
async function countSec(sec = 15) {
    let result
    for(let i=1; i<=sec; i++) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(i), 1000)
        });
        result = await promise
        console.log(result)
    }
    return result
} 


// вызов и обработка полученного значения
countSec(10).then(lastSec => console.log('Final second: ', lastSec, '!'))