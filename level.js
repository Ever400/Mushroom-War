// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
 
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 60, // game width
  height: 40, // game height
  scene: gameScene // our newly created scene
};
 
// create the game, and pass it the configuration
let game = new Phaser.Game(config);
// load asset files for our game
gameScene.preload = function() {
 
  // load images
  this.load.image('background', 'War/Maps/Map1.png');
};
 
// executed once, after assets were loaded
gameScene.create = function() {
 
   // background
   this.add.sprite(0, 0, 'background');
}
