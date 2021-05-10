var demo = {};
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
var npcQuestions = [["What do you want to ask?","Where is Pazzoli's Pizzeria?", "What happened in the alley off 124th?", 'Who are you, and why are were you talking to the cops earlier?'],
                    
                    [],
                    
                    ['What do you want to ask?','Where do the “suits” that come here to eat usually go after?','Have you seen who all walked into Pazzoli’s today?','Did you hear where the men in suits were going earlier?'],
                   
                    ['What do you want to ask?','Do you have security footage of the parking lot outside?','Have you seen this man? shows picture of mob boss','']];


var npcAnswers = [[['Off 24th and Avenue O.',"Just to the northeast of the city. It's big and red, you can't miss it!"],['Some mob member was stabbed.',"I'm not sure. Ask the cops."],['I was just walking by. They wanted to know if I saw anything.', "I'm Gordon Mitchell, and the guy killed at the crime scene nearby was my cousin."]],
                  
                  [['Get lost.','Clubs closed']],
                  
                  [['Boxing matches during the day, strip club at night.','Not sure who these “suits” are.'],['Just some men wearing suits an hour ago','No, I was playing games on my phone the whole time. Sorry!'],['I heard someone say something about that strip club off of 126th and Avenue P.','No clue, headphones in the whole time, buddy.']],
                 
                  [['Yes, we can go look at it right now. I have some free time','Yes, we can go look at it right now. I have some free time'],['Yeah, he checked into the VIP lounge around 1:08am','Yeah, he checked into the VIP lounge around 1:08am'],['','']]];
