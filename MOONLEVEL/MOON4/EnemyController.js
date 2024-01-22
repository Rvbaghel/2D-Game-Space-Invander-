import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

// class of EnemyController
export default class EnemyController {

    //enemy number of image
    EnemyMap = [

        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // [0, 0, 2, 2, 2, 2, 2, 2, 0, 0],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 1, 1, 2, 3, 0, 0, 0],
        [0, 0, 0, 1, 1, 2, 3, 0, 0, 0],
        [0, 0, 0, 1, 1, 2, 3, 0, 0, 0],
        
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],

    ];

    enemyrow = [];
    //current is first right side
    currentdirection = MovingDirection.right;
    xvelocity = 0;
    yvelocity = 0;
    defaultXvelocity = 1.8;
    defaultYvelocity = 1.8;

    //control of the time of moving
    MovingDownTimerD = 10;

    fireBulletTimerD = 25;

    MovingDownTimer = this.MovingDownTimerD;

    fireBulletTimer = this.fireBulletTimerD;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemyDethSound = new Audio ('ss/enemy-death.wav');
        this.enemyDethSound.volume = 0.5;
        
        this.createEnemy();
    }

    draw(ctx) {
        this.decrementMoveDirection();
        //update is move the enemys
        this.updatevelocityanddirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resettimer();
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyrow.forEach((enemyrow) => {
          enemyrow.forEach((enemy, enemyIndex) => {
            if (this.playerBulletController.collideWith(enemy)) {
                this.enemyDethSound.currentTime =0;
                this.enemyDethSound.play();
              enemyrow.splice(enemyIndex, 1);
            }
          });
        });
    
        this.enemyrow = this.enemyrow.filter((enemyrow) => enemyrow.length > 0);
      }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerD;
            const allenemy = this.enemyrow.flat();
            const enemyIndex = Math.floor(Math.random() * allenemy.length);
            const enemy = allenemy[enemyIndex];
            this.enemyBulletController.shoot(enemy.x+enemy.width/2, enemy.y, -4);
            //console.log(enemyIndex);    
        }
    }
    //resettimer
    resettimer() {
        if (this.MovingDownTimer <= 0) {
            this.MovingDownTimer = this.MovingDownTimerD;
        }
    }
    //decrementmovedirection
    decrementMoveDirection() {
        if (this.currentdirection === MovingDirection.downleft ||
            this.currentdirection === MovingDirection.downright) {
            this.MovingDownTimer -- ;
        }
    }
    // logic of moving the velocity and direction
    updatevelocityanddirection() {
        for (const enemyrow of this.enemyrow) {
            if (this.currentdirection == MovingDirection.right) {
                this.xvelocity = this.defaultXvelocity;
                this.yvelocity = 0;
                //left side moving 
                const rightMostEnemy = enemyrow[enemyrow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentdirection = MovingDirection.downleft;
                    break;
                }
            } else if (this.currentdirection === MovingDirection.downleft) {
                if (this.movedown(MovingDirection.left)) {
                    break;
                }
            } else if (this.currentdirection === MovingDirection.left) {
                this.xvelocity = -this.defaultXvelocity;
                this.yvelocity = 0;
                const leftMostEnemy = enemyrow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentdirection = MovingDirection.downright;
                    break;
                }
            } else if (this.currentdirection === MovingDirection.downright) {
                if (this.movedown(MovingDirection.right)) {
                    break;
                }
            }

        }
    }

    // logic of down the enemy 
    movedown(newDirection) {
        this.xvelocity = 0;
        this.yvelocity = this.defaultYvelocity;
        if (this.MovingDownTimer <= 0) {
            this.currentdirection = newDirection;
            return true;
        }
        return false;
    }

    // draw to and moving 
    drawEnemies(ctx) {
        this.enemyrow.flat().forEach((enemy) => {
            enemy.move(this.xvelocity, this.yvelocity);
            enemy.draw(ctx);
        })
    }

    // create the enemy by bitween spaces
    createEnemy() {
        this.EnemyMap.forEach((row, rowIndex) => {
            this.enemyrow[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    //crete the enemy for rowindex for number by enemy
                    this.enemyrow[rowIndex].push(
                        //enemy space bitween like boss type
                        new Enemy(enemyIndex * 45, rowIndex * 25, enemyNumber))
                }
            })
        })
    }

    collideWith(sprite){
        return this.enemyrow.flat().some((enemy) => enemy.collideWith(sprite));
    }
}