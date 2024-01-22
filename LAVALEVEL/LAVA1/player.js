export default class Player {
    rightpressed = false;
    leftpressed = false;
    shootepressed =false;

    constructor(canvas, velocity,bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController =bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;

        this.width = 60;
        this.height = 70;

        this.image = new Image();

        this.image.src = "picture/player.png";

        document.addEventListener("keyup", this.keyup);
        document.addEventListener("keydown", this.keydown);

    }
    draw(ctx) {
        
        if(this.shootepressed){
            this.bulletController.shoot(this.x+this.width/2,this.y,4,10)
           
        }
        this.move();

        this.conbountreys();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    conbountreys(){
        if(this.x<0){
            this.x =0;
        }
        if(this.x >this.canvas.width - this.width)
        {
            this.x =this.canvas.width -this.width;
        }
    }
    move(){
        if (this.rightpressed) {
            this.x += this.velocity;
        }
        else if (this.leftpressed) {
            this.x += -this.velocity;
        }
    }

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightpressed = true;

        }
        if (event.code == "ArrowLeft") {
            this.leftpressed = true;
        }
        if(event.code == "Space"){
            this.shootepressed =true;

        }
    };

    keyup = (event) => {
        if (event.code == "ArrowRight"){
            this.rightpressed = false;
        }
        if (event.code == "ArrowLeft"){
            this.leftpressed = false;
        }
        if(event.code == "Space"){
            this.shootepressed =false;
        }
        
    };
}