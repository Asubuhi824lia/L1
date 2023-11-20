const SERVER_TOKEN = "b5bdbd35b5bdbd35b5bdbd3590b5c15a6fbb5bdb5bdbd35d7211d7c3e5c1d92db386d53"
const OWNER_ID = '-184019812'
const BUNCH_COUNT = 10

const getPostsQueryUrl = `https://api.vk.com/method/wall.get?callback=getPosts&access_token=${SERVER_TOKEN}&owner_id=${OWNER_ID}&v=5.154`

// offset -- из getPosts.js


export default function fetchPosts() {
    let script = document.createElement("script")
    script.src = `${getPostsQueryUrl}&offset=${offset}&count=${BUNCH_COUNT}` //смещение для дальнейших подгрузок
    offset += BUNCH_COUNT
    
    script.classList.add("getPostsQuery") //для очищения html от следов предыдущих запросов
    Array.from(document.getElementsByClassName("getPostsQuery")).forEach(script => script.remove())

    document.head.append(script)
}

export {BUNCH_COUNT}