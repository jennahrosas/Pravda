
var detective;
var velocity = 4;
demo.state24 = function(){};
demo.state24.prototype = {
    preload: function(){
        game.load.image('bossnamebackground','assets/sprites/bossnamebackground.png',512,512)
        game.load.spritesheet('pravda','assets/spritesheets/pizzeriadetective1.png',256,256);
        //game.load.audio('plink','assets/audio/plink.mp3');
        game.load.image('backpack', 'assets/sprites/backpack.png', 256,256);
        game.load.image('notes', 'assets/sprites/notepad.png', 256,256);
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,2600,800);
        game.stage.backgroundColor = '#000000';
        console.log('state24');
        //music.stop()
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var bossnamebackground=game.add.sprite(0,0,'bossnamebackground');
        bossnamebackground.scale.setTo(1.56,1.56);
        var backpack = game.add.sprite(695, 30, 'backpack');
        backpack.scale.setTo(.35,.35);
        //backpack.fixedToCamera = true;
        backpack.inputEnabled = true;
        backpack.events.onInputDown.add(backpackClick, this);
        
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,500,500);
        
        detective=game.add.sprite(400,270,'pravda');
        detective.anchor.setTo(.5);
        //detective.scale.setTo(.8,.8);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4])
        
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,500,500);
        
        
    },
    update: function(){
        if(detective.y<276){
            //console.log('working')
            if(detective.x<201 && detective.x>140){
                rightGuy=false;
                game.state.start('state23')
            }
            else if(detective.x<605 && detective.x>595){
                rightGuy=true;
                game.state.start('state23')
            }
        }
        
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
        
                if(game.input.keyboard.isDown(Phaser.Keyboard.W) && detective.y>275){
                    detective.body.velocity.y = -speed;
                }
        
                else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<1500){
                    detective.body.velocity.y = speed;
                }
                else{
                    detective.body.velocity.y=0
                }
    }
        
};
