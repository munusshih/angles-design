let currentMouseX = 0
let pcurrentMouseX = 0
let currentMouseY = 0
let pcurrentMouseY = 0


function preload() {
	fontRegular = loadFont('Aleo-Bold.otf');
	fontLight = loadFont('Artegra_Sans-Extended-SC-500-Medium.otf');
}

function setup() {
	let clientHeight = document.getElementById("starbaby").clientHeight;
	let clientWidth = document.getElementById("starbaby").clientWidth;

	let cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("starbaby");
	background(100);
	angleMode(DEGREES)
	frameRate(ratey);
	// pixelDensity(17);

	modey = 1
}

function windowResized() {
	let clientHeight = document.getElementById("starbaby").clientHeight;
	let clientWidth = document.getElementById("starbaby").clientWidth;

	let cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("starbaby");
}

let modey
// let palette = ["#29339b", "#ff3cc7", "#15b097", "#ff3a20", "#ffb627"] colorful
let palette = ["#616161", "#9e9e9e", "#636363", "#8f8f8f", "#949494"]
// let rings = ["#5a5cf3", "#ff76df", "#55f2e5", "#ff766d", "#ffc471"]
let rings = ["#a6a6a6", "#bababa", "#a3a3a3", "#b5b5b5", "#b8b8b8"]

let ratey = 15;
let ny = [-40.7128, -74.0060]
let tp = [-25.0330, 121.5654]
let ld = [-51.5074, -0.1278]
let ib = [-41.0082, 28.9784]
let rad = 10
let scaler = 1

// city names

let n = 0.1
let k = 0.3

function draw() {

	if(pmouseX < 0){
		pcurrentMouseX = 0
	} else {
		pcurrentMouseX = pmouseX
	}

	if(pmouseY < 0){
		pcurrentMouseY = 0
	} else {
		pcurrentMouseY = pmouseY
	}

	if(mouseX < 0){
		currentMouseX = 0
	} else {
		currentMouseX = mouseX
	}

	if(mouseY <0){
		currentMouseY = 0
	}else {
		currentMouseY = mouseY
	}

	translate(width / 2-width/10, height / 2 - 100)
	scale(0.3)
	frameRate(ratey);

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
	// rotate(frameCount/5)

	background(0)
	noStroke()

	rounded(10, 0, c * 100)
	rounded(threeD[1] * 2, 1, c)
	rounded(threeD[2] * 3, 2, c)
	rounded(threeD[3] * 4, 3, c)
	stars()

	drawLocation()

	pop()
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

let citynames = ['Taipei,\nTaiwan', 'Istanbul,\nTurkey', 'London,\nUnited Kingdom', 'New York,\nUnited States']
let threeD = [10, 3461.44, 5014.04, 7787.35]

function drawLocation() {
	noStroke()
	for (let i = 0; i < 4; i++) {

		let rader = threeD[i] * (i + 1)
		let radx = rader * n
		let rady = rader * n * l

		fill('#5aa1e8')
		textSize(60)
		textAlign(CENTER)

		textFont(fontLight);
		push()
		translate(radx * sin(100), (rady) * cos(100))
		rotate(-(-currentMouseX / 10 + currentMouseY / 10))
		rotate(-frameCount / 3)
		text('x', 0, 0)
		pop()

		textFont(fontRegular);
		textSize(30)
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
		if ((pcurrentMouseX == currentMouseX) || (pcurrentMouseY == currentMouseY)) {
			text(citynames[i], 0, 0)
		} else {
			let randomCity = generateRandomString(int(random(5, 19))) + ',\n' + generateRandomString(int(random(5, 19)))
			text(randomCity, 0, 0)
		}
		pop()

		push()
		translate(radx * sin(100) * 1.1, rady * cos(100) * 1.4 + 100)
		rotate(-(-currentMouseX / 10 + currentMouseY / 10))
		rotate(-frameCount / 3)
		if (i != 0) {
			if ((pcurrentMouseX == currentMouseX) || (pcurrentMouseY == currentMouseY)) {
				text(threeD[i] + ' \nmiles away', 0, 0)
			} else {
				text((random(3) * 1000).toFixed(2) + ' \nmiles away', 0, 0)


			}
		}
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

				if (modey == 0) {
					if (int(random(100)) == 1) {
						circle(radx * k * sin(k * k) + randbabe, rady * k * cos(k) + randbabe, random(10, 15) * scaler);
					} else {
						circle(radx * k * sin(k * k) + randbabe, rady * k * cos(k) + randbabe, random(5) * scaler);
					}
				} else if (modey == 1) {
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

function mousePressed() {
	modey = -modey + 1
}

function keyPressed() {
	// if (keyCode === ENTER) {
	// 	save('stars' + hour() + '_' + minute() + '_' + second() + '.jpg');
	// }
	if (key == '1') {
		modey = 0
	} else if (key == '2') {
		modey = 1
	}
}