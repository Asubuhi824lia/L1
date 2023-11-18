import fetchPosts from './fetchPosts.js'


fetchPosts()

window.addEventListener("load", () => {
    const debFetch = debounce(fetchPosts, 300)
    window.addEventListener('scroll', function() {
        // узнать позицию для подгрузки новых данных
        const lowScrollPos = document.getElementById("container").scrollHeight - 600

        // подгрузить, если ещё есть что        
        if(!isEnd)
            if(window.scrollY > lowScrollPos) debFetch()
    })
})

function debounce(func, delay) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}