demo.state21 = function(){};
demo.state21.prototype = {
    preload: function(){
        game.load.image('background', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.audio('jazzintro','assets/audio/jazzclip.mp3');
        game.load.image('boss','assets/sprites/finalboss.png',256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        music.stop()
        game.stage.backgroundColor = '#000000';
        console.log('state21');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        
        var leveltext = game.add.text(280, 140, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '25px'
        leveltext = game.add.text(200, 180, 'OH NO! YOU SHOT THE WRONG MAN!',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(230, 210, 'THE PERSON YOU KILLED WAS',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(240, 240, 'DOMINIC FALCO!',{fill:'#e3cb14'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '40px'
        leveltext = game.add.text(200, 290, 'YOU HAVE BEEN REMOVED FROM THE',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(320, 320, 'TASK FORCE! ',{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        var finalboss = game.add.sprite(270,340,'boss');
        leveltext = game.add.text(60, 600, "YOU NEED TO BE MORE CAUTIOUS; IT'LL COST YOUR CAREER",{fill:'#ffffff'});
        leveltext.font = 'Monaco', 'Monospace'
        leveltext.fontSize = '22px'
        leveltext = game.add.text(230, 630, "AND AN INNOCENT MAN'S LIFE!",{fill:'#ffffff'});
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