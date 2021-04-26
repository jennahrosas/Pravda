
demo.state15 = function(){};
demo.state15.prototype = {
    preload: function(){
        game.load.image('copcar', 'assets/sprites/copcarbackground.png', 512,512);
    },
    create: function(){
        game.stage.backgroundColor = '#e6c822';
        console.log('state15');
        var copcar = game.add.sprite(0,0, 'copcar');
        copcar.scale.setTo(1.6,1.6)
        var gametext = game.add.text(270, 240, "You have 8 guesses. Hit enter", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 260, "to confirm your guess, '-' to", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 280, "backspace if you made a", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 300, "mistake in your guess. We", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 320, 'know the license plate has', {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 340, "these 7 elements: ", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 360, revealOptions, {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 380, 'Good luck!', {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(330, 440, "Press 'Enter' to start!", {fill:'#ffffff'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        guesses = [];
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state14');
        
    }
}
};