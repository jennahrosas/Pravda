demo.state10 = function(){};
demo.state10.prototype = {
    preload: function(){       
        game.load.image('click','assets/sprites/mouse.png',256,256);
        game.load.image('bellarosa', 'assets/sprites/stripclubexterior.png', 512,512)
    },
    create: function(){
        var bellarosa = game.add.image(0,0,'bellarosa');
        bellarosa.scale.setTo(1.57,1.57);
        console.log('state10');
        music.stop();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var minigametext = game.add.text(250, 320, 'DETECTIVE PRAVDA!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '30px'
        minigametext = game.add.text(250, 370, 'YOU FOUND BELLA ROSA!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(65, 400, 'IN ORDER TO GET INTO THE BELLA ROSA STRIP CLUB, YOU',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(115, 430, 'NEED TO KILL THE BAD GUYS GUARDING THE DOOR.',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(70, 460, 'HOWEVER, YOU ONLY HAVE A LIMITED NUMBER OF BULLETS!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        minigametext = game.add.text(145, 490, 'AIM WELL, AND SHOOT SPARINGLY. GOOD LUCK!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace'
        minigametext.fontSize = '22px'
        
        var click = game.add.sprite(345, 540, 'click');
        click.scale.setTo(0.45);
        
        minigametext = game.add.text(370, 640, 'SHOOT',{fill:'#ffffff'});
        minigametext.fontSize = '24px';
        minigametext.font = 'Monaco', 'Monospace';
        minigametext = game.add.text(450, 730, 'PRESS ENTER TO START!',{fill:'#ffffff'});
        minigametext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state9')
    }
}};