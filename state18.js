demo.state18 = function(){};
demo.state18.prototype = {
    preload: function(){
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.spritesheet('cluethree', 'assets/spritesheets/cluethree copy.png', 256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#000000';
        console.log('state18');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        
        var leveltext = game.add.text(220, 140, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '35px'
        leveltext = game.add.text(190, 200, 'YOU FINISHED LEVEL TWO!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        leveltext = game.add.text(160, 250, 'THE LETTERS YOU FOUND FROM',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        leveltext = game.add.text(185, 300, 'THE V.I.P LIST WERE...',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '30px'
        var clue = game.add.sprite(300, 370, 'cluethree');
        clue.animations.add('clues',[0,1]);
        //clue.animations.play('clues',5,true);
        clue.frame = 0;
        clue.scale.setTo(.9);
        leveltext = game.add.text(85, 620, 'REMEMBER THE TIME THE CLUB OWNER TOLD YOU THE BOSS CAME IN!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '18px'
        leveltext = game.add.text(470, 700, 'PRESS ENTER TO CONTINUE!',{fill:'#e3cb14'});
        leveltext.font = 'Monaco', 'Monospace';
        leveltext.fontSize = '20px';
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            console.log('what')
            game.state.start('state12')
    }
}};