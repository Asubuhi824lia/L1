import moment from "moment"

// экспорт ф-ции для работы с датами
export default function getFullTime() {
    // использование внешней библиотеки
    return `${moment().format('dddd')}, ${moment().format('LL')}, ${moment().format('LTS')}`
}