//Declaring and Initialising the variable
let soundWaterfall = document.getElementById('soundWaterfall');
let canvas = document.getElementById('canvasWaterfall');
let ctx = canvas.getContext('2d');

//Variables for the animation
let animationId;//mdn
const numDrops = 70;
let drops = [];

//This part uses for loop to initialise raindrops and animation data
function createDrops(){
    drops = [];
    for (let i = 0; i < numDrops; i++){//This creates each raindrop.
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 40 + 10,
            speed: Math.random() * 2 + 1
        });
    }
}

//To save and load preferred sound and manage localStorage
function savePreferredSound(isOn){
    localStorage.setItem('waterfallSound', isOn ? 'on': 'off');    
}

function loadPreferredSound(){
    return localStorage.getItem('waterfallSound') === 'on';
}

//To create waterfall animation by drawing raindrops
function waterfallDraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);//inspiration from wolfnote
    
    drops.forEach(drop => {//mdn
        ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
        ctx.fillRect(drop.x, drop.y, 2, drop.length);

        drop.y += drop.speed;

        //This resets drop to drop should it go off screen
        if(drop.y > canvas.height){
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
    animationId = requestAnimationFrame(waterfallDraw);//mdn
}

//To start animation and sounds
function waterfallPlay(){
    if(soundWaterfall.paused){
        soundWaterfall.play();
        savePreferredSound(true);
    }
    createDrops();
    waterfallDraw();  
}

//This stop animation cancels the sound operation
function waterfallStop(){
    if(!soundWaterfall.paused){
    soundWaterfall.pause();
    }
    cancelAnimationFrame(animationId);//This cancels the sound operation
}

//To auto-start sound if saved preference is 'on'
window.onload = function (){
    if (loadPreferredSound()){
        waterfallPlay();
    }
};

    




