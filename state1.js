console.log('state1');
var demo = {};
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('detective', 'assets/spritesheets/pravdawalk.png', 36, 64);
        game.load.image('pizzeria', 'assets/sprites/pizzeria.png',768,128);
    },
    create: function(){
        
        /*
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff';
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 768, 128);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var pizzeria = game.add.sprite(0, 0, 'pizzeria');
        detective = game.add.sprite(20, 40, 'detective');
        detective.anchor.setTo(0.5, 0.5);
        detective.scale.setTo(0.5, 0.5);
        game.physics.enable(detective);
        detective.body.collideWorldBounds = true;
        detective.animations.add('walk', [0, 1, 2, 3, 4,5,6]);

        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 400, 300);
        game.add.text(0,0, "score = " + count).addColor('#ffffff',0); */
    },
    update: function(){
        /*
        var m = 0;
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
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
            detective.body.velocity.y = -speed;
        }
        
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
            detective.body.velocity.y = speed;
        }
        else{
            detective.body.velocity.y=0
        }
        */
    }     
};