var sentence, currentLine, instructions, option1, option2, option3;
var clueText1, clueText2, foundClueOne, minimap,backpackList,notePad;
var mapClicked=false,backpackClicked=false;
var clueList=["A matchbox from a nearby pizzeria","A handkerchief with the initials: D.F.","VIP list reveals initials: D. Falco","License plate reveals Da- Falco"];
var clueClicked=[false];
var clueText=[];
var music;
var car1D=1;
var car2D=-1;
var car3D=1;
var car4D=-1;
var detectiveMap;
var beginRender=false;
var miniMusic;
var badguy;
var objective;
var progress=0;
var lastState=0;
var lastLocation = [[200,200],[1025,250],[1320,96],[1850,1750]];
var rightGuy;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('detective','assets/sprites/pravda.png',64,64);
        game.load.spritesheet('diego','assets/spritesheets/pravdawalk.png',32,64);
        game.load.spritesheet('npc','assets/spritesheets/gordonidle.png',32,64);
        game.load.image('backpack', 'assets/sprites/backpack.png', 64, 64)
        game.load.image('notes', 'assets/sprites/notepad.png', 64, 64)
        game.load.image('citymap', 'assets/sprites/map.png', 64, 64)
        game.load.audio('theme','assets/audio/theme.mp3');
        game.load.audio('plink','assets/audio/plink.mp3');
        game.load.image('citypng','assets/tilemaps/pravdamaps1.png',50,50 )
        game.load.tilemap('city','assets/tilemaps/pravdamaps1.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('Building','assets/tilemaps/building.png');
        game.load.image('Roads','assets/tilemaps/road.png');
        game.load.image('Pizza','assets/tilemaps/pizza.png');
        game.load.image('streetSigns','assets/tilemaps/streetsignspritesheet.png');
        game.load.image('club','assets/tilemaps/club.png');
        game.load.image('Mansion','assets/tilemaps/mansion.png');
        game.load.image('clueone','assets/sprites/clueonestill.png',99,112);
        game.load.spritesheet('clueoneplay', 'assets/spritesheets/clueone.png', 640,128)
        game.load.image('car1','assets/sprites/car1.png');
        game.load.image('car2','assets/sprites/car2.png');
        game.load.image('car3','assets/sprites/car3.png');
        game.load.image('car4','assets/sprites/car4.png');
        game.load.spritesheet('badguy','assets/spritesheets/badguysheet.png',64,64)
        game.load.audio('miniMusic','assets/audio/sandstorm.mp3');
        game.load.image('objective','assets/sprites/objective.png')
        game.load.spritesheet('dimitri','assets/spritesheets/demetri.png',106,235)
        
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
        map.addTilesetImage('club');
        map.addTilesetImage('Mansion');
        var RoadsLayer = map.createLayer('RoadsLayer');
        Buildings = map.createLayer('Buildings'); 
        PizzaLayer =map.createLayer('PizzaLayer');
        MansionLayer =map.createLayer('MansionLayer');
        RoadsLayer.resizeWorld();
        MansionLayer.resizeWorld();
        Buildings.resizeWorld();
        map.setCollision(3,true,'Buildings');
        map.setCollision(4,true,'Buildings');
        map.setCollision(5,true,'Buildings');
        map.setCollision(7,true,'PizzaLayer');
        map.setCollision(32,true,'PizzaLayer');
        //for all the pizza tiles
        map.setCollision(33,true,'MansionLayer');
        map.setCollision(34,true,'MansionLayer');
        map.setCollision(35,true,'MansionLayer');
        map.setCollision(36,true,'MansionLayer');
        map.setCollision(37,true,'MansionLayer');
        map.setCollision(38,true,'MansionLayer');
        map.setCollision(39,true,'MansionLayer');
        map.setCollision(40,true,'MansionLayer');
        map.setCollision(41,true,'MansionLayer');
        map.setCollision(42,true,'MansionLayer');
        //adding in detective sprite
        detective=game.add.sprite(lastLocation[lastState][0],lastLocation[lastState][1],'diego');
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
        npc=game.add.sprite(60,200,'npc');
        game.physics.enable(npc);
        npc.enableBody = true;
        npc.physicsBodyType=Phaser.Physics.ARCADE;
        npc.body.collideWorldBounds=true;
        
        npc.body.immovable=true;
        
        //npc blinking animation
        npc.animations.add('blink',[0,1,2]);
        npc.animations.play('blink',3,true);
        
        
        //adding in dimitri pizza man
        dimitri=game.add.sprite(1248,96,'dimitri');
        dimitri.scale.setTo(.3);
        dimitri.anchor.setTo(.5);
        game.physics.enable(dimitri);
        dimitri.enableBody = true;
        dimitri.physicsBodyType=Phaser.Physics.ARCADE;
        dimitri.body.collideWorldBounds=true;
        
        dimitri.body.immovable=true;
        
        //npc blinking animation
        dimitri.animations.add('smoke',[0,1,2,3,4,5,6,7,8,9,10,12]);
        dimitri.animations.play('smoke',1,true);
        
        
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
        game.sound.stopAll();
        music = game.add.audio('theme');
        music.play();
        music.volume=.3;
        console.log(music.volume);
        miniMusic = game.add.audio('miniMusic');
        
        
        //var text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //spellOutText(0,0,800,text,30,40,'#ffffff')
        
        //add plink sound
        plink=game.add.audio('plink');
        
        
        //add cars
        car1=game.add.sprite(60,600,'car1');
        car1.anchor.setTo(.5);
        car1.scale.setTo(.5,.5);
        game.physics.enable(car1, Phaser.Physics.ARCADE);
        car1.body.collideWorldBounds=true;
        car1.body.checkCollision.up=false;
        car1.body.checkCollision.down=false;
        
        car2=game.add.sprite(1000,470,'car2');
        car2.anchor.setTo(.5);
        car2.scale.setTo(.5*car2D,.5);
        game.physics.enable(car2, Phaser.Physics.ARCADE);
        car2.body.collideWorldBounds=true;
        car2.body.checkCollision.up=false;
        car2.body.checkCollision.down=false;
        
        car3=game.add.sprite(1000,1580,'car3');
        car3.anchor.setTo(.5);
        car3.scale.setTo(.5,.5);
        game.physics.enable(car3, Phaser.Physics.ARCADE);
        car3.body.collideWorldBounds=true;
        car3.body.checkCollision.up=false;
        car3.body.checkCollision.down=false;
        
        car4=game.add.sprite(1000,1150,'car4');
        car4.anchor.setTo(.5);
        car4.scale.setTo(.5,.5);
        game.physics.enable(car4, Phaser.Physics.ARCADE);
        car4.body.collideWorldBounds=true;
        car4.body.checkCollision.up=false;
        car4.body.checkCollision.down=false;
        
        
        //add strip club bad guys
        badguy=game.add.sprite(1700,1692,'badguy');
        badguy.anchor.setTo(.5);
        game.physics.enable(badguy);
        badguy.enableBody = true;
        badguy.physicsBodyType=Phaser.Physics.ARCADE;
        badguy.body.collideWorldBounds=true;
        badguy.body.immovable=true;

        badguy2=game.add.sprite(1820,1692,'badguy');
        badguy2.anchor.setTo(.5);
        game.physics.enable(badguy2);
        badguy2.enableBody = true;
        badguy2.physicsBodyType=Phaser.Physics.ARCADE;
        badguy2.body.collideWorldBounds=true;
        badguy2.body.immovable=true;

        badguy3=game.add.sprite(1700,2033,'badguy');
        badguy3.anchor.setTo(.5);
        game.physics.enable(badguy3);
        badguy3.enableBody = true;
        badguy3.physicsBodyType=Phaser.Physics.ARCADE;
        badguy3.body.collideWorldBounds=true;  
        badguy3.body.immovable=true;

        badguy4=game.add.sprite(1820,2033,'badguy');
        badguy4.anchor.setTo(.5);
        game.physics.enable(badguy4);
        badguy4.enableBody = true;
        badguy4.physicsBodyType=Phaser.Physics.ARCADE;
        badguy4.body.collideWorldBounds=true;  
        badguy4.body.immovable=true;

        //npc blinking animation
        badguy.animations.add('blink',[0,1,2]);
        badguy.animations.play('blink',3,true);
        badguy2.animations.add('blink',[0,1,2]);
        badguy2.animations.play('blink',2,true);
        badguy3.animations.add('blink',[0,1,2]);
        badguy3.animations.play('blink',3,true);
        badguy4.animations.add('blink',[0,1,2]);
        badguy4.animations.play('blink',2,true);
        if (progress > 3){
            badguy.destroy();
            badguy2.destroy();
            badguy3.destroy();
            badguy4.destroy();
        }
        
        
        
        
        
    },
    update: function(){
        game.physics.arcade.collide(detective,npc)
        game.physics.arcade.collide(detective,badguy)
        game.physics.arcade.collide(detective,badguy2)
        game.physics.arcade.collide(detective,badguy3)
        game.physics.arcade.collide(detective,badguy4)
        game.physics.arcade.collide(detective,dimitri)
        game.physics.arcade.collide(detective,Buildings,function(){console.log('hitting building')})
        
        game.physics.arcade.collide(detective,PizzaLayer,function(){game.state.start('state1')})
        
        game.physics.arcade.collide(detective,MansionLayer,function(){if(progress>=4){game.state.start('state24')}})
        
        game.physics.arcade.collide(detective,car1,function(){console.log('working')})
        game.physics.arcade.collide(detective,car2,function(){console.log('working')})
        game.physics.arcade.collide(detective,car3,function(){console.log('working')})
        game.physics.arcade.collide(detective,car4,function(){console.log('working')})
        
        
        
        //calls npc interaction handler
        //game.physics.arcade.collide(detective,npc,interactionHandler(detective,npc,plink))
        
        if (Math.abs(detective.x-npc.x)<50 && Math.abs(detective.y-npc.y)<50){
            interactionHandler(detective,npc,plink);
            if (!progress){
                progress=1;
            }
        }
        //response for strip club guy
        if (Math.abs(detective.x-badguy.x)<50 && Math.abs(detective.y-badguy.y)<50){
            interactionHandler(detective,badguy,plink);
        }
        
        if (Math.abs(detective.x-badguy2.x)<50 && Math.abs(detective.y-badguy2.y)<50){
            interactionHandler(detective,badguy,plink);
        }
        
        if (Math.abs(detective.x-badguy3.x)<50 && Math.abs(detective.y-badguy3.y)<50){
            interactionHandler(detective,badguy,plink);
        }
        
        if (Math.abs(detective.x-badguy4.x)<50 && Math.abs(detective.y-badguy4.y)<50){
            interactionHandler(detective,badguy,plink);
        }
        //response for dimitri
        if (Math.abs(detective.x-dimitri.x)<50 && Math.abs(detective.y-dimitri.y)<50){
            interactionHandler(detective,dimitri,plink);
        }
        //calls npc interaction handler
        //game.physics.arcade.collide(detective,badguy,function(){if(clueClicked.length==2){game.state.start('state9')}})
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
                    if(sentence && option1 && option2 && option3 && instructions){
                        sentence.alpha=0;
                        option1.alpha=0;
                        option2.alpha=0;
                        option3.alpha=0;
                        instructions.alpha=0;
                        counter=0;
                    }
                    
                    
                }
                else{
                    detective.animations.stop('walk');
                    detective.frame=6;
                    detective.body.velocity.x=0
                }
        
                if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
                    detective.body.velocity.y = -speed;
                    if(sentence && option1 && option2 && option3 && instructions){
                        sentence.alpha=0;
                        option1.alpha=0;
                        option2.alpha=0;
                        option3.alpha=0;
                        instructions.alpha=0;
                        counter=0;
                    }
                }
        
                else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
                    detective.body.velocity.y = speed;
                    if(sentence && option1 && option2 && option3 && instructions){
                        sentence.alpha=0;
                        option1.alpha=0;
                        option2.alpha=0;
                        option3.alpha=0;
                        instructions.alpha=0;
                        counter=0;
                    }
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
        
        //removes dialouge text when away from npc
        //need to fix
        /*
        if(Math.abs(detective.x-npc.x)>50 || Math.abs(detective.y-npc.y)>100){
            if(sentence && option1 && option2 && option3 && instructions){
                sentence.alpha=0;
                option1.alpha=0;
                option2.alpha=0;
                option3.alpha=0;
                instructions.alpha=0;
                counter=0;
               }
        }*/

        //car1 movement
        car1.body.velocity.x=car1D*300;
        car1.body.onWorldBounds=new Phaser.Signal();
        car1.body.onWorldBounds.add(function(){car1D=car1D*-1;car1.scale.setTo(car1D*.5,.5)})
        
        //car2 movement
        car2.body.velocity.x=car2D*400;
        car2.body.onWorldBounds=new Phaser.Signal();
        car2.body.onWorldBounds.add(function(){car2D=car2D*-1;car2.scale.setTo(car2D*.5,.5)})
        
        //car3 movement
        car3.body.velocity.x=car3D*350;
        car3.body.onWorldBounds=new Phaser.Signal();
        car3.body.onWorldBounds.add(function(){car3D=car3D*-1;car3.scale.setTo(car3D*.5,.5)})
        
        //car4 movement
        car4.body.velocity.x=car4D*325;
        car4.body.onWorldBounds=new Phaser.Signal();
        car4.body.onWorldBounds.add(function(){car4D=car4D*-1;car4.scale.setTo(car4D*.5,.5)})
    },
    render: function(){
        var ratioX = detective.x/2550;
        var ratioY = detective.y/2550;
        
        
        //console.log(ratioX,ratioY);
        if(beginRender){
            //detectiveMap=game.add.sprite(400-200+ratioX*400,400-200+ratioY*400,'detective');
            detectiveMap.x=200+ratioX*400;
            detectiveMap.y=200+ratioY*400;
            detectiveMap.fixedToCamera=true;
        }

    }
    
};
//function to spell out text across the screen

