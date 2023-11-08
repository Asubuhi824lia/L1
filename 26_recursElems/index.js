// Рекурсивный обход дерева DOM

/**
 * функция, которая рекурсивно обходит дерево DOM, 
 * начиная с указанного элемента, 
 * и выполняет вывод инфо о теге в консоль.
 */


console.log(document.getElementsByTagName("body"))
function getElems(element = document.getElementsByTagName("body")[0], lvl = 1) {
    
    // пройтись по всем последующим элементам
    while(element) {
        console.log(`${getTab(lvl)}Lvl.${lvl}:`, element)
        // переход к вложенным элементам
        if(element.children.length > 0) Array.from(element.children).forEach(e => getElems(e, lvl+1));
        // переход к следующему элементу
        element = element.nextElementSibling
    }
}
function getTab(tabSize) {
    let tab = ''
    for (let i = 0; i < tabSize*4; i++) {
        tab += ' '
    }
    return tab
}


getElems()