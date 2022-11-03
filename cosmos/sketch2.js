// mouse interaction
let currentMouseX = 0
let currentMouseY = 0

// canvas
const starbaby = document.getElementById("starbaby")
let clientHeight = starbaby.clientWidth * 1.4142;
let clientWidth = starbaby.clientWidth;

// setups
let modey = true
let showCityName = true
let timezone = "(GMT+5)"
let textGrid = false
let colorA = '#5aa1e8';
let border = 20
let title = {
    host:"",
    title: "",
    location: "",
    speaker: "",
    time: ""
}
const palette = ["#616161", "#9e9e9e", "#636363", "#8f8f8f", "#949494"]
const rings = ["#a6a6a6", "#ffffff", "#bababa", "#a3a3a3", "#b5b5b5", "#b8b8b8"]

// cities
let ratey = 15
let rad = 10
let n = 0.1
let k = 0.3
let scaler = 1
const ny = [-40.7128, -74.0060]
const tp = [-25.0330, 121.5654]
const ld = [-51.5074, -0.1278]
const ib = [-41.0082, 28.9784]

function preload() {
    fontRegular = loadFont('../Aleo-Bold.otf');
    fontLight = loadFont('../Artegra_Sans-Extended-SC-500-Medium.otf');
}

function setup() {
    const cnv = createCanvas(clientWidth, clientHeight);
    cnv.parent("#starbaby");
    background(100);
    angleMode(DEGREES)
    frameRate(ratey);
    textinput()
}

function windowResized() {
    clientHeight = starbaby.clientWidth * 1.4142;
    clientWidth = starbaby.clientWidth;
    let cnv = resizeCanvas(clientWidth, clientHeight);
}

function textinput() {
    title.host = document.getElementById("host").value
    title.title = document.getElementById("title").value.replace(/\r\n|\r|\n/g, "</br>")
    title.location = document.getElementById("location").value
    title.time = document.getElementById("time").value
    title.speaker = document.getElementById("speaker").value

    console.log(title.title)
}

function inputs() {
    const mx = document.getElementById("mx").value
    const my = 400 - document.getElementById("my").value
    const mager = document.getElementById("mager").value/ 483 * width
    const lineHeighter = document.getElementById("lineHeighter").value/ 483 * width

    return {
        mx,
        my,
        mager,
        lineHeighter
    }
}

function draw() {

    const {
        mx,
        my,
        mager,
        lineHeighter
    } = inputs()

    currentMouseX = constrain(mx, 0, mx)
    currentMouseY = constrain(my, 0, my)

    push()
    background(0)
    translate(width / 2 - width / 10, height / 2 - 100)
    scale(mager)

    push()
    translate(width / 2, height / 2)
    if (currentMouseX != 0) {
        l = map(currentMouseX, 50, width - 50, -0.3, 0.5)
        l += map(currentMouseY, 50, height - 50, -0.5, 0.5)
    } else {
        l = 0.1
    }
    n = map(currentMouseY, 50, height - 50, 0.03, 0.1)
    c = map(currentMouseY, 50, height - 50, 3, 1)

    rotate(-currentMouseX / 10 + currentMouseY / 10)
    rotate(frameCount / 3)
    noStroke()

    rounded(10, 0, c * 100)
    rounded(threeD[1] * 2, 1, c)
    rounded(threeD[2] * 3, 2, c)
    rounded(threeD[3] * 4, 3, c)
    stars()

    if (showCityName) {
        drawLocation(mager)
    }
    pop()
    pop()

    titleText(lineHeighter)
    despText()
}

function rounded(rad, cities, c = 1) {
    let radx = rad * n
    let rady = rad * n * l

    for (let i = 0; i < 360; i += c) {
        fill(random(rings))
        noStroke()
        star(radx * sin(i), rady * cos(i), random(3) * scaler, 3 + random(12) * scaler, random(5, 10));

        if ((rad == threeD[3])) {
            stroke(255)
            if (int(i % 60) == 1) {
                strokeWeight(6)
                line(radx * sin(i), rady * cos(i), radx * sin(i) * 1.03, rady * cos(i) * 1.03)
                circle(radx * sin(i) * 1.1, rady * cos(i) * 1.1 * scaler, 4)
            }
            if (int(i % 5) == 1) {
                strokeWeight(3)
                line(radx * sin(i), rady * cos(i), radx * sin(i) * 1.03, rady * cos(i) * 1.03)
            }
        }
    }
}

const citynames = ['Taipei, Taiwan', 'Istanbul, Turkey', 'London, United Kingdom', 'New York, United States']
const threeD = [0, 3461.44, 5014.04, 7787.35]