function spellOutText(x,y,width,text,fontSize,speed, fill, font){
    if (sentence != null) {
        sentence.destroy();
    }
    sentence = game.add.text(x,y,'',{fontsize: fontSize+'px', fill:fill, font:font});
    sentence.alpha=1;
    sentence.fixedToCamera=true;
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
    return sentence;
    
}


//function to handle npc interactions
var counter=0;
var choice = 0;
function interactionHandler(detective,npc,sound){
    if(game.input.keyboard.isDown(Phaser.Keyboard.E) && counter<1){
                console.log('interaction handler running')   
                counter++;
                conversation=true;
                console.log('checking');
                var num = whichNPC(npc);
                console.log(num);
                //if character is meant to ask questions
                if(num==0 || num==2 ||num==3){
                    instructions = game.add.text(0,600,'',{fontsize:'20px', fill: '#ffffff'});
                    instructions.alpha=1;
                    instructions.fixedToCamera=true;
                    option1 = game.add.text(0,630,'',{fontsize: '20px',fill: '#ffffff'})
                    option2 = game.add.text(0,660,'',{fontsize: '20px',fill: '#ffffff'})
                    option3 = game.add.text(0, 690, '', {fontsize: '20px',fill: '#ffffff'})
                    option1.fixedToCamera=true;
                    option2.fixedToCamera=true;
                    option3.fixedToCamera=true;
                    option1.alpha=1;
                    option2.alpha=1;
                    option3.alpha=1;

                    var loop = game.time.events.loop(speed*.1, addChar2)
                    var index=0;

                    console.log(num);
                    var text=npcQuestions[num];
                    console.log(text);
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
                        if(index>=text[0].length + text[1].length + text[2].length + text[3].length-1){
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
                    option1.events.onInputDown.add(function(){option1.addColor('#ff0000',0); sound.play(); option2.clearColors(); option3.clearColors(); spellOutText(0,400,700,npcAnswers[num][0][Math.floor(Math.random() * 2)],30,20,'#ffffff');});
                    option2.events.onInputDown.add(function(){option2.addColor('#ff0000',0); sound.play(); option1.clearColors(); option3.clearColors(); spellOutText(0,400,700,npcAnswers[num][1][Math.floor(Math.random() * 2)],30,20,'#ffffff');});
                    option3.events.onInputDown.add(function(){option3.addColor('#ff0000',0); sound.play(); option1.clearColors(); option2.clearColors(); spellOutText(0,400,700,npcAnswers[num][2][Math.floor(Math.random() * 2)],30,20,'#ffffff');});
                }
            else{
                conversation=true;
                if (num==1){
                    if(progress<3){
                        spellOutText(0,400,700,npcAnswers[num][0][Math.floor(Math.random() * 2)],30,20,'#ffffff');
                    }
                    else{
                        badguy.destroy();
                        badguy2.destroy();
                        badguy3.destroy();
                        badguy4.destroy();
                        game.state.start('state10');
                    }
                }
                conversation=false;
                
            }
                
        }
    
}

function citymapClick(){
    
    console.log(detective.x,detective.y);
    var ratioX = detective.x/2550;
    var ratioY = detective.y/2550;
    console.log('citymapclick');
    
    var zone=game
    if(!mapClicked && !backpackClicked){
        beginRender=true;
        minimap=game.add.image(400,400,'citypng');
        minimap.scale.setTo(0.5,0.5)
        minimap.anchor.setTo(.5);
        mapClicked=true;
        detectiveMap=game.add.sprite(400-200+ratioX*400,400-200+ratioY*400,'detective');
        detectiveMap.scale.setTo(.07);
        detectiveMap.anchor.setTo(.5);
        npcMap=game.add.sprite(200+npc.x*400/2550,200+npc.y*400/2550,'npc');
        npcMap.scale.setTo(.3);
        npcMap.anchor.setTo(.5);
        npcMap2=game.add.sprite(200+badguy.x*400/2550,200+badguy.y*400/2550,'badguy');
        npcMap2.scale.setTo(.3);
        npcMap2.anchor.setTo(.5);
        npcMap3=game.add.sprite(200+badguy2.x*400/2550,200+badguy2.y*400/2550,'badguy');
        npcMap3.scale.setTo(.3);
        npcMap3.anchor.setTo(.5);
        npcMap4=game.add.sprite(200+badguy3.x*400/2550,200+badguy3.y*400/2550,'badguy');
        npcMap4.scale.setTo(.3);
        npcMap4.anchor.setTo(.5);
        npcMap5=game.add.sprite(200+badguy4.x*400/2550,200+badguy4.y*400/2550,'badguy');
        npcMap5.scale.setTo(.3);
        npcMap5.anchor.setTo(.5);
        minimap.fixedToCamera=true;
        detectiveMap.fixedToCamera=true;
        npcMap.fixedToCamera=true;
        npcMap2.fixedToCamera=true;
        npcMap3.fixedToCamera=true;
        npcMap4.fixedToCamera=true;
        npcMap5.fixedToCamera=true;
        clueMap=game.add.sprite(200+clueone.x*400/2550,200+clueone.y*400/2550,'clueone');
        clueMap.anchor.setTo(.5);
        clueMap.scale.setTo(.05);
        clueMap.fixedToCamera=true;
        dimitriMap=game.add.sprite(200+dimitri.x*400/2550,200+dimitri.y*400/2550,'dimitri');
        dimitriMap.anchor.setTo(.5);
        dimitriMap.scale.setTo(.07);
        dimitriMap.fixedToCamera=true;
        
        //objective pointer
        if(progress==0){
            objective=game.add.sprite(200+npc.x*400/2550,175+npc.y*400/2550,'objective')
        }
        else if(progress==1){
            objective=game.add.sprite(200+clueone.x*400/2550,180+clueone.y*400/2550,'objective')
        }
        else if(progress==2){
            objective=game.add.sprite(200+1315*400/2550,200+96*400/2550,'objective')
        }
        else if(progress==3){
            objective=game.add.sprite(200+1760*400/2550,200+400*1550/2550,'objective')
        }
        else if(progress==4){
            //objective.game.add.sprite(200)
            npcMap.alpha=0;
            npcMap2.alpha=0;
            npcMap3.alpha=0;
            npcMap4.alpha=0;
            npcMap5.alpha=0;
        }
        else if(progress==5){
            objective=game.add.sprite(200+300*400/2550,200+1640*400/2550,'objective')
        }
        objective.scale.setTo(.05);
        objective.fixedToCamera=true;
        objective.anchor.setTo(.5);
    }
    else{
        beginRender=false;
        minimap.destroy();
        detectiveMap.destroy();
        npcMap.destroy();
        npcMap2.destroy();
        npcMap3.destroy();
        npcMap4.destroy();
        npcMap5.destroy();
        clueMap.destroy();
        objective.destroy();
        dimitriMap.destroy();
        mapClicked=false;
        
    }

}
function backpackClick(){
    if(!backpackClicked && !mapClicked){
        //backpackList = game.add.image(game.camera.x+game.camera.width/2,game.camera.y+game.camera.height/2,'notes')
        backpackList = game.add.image(400,400,'notes')
        backpackList.scale.setTo(2,2)
        backpackList.anchor.setTo(.5);
        backpackClicked=true;
        backpackList.fixedToCamera=true;
        for(i=0;i<clueClicked.length;i++){
            if(clueClicked[i]){
                clueText.push(game.add.text(400-160,400-150+i*20,clueList[i],{font:'15px Arial'}));
                clueText[clueText.length-1].fixedToCamera=true;
            }
        }
    }
    else{
        backpackList.destroy();
        backpackClicked=false;
        for(i=0;i<clueText.length;i++){
            clueText[i].alpha=0;
        }
    }
    
}
function clueClick(clueNum){
    console.log(this.clueNum);
    if(!backpackClicked&&!mapClicked&&!clueClicked[this.clueNum]){
        clueClicked[this.clueNum]=true;
        if (this.clueNum==0){
            progress+=1;
            game.state.start('state6')
            
        }
        else if (this.clueNum==1){
            progress+=1;
            game.state.start('state7')
        }
        else if (this.clueNum == 2){
            progress += 1;
            game.state.start('state15');
        }
        else if (this.clueNum == 3){
            progress += 1;
        }

    }
    /*
    else{
        clueText1.alpha=0;
        clueText2.alpha=0;
        clueText3.alpha=0;
        foundClueOne.destroy();
    } */
     
}
function whichNPC(character){
    if (character.x==60  && character.y==200){
        return 0;
    }
    else if (character.x==1700 || character.x==1820){
        return 1;
    }
    else if (character.x==1248 && character.y==96){
        return 2;
    }
    else if(character.x==800){
        return 3;
    }
}