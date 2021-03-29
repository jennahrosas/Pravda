demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.image('controls','assets/sprites/controls.png',256,256);
        game.load.image('filmnoir', 'assets/sprites/intro.png', 850, 638);
        game.load.spritesheet('cluetwo', 'assets/spritesheets/ClueTwo.png', 640, 128);
        game.load.image('eInteract','assets/sprites/interact.png',256,256);
        game.load.image('mouse','assets/sprites/mouse.png',256,256);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#000000';
        console.log('state3');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var intro = game.add.sprite(0,0,'filmnoir');
        var introtext = game.add.text(200, 50, 'GREETINGS, DETECTIVE PRAVDA!',{fontsize: '20px', fill:'#ffffff'});
        introtext = game.add.text(90, 100, 'A new case has arrived for you. You need to find',{fill:'#ffffff'});
        introtext = game.add.text(90, 125, 'the name of the leader that runs the Petrelli mob.',{fill:'#ffffff'});
        introtext = game.add.text(90, 150, 'Walk around the city, and find any people or clues',{fill:'#ffffff'});
        introtext = game.add.text(90, 175, "that will lead to the boss's name. You will get",{fill:'#ffffff'});
        introtext = game.add.text(90, 200, 'a number of letters at the end of each level that',{fill:'#ffffff'});
        introtext = game.add.text(90, 225, "will eventually spell out the leader's name.",{fill:'#ffffff'});
        introtext = game.add.text(90, 250, "Good luck! Make us proud.",{fill:'#ffffff'});
        
        var controls = game.add.sprite(55, 280, 'controls');
        controls.scale.setTo(0.8);
        var eInteract = game.add.sprite(275, 260, 'eInteract');
        eInteract.scale.setTo(0.8);
        var mouse = game.add.sprite(565, 300, 'mouse');
        mouse.scale.setTo(0.5);
        
        introtext = game.add.text(125, 430, 'MOVE',{fill:'#ffffff'});
        introtext.fontSize = '20px'
        introtext = game.add.text(285, 430, 'INTERACT W/ NPCs',{fill:'#ffffff'});
        introtext.fontSize = '20px'
        introtext = game.add.text(525, 430, 'PICK UP CLUES + OPEN',{fill:'#ffffff'});
        introtext.fontSize = '20px'
        introtext = game.add.text(535, 450, 'BACKPACK AND MAP',{fill:'#ffffff'});
        introtext.fontSize = '20px'
        
        introtext = game.add.text(500, 700, 'Press enter to start!',{fill:'#ffffff'});
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state0')
    }
}};