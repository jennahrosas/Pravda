demo.state23 = function(){};
demo.state23.prototype = {
    preload: function(){       
        game.load.image('spacebar','assets/sprites/spacebar.png',256,256);
        game.load.image('mini','assets/sprites/minigamecontrols.png',256,256);
        game.load.image('background', 'assets/sprites/mansioninterior.png', 512, 512);
        game.load.image('post-it', 'assets/sprites/postitnote.png',512,512);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        //music.pause();
        game.stage.backgroundColor = '#000000';
        console.log('state23');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.65,1.65);
        var postit = game.add.sprite(150, 150, 'post-it');
        
        var minigametext = game.add.text(250, 200, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '30px'
        minigametext = game.add.text(220, 240, 'YOU ARE ABOUT TO GO AGAINST',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(200, 270, 'THE PETRELLI MOB BOSS. HOPEFULLY',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(210, 300, 'YOU CHOSE THE RIGHT MAN BECAUSE',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(210, 330, 'THIS COULD MAKE OR BREAK YOUR',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(193, 360, 'CAREER! AVOID HIS STREAM OF FIRE,',{fill:'#ffffff'});
        minigametext.fontSize = '22px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(210, 390, 'AND TIME YOUR SHOTS PERFECTLY.',{fill:'#ffffff'});
        minigametext.fontSize = '22px';
        minigametext.font = 'Monaco', 'Monospace';
        
        var spacebar = game.add.sprite(400, 440, 'spacebar');
        spacebar.scale.setTo(0.7);
        var mgcontrols = game.add.sprite(230, 440, 'mini');
        mgcontrols.scale.setTo(0.6);
        
        minigametext = game.add.text(285, 560, 'MOVE',{fill:'#ffffff'});
        minigametext.fontSize = '22px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(455, 560, 'SHOOT',{fill:'#ffffff'});
        minigametext.fontSize = '22px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(440, 700, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state13')
}}};