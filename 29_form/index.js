const form = document.getElementById("userInfo")
form.addEventListener("submit", handleFormSubmit)

function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(form)
}

function serializeForm(formNode) {
    const alertMsg = []
    Array.from(formNode).filter(el => el.type!='reset' && el.type!='submit').forEach((el) => {
        const {id, type} = el
        const value = type == "checkbox" ? el.checked : el.value

        alertMsg.push(`${id}: ${value}`)
        console.log(alertMsg.at(-1))
    })
    alert(alertMsg.join('\n'))
}