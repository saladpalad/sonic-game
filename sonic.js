import { incrementCustomProperty, getCustomProperty, setCustomProperty } from './updateCustomProperty.js'

const audio = document.getElementById('music')
const sonicElement = document.querySelector('[data-sonic]')

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const SONIC_MOVE_FRAME_COUNT = 6
const SONIC_JUMP_FRAME_COUNT = 4
const FRAME_TIME = 100

let isJumping
let sonicMoveFrame
let sonicJumpFrame
let currentFrameTime 
let yVelocity

//initial setup of the sprite
export function setupSonic(){
    console.log(sonicJumpFrame)
    isJumping = false
    sonicMoveFrame = 0
    sonicJumpFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(sonicElement,'--bottom', 5)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}


export function updateSonic(delta, speedScale){
    handleRun(delta, speedScale)
    handleJump(delta)
}

//function is used to determine collision between sonic and the obstacle
export function getSonicDimensions(){
    return sonicElement.getBoundingClientRect()
}

export function setSonicLose(){
    sonicElement.src = 'img/sonic-lose.png'
    audio.currentTime = 0;  
}

//function allows the running animation of the sprite to be played
function handleRun(delta, speedScale){
    console.log(sonicJumpFrame)
    if (isJumping){
        if(currentFrameTime >= FRAME_TIME){
        sonicJumpFrame = (sonicJumpFrame + 1) % SONIC_JUMP_FRAME_COUNT
        sonicElement.src = `img/sonic-jump-${sonicJumpFrame}.png`
        currentFrameTime -= FRAME_TIME
        return
        }
    }

    if(currentFrameTime >= FRAME_TIME){
        sonicMoveFrame = (sonicMoveFrame + 1) % SONIC_MOVE_FRAME_COUNT
        sonicElement.src = `img/sonic-move-${sonicMoveFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale

}

//bottom property is changed to mimic jumping
function handleJump(delta){
    if(!isJumping) return

    incrementCustomProperty(sonicElement, "--bottom", yVelocity * delta)
    if(getCustomProperty(sonicElement, "--bottom") <= 5){
        setCustomProperty(sonicElement, '--bottom', 5)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e){
    if(e.code != 'Space'|| isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}