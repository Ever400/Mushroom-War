 var speed = 10000;
var kNumEnemies = 20;
var win = false;
 var speed = 1;

function setup() {
    var i=1;
    var nextSong= "";
    // alert(document.getElementById('Music'));
    document.getElementById('Music').addEventListener('ended', function(){
        i++;
        nextSong = "War/Music/"+i+".m4a";
        audioPlayer = document.getElementById('Music');
        // alert(nextSong);
        audioPlayer.src = nextSong;
        audioPLayer.load();
        audioPlayer.play();
        if(i == 37) 
        {
            i = 1;
        }
        }, false);
}

var mainState = {
    preload: function () {
        // setup();
        
		game.load.image('player', 'War/Character/Shiitake.png');
        game.load.image('wall', 'War/Maps/items_for_map/platforms (2).jpg');
        game.load.image('sky', 'War/background/cuadros.jpg');
        game.load.image('dirt', 'War/Maps/items_for_map/dirt.jpg');
        game.load.image('Background', 'War/background/lava.jpg')
        game.load.image('enemy', 'War/Character/Bracolli.png')
        game.load.image('laser', 'War/Weapon/laser.png')
    },
    
    
    
    
    create: function(){
        
              
        
        game.world.setBounds(0, 0, 40000, 40000);
        //change the game's background color 
        game.stage.backgroundImage = "War/background/lava.jpg";
        //start physics system for movements and collisions
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //add hte physics engine to all the game objects
        game.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor = game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'fast': Phaser.KeyCode.SHIFT, 'right': Phaser.KeyCode.D,'shoot': Phaser.KeyCode.j } );
        s = game.add.tileSprite(0, 0, 23345, 23345, 'Background');
        //creates player in the center of the game 
        this.player = game.add.sprite(70, 100, 'player');
        this.enemies = [];
        for (var i = 0; i < kNumEnemies; ++i) {
          var enemy = game.add.sprite(40, 40, 'enemy');
          // Enemy Size.
          enemy.scale.setTo(0.6, 0.6);
          enemy.body.gravity.y = 250;
          // Enemy x coordinate.
          enemy.x = 340* (i + 3);
          this.enemies.push(enemy);
        }
        this.laser = game.add.sprite('laser'); 
           
        
        
        
        this.player.body.gravity.y = 500;
        
        
        this.floor = game.add.group();
        this.sky = game.add.group();
        this.dirt = game.add.group();
        this.createtime = Date.now()
        
        game.camera.follow(this.player);
        
        //Game settings/player setup

        // Create 3 groups that will contain our objects
                this.walls = game.add.group();


        // Design the level. x = wall, o = sky, ! = lava.
        var level = [
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',   
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                               xxxxxxxxxxxxxx                                    x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                                                                                       x                                         x',
        'x                                                                                                                                                                                                                 x',
        'x                                                                                                               x                                                                                                 x',
        'x                                                                             x                                                                                                                                   x',
        'x                                                                                                                                                                                             xx!!!!!!!x          x',
        'x                                                                                                                                                           xx!!!!!!!!!!xx                   x!                   x',
        'x                                                                                                      xx!!!!!!!!!!x!!!!!!!!!!!x!!!!!!!!!!xx               x!                             x!                      x',
        'x                                                                            x!!!!!!!!!!!!!!!!!x                                                          x!                                                      x', 
        'x                                                                           xx!!!!!!!!!!!!!!!!!xx                                                                                                                 x', 
        'x        x!!!!!!!!x                                                        xxx!!!!!!!!!!!!!!!!!xxx                                                                                                                x', 
        'x       xx!!!!!!!!xx               !       !        !!!                                                                                                                           xxxx                            x',
        'xxxxxxxxxx!!!!!!!!xxxxxxxxxxxxxxxx!!!xxxxx!!!x!!!!!!!!!!!!!!!xxxxxxxxx                                   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!!!!!!!!!xxxxxxx!!!!!!!!xxx!!!!!!!!!x!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxx',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                               !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',
        ];

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                var wall = game.add.sprite(0+20*j, 0+20*i, 'wall');
                this.walls.add(wall);
                wall.body.immovable = true;
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] == 'm') {
                var sky = game.add.sprite(0+20*j, 0+20*i, 'sky');
                this.sky.add(sky);
                }

                // Create a enemy and add it to the 'enemies' group
                 else if (level[i][j] == '!') {
                var dirt = game.add.sprite(0+20*j, 0+20*i, 'dirt');
                this.dirt.add(dirt);
                     dirt.body.immovable = true;
                      }

           }
        }
    },
        
    update: function(){  
        if (this.player.x > 4100 && win == false) {
            win = true;
        
            
        }
        
        function Die() {
            this.player.alive = false; 
        }
        
        for (i = 0; i < kNumEnemies; ++i) {
          this.enemies[i].x += (Math.random() - 0.5) * 10;
          game.physics.arcade.collide(this.enemies[i],this.dirt); 
          game.physics.arcade.collide(this.player, this.enemies[i], Die);
        }
        
        if (Date.now()-this.createtime >15*1000) {
            game.add.sprite(0,5000, 'enemy')
            this.createtime = Date.now()
        }
        game.physics.arcade.collide(this.player,this.walls);
        game.physics.arcade.collide(this.player,this.dirt); 
        
         
        
        if(this.cursor.shoot.isDown){
            this.laser.body.velocity.x > -200
        }
        
        
    
        if(this.cursor.fast.isDown){
            speed = 2;
        } else {
            speed = 1;
        }
        
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -200 * speed;
        }else if(this.cursor.right.isDown){  
            this.player.body.velocity.x = 200 *speed;	
        }else{
            this.player.body.velocity.x = 0;
            
        }
        
        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -300;
        }
   
    }
}

var game = new Phaser.Game(1500,900);
game.state.add('main', mainState);
game.state.start('main');