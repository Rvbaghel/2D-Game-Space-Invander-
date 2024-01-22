// enemy class
export default class Enemy{
   
    constructor(x,y,imageNumber){
        this.x =x;
        this.y =y;
        this.width =50;
        this.height =40;

        this.image =new Image()
        // number that  we can use the $
        this.image.src = `picture/enemy${imageNumber}.png`;
 
   }

   // draw the enemy
   draw(ctx){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
   }

   move(xvelocity,yvelocity){
    this.x +=xvelocity;
    this.y +=yvelocity;
   }
   
   collideWith(sprite)
     {
        if(
            this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
            ) 
            {
                return true;
            }
        else{
            return false;
        }
    }

}