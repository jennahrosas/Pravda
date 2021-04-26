demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.image('controls','assets/sprites/controls.png',256,256);
        game.load.image('filmnoir', 'assets/sprites/introstartscreen.png', 512, 512);
        game.load.spritesheet('cluetwo', 'assets/spritesheets/ClueTwo.png', 640, 128);
        game.load.image('eInteract','assets/sprites/interact.png',256,256);
        game.load.image('mouse','assets/sprites/mouse.png',256,256);
        game.load.image('spacebar','assets/sprites/spacebar.png',256,256);
        game.load.image('minigamecontrols','assets/sprites/minigamecontrols.png',256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#000000';
        console.log('state3');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var intro = game.add.sprite(0,0,'filmnoir');
        intro.scale.setTo(1.56,1.56);
        var introtext = game.add.text(180, 130, 'GREETINGS, DETECTIVE PRAVDA!',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext = game.add.text(80, 180, 'A NEW CASE HAS ARRIVED FOR YOU. YOU NEED TO FIND',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(65, 208, 'THE NAME OF THE LEADER THAT RUNS THE CENTURIES-OLD',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(65, 235, 'PETRELLI MOB. FOLLOW THE MAP OF THE CITY, AND FIND',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(65, 262, "PEOPLE AND CLUES THAT WILL LEAD TO THE BOSS'S NAME.",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(85, 288, 'FINDING A CLUE REVEALS A NUMBER OF LETTERS THAT',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(60, 315, "COMPLETES THAT LEVEL UNTIL THE FINAL BATTLE WITH THE",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(195, 342, "MOB BOSS. GOOD LUCK! MAKE US PROUD.",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        
        var controls = game.add.sprite(185, 380, 'controls');
        controls.scale.setTo(0.6);
        var eInteract = game.add.sprite(420, 360, 'eInteract');
        eInteract.scale.setTo(0.6);
        var mouse = game.add.sprite(350, 530, 'mouse');
        mouse.scale.setTo(0.3);
        
        introtext = game.add.text(240, 495, 'MOVE',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(400, 495, 'INTERACT W/ PEOPLE',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(270, 615, 'PICK UP CLUES + OPEN',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(295, 640, 'BACKPACK AND MAP',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(440, 690, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state0')
    }
}};