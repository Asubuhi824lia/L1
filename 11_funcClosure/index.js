function outsideFunc() {
    const value = "A variable of outside function."
    console.log("'outsideFunc()' executed.")
    return function() {
        return value;
    }
}

// выполнение внешней функции
const innerFunc = outsideFunc()
// получение переменной внешней ф-ции после её выполнения
console.log(innerFunc())