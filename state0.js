var demo = {};
var centerX=640/2
var centerY=640/2
var detective;
var speed = 200;
var text;
var notes;
var citymap;
var backpack;
var walk;
var npc;
var map;
var Buildings;
var conversation=false;
var npc1Questions = ['Where is the pizzeria?', 'What happened?', 'Who are you?'];
var npc1Answers = [['Just around the corner',"It's big and red you can't miss it just to the southwest"],['A busser was killed',"I don't know"],['I was just walking by', "I'm nobody"]];
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('detective','assets/sprites/Pravda.png',64,64);
        game.load.spritesheet('diego','assets/spritesheets/PravdaWalk.png',32,64);
        game.load.spritesheet('npc','assets/spritesheets/GordonIdle.png',32,64);
        game.load.image('backpack', 'assets/sprites/Backpack.png', 64, 64)
        game.load.image('notes', 'assets/sprites/Notepad.png', 64, 64)
        game.load.image('citymap', 'assets/sprites/Map.png', 64, 64)
        game.load.audio('theme','assets/audio/theme.mp3');
        game.load.audio('plink','assets/audio/plink.mp3');
        game.load.tilemap('city','assets/tilemaps/pravdaMapS1.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('Building','assets/tilemaps/building.png');
        game.load.image('Roads','assets/tilemaps/road.png');
        
        
    },
    create: function(){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //ssgame.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state0');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //add tilemap
        map=game.add.tilemap('city');
        map.addTilesetImage('Building');
        map.addTilesetImage('Roads');
        var RoadsLayer = map.createLayer('RoadsLayer');
        Buildings = map.createLayer('Buildings'); 
        RoadsLayer.resizeWorld();
        Buildings.resizeWorld();
        map.setCollision(3,true,'Buildings');
        
        //adding in detective sprite
        detective=game.add.sprite(centerX/2,centerY,'diego');
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
        npc=game.add.sprite(60,70,'npc');
        game.physics.enable(npc);
        npc.enableBody = true;
        npc.physicsBodyType=Phaser.Physics.ARCADE;
        npc.body.collideWorldBounds=true;
        
        npc.body.immovable=true;
        
        //npc blinking animation
        npc.animations.add('blink',[0,1,2]);
        npc.animations.play('blink',3,true);
        
        //add icons in corner
        citymap = game.add.sprite(705, 30,'citymap');
        citymap.scale.setTo(.3,.3);
        citymap.fixedToCamera = true;
        backpack = game.add.sprite(620, 30, 'backpack');
        backpack.scale.setTo(.35,.35);
        backpack.fixedToCamera = true;
        notes = game.add.sprite(550, 30, 'notes');
        notes.scale.setTo(.3,.3);
        notes.fixedToCamera = true;
        
        //add music
        var music = game.add.audio('theme');
        music.play();
        music.volume=.3;
        console.log(music.volume);
        
        
        //var text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //this.spellOutText(0,0,800,text,30,40,'#ffffff')
        
        //add plink sound
        plink=game.add.audio('plink');
        
    },
    update: function(){
        game.physics.arcade.collide(detective,Buildings,function(){console.log('hitting building')})
        
        //calls npc interaction handler
        game.physics.arcade.collide(detective,npc,interactionHandler(detective,npc,plink))
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
            }
        else{
            detective.animations.stop('walk');
            detective.frame=6;
        }

    },
    

    
};
//function to spell out text across the screen
function spellOutText(width,text,fontSize,textspeed, fill, font, background){
    //var end = false;
    var sentence = game.add.text(0,200,'',{fontsize: fontSize+'px', fill:fill, font:font});
    var currentLine = game.add.text(10,10,'',{fontsize: fontSize+'px', font:font, backgroundColor:'#000000'});
    currentLine.alpha =0;    
    var loop = game.time.events.loop(speed*.1, addChar)
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
            //end = true
            game.time.events.remove(loop);
            console.log('stop');
            conversation = false;
        }
        index++;
    }
    console.log('sup');
    /*while (end){
        if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            conversation = false;
            sentence.destroy();
            end = false;
            console.log('if');
        }
        console.log('loop');
    }*/
        
}


//function to handle npc interactions
var counter=0;
function interactionHandler(detective,npc,sound){
    if(Math.abs(detective.x-npc.x)<80 && Math.abs(detective.y-npc.y)<80){
            if(game.input.keyboard.isDown(Phaser.Keyboard.E) && counter<1){
                counter++;
                conversation=true;
                //await sleep(3000);
                console.log('checking');
                var instructions = game.add.text(0,600,'What do you want to ask?',{fontsize:'20px', fill: '#ffffff'});
                option1 = game.add.text(0,630,npc1Questions[0],{fontsize: '20px',fill: '#ffffff'})
                option2 = game.add.text(0,660,npc1Questions[1],{fontsize: '20px',fill: '#ffffff'})
                option3 = game.add.text(0, 690, npc1Questions[2], {fontsize: '20px',fill: '#ffffff'})
                option1.inputEnabled=true;
                option2.inputEnabled=true;
                option3.inputEnabled=true;
                option1.events.onInputDown.add(function(){option1.addColor('#ff0000',0); sound.play();});
                option2.events.onInputDown.add(function(){option2.addColor('#ff0000',0); sound.play();});
                option3.events.onInputDown.add(function(){option3.addColor('#ff0000',0); sound.play();});
            }
    }
        
    
                
}
