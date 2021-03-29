
var centerX=640/2
var centerY=640/2
var detective;
var velocity = 4;
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.image('pizzeria','assets/sprites/pizzeria.png')
        game.load.spritesheet('pravda','assets/spritesheets/pravdawalk.png',32,64);
        game.load.image('cluetwo', 'assets/spritesheets/cluetwo.png', 92, 32);
        game.load.image('pazzoli man', 'assets/spritesheets/pazzoliman.png', 28, 61);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state1');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var pizzeria=game.add.sprite(0,0,'pizzeria');
        detective=game.add.sprite(10,80,'pravda');
        detective.anchor.setTo(.5);
        detective.scale.setTo(1,1);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4,5,6])
        
        var pazzoli=game.add.sprite(150,40,'pazzoli man');
        game.physics.enable(pazzoli);
        pazzoli.enableBody = true;
        pazzoli.physicsBodyType=Phaser.Physics.ARCADE;
        pazzoli.body.collideWorldBounds=true;
        
        pazzoli.body.immovable=true;
        
        //npc blinking animation
        pazzoli.animations.add('blink',[0,1,2]);
        pazzoli.animations.play('blink',3,true);
        
        var cluetwo = game.add.sprite(500,94,'cluetwo');
        game.physics.enable(cluetwo);
        cluetwo.enableBody = true;
        cluetwo.physicsBodyType=Phaser.Physics.ARCADE;
        cluetwo.body.collideWorldBounds=true;
        cluetwo.animations.add('clueone',[0,1,2,3,4]);
        cluetwo.animations.play('clueone',2,true);
        cluetwo.scale.setTo(.15);
        cluetwo.inputEnabled = true;
        cluetwo.events.onInputDown.add(clueClick,{clueNum:0});

        
        
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

