demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.image('controls','assets/sprites/controls.png',256,256);
        game.load.image('filmnoir', 'assets/sprites/intro.png', 850, 638);
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
        var introtext = game.add.text(180, 40, 'GREETINGS, DETECTIVE PRAVDA!',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext = game.add.text(80, 90, 'A NEW CASE HAS ARRIVED FOR YOU. YOU NEED TO FIND',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(65, 118, 'THE NAME OF THE LEADER THAT RUNS THE CENTURIES-OLD',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(80, 145, 'PETRELLI MOB. WALK AROUND THE CITY, AND FIND ANY',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(68, 172, "PEOPLE OR CLUES THAT WILL LEAD TO THE BOSS'S NAME.",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(60, 198, 'YOU WILL GET A NUMBER OF LETTERS AT THE END OF EACH',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(75, 225, "LEVEL THAT WILL EVENTUALLY SPELL OUT THE LEADER'S",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        introtext = game.add.text(205, 252, "NAME. GOOD LUCK! MAKE US PROUD.",{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace'
        introtext.fontSize = '22px'
        
        var controls = game.add.sprite(185, 280, 'controls');
        controls.scale.setTo(0.6);
        var eInteract = game.add.sprite(420, 260, 'eInteract');
        eInteract.scale.setTo(0.6);
        var mouse = game.add.sprite(350, 440, 'mouse');
        mouse.scale.setTo(0.3);
        
        introtext = game.add.text(240, 395, 'MOVE',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(410, 395, 'INTERACT W/ NPCs',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(270, 525, 'PICK UP CLUES + OPEN',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(295, 550, 'BACKPACK AND MAP',{fill:'#adde8a'});
        introtext.fontSize = '20px';
        introtext.font = 'Monaco', 'Monospace';
        introtext = game.add.text(440, 700, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        introtext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state0')
    }
}};