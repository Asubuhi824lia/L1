// Функция добавления анимации элемента на веб-странице
function addElemAnimate(elem) {
    elem.animate(
            {
                opacity: [0, 0.9, .3, 1, 0],
                easing: ["ease", "ease-in-out"],
                transform: ["scale(1) rotate(360deg) translate(70px)", "scale(.4) rotate(60deg)", "scale(1) translate(20px)"]
            },
            {
                duration: 3000,
                iterations: 7
            }
        )
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 7; i++) addDivStyle()

    Array.from(document.getElementsByClassName("inserted-elem")).forEach(elem => {
        addElemAnimate(elem)
    })
})
