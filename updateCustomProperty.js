//returns css values of the specificed element
export function getCustomProperty(elem, prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

//sets the css value of the element to a given element
export function setCustomProperty(elem, prop, value){
    elem.style.setProperty(prop, value)
}

//increases the css value of the given element
export function incrementCustomProperty(elem, prop, inc){
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)

}