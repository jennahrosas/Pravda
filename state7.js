demo.state7 = function(){};
demo.state7.prototype = {
    preload: function(){       
        game.load.image('minigamecontrols','assets/sprites/minigamecontrols.png',256,256);
        game.load.image('clueone','assets/sprites/clueonestill.png',99,112);
        game.load.spritesheet('cluetwo','assets/spritesheets/cluetwo.png',128,128);
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        music.pause();
        game.stage.backgroundColor = '#000000';
        console.log('state7');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.65,1.65);
        
        var minigametext = game.add.text(230, 150, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '30px'
        minigametext = game.add.text(248, 210, 'YOU FOUND A NEW CLUE!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(65, 360, 'IN ORDER TO ADD THIS CLUE TO YOUR BACKPACK, YOU NEED',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(45, 390, 'TO AVOID THE OIL SPILLS IN THE STREETS OF NEW YORK CITY',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(170, 420, 'FOR 30 SECONDS TO WIN! GOOD LUCK!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        
        var mgcontrols = game.add.sprite(315, 480, 'minigamecontrols');
        mgcontrols.scale.setTo(0.6);
        //if clueClick
        var clue = game.add.sprite(340, 250, 'cluetwo');
        clue.animations.add('clues',[0,1,2,3,4]);
        //clue.animations.play('clues',5,true);
        clue.frame = 4
        clue.scale.setTo(0.7);
        
        minigametext = game.add.text(370, 610, 'MOVE',{fill:'#ffffff'});
        minigametext.fontSize = '20px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(440, 700, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state5')
    }
}};