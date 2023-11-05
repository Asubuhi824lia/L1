/*
let book = {
/// Свойства при описании не обязательны

    getTitle() {
        return this.title
    },
    getAuthor() {
        return this.author
    },
    getPublish() {
        return this.publish
    },

    setTitle(value) {
        this.title = value
    },
    setAuthor(value) {
        this.author = value
    },
    setPublish(value) {
        this.publish = value
    }
}

// задаём (создаём) свойства.
book.setAuthor('Достоевский Ф.М.')
book.setTitle('Бесы')
book.setPublish('1972')

// проверка значений.
console.log(book.getAuthor())
console.log(book.getTitle())
console.log(book.getPublish())
*/


// /* 
let book = {}

// Используя get и set 
Object.defineProperties(book, {
    title: {
        set: (value => {this.title = `title:\t${value}`}),
        get: () => this.title
    },
    author: {
        set: (value => {this.author = `author:\t${value}`}),
        get: () => this.author
    },
    publish: {
        set: (value => {this.publish = `publish:\t${value}`}),
        get: () => this.publish
    }
})

book.author = 'Достоевский Ф.М.'
book.title = 'Бесы'
book.publish = '1972'

console.log(book.title)
console.log(book.author)
console.log(book.publish)
// */