function drawLocation(mager) {
    noStroke()
    for (let i = 0; i < 4; i++) {

        let rader = threeD[i] * (i + 1)
        let radx = rader * n
        let rady = rader * n * l

        fill(colorA)
        textSize(60* 0.3 / mager)
        textAlign(CENTER)

        textFont(fontLight);
        push()
        translate(radx * sin(100), (rady) * cos(100))
        rotate(-(-currentMouseX / 10 + currentMouseY / 10))
        rotate(-frameCount / 3)
        text('x', 0, 0)
        pop()

        textFont(fontRegular);
        textSize(30 * 0.3 / mager)
        textAlign(LEFT)

        const generateRandomString = (num) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>?!@#$%^&*()_+|\:,.';
            let result1 = Math.random().toString(36).substring(2, num);

            return result1;
        }


        push()
        translate(radx * sin(100) + 50, rady * cos(100))
        rotate(-(-currentMouseX / 10 + currentMouseY / 10))
        rotate(-frameCount / 3)
        text(citynames[i] + '\n' + threeD[i] + ' \nmiles away', 0, 0)
        pop()

    }
}

function stars() {

    strokeWeight(0)
    stroke(255)
    for (let i = 0; i < 3; i++) {
        for (let j = threeD[i]; j < threeD[i + 1]; j += 500) {
            if (j < 1000) {
                j = 1000
            }

            for (let k = 0; k < 1000; k++) {
                let radx = j * n / 100
                let rady = j * n * l / 10
                // let randbabe = random(-10, 10)
                let randbabe = 0

                if (!modey) {
                    if (int(random(100)) == 1) {
                        circle(radx * k * sin(k * k) + randbabe, rady * k * cos(k) + randbabe, random(10, 15) * scaler);
                    } else {
                        circle(radx * k * sin(k * k) + randbabe, rady * k * cos(k) + randbabe, random(5) * scaler);
                    }
                } else if (modey) {
                    if (int(random(100)) == 1) {
                        circle(radx * k * sin(k) + randbabe, rady * k * cos(k) + randbabe, random(10, 15) * scaler);
                    } else {
                        circle(radx * k * sin(k) + randbabe, rady * k * cos(k) + randbabe, random(5) * scaler);
                    }
                }

                fill(random(palette))
            }
        }
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = 360 / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function titleText(lineHeighter) {
    push()
    textAlign(LEFT, TOP)
    textJustify(title.title, 0, 0, lineHeighter, 50, "axia-stencil")

    textFont("neue-haas-unica")
    textSize(10 / 483 * width)
    textAlign(LEFT)
    text(title.host, border / 483 * width , (lineHeighter+10))

    push()
    textFont("neue-haas-unica")
    textAlign(RIGHT)
    textSize(10 / 483 * width)
    text(moment(title.time).format('YYYY')+" Lecture Series", (width-border*5) / 483 * width , (lineHeighter+10))
    pop()

    pop()
}

function despText() {
    ctime = moment(title.time).zone('UTC+05:30').format('MMM.*DD*[[]ddd[]] h:mm*a YYYY*')+timezone

    displayText = title.speaker.toUpperCase() + ", " + title.location.toUpperCase() + "</br>" + ctime.toUpperCase() + " via*zoom"

    displayText = displayText.replaceAll(" ", "        ")
    displayText = displayText.replaceAll("*", "  ")

    push()
    textJustify(displayText, 0, height*0.9, 25, 17, "neue-haas-unica")
    pop()
}

function textJustify(a, x, y, lineHeighter, sizer, fonter) {
    a.split("</br>").forEach((t, i) => {

        textFont(fonter)
        textSize(sizer / 483 * width)
        tArray = t.split("")
        sum = 0
        yOffset = i * lineHeighter

        tArray.forEach((d) => {
            sum += textWidth(d)
        })

        spacing = (width - border * 2 - sum) / (tArray.length - 1)
        sum = 0
        border = 20 / 483 * width

        tArray.forEach((d, j) => {
            fill(colorA)
            text(d, border + spacing * j + sum, border + yOffset + y)
            noFill(colorA)
            stroke(colorA)

            if (textGrid) {
                rect(border + spacing * j + sum, border + yOffset + y, textWidth(d), sizer)
            }

            sum += textWidth(d)
        })
    })
}

// interactions

function spiraling() {
    modey = !modey
}

function cityCheck() {
    showCityName = !showCityName
}

function gridCheck() {
    textGrid = !textGrid
}

function changeColor(newColor) {
    colorA = newColor
}