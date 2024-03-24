//run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;


//jump sound
var jumpSound = new Audio("jump.mp3");


//dead sound
var deadSound = new Audio("dead.mp3");


//Key Event
function keyCheck(event){

    //alert(event.which); Check the code value

    //Enter Key
    if(event.which==13){
        if(runWorkerId==0){
           runWorkerId = setInterval(run,100);
            runSound.play();

           moveBackgroundWorkerId = setInterval(moveBackground,100);
           scoreWorkerId = setInterval(updateScore,100);
           createBlockWorkerId = setInterval(createBlock,100);
           moveBlockWorkerId = setInterval(moveBlock,100);
        }
    }

    //Space Key
    if(event.which==32){
        if(jumpWorkerId==0){

            clearInterval(runWorkerId);
            runWorkerId = -1;
             runSound.pause();

            jumpWorkerId = setInterval(jump,100);
            jumpSound.play();
        }

    }
}

//Boy Run
var boyId = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;

function run(){

    runImageNumber++;
//Run Crash
    if(runImageNumber==9){
        runImageNumber=1;
    }

    boyId.src = "Run (" +runImageNumber+ ").png";

}
//Boy Jump
var  jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 423;

function jump(){

    jumpImageNumber++;

    //Jump fly
    if(jumpImageNumber <= 7){
       boyMarginTop = boyMarginTop - 30;
       boyId.style.marginTop = boyMarginTop + "px";
    }

    //Jump Landing
    if(jumpImageNumber >= 8){
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

//Jump Crash
    if(jumpImageNumber==13){
        jumpImageNumber=1;

        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();

        jumpWorkerId = 0;

        //Starting game in the jump
        if(scoreWorkerId==0){
            scoreWorkerId = setInterval(updateScore,100);
        }
        if(moveBackgroundWorkerId==0){
            moveBackgroundWorkerId = setInterval(moveBackground,100);
        }
        if(createBlockWorkerId==0){
            createBlockWorkerId = setInterval(createBlock,100);
        }
        if(moveBlockWorkerId==0){
            moveBlockWorkerId = setInterval(moveBlock,100);
        }
    }
    boyId.src = "Jump (" +jumpImageNumber+ ").png"; 

}
//Move Background
var backdroundId = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundWorkerId = 0;

function moveBackground(){
    backgroundX = backgroundX - 20;
    backdroundId.style.backgroundPositionX = backgroundX + "px";

}

//Score
var scoreId = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){

    newScore++;

    scoreId.innerHTML = newScore;

}
//Create Block
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockId = 1;

function createBlock(){

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;

    blockId++;
    
    var gap = Math.random()*(1000-400)+400; //Creating random numbers

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

}

//Move Block
var moveBlockWorkerId = 0;

function moveBlock(){

    //Using For-Loop
    for(var i=1; i<=blockId; i++){

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";



 //140

 if( newBlockMarginLeft < 140 & newBlockMarginLeft > 40){


   // alert(boyMarginTop);
    //303

    if(boyMarginTop > 303){
        clearInterval(runWorkerId);
        runSound.pause();

        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;
        clearInterval(scoreWorkerId);
        clearInterval(moveBackgroundWorkerId);
        clearInterval(createBlockWorkerId);
        clearInterval(moveBlockWorkerId);


        deadWorkerId = setInterval(dead,100);
        deadSound.play();
    //alert("Dead!");
 }
    }
}
}

//boy dead
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead(){

    deadImageNumber++;

    if(deadImageNumber==11){
        deadImageNumber=10;

        boyId.style.marginTop = "423px";

        document.getElementById("endScreen").style.visibility = "visible";

        document.getElementById("endScore").innerHTML = newScore;
    }

    boyId.src = "Dead (" +deadImageNumber+ ").png";


}

//page reload
function reload(){

    location.reload();
}