var scope;
demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('box', 'assets/sprites/box.png');
        game.load.image('scope','assets/sprites/scope.png');
        game.load.image('background', 'assets/sprites/stripclubexterior2.png');
        game.load.image('enemy','assets/sprites/badguystill.png')
    },
    create: function(){
        console.log('state9');;
        
        //add background
        game.add.sprite(0,0,"background");
        //add bullet count
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bulletsLeft = [game.add.sprite(0,0,"bullet"), game.add.sprite(0,20,"bullet"), game.add.sprite(0,40,"bullet"), game.add.sprite(0,60,"bullet"), game.add.sprite(0,80,"bullet"), game.add.sprite(0,100,"bullet")];
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);
        //add sprites
        enemy=game.add.sprite(game.world.centerX, game.world.centerY,'enemy');
        enemy.anchor.setTo(.5,.5);
        enemy.scale.setTo(.5,.5);
        enemy.inputEnabled=true;
        enemy.events.onInputDown.add(hitEnemy,this);
        
        box=game.add.sprite(game.world.centerX, game.world.centerY,'box');
        box.anchor.setTo(.5,.5);
        box.scale.setTo(.3,.3);
        
        //box.scale.setTo(.3,.3);
        
    },
    update: function(){
        scope.x=game.input.x;
        scope.y=game.input.y;
    },
}

function hitEnemy(){
    console.log('hit');
}