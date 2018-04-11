 // create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
 
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 700, // game width
  height: 350, // game height
  scene: gameScene // our newly created scene
};
 
let game = new Phaser.Game(config);
// load asset files for our game
gameScene.preload = function() {
 
    this.load.image('Player', 'War/Character/Shiitake.png');
  
    // load images
    this.load.image('background', 'War/Maps/MapO1.png');
};
 
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

if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}   }
