demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){       
        game.load.image('spacebar','assets/sprites/spacebar.png',256,256);
        game.load.image('minigamecontrols','assets/sprites/minigamecontrols.png',256,256);
        game.load.image('clueone','assets/sprites/clueonestill.png',99,112);
        game.load.spritesheet('cluetwo','assets/spritesheets/cluetwo.png',640,128);
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        music.pause();
        game.stage.backgroundColor = '#000000';
        console.log('state6');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.65,1.65);
        
        var minigametext = game.add.text(230, 150, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '30px'
        minigametext = game.add.text(248, 210, 'YOU FOUND A NEW CLUE!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(75, 360, 'IN ORDER TO ADD THIS CLUE TO YOUR BACKPACK, YOU',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(135, 390, 'NEED TO DEFEAT THE BAD GUYS IN A GUN BATTLE.',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(320, 420, 'GOOD LUCK!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        
        var spacebar = game.add.sprite(450, 480, 'spacebar');
        spacebar.scale.setTo(0.7);
        var mgcontrols = game.add.sprite(200, 480, 'minigamecontrols');
        mgcontrols.scale.setTo(0.6);
        var clue = game.add.sprite(340, 250, 'clueone');
        clue.scale.setTo(0.9);
        
        minigametext = game.add.text(255, 610, 'MOVE',{fill:'#ffffff'});
        minigametext.fontSize = '20px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(505, 610, 'SHOOT',{fill:'#ffffff'});
        minigametext.fontSize = '20px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(440, 700, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state2')
    }
}};