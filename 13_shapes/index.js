class Shape {
    _getArea(value) {return value}
    _getPerimeter(value) {return value}
}

class Circle extends Shape {
    #r
    constructor(r) {
        super()
        this.#r = r
    }

    getArea() {
        return super._getArea(Math.PI*Math.sqrt(this.#r))
    }
    getPerimeter() {
        return super._getPerimeter(2*Math.PI*this.#r)
    }
}

class Triangle extends Shape {
    #a
    #b
    #c

    constructor(a, b, c) {
        super()
        this.#a = a
        this.#b = b
        this.#c = c
    }

    getArea() {
        // по формуле Герона
        const p = this.getPerimeter()/2
        return super._getArea(Math.sqrt(p*(p - this.#a)*(p - this.#b)*(p - this.#c)))
    }
    getPerimeter() {
        return super._getPerimeter(this.#a + this.#b + this.#c)
    }
}

class Rect extends Shape {
    #a
    #b

    constructor(a, b) {
        super()
        this.#a = a
        this.#b = b
    }

    getArea() {
        return super._getArea(this.#a*this.#b)
    }
    getPerimeter() {
        return super._getPerimeter(2*this.#a + 2*this.#b)
    }
}

