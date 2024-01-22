import Bullet from "./Bullet.js";

export default class BulletController {

    bullet = [];
    NextBUlletAllows = 0;

    constructor(canvas, maxBulletTime, Bulletcolor, SoundE) {
        this.canvas = canvas;
        this.maxBulletTime = maxBulletTime;
        this.Bulletcolor = Bulletcolor;
        this.SoundE = SoundE;

        this.ShootSound = new Audio("ss/shoot.wav");
        this.ShootSound.volume = 0.1;


    }
    draw(ctx) {
        //unlimited bullets
        this.bullet = this.bullet.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);

        this.bullet.forEach((bullet) => bullet.draw(ctx));
        if (this.NextBUlletAllows > 0) {
            this.NextBUlletAllows--;
        }
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullet.findIndex((bulle) =>
          bulle.collideWith(sprite)
        );
    
        if (bulletThatHitSpriteIndex >= 0) {
          this.bullet.splice(bulletThatHitSpriteIndex, 1);
          return true;
        }
    
        return false;
      }

    shoot(x, y, velocity, NextBUlletAllows = 0) {
        if (this.NextBUlletAllows <= 0 && this.bullet.length < this.maxBulletTime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.Bulletcolor);
            this.bullet.push(bullet);
            if (this.SoundE) {
                this.ShootSound.currentTime = 0;
                this.ShootSound.play();
            }
            this.NextBUlletAllows = NextBUlletAllows;
        }
    }
}