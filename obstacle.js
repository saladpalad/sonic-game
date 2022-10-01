import { setCustomProperty, incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 1000
const OBSTACLE_INTERVAL_MAX = 4000
const gameElement = document.querySelector('[data-game]')

let nextObstacleTime

//whenever function is called all the obstacles are removed
export function setupObstacle(){
    nextObstacleTime = OBSTACLE_INTERVAL_MIN
    document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
        obstacle.remove()
    })
}

//function 'moves' the obstacle across the screen & and removes it after a certain point
export function updateObstacle(delta, speedScale){
    document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
        incrementCustomProperty(obstacle, '--left', delta * speedScale * SPEED * -1)
        if(getCustomProperty(obstacle, '--left') <= -100){   
            obstacle.remove()
        }
    })
    //spawns in more obstacles over time
    if(nextObstacleTime <= 0){
        createObstacle()
        nextObstacleTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }
    nextObstacleTime -= delta
}

//function is used to determine collision with sonic
export function getObstacleDimensions(){
    return[...document.querySelectorAll('[data-obstacle]')].map(obstacle => {
        return obstacle.getBoundingClientRect()
    })
}

function createObstacle(){
    const obstacle = document.createElement('img')
    obstacle.dataset.obstacle = true
    obstacle.src = 'img/spikes.png'
    obstacle.classList.add('obstacle')
    setCustomProperty(obstacle, '--left', 100)
    gameElement.append(obstacle)
}

//generates a random number between the intervals to spawn the obstacles at a random rate
function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max-min + 1) + 1)
}