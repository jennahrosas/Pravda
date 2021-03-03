var demo = {};
var centerX=640/2
var centerY=640/2
var detective;
var speed = 300;
var text;
var walk;
var npc;
var map;
var Buildings;
var conversation=false;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('detective','assets/sprites/diego.png',32,48);
        //game.load.spritesheet('diego','assets/spritesheets/running.png',32,48);
        game.load.spritesheet('diego','assets/spritesheets/newdiego.png',32,48);
        game.load.spritesheet('npc','assets/spritesheets/npc_idle.png',48,48);
        game.load.audio('theme','assets/audio/theme.mp3');
        game.load.tilemap('city','assets/tilemaps/pravdaMapS1.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('Building','assets/tilemaps/building.png');
        game.load.image('Roads','assets/tilemaps/road.png');
        
        
    },
    create: function(){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state0');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //add tilemap
        map=game.add.tilemap('city');
        map.addTilesetImage('Building');
        map.addTilesetImage('Roads');
        var RoadsLayer = map.createLayer('RoadsLayer');
        Buildings = map.createLayer('Buildings'); 
        map.setCollision(3,true,'Buildings');
        
        //adding in detective sprite
        detective=game.add.sprite(centerX,centerY+80,'diego');
        detective.anchor.setTo(.5);
        detective.scale.setTo(1,1);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4,5,6])
        
        //camera follow
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,200,200);
        
        //adding in npcs
        npc=game.add.sprite(50,70,'npc');
        game.physics.enable(npc);
        npc.enableBody = true;
        npc.physicsBodyType=Phaser.Physics.ARCADE;
        npc.body.collideWorldBounds=true;
        npc.body.immovable=true;
        
        //npc blinking animation
        npc.animations.add('blink',[0,1,2]);
        npc.animations.play('blink',3,true);
        
        
        
        //add music
        music = game.add.audio('theme');
        music.play();
        music.volume=.3;
        console.log(music.volume);
        
        //var text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //this.spellOutText(0,0,800,text,30,40,'#ffffff')
        
        
    },
    update: function(){
        game.physics.arcade.collide(detective,Buildings,function(){console.log('hitting building')})
        
        //calls npc interaction handler
        game.physics.arcade.collide(detective,npc,interactionHandler(detective,npc))
        if (!conversation)
            {
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
            }
        else{
            detective.animations.stop('walk');
            detective.frame=6;
        }

    },
    

    
};
//function to spell out text across the screen
function spellOutText(x,y,width,text,fontSize,speed, fill, font){
    var sentence = game.add.text(x,y,'',{fontsize: fontSize+'px', fill:fill, font:font});
    var currentLine = game.add.text(10,10,'',{fontsize: fontSize+'px', font:font});
    currentLine.alpha =0;
    var loop = game.time.events.loop(speed, addChar)
    var index=0;
    function addChar()
    {
        sentence.text+=text[index];
        currentLine.text+=text[index];
        if(currentLine.width>width && text[index]==' '){
            sentence.text+='\n';
            currentLine.text=' ';
        }
          
        if(index>=text.length-1){
            game.time.events.remove(loop);
            conversation=false;
            console.log('stop');
        }
        index++;
    }
        
}
//function to handle npc interactions
function interactionHandler(detective,npc){
    if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
        if(game.physics.arcade.collide(detective,npc)){
            conversation=true;
            spellOutText(0,800,1100,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",20,30,'#ffffff');
        }
    }
    
}



