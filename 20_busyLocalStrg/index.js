// Получить объём localStorage без сохранения данных
function getLocalStorageSizeKB() {
    function getLocalStorageSizeMB() {
        
        const MB_MIN = 4
        const MB_MAX = 10
        let MB, checkData;
        // Т.к. размер localStorage в диапазоне 5-10(МБ) - определяем наибольшую цифру
        try {
            for(MB = MB_MIN; MB <= 5; MB++) {

                // создаём строку длиной 5 МБ (5 * 2^20 Б)
                // 1 буква = 1 байт

                checkData = Array(MB*Math.pow(10, 6)).fill('a').join('')
                localStorage.setItem('checkData', checkData)
                // console.log(new Blob([localStorage.getItem('checkData')]).size)
            }
        } finally {
            return {MB: MB-1, checkData}
        }
    }

    // Поскольку данные нужного размера уже в localStorage - MB не используется (а мог бы)
    let {MB, checkData} = getLocalStorageSizeMB()

    return (() => {
        try {
            // добавлять по 1 КБайт
            for(let i=0; ; i++) {
                let addPart = Array(1000).fill('a').join('')
                checkData += addPart
                localStorage.setItem('checkData', checkData)
                // индикатор процесса
                console.log('+',addPart.length)
            }
        } finally {
            return new Blob([localStorage.getItem('checkData')]).size/1000
        }
    })()
}

// Сохранить данные из localStorage
function getLocalStorageData() {
    return JSON.parse(JSON.stringify(localStorage))
}
// Вернуть данные в localStorage
function setLocalStorageData(data) {
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            localStorage.setItem(key, data[key])
        }
    }
}

function getLocalStorageBusySize() {
    // Получить максимальный размер localStorage 
    // без потери данных
    let saveData = getLocalStorageData()
    const maxSizeLS = getLocalStorageSizeKB()*1000 // получить в Байтах
    localStorage.clear()
    setLocalStorageData(saveData)

    // для оптимизации повторного использования
    return (dataObj = saveData) => {
        // Получить размер занятой в localStorage памяти
        let size = 0;
        for (const key in dataObj) {
            size += new Blob([dataObj[key]]).size;
        }
        return {busy: size, max: maxSizeLS};
    }
}

const getLSBusySize = getLocalStorageBusySize()
let strgInfo = getLSBusySize( getLocalStorageData() )
console.log(`${strgInfo.busy} / ${strgInfo.max}`)

window.addEventListener("storage", () => {
    strgInfo = getLSBusySize( getLocalStorageData() )
    console.log(`${strgInfo.busy} / ${strgInfo.max} (КБ)`)
})

