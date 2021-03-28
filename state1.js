
var centerX=640/2
var centerY=640/2
var detective;
var velocity = 4;
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.image('pizzeria','assets/sprites/pizzeria.png')
        game.load.spritesheet('diego','assets/spritesheets/PravdaWalk.png',32,64);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state1');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var pizzeria=game.add.sprite(0,0,'pizzeria');
        detective=game.add.sprite(10,80,'diego');
        detective.anchor.setTo(.5);
        detective.scale.setTo(1,1);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4,5,6])
        
        

        
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            detective.scale.setTo(-1,1);
            detective.body.velocity.x = -speed;
            detective.animations.play('walk',20,true);
            
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            detective.scale.setTo(1,1);
            detective.body.velocity.x = speed;
            detective.animations.play('walk',20,true);            
        }
        else{
            detective.animations.stop('walk');
            detective.frame=6;
            detective.body.velocity.x=0
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)  && detective.y>70){
            detective.body.velocity.y = -speed;
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<80){
            detective.body.velocity.y = speed;
        }
        else{
            detective.body.velocity.y=0
        }
        
    }
};

