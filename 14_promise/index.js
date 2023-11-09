async function getImg(url) {
    return new Promise((resolve) => {
        fetch(url)
        // Extract as a blob
        .then((resp) => resp.blob())
        .then((blob) => {
            const img = document.createElement("img");
            // формируем url на основе blob
            img.src = URL.createObjectURL(blob);
    
            // разрешить promise с данными об изображении, когда оно загружено
            img.onload = () => {
                resolve(img);
            };
        });
    });
}

// загружаем картинку с https://placehold.co/
const img = getImg("https://placehold.co/600x400/png")
            // отобразить
            .then(img => {document.getElementsByTagName("body")[0].append(img); console.log(img)})
