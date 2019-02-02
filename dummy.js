var scale = 1.5;
var canvas = document.getElementById("gameWorld");

function Dummy(game) {

  this.startAnim = new Animation(AM.getAsset("./img/macewindu2.png"), 0, 1655, 67, 85, 0.3, 4, true, false);
  this.walkAnim = new Animation(AM.getAsset("./img/macewindu_right2.png"), 886 ,625, -36, 60, 0.2, 11, true, false);
  this.standAnim = new Animation(AM.getAsset("./img/macewindu_right2.png") , 886, 75, -30, 65, 1, 1, true, false);
  this.mathAnim = new Animation(AM.getAsset("./img/mathproblem.png"), 0, 0,284, 150, 1, 1, true, false);
  this.thinkAnim = new Animation(AM.getAsset("./img/macewindu2.png"), 0, 0, 50, 66, 0.7, 4, true, false);
  this.attackAnim = new Animation(AM.getAsset("./img/macewindu_right2.png"), 889, 1745, -80, 78, 0.2, 3, true, false);
  this.begin = true;
  this.speed = 100;
  this.walking = null;
  this.standing = null;
  this.math = null;
  this.thinking = null;
  this.updateCount = 0;
  this.attack = null
  this.newMap = null;
  this.attackCount = 0;
   
  this.game = game;
  this.ctx = game.ctx;
  Entity.call(this, game, 70, 110);//70 515
}

Dummy.prototype = new Entity();
Dummy.prototype.constructor = Dummy;

Dummy.prototype.update = function (){
  //this.startAnim.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, scale);
  if (this.begin) {
    var droupDistance;
    this.walking = false;
    if (this.startAnim.isDone()) {
      this.startAnim.elapsedTime = 0;
    }
    if (this.y > 515) {
      this.y = 510;
      this.begin = false;
      this.walking = true;
    }
    droupDistance = this.startAnim.elapsedTime / this.startAnim.totalTime;

    var totalHeight = scale * 50;

      if (droupDistance > 0.5) {
          droupDistance = 1 - droupDistance;
      }
      var height = totalHeight * (-0.5 * (droupDistance * droupDistance - droupDistance));
      this.y = this.y + height;
  }

  if (this.x > 700) {
    this.game.map = [25,18,18,18,18,18,18,18,18,18,18,27,
                      11,40,40,40,40,40,40,40,40,40,40, 9,
                      11,40,40,40,40,40,40,48,48,48,40, 9,
                      11,40,40,40,40,40,40,40,40,40,40, 9,
                      11,40,40,48,48,48,48,40,40,40,40, 9,
                      11,40,40,40,40,40,40,40,40,40,40, 9,
                      11,40,40,40,40,40,40,40,40,40,40, 9,
                      11,40,40,40,40,40,40, 8,40, 40,40,9,
                      41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43];
    this.game.newMap = false;
    this.newMap = false;
    this.x = 50;
    this.updateCount = 0;
    this.attackCount = 0;
  } else {



    if (this.walking) {
      this.x += this.game.clockTick * (this.speed);
      this.attack = false;
      this.math = false;
      this.thinking = false;
      if ( (this.x > 370 && this.x < 372)) {
        this.walking = false;
        this.standing = true;
      }
    }


    if (this.standing) {
      this.math = true;
      this.updateCount ++;
    }

    if (this.attack && this.updateCount > 240) {
      this.standing = false;
      this.thinking = false;
      this.math = false;
      this.newMap = true;
    }
    if (this.newMap) {
      this.game.map = [25,18,18,18,18,18,18,18,18,18,18,27,
                        11,40,40,40,40,40,40,40,40,40,40, 9,
                        11,40,40,40,40,40,40,48,48,48,40, 9,
                        11,40,40,40,40,40,40,40,40,40,40, 9,
                        11,40,40,48,48,48,48,40,40,40,40, 9,
                        11,40,40,40,40,40,40,40,40,40,40, 9,
                        11,40,40,40,40,40,40,40,40,40,40, 9,
                        11,40,40,40,40,40,40,40,40, 40,40,9,
                        41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43];
    }
  }

  Entity.prototype.update.call(this);
};

Dummy.prototype.draw = function() {
  if (this.begin) {
    this.startAnim.drawFrame(this.game.clockTick, this.ctx, this.x, this.y , scale);
  }
  else if (this.walking)
    this.walkAnim.drawFrame(this.game.clockTick, this.ctx, this.x + 50, this.y + 23, scale);
  else if (this.standing)
    this.standAnim.drawFrame(this.game.clockTick, this.ctx, this.x + 50, this.y + 23, scale);
  else if (this.attack) {
    this.attackAnim.drawFrame(this.game.clockTick, this.ctx, this.x + 100, this.y, scale);
    this.attackCount ++;
    if (this.attackCount > 15) {
      this.walking = true;
    }
  }
  
  
  if (this.math) {
    this.mathAnim.drawFrame(this.game.clockTick, this.ctx, this.x + 50, this.y - 60, scale*0.5);
    this.thinking = true;
  } 
  if (this.thinking && this.updateCount > 70) {
    this.thinkAnim.drawFrame(this.game.clockTick, this.ctx, this.x + 19, this.y + 19, scale * 0.35);
    this.attack = true;
    this.thinking = false;  
  }
    


  Entity.prototype.draw.call(this);
}
