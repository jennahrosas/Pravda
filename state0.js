var demo = {};
var centerX=640/2
var centerY=640/2
var detective;
var speed = 4;
var text;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('diego','assets/sprites/diego.png')
        game.load.audio('theme','assets/audio/theme.mp3')
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state0');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //var space=game.add.sprite(0,0,'space');
        //adding in sprites
        detective=game.add.sprite(centerX,centerY,'diego');
        detective.anchor.setTo(.5);
        detective.scale.setTo(1,1);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        
        //camera follow
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,200,200);
        
        //add text
        //text=game.add.text(320,50,'score: '+ score);
        //text.anchor.setTo(.5)
        
        //add music
        music = game.add.audio('theme');
        music.play();
        music.volume=.3;
        console.log(music.volume);
        
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            detective.scale.setTo(-1,1);
            detective.x -= speed;
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            detective.scale.setTo(1,1);
            detective.x += speed;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            detective.y -= speed;
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            detective.y += speed;
        }
        
    }
};

