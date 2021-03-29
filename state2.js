var bullet;
var bullets;
var detective;
var bulletSpeed = 1000;
var fire = 0;
var badFire = 0;
var lives = 3;
var fireRate = 400;
var badFireRate = 1200;
var a = 0;
var alive = [true,true,true];
var enemyBullets;
var badGuyGroup;
var badGuySpeed = 2;
var lives = 3;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('badGuy', 'assets/sprites/badGuyStill.png');
        game.load.image('detective','assets/sprites/Pravda.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostLife.png');
    },
    create: function(){
        game.stage.backgroundColor = '#808080';

        detective = game.add.sprite(100, 400, 'detective');
        detective.anchor.setTo(0.5);
        detective.scale.setTo(0.4);

        lives = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(25, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', 0.25);
        bullets.setAll('scale.y', 0.25);

        badGuyGroup = game.add.group();
        badGuyGroup.enableBody = true;
        badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 5; i++) {
            badGuyGroup.create(550 + 75 * i, 200 * i + 200, 'badGuy');
        }

        badGuyGroup.setAll('anchor.y', 0.5);
        badGuyGroup.setAll('anchor.x', 0.5);
        badGuyGroup.setAll('scale.x', 0.4);
        badGuyGroup.setAll('scale.y', 0.4);

        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(100, 'bullet');
        enemyBullets.setAll('checkWorldBounds', true);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('anchor.y', 0.5);
        enemyBullets.setAll('scale.x', -0.25);
        enemyBullets.setAll('scale.y', 0.25);
    },
    update: function(){
        badGuyGroup.y += badGuySpeed;
        this.fire(false)
        if (badGuyGroup.y <-150){
            badGuySpeed = -badGuySpeed;
        }
        else if (badGuyGroup.y >150){
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
        game.physics.arcade.overlap(detective, enemyBullets, this.hitDetective);
    },
    fire: function(good) {
        if(good && game.time.now > fire) {
            fire = game.time.now + fireRate;
            bullet = bullets.getFirstDead();
            bullet.reset(detective.x+50 , detective.y);
            bullet.scale.setTo(.25,.25)
            game.physics.arcade.moveToXY(bullet, 800, bullet.y, bulletSpeed);
        }
        else if (!good && game.time.now > badFire){
            if (alive[a]) {
                bullet = bullets.getFirstDead();
                bullet.reset(425 + a * 75, badGuyGroup.y + 200 + 200 * a);
                bullet.scale.setTo(-.25,.25)
                game.physics.arcade.moveToXY(bullet, 0, bullet.y, bulletSpeed);
            }
            badFire = game.time.now + badFireRate;    
            a = (a + 1) % 3
        }
    },
    hitGroup: function(e) {
        bullet.kill();
        e.kill();
        if (e.x == 550) {
            alive[0] = false;
        }
        else if (e.x == 625) {
            alive[1] = false;
        }
        else {
            alive[2] = false;
        }
    },
    hitDetective: function(e) {
        bullet.kill();
        e.kill();
        console.log("hit");
    }
};