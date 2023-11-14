function debounce(func, delay) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

const handleChange = (e) => {
    console.log(e.target.value)

    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "53362a742d58f544abd88e15512af0d22ae53408";
    var query = e.target.value;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            const values = result.suggestions.map(el => el.value)
            console.log(values)
            
            setPrompts(values)
        })
        .catch(error => console.log("error", error));
}

function setPrompts(suggestions) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < suggestions.length; i++) {
        const option = document.createElement('option');
        option.textContent = suggestions[i];
        option.classList.add("suggestion")
        option.addEventListener('click', e => {
            document.getElementById('address').value = e.target.value

            // воссоздать событие input (для перезапроса)
            let event = new Event('input')
            document.getElementById('address').dispatchEvent(event)
        })
        
        fragment.appendChild(option);
    }

    // обновить список подсказок
    document.getElementById('suggestions').innerHTML = ''
    document.getElementById('suggestions').appendChild(fragment);
}

const debHandle = debounce(handleChange, 1000)
document.getElementById("address").addEventListener("input", debHandle)


document.getElementById("address").addEventListener("focus", () => document.getElementById("suggestions").style.display = 'block')
document.getElementById("address").addEventListener("blur", () => setTimeout(()=>document.getElementById("suggestions").style.display = 'none', 250))