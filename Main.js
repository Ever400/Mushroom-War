// create a new scene named "Game"
var gameScene = new Phaser.Scene('Game');
 
// our game's configuration
var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 1000, // game width
  height: 530, // game height
  scene: gameScene // our newly created scene
};
 
// create the game, and pass it the configuration
var game = new Phaser.Game(config);
// load asset files for our game
gameScene.preload = function() {
  
    // load images
    this.load.image('background', 'War/Maps/egyptmap.png');
    this.load.image('Player', 'War/Character/Shiitake.png');
    
    this.load.image('background', 'War/Maps/MapO1.png');
};

var player;// = new Character(game);
 
// executed once, after assets were loaded
gameScene.create = function() {
 
    // background
    this.background = this.add.sprite(350, 174.9, 'background');
    this.player = this.add.sprite(300, 200, 'Player')
 
    //Scale
    
    this.player.setScale(0.12);
    
    this.background.setScale(1);
}

gameScene.update = function() {
 
    player.movePlayer();
}

