demo.state19 = function(){};
demo.state19.prototype = {
    preload: function(){
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.audio('jazzintro','assets/audio/jazzclip.mp3');
        game.load.image('boss','assets/sprites/finalboss.png',256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        music.stop();
        game.stage.backgroundColor = '#000000';
        console.log('state19');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        
        var leveltext = game.add.text(280, 140, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '25px'
        leveltext = game.add.text(195, 180, 'YOU COMPLETED THE FINAL LEVEL!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(195, 210, 'YOU DEFEATED THE MOB BOSS, AND',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(170, 240, 'HE IS NOW IN CUSTODY! YOU FINALLY',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(275, 270, 'LEARN HIS NAME IS...',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(250, 300, 'DAMIAN FALCO!',{fill:'#e3cb14'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '40px'
        var finalboss = game.add.sprite(270,340,'boss');
        leveltext = game.add.text(70, 600, 'CONGRATS! CANNOT WAIT TO SEE THE NEXT CASE YOU GET!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        
        var jazz = game.add.audio('jazzintro');
        jazz.play();
        jazz.resume();
        jazz.volume = 0.3;
        console.log(jazz.volume);
    },
    update: function(){
    }};