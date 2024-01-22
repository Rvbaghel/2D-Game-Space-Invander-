import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./bulletController.js";

//create the canvas to playing game
const canvas =document.getElementById("mycanvas")
const ctx =canvas.getContext("2d")

canvas.width =1200;
canvas.height =600;


//canvas background image
const background = new Image()
background.src = "picture/re.jpg";


const playerBulletController = new BulletController(canvas,4,"white",true);
const enemyBulletController =new BulletController(canvas,20,"red",false);
const enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);

// velocity can controll the a smoth touch
const player =new Player(canvas,4,playerBulletController)

let gameover =false;
let win= false;


function game(){
    checkgameover();
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    display();
    if(!gameover){
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    //console.log(gameover);
    }
}

function display()
{
    if(gameover){
        let text = win ? "COMPLATE LEVEL 2" : "GAMEOVER START WITH LEVEL 1";
        let textOffset = win ? 3.5 : 35;

     if(win){
        ctx.fillStyle = "white";
        document.getElementById("win").play();
        document.getElementById("ok").style.cursor ="pointer";
        document.getElementById("MOON2Id").href ="MOON3.html";
     }   
     if(!win){
        ctx.fillStyle = "white";
        document.getElementById("over").play();
     }
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }

    }

function checkgameover(){
    if(gameover){
        return ;
    }
    if(enemyBulletController.collideWith(player)){
        gameover =true;
    }
    if(enemyController.collideWith(player)){
        gameover =true;
    }
    if(enemyController.enemyrow.length === 0){
        win =true;
        gameover =true;
    }
    
}
 setInterval(game,1000/60)
