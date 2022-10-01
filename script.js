import { updateGround, setupGround } from './ground.js'
import { updateSonic, setupSonic, getSonicDimensions, setSonicLose} from './sonic.js'
import { updateObstacle, setupObstacle, getObstacleDimensions} from './obstacle.js'
import { setCustomProperty } from './updateCustomProperty.js'

let lastTime
let speedScale
let score

const SPEED_INCREASE = 0.00001

//const audio = document.getElementById('music')
const scoreElement = document.querySelector('[data-score]')
const startScreenElement = document.querySelector('[data-start-screen]')
const sonicElement = document.querySelector('[data-sonic]')

setCustomProperty(sonicElement,'--bottom', 5)
document.addEventListener('keydown', handleStart, { once: true})
/*
window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0; // rewind to the start of audio
    audio.play();
    key.classList.add('playing')
});
*/
// tracks change in time as game is played to continously update everything
function update(time){
    //makes sure lastTime is equal to the time the game starts playing
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    let delta = time - lastTime
    
    updateGround(delta, speedScale)
    updateSonic(delta, speedScale)
    updatespeedScale(delta)
    updateScore(delta)
    updateObstacle(delta, speedScale)
    if(gameOver()) return handleLose()

    lastTime = time    
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

function gameOver(){
    const sonicRect = getSonicDimensions()
    return getObstacleDimensions().some(rect => isCollision(rect, sonicRect))
}

//determines collision between sonic and the obstacle
function isCollision(rect1, rect2){
    return rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top
}

function updateScore(delta){
    score += delta *.02
    scoreElement.textContent = Math.floor(score)
}

//speedScale increases over time
function updatespeedScale(delta){
    speedScale += delta * SPEED_INCREASE
}

//starts up the game
export function handleStart(){
        lastTime = null
        setupGround()
        setupSonic()
        setupObstacle()
        document.getElementById('music').play()
        startScreenElement.classList.add('hide')
        scoreElement.classList.add('show')
        sonicElement.classList.remove('remove')
        score = 0
        speedScale = 0.75
        window.requestAnimationFrame(update)      
}
//lose function
function handleLose(){
    document.getElementById('music').pause()
    setSonicLose()
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, { once: true})
        startScreenElement.classList.remove('hide')
    }, 100)
}
