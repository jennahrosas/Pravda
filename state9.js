var scope;
demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('box', 'assets/sprites/box.png');
        game.load.image('scope','assets/sprites/scope.png');
        game.load.image('background', 'assets/sprites/stripclubexterior2.png');
    },
    create: function(){
        console.log('state9');;
        
        //add bullet count
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bulletsLeft = [game.add.sprite(0,0,"bullet"), game.add.sprite(0,20,"bullet"), game.add.sprite(0,40,"bullet"), game.add.sprite(0,60,"bullet"), game.add.sprite(0,80,"bullet"), game.add.sprite(0,100,"bullet")];
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
    },
    update: function(){
        
    },
     move: function(pointer, x, y, click){

        //  sprite movement
        if (game.input.mouse.locked && !click)
        {
            scope.x += game.input.mouse.event.movementX;
            scope.y += game.input.mouse.event.movementY;
        }

    }
}