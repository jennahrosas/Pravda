var bullet2;
var bullet2s;
var detective2;
var bullet2Speed = 750;
var fire2 = 0;
var badfire2 = 0;
var lives2 = 3;
var fire2Rate = 800;
var badfire2Rate = 70;
var badguy2timer = 3000;
var b = 400;
var a = 0;
var enemybullet2s;
var badGuy2;
var badGuy2Speed = 1;
var lives2 = 3;
var lives4 = 3;


demo.state13 = function(){};
demo.state13.prototype = {
    preload: function(){
        game.load.image('badGuy2', 'assets/sprites/finalbossshoot.png');
        game.load.image('detective2','assets/sprites/pravdashoot.png');
        game.load.image('bullet2', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('bookshelf', 'assets/sprites/shelf.png');
        game.load.image('road','assets/sprites/mansioninterior.png');
        
    },
    create: function(){
        game.stage.backgroundColor = '#808080';
        console.log('state13');
        
        road=game.add.sprite(0,0,'road');
        road.scale.setTo(1.56);
        
        detective2 = game.add.sprite(100, 300, 'detective2');
        detective2.anchor.setTo(0.5);
        detective2.scale.setTo(0.4);
        game.physics.enable(detective2);

        lives2Array = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];
        
        lives4Array = [game.add.sprite(576, 0, 'life'), game.add.sprite(651, 0, 'life'), game.add.sprite(726, 0, 'life')];
        
        bullet2s = game.add.group();
        bullet2s.enableBody = true;
        bullet2s.physicsBodyType = Phaser.Physics.ARCADE;
        bullet2s.createMultiple(250, 'bullet2');
        bullet2s.setAll('checkWorldBounds', true);
        bullet2s.setAll('outOfBoundsKill', true);
        bullet2s.setAll('anchor.y', 0.5);
        bullet2s.setAll('scale.x', 0.3);
        bullet2s.setAll('scale.y', 0.3);

        badGuy2 = game.add.sprite(700, 400, 'badGuy2');
        badGuy2.anchor.setTo(0.5);
        badGuy2.scale.setTo(.5);
        game.physics.enable(badGuy2);
        
        bookshelf = game.add.sprite(189,250,'bookshelf');
        bookshelf.scale.setTo(.75);
        game.physics.enable(bookshelf);
        
        bookshelf2 = game.add.sprite(189,675,'bookshelf');
        bookshelf2.scale.setTo(-.75);
        bookshelf2.anchor.setTo(.99);
        game.physics.enable(bookshelf2);
        
        //add minigame music
        //miniMusic.play();
        //miniMusic.volume=.3;
    },
    update: function(){
        badGuy2.y += badGuy2Speed;
        this.fire2(false)
        if (badGuy2.y < 300){
            badGuy2Speed = -badGuy2Speed;
        }
        else if (badGuy2.y >650){
            badGuy2Speed = -badGuy2Speed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire2(true);
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            if (detective2.y>50){
                detective2.y -= 10;
            }
        }

        else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            if (detective2.y<750){
                detective2.y += 10;
            }
        }
        game.physics.arcade.overlap(bullet2s, badGuy2, this.hitGroup);
        game.physics.arcade.overlap(bullet2s, detective2, this.hitdetective2);
        game.physics.arcade.overlap(bullet2s, bookshelf, this.hitshelf);
        game.physics.arcade.overlap(bullet2s, bookshelf2, this.hitshelf);
    },
    fire2: function(good) {
        if(good && game.time.now > fire2 && lives2 > 0) {
            fire2 = game.time.now + fire2Rate;
            bullet2 = bullet2s.getFirstDead();
            bullet2.reset(detective2.x+75 , detective2.y);
            bullet2.scale.setTo(.30,.30);
            game.physics.arcade.moveToXY(bullet2, 900, bullet2.y, bullet2Speed);
        }
        else if (!good && game.time.now > badfire2 && lives4 > 0){
            bullet2 = bullet2s.getFirstDead();
            bullet2.reset(642, badGuy2.y-18);
            bullet2.scale.setTo(-.3,.3);
            game.physics.arcade.moveToXY(bullet2, 0, bullet2.y + Math.random()*50 - 25, bullet2Speed);
            badfire2 = game.time.now + badfire2Rate;
        }
    },
    
    hitGroup: function(e,round) {
        round.destroy();
        lives4 -= 1;
        lives4Array[2-lives4] = game.add.sprite(576+75*(2-lives4), 0, 'lostLife');
        if (lives4 == 0){
            badGuy2.kill();
            if(rightGuy){
                game.state.start('state19');
            }
            else{
                game.state.start('state21');
            }
            //lives4 = 3;
        }
    },
    hitdetective2: function(obj1,round) {
        round.destroy();
        lives2 -= 1;
        lives2Array[lives2] = game.add.sprite(10+75*lives2, 0, 'lostLife');
        if (lives2 == 0){
            detective2.kill();
            game.state.start('state22');
            lives2 = 3;
        }
        console.log("hit");
    },
    hitshelf: function(obj1,round) {
        round.destroy();
    }
};