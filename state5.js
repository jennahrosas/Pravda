/*var bullet;
var bullets;
var detective;
var bulletSpeed = 750;
var fire = 0;
var badFire = 0;
var lives = 3;
var fireRate = 800;
var badFireRate = 600;
var a = 0;
var enemyBullets;
var badGuyGroup;
var badGuySpeed = 2;
var alive = [true,true,true,true,true];
var lives = 3;
*/
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('badGuy', 'assets/sprites/npcshoot.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('road','assets/sprites/road.png')
    },
    create: function(){
        road=game.add.tileSprite(0,0,600,600,'road');
        /*
        game.stage.backgroundColor = '#808080';

        detective = game.add.sprite(100, 400, 'detective');
        detective.anchor.setTo(0.5);
        detective.scale.setTo(0.4);
        game.physics.enable(detective);

        livesArray = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(25, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', 0.3);
        bullets.setAll('scale.y', 0.3);

        badGuyGroup = game.add.group();
        badGuyGroup.enableBody = true;
        badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < alive.length; i++) {
            badGuyGroup.create(475 + 75 * i, i * 400 / alive.length + 200, 'badGuy');
        }

        badGuyGroup.setAll('anchor.y', 0.5);
        badGuyGroup.setAll('anchor.x', 0.5);
        badGuyGroup.setAll('scale.x', 0.4);
        badGuyGroup.setAll('scale.y', 0.4);
        */
    },
    update: function(){
        /*
        if(badGuyGroup.countLiving()==0){
            game.state.start('state1');
        }
        badGuyGroup.y += badGuySpeed;
        this.fire(false)
        if (badGuyGroup.y <-150){
            badGuySpeed = -badGuySpeed;
        }
        else if (badGuyGroup.y >225){
            badGuySpeed = -badGuySpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire(true);
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            if (detective.y>50){
                detective.y -= 10;
            }
        }

        else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            if (detective.y<750){
                detective.y += 10;
            }
        }
        game.physics.arcade.overlap(badGuyGroup, bullets, this.hitGroup);
        game.physics.arcade.overlap(bullets, detective, this.hitDetective);
        */
    },
};