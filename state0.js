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
var sentence, currentLine, instructions, option1, option2, option3;
var clueText1, clueText2, foundClueOne, minimap,backpackList,notePad;
var mapClicked=false,backpackClicked=false;
var clueList=["A matchbox from a nearby pizzeria"];
var clueClicked=[false];
var clueText=[];
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
        game.load.image('citypng','assets/tilemaps/pravdaMapS1.png',50,50 )
        game.load.tilemap('city','assets/tilemaps/pravdaMapS1.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('Building','assets/tilemaps/building.png');
        game.load.image('Roads','assets/tilemaps/road.png');
        game.load.image('Pizza','assets/tilemaps/pizza.png');
        game.load.image('streetSigns','assets/tilemaps/streetSignSpriteSheet.png');
        game.load.image('clueone','assets/sprites/ClueOneStill.png',99,112);
        game.load.spritesheet('clueoneplay', 'assets/spritesheets/ClueOne.png', 640,128)
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#eeeeee';
        console.log('state0');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //add tilemap
        map=game.add.tilemap('city');
        map.addTilesetImage('Building');
        map.addTilesetImage('Roads');
        map.addTilesetImage('streetSigns');
        map.addTilesetImage('Pizza');
        var RoadsLayer = map.createLayer('RoadsLayer');
        Buildings = map.createLayer('Buildings'); 
        PizzaLayer =map.createLayer('PizzaLayer');
        RoadsLayer.resizeWorld();
        Buildings.resizeWorld();
        map.setCollision(3,true,'Buildings');
        
        //adding in detective sprite
        detective=game.add.sprite(1000,200,'diego');
        detective.anchor.setTo(.5);
        detective.scale.setTo(1,1);
        game.physics.enable(detective);
        detective.body.collideWorldBounds=true;
        detective.enableBody=true;
        //animation for detective
        detective.animations.add('walk',[0,1,2,3,4,5,6])
        
        //adding in clue two

        clueone = game.add.sprite(1020,200,'clueone');
        game.physics.enable(clueone);
        clueone.enableBody = true;
        clueone.physicsBodyType=Phaser.Physics.ARCADE;
        clueone.body.collideWorldBounds=true;
        //clueone.animations.add('clueone',[0,1,2,3,4]);
        //clueone.animations.play('clueone',2,true);
        //clueone.frame=0; 
        clueone.scale.setTo(.15);
        clueone.inputEnabled = true;
        clueone.events.onInputDown.add(clueClick,{clueNum:0});



        
        
        //camera follow
        game.camera.follow(detective);
        game.camera.deadzone = new Phaser.Rectangle(100,100,500,500);
        
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
        citymap.inputEnabled = true;
        citymap.events.onInputDown.add(citymapClick, this);
        backpack = game.add.sprite(620, 30, 'backpack');
        backpack.scale.setTo(.35,.35);
        backpack.fixedToCamera = true;
        backpack.inputEnabled = true;
        backpack.events.onInputDown.add(backpackClick, this);
        
        //add music
        var music = game.add.audio('theme');
        music.play();
        music.volume=.3;
        console.log(music.volume);
        
        
        //var text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //spellOutText(0,0,800,text,30,40,'#ffffff')
        
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
            detective.body.velocity.y=0
            detective.body.velocity.x=0
        }
        
        if(Math.abs(detective.x-npc.x)>50 || Math.abs(detective.y-npc.y)>50){
            if(sentence && option1 && option2 && option3 && instructions){
                sentence.alpha=0;
                option1.alpha=0;
                option2.alpha=0;
                option3.alpha=0;
                instructions.alpha=0;
                counter=0;
               }
        }

        //console.log(detective.x,detective.y);

    },
    

    
};
//function to spell out text across the screen
function spellOutText(x,y,width,text,fontSize,speed, fill, font){
    sentence = game.add.text(x,y,'',{fontsize: fontSize+'px', fill:fill, font:font});
    sentence.alpha=1;
    var currentLine = game.add.text(10,10,'',{fontsize: fontSize+'px', font:font});
    currentLine.alpha =0;
    var loop = game.time.events.loop(speed, addChar)
    var index=0;
    function addChar()
    {
        sentence.text+=text[index];
        currentLine.text+=text[index];
        if(currentLine.width> width && text[index]==' '){
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
    if(Math.abs(detective.x-npc.x)>50 || Math.abs(detective.y-npc.y)>50){
        if(currentLine && sentence){
            sentence.alpha=0;
            currentLine.alpha=0;
            //counter=0;
           }
    }
    
}


//function to handle npc interactions
var counter=0;
var choice = 0;
function interactionHandler(detective,npc,sound){
    
    if(Math.abs(detective.x-npc.x)<50 && Math.abs(detective.y-npc.y)<50){
            if(game.input.keyboard.isDown(Phaser.Keyboard.E) && counter<1){
                console.log('interaction handler running')   
                
                counter++;
                conversation=true;
                //await sleep(3000);
                console.log('checking');
                instructions = game.add.text(0,600,'',{fontsize:'20px', fill: '#ffffff'});
                instructions.alpha=1;
                option1 = game.add.text(0,630,'',{fontsize: '20px',fill: '#ffffff'})
                option2 = game.add.text(0,660,'',{fontsize: '20px',fill: '#ffffff'})
                option3 = game.add.text(0, 690, '', {fontsize: '20px',fill: '#ffffff'})
                option1.alpha=1;
                option2.alpha=1;
                option3.alpha=1;
                
                //instructions.alpha =0;
                //option1.alpha =0;
                //option2.alpha =0;
                //option3.alpha =0;
                var loop = game.time.events.loop(speed*.1, addChar2)
                var index=0;
                var text = ['What do you want to ask?','Where is the pizzeria?  ', 'What happened?          ', 'Who are you?            ']
                function addChar2()
                {
                    if (index <text[0].length){
                        instructions.text+=text[0][index];
                    }
                    else if (index <text[0].length  + text[1].length){
                        option1.text+=text[1][index - text[0].length];
                    }
                    else if (index < text[0].length  + text[1].length + text[2].length){
                        option2.text+=text[2][index - text[1].length - text[0].length];
                    }
                    else{
                        option3.text+=text[3][index - text[0].length - text[1].length - text[2].length];
                    }
                    //option1.text+=text[1][index];
                    //option2.text+=text[2][index];
                    //option3.text+=text[3][index];
                    //if(instructions.width>600 && text[index]==' '){
                    //    instructions.text+='\n';
                    //    instructions.text=' ';
                    //}
                    if(index>=text[0].length + text[1].length + text[2].length + text[3].length- 4){
                        //end = true
                        game.time.events.remove(loop);
                        console.log('stop');
                        //conversation = false;
                    }
                    index++;
                }
                option1.inputEnabled=true;
                option2.inputEnabled=true;
                option3.inputEnabled=true;
                option1.events.onInputDown.add(function(){option1.addColor('#ff0000',0); sound.play(); option2.clearColors(); option3.clearColors(); displayResponse(npc,1)});
                option2.events.onInputDown.add(function(){option2.addColor('#ff0000',0); sound.play(); option1.clearColors(); option3.clearColors(); displayResponse(npc,2)});
                option3.events.onInputDown.add(function(){option3.addColor('#ff0000',0); sound.play(); option1.clearColors(); option2.clearColors(); displayResponse(npc,3)});
            }
    }  
    
}

function displayResponse(npc,option){
    console.log('ran');

    spellOutText(0,400,700,npc1Answers[option-1][Math.floor(Math.random() * 2)],30,20,'#ffffff');
}
function citymapClick(){
    var ratioX = detective.x/2550;
    var ratioY = detective.y/2550;
    console.log(game.camera.width,game.camera.height);
    
    var zone=game
    if(!mapClicked && !backpackClicked){
        minimap = game.add.image(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,'citypng')
        minimap.scale.setTo(0.5,0.5)
        minimap.anchor.setTo(.5);
        mapClicked=true;
        detectiveMap=game.add.sprite(game.camera.x+game.camera.width/2-200+ratioX*400,game.camera.y+game.camera.height/2-200+ratioY*400,'detective');
        detectiveMap.scale.setTo(.07);
        detectiveMap.anchor.setTo(.5);
    }
    else{
        minimap.destroy();
        detectiveMap.destroy();
        mapClicked=false;
        
    }

}
function backpackClick(){
    if(!backpackClicked && !mapClicked){
        backpackList = game.add.image(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,'notes')
        backpackList.scale.setTo(2,2)
        backpackList.anchor.setTo(.5);
        backpackClicked=true;
        
        for(i=0;i<clueClicked.length;i++){
            if(clueClicked[i]){
                clueList.push(game.add.text(game.camera.x+game.camera.width/2-160,game.camera.y+game.camera.height/2-150,clueList[i],{font:'15px Arial'}));
            }
        }
    }
    else{
        backpackList.destroy();
        backpackClicked=false;
        for(i=0;i<clueList.length;i++){
            clueList[i].alpha=0;
        }
    }
    
}
function clueClick(clueNum){
    console.log(this.clueNum);
    if(!backpackClicked&&!mapClicked&&!clueClicked[this.clueNum]){
        foundClueOne = game.add.sprite(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,'clueone');
        //foundClueOne.scale.setTo(1,1);
        clueText1 = game.add.text(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2+80,'You found a clue! It is a match box',{fontsize: '20px',fill: '#ffffff'});
        clueText2 = game.add.text(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2+100,'from a restaurant nearby.',{fontsize: '20px',fill: '#ffffff'}); 
        foundClueOne.anchor.setTo(.5,.5);
        clueText1.anchor.setTo(.5,.5);
        clueText2.anchor.setTo(.5,.5);
        clueClicked[this.clueNum]=true;

    }
    else{
        clueText1.alpha=0;
        clueText2.alpha=0;
        foundClueOne.destroy();
    }
     
}
