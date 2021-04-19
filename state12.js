var centerX=640/2
var centerY=640/2
var detective;
var velocity = 4;
demo.state12 = function(){};
demo.state12.prototype = {
    preload: function(){
        game.load.image('bellarosa','assets/sprites/stripclubinterior.png',2304,512)
        game.load.spritesheet('pravda','assets/spritesheets/pizzeriadetective1.png',256,256);
        game.load.spritesheet('mateo','assets/spritesheets/diegogueberra.png',92,230);
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,2000,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state12');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var bellarosa=game.add.sprite(0,0,'bellarosa');
        detective=game.add.sprite(10,270,'pravda');
        detective.anchor.setTo(.5);
        //detective.scale.setTo(.8,.8);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4])
        
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,500,500);
        
        //adding in mateo pizza man
        mateo=game.add.sprite(1000,300,'mateo');
        //mateo.scale.setTo(.3);
        mateo.anchor.setTo(.5);
        game.physics.enable(mateo);
        mateo.enableBody = true;
        mateo.physicsBodyType=Phaser.Physics.ARCADE;
        mateo.body.collideWorldBounds=true;
        
        mateo.body.immovable=true;
        
        //npc blinking animation
        mateo.animations.add('blink',[0,1,2,3,4]);
        mateo.animations.play('blink',5,true);
        
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
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)  && detective.y>=270){
            detective.body.velocity.y = -speed;
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<=330){
            detective.body.velocity.y = speed;
        }
        else{
            detective.body.velocity.y=0
        }
        
    }
};
