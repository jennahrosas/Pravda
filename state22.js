demo.state22 = function(){};
demo.state22.prototype = {
    preload: function(){
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.audio('jazzintro','assets/audio/jazzclip.mp3');
        game.load.image('pravda','assets/sprites/deaddetective.png',256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        music.stop()
        game.stage.backgroundColor = '#000000';
        console.log('state22');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        
        var leveltext = game.add.text(280, 180, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '25px'
        leveltext = game.add.text(185, 215, "YOU'VE BEEN KILLED BY THE PETRELLI",{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(210, 245, 'MOB BOSS! TIMING IS KEY! DEFEAT',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(250, 275, 'HIM, AND SOLVE THIS CASE!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        var finalboss = game.add.sprite(270,340,'pravda');
        leveltext = game.add.text(450, 660, 'PRESS ENTER TO TRY AGAIN!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state13');
        }
    },
}