import fetchPosts from './fetchPosts.js'


fetchPosts()

window.addEventListener("load", () => {
    const debFetch = debounce(fetchPosts, 300)
    document.getElementById("container").addEventListener('scroll', function() {

        // при попадании во viewport: подгрузить, если ещё есть что        
        const lowerElem = document.getElementById("container").querySelector(".post:last-child")
        if(isElemInViewPort(lowerElem)) debFetch()
    })
})


function debounce(func, delay) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

function isElemInViewPort(elem, full=false) {
    let box = elem.getBoundingClientRect();
    let top = box.top;
    let left = box.left;
    let bottom = box.bottom;
    let right  = box.right;
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    if(full) { maxWidth = right - left; maxHeight = bottom - top};
    return Math.min(height,bottom)- Math.max(0,top) >= maxHeight && Math.min(width,right)- Math.max(0,left)>= maxWidth
}