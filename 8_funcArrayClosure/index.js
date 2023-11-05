// ф-ция, принимающая массив функций без аргументов
function setFuncArray(funcArray) {
    // ф-ция возврата массива результатов
    //     выполнения ф-ций с указанным аргументом
    const execFuncArray = (value) => {
        let funcRes = []
        funcArray.forEach(func => funcRes.push( func(value) ))
        return funcRes
    }

    return execFuncArray
}

const funcs = [
    primN(),
    primNumbs(),
    fib,
    fibNums
]
// замкнуть на массиве функций
const execFuncs = setFuncArray(funcs)
// получить результат выполнения ф-ций с аргументом
console.log(execFuncs(11))

