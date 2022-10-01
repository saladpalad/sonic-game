import { getCustomProperty, incrementCustomProperty, setCustomProperty  } from "./updateCustomProperty.js"
const groundElement = document.querySelectorAll('[data-ground]')
const beforeGroundElement = document.querySelector('[data-starting-ground]')

const SPEED = 0.05

export function setupGround(){
    beforeGroundElement.classList.add('hide')
    setCustomProperty(groundElement[0], '--left', 0)
    setCustomProperty(groundElement[1], '--left', 200)

}

export function updateGround(delta, speedScale){
    //makes the ground move continously
    groundElement.forEach(ground => {
        incrementCustomProperty(ground, '--left', delta * speedScale * SPEED * -1)

       if(getCustomProperty(ground, '--left') <= -200){
            incrementCustomProperty(ground, '--left', 350)
        }
    })
}