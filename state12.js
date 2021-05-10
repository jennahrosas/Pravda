
var detective;
var velocity = 4;
demo.state12 = function(){};
demo.state12.prototype = {
    preload: function(){
        game.load.image('bellarosa','assets/sprites/stripclubinterior.png',2304,512)
        game.load.spritesheet('pravda','assets/spritesheets/pizzeriadetective1.png',256,256);
        game.load.spritesheet('mateo','assets/spritesheets/diegogueberra.png',92,230);
        game.load.image('cluethree', 'assets/sprites/cluethree.png',124,127);
        //game.load.audio('plink','assets/audio/plink.mp3');
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,2600,800);
        game.stage.backgroundColor = '#000000';
        console.log('state12');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var bellarosa=game.add.sprite(0,0,'bellarosa');
        bellarosa.scale.setTo(1.65,1.65)
        
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,500,500);
        
        //adding in mateo pizza man
        mateo=game.add.sprite(800,300,'mateo');
        //mateo.scale.setTo(.3);
        mateo.anchor.setTo(.5);
        game.physics.enable(mateo);
        mateo.enableBody = true;
        mateo.physicsBodyType=Phaser.Physics.ARCADE;
        mateo.body.collideWorldBounds=true;
        mateo.body.setSize(10,30,70);
        mateo.body.immovable=true;
        
        cluethree = game.add.sprite(1120,360,'cluethree');
        cluethree.scale.setTo(.2);
        game.physics.enable(cluethree);
        cluethree.enableBody = true;
        cluethree.physicsBodyType=Phaser.Physics.ARCADE;
        cluethree.body.collideWorldBounds=true;
        cluethree.inputEnabled = true;
        cluethree.events.onInputDown.add(clueClick,{clueNum:2});
        cluethree.events.onInputDown.add(clueClick,{clueNum:3});
        
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
        
        //npc blinking animation
        mateo.animations.add('blink',[0,1,2,3,4]);
        mateo.animations.play('blink',5,true);
        plink=game.add.audio('plink');
        progress=4;
        lastState=3;
    },
    update: function(){
        game.physics.arcade.collide(detective,mateo)
        if(Math.abs(detective.x-mateo.x)<300){
            interactionHandler(detective,mateo,plink);
        }
        if (detective.x<150){
            game.state.start('state0');
            //progress=3;
            lastState=3;
        }
        if (!conversation)
            {
                if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
                    detective.scale.setTo(-1,1);
                    detective.body.velocity.x = -speed;
                    detective.animations.play('walk',20,true);
                    if(sentence && option1 && option2 && option3 && instructions){
                        sentence.alpha=0;
                        option1.alpha=0;
                        option2.alpha=0;
                        option3.alpha=0;
                        instructions.alpha=0;
                        counter=0;
                    }
            
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
        else{
            detective.animations.stop('walk');
            detective.frame=6;
            detective.body.velocity.y=0
            detective.body.velocity.x=0
        }
        
    }
};
