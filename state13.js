var bullet;
var bullets;
var detective;
var bulletSpeed = 750;
var fire = 0;
var badFire = 0;
var lives = 3;
var fireRate = 800;
var badFireRate = 70;
var b = 400;
var a = 0;
var enemyBullets;
var badGuy;
var badGuySpeed = .5;
var lives = 3;


demo.state13 = function(){};
demo.state13.prototype = {
    preload: function(){
        game.load.image('badGuy', 'assets/sprites/finalbossshoot.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('road','assets/sprites/road.png');
        
    },
    create: function(){
        game.stage.backgroundColor = '#808080';
        console.log('state2');
        
        road=game.add.tileSprite(0,0,2450,1990,'road');
        game.stage.backgroundColor = '#808080';
        road.scale.setTo(.33);
        
        detective = game.add.sprite(100, 100, 'detective');
        detective.anchor.setTo(0.5);
        detective.scale.setTo(0.4);
        game.physics.enable(detective);

        livesArray = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(250, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', 0.3);
        bullets.setAll('scale.y', 0.3);

        badGuy = game.add.sprite(700, 400, 'badGuy');
        badGuy.anchor.setTo(0.5);
        badGuy.scale.setTo(.5);
        game.physics.enable(badGuy);
        
        //add minigame music
        //miniMusic.play();
        //miniMusic.volume=.3;
    },
    update: function(){
        badGuy.y += badGuySpeed;
        this.fire(false)
        if (badGuy.y < 150){
            badGuySpeed = -badGuySpeed;
        }
        else if (badGuy.y >650){
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
        game.physics.arcade.overlap(bullets, badGuy, this.hitGroup);
        game.physics.arcade.overlap(bullets, detective, this.hitDetective);
    },
    fire: function(good) {
        if(good && game.time.now > fire && lives > 0) {
            fire = game.time.now + fireRate;
            bullet = bullets.getFirstDead();
            bullet.reset(detective.x+75 , detective.y);
            bullet.scale.setTo(.30,.30);
            game.physics.arcade.moveToXY(bullet, 900, bullet.y, bulletSpeed);
        }
        else if (!good && game.time.now > badFire && b > 0){
            bullet = bullets.getFirstDead();
            bullet.reset(642, badGuy.y-18);
            bullet.scale.setTo(-.3,.3);
            game.physics.arcade.moveToXY(bullet, 0, bullet.y, bulletSpeed);
            badFire = game.time.now + badFireRate;
        }
    },
    
    hitGroup: function(e,round) {
        round.kill();
        e.kill();
    },
    hitDetective: function(obj1,round) {
        round.destroy();
        lives -= 1;
        livesArray[lives] = game.add.sprite(10+75*lives, 0, 'lostLife');
        if (lives == 0){
            detective.kill();
            //game.state.start('state4');
            lives = 3;
        }
        console.log("hit");
    }
};