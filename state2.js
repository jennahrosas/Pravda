var bullet;
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
var alley;  


demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('badGuy', 'assets/sprites/npcshoot.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('alley', 'assets/sprites/alley.png');
        
    },
    create: function(){
        game.stage.backgroundColor = '#808080';
        console.log('state2');
        alley=game.add.sprite(0,0,'alley');
        alley.scale.setTo(.53);
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
        //add minigame music
        miniMusic.play();
        miniMusic.volume=.3;
        
        lastState=1;
    },
    update: function(){
        if(badGuyGroup.countLiving()==0){
            game.state.start('state0');
        }
        badGuyGroup.y += badGuySpeed;
        this.fire(false)
        if (badGuyGroup.y <0){
            badGuySpeed = -badGuySpeed;
        }
        else if (badGuyGroup.y >225){
            badGuySpeed = -badGuySpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire(true);
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            if (detective.y>200){
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
    },
    fire: function(good) {
        if(good && game.time.now > fire && lives > 0) {
            fire = game.time.now + fireRate;
            bullet = bullets.getFirstDead();
            bullet.reset(detective.x+75 , detective.y);
            bullet.scale.setTo(.30,.30);
            game.physics.arcade.moveToXY(bullet, 900, bullet.y, bulletSpeed);
        }
        else if (!good && game.time.now > badFire){
            if (alive[a]) {
                bullet = bullets.getFirstDead();
                bullet.reset(350 + a * 75, badGuyGroup.y + a * 400 / alive.length + 200);
                bullet.scale.setTo(-.3,.3);
                game.physics.arcade.moveToXY(bullet, 0, bullet.y, bulletSpeed);
            }
            badFire = game.time.now + badFireRate;    
            a = (a + 1) % alive.length;
        }
    },
    
    hitGroup: function(e,round) {
        round.kill();
        e.kill();
        if (e.x == 475) {
            alive[0] = false;
        }
        else if (e.x == 550) {
            alive[1] = false;
        }
        else if (e.x == 625) {
            alive[2] = false;
        }
        else if (e.x == 700) {
            alive[3] = false;
        }
        else{
            alive[4] = false;
        }
    },
    hitDetective: function(obj1,round) {
        round.destroy();
        lives -= 1;
        livesArray[lives] = game.add.sprite(10+75*lives, 0, 'lostLife');
        if (lives == 0){
            detective.kill();
            game.state.start('state4');
            lives = 3;
        }
        console.log("hit");
    }
};