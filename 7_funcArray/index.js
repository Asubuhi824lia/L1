const callFuncs = [
    primN()(36),
    primNumbs()(37),
    fib(19),
    fibNums(14)
]
callFuncs.forEach((func, index) => console.log(`${index}: `, func))


const funcs = [
    primN(),
    primNumbs(),
    fib,
    fibNums
]
console.log('\n\ncall')
funcs.forEach((func, index) => console.log(`${index}: `, func.call(this, 15)))

console.log('\n\napply')
funcs.forEach((func, index) => console.log(`${index}: `, func.apply(this, [15])))

console.log('\n\nbind')
funcs.forEach((func, index) => {func.bind(this); console.log(`${index}: `, func(14))})
