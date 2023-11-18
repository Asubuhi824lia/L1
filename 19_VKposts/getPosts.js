globalThis.offset = 0


let isEnd = false   // false - подгрузка нужна, true - не нужна
function getPosts(posts) {
    // сохранить для подгрузки
    if(posts.response.count <= globalThis.offset) isEnd = true;

    // выделить нужную информацию
    let postsInfo = posts.response.items.map(post => {
        const {text, date} = post
        return {text, date}
    });

    // вывести часть постов
    showPostsInfo(postsInfo)
}
function showPostsInfo(postsInfo) {
    const fragment = document.createDocumentFragment();
    
    postsInfo.forEach(post => {
        post.date = new Date(post.date * 1000) //из миллисекунд в дату
        post.date = formatDate(post.date) //привести к нужному формату
        
        // сформировать элемент поста
        let article = document.getElementById("postTmp").content.cloneNode(true)
        article.querySelector("time").innerHTML = `<b>${post.date}</b>`
        article.querySelector("p").textContent = post.text
        fragment.append(article)
    })

    document.getElementById('container').appendChild(fragment);

}
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return `${date.toLocaleDateString("ru", options)} в ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}