demo.state17 = function(){};
demo.state17.prototype = {
    preload: function(){
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.audio('jazzintro','assets/audio/jazzclip.mp3');
        game.load.spritesheet('cluetwo', 'assets/spritesheets/cluetwo.png', 128,128);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#000000';
        console.log('state17');
        miniMusic.stop();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        
        var leveltext = game.add.text(220, 180, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '35px'
        leveltext = game.add.text(190, 240, 'YOU FINISHED LEVEL ONE!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        leveltext = game.add.text(160, 290, 'THE LETTERS YOU FOUND FROM',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        leveltext = game.add.text(185, 340, 'THE HANDKERCHIEF WERE...',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        var clue = game.add.sprite(300, 410, 'cluetwo');
        clue.animations.add('clues',[0,1,2,3,4]);
        //clue.animations.play('clues',5,true);
        clue.frame = 4
        clue.scale.setTo(1.5);
        leveltext = game.add.text(470, 700, 'PRESS ENTER TO CONTINUE!',{fill:'#e3cb14'});
        leveltext.font = 'Monaco', 'Monospace';
        leveltext.fontSize = '20px';
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state1')
    }
}};