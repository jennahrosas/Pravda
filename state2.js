var bullet;
var bullets;
var detective;
var bulletSpeed = 1000;
var fire = 0;
var lives = 3;
var fireRate = 400;
var badGuy;
var enemyBullets;
var badGuyGroup;
var badGuySpeed = 2;

demo.state2 = function(){};
demo.state2.prototype = {
  preload: function(){
    game.load.image('badGuy', 'assets/sprites/badGuyStill.png');
    game.load.image('detective','assets/sprites/Pravda.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
  },
  create: function(){
    game.stage.backgroundColor = '#808080';
    //addChangeStateEventListeners();

    detective = game.add.sprite(100, 400, 'detective');
    detective.anchor.setTo(0.5);
    detective.scale.setTo(0.4);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(100, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('scale.x', 0.25);
    bullets.setAll('scale.y', 0.25);

    //badGuy = game.add.sprite(550, 200, 'badGuy');
    //game.physics.enable(badGuy);
    //badGuy.scale.setTo(0.4);
    //badGuy.anchor.setTo(0.5);

    badGuyGroup = game.add.group();
    badGuyGroup.enableBody = true;
    badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 3; i++) {
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
    if (badGuyGroup.y <-150){
        badGuySpeed = -badGuySpeed;
    }
    else if (badGuyGroup.y >150){
        badGuySpeed = -badGuySpeed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.fire();
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

    //game.physics.arcade.overlap(bullets, badGuy, this.hitEnemy);
    game.physics.arcade.overlap(badGuyGroup, bullets, this.hitGroup);
    //game.physics.arcade.overlap(enemyBullets, detective, this.hitEnemy);
    game.physics.arcade.overlap(detective, enemyBullets, this.hitGroup);
  },
  fire: function() {
    if(game.time.now > fire) {
      fire = game.time.now + fireRate;
      bullet = bullets.getFirstDead();
      bullet.reset(detective.x, detective.y);
      game.physics.arcade.moveToXY(bullet, 800, bullet.y,bulletSpeed);
      //bullet.rotation = game.physics.arcade.angleToPointer(bullet);
    }
  },
  //hitEnemy: function() {
    //console.log('hit');
    //badGuy.kill();
    //bullet.kill();
  //},
  hitGroup: function(e) {
    bullet.kill();
    e.kill();
  }
};