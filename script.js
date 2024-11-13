const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//Set Cavnas Width and Height to Full Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Colors array for balls
const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

let ballsArray = [];
let circlesArray = [];

function Balls(x,y) {
    
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.color = colors[Math.round(Math.random() * colors.length)];

    //Speed of moving the balls position
    this.speedX = Math.random() * 3 -1.5;
    this.speedY = Math.random() * 3 -1.5;

    this.update = ()=>{
        //If conditions are used to show a classic effect of balls
        if (this.radius >= 10) {
            this.x += this.speedX * 5;
            this.y += this.speedY * 5;
        }
        if (this.radius <= 9) {
            this.x += this.speedX * 2;
            this.y += this.speedY * 2;
        }
        if (this.radius > 4) {
            this.radius -= .7;
        }
        if (this.radius < 4) {
            this.radius -= .2;
        }
    }

    //Draw to render the balls on the canvas
    this.draw = ()=>{
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        context.fill();
        
    }
}

//Function to render all the balls in the ball array
function renderBalls() {
    for (let i = 0; i < ballsArray.length; i++) {
        ballsArray[i].draw();
        ballsArray[i].update();
        //Slice the ball when ball radius is less then .1
        if (ballsArray[i].radius <= .1) {
            ballsArray.splice(i,1);
            i--;
        }
    }
}

function Circle(x,y) {
    
    this.x = x;
    this.y = y;
    this.radius = 1;
    this.color = `rgba(255,255,255,.3)`;
    //Circle stroke
    this.lineWidth = 2;

    this.update = ()=>{
        //If Condition for classic circle effect
        if (this.radius < 60) {
            this.radius += 10
        }
        if (this.radius > 60) {
            this.radius += 2;
            this.color = `rgba(255,255,255,.1)`;
        }
    }

    this.draw = ()=>{
        context.strokeStyle = this.color;
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        context.stroke();
        
    }
}

//Render function for circles to render all the circles in the circle array
function renderCircles() {
    for (let i = 0; i < circlesArray.length; i++) {
        circlesArray[i].draw();
        circlesArray[i].update();
        if (circlesArray[i].radius >= 100) {
            circlesArray.splice(i,1);
            i--;
        }
    }
}

//Animate Function
function animate() {
    context.fillStyle = `rgba(17 ,17 ,22, 1)`;
    context.fillRect(0,0,canvas.width,canvas.height);
    renderBalls();
    renderCircles();
    requestAnimationFrame(animate)
}

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('click',(e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    circlesArray.push(new Circle(mouseX,mouseY))
    //Push 20 Balls in the array and render on the canvas
    for (let i = 0; i < 20; i++) {
        ballsArray.push(new Balls(mouseX,mouseY))
    }
})



//Always call the animate function at the bottom of the code!
animate();