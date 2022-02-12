let gamepadConnected = false
const socket = new WebSocket("ws://localhost:8000")

function setup() {
    let c = createCanvas(window.innerWidth, window.innerHeight)
    c.parent('canvas-container')
}

function draw() {
    translate(width/2, height/2)
    scale(height/1000.0)
    background('black')

    let x = 0
    let y = 0
    let radius = 100

    if (gamepadConnected) {
        let gamepad = navigator.getGamepads()[0]

        x = map(gamepad.axes[0], -1, 1, -500, 500)
        y = map(gamepad.axes[1], -1, 1, -500, 500)

        if (gamepad.buttons[0].pressed) {
            fill('red')
        } else {
            fill('white')
        }

        radius = map(gamepad.buttons[7].value, 0, 1, 100, 300)
    }
        
    ellipse(x, y, radius, radius)
}

window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight)
})

window.addEventListener('gamepadconnected', () => {
    gamepadConnected = true
    socket.send('connected')
})

document.getElementById('full-screen-button').addEventListener('click', () => {
    let canvasContainer = document.getElementById('canvas-container')
    if (canvasContainer.requestFullscreen) {
        canvasContainer.requestFullscreen()
    } else {
        alert('Full screen is not supported')
    }
})
