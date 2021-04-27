
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
        var gametext = game.add.text(270, 240, "The club owner gave you a", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 260, "post-it note with the mob", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(268, 280, "boss's license plate number", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 300, "taken from the parking lot", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 320, "security footage, but you have", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 340, 'to unscramble them!', {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 360, 'You have 8 guesses. Hit enter', {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 380, "to confirm your guess, '-' to", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 400, 'backspace if you made a', {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 420, 'mistake. Good luck!', {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(330, 450, "Press 'Enter' to start!", {fill:'#5ce647'});
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