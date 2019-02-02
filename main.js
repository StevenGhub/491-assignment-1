var AM = new AssetManager();

var gameEngine = new GameEngine();




AM.queueDownload("./img/macewindu2.png");
AM.queueDownload("./img/rabbit-trap.png");
AM.queueDownload("./img/macewindu_right.png");
AM.queueDownload("./img/mathproblem.png")
AM.queueDownload("./img/macewindu_right2.png");


function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.background = new Animation();
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.background.drawMap(this.game.map, 12, this.ctx, this.spritesheet);
};

Background.prototype.update = function () {
    if (this.game.newMap) {
        this.background.drawMap(this.game.map, 12, this.ctx, this.spritesheet);
    } else {
        this.background.drawMap(this.game.map, 12, this.ctx, this.spritesheet);
    }
};
/*
function Dummy(game) {

   this.startAnim = new Animation(AM.getAsset("./img/MaceWindu.png"),0, 1700, 68, 85, 0.5, 4, true, false);
   //this.standAnim = new Animation(AM.getAsset("./img/MaceWindu.png"), 0, )


   Entity.call(this, game, 500, 500);
}

Dummy.prototype = new Entity();
Dummy.prototype.constructor = Dummy;

Dummy.prototype.update = function (){
    this.startAnim.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.x > 800) this.x = -230;

    Entity.prototype.update.call(this);
};
/*
Dummy.prototype.draw = function() {
    this.startAnim.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}*/

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/rabbit-trap.png")));
    gameEngine.addEntity(new Dummy(gameEngine));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    console.log("All Done!");
});

