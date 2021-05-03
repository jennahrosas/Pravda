
demo.state20 = function(){};
demo.state20.prototype = {
    preload: function(){
        game.load.image('copcar', 'assets/sprites/copcarbackground.png', 512,512);
    },
    create: function(){
        game.stage.backgroundColor = '#e6c822';
        console.log('state20');
        var copcar = game.add.sprite(0,0, 'copcar');
        copcar.scale.setTo(1.6,1.6)
        var gametext = game.add.text(270, 240, "LICENSE NUMBER: " + plateOptions, {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 260, "NAME: DA- FALCO", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 280, "ADDRESS: 2002 Avenue M, New", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 300, "York City, New York 10452", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 360, "YOU FOUND THE MOB BOSS'S", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 380, 'ADDRESS! HEAD OVER THERE,', {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(270, 400, "AND SOLVE THIS CASE!", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
        gametext = game.add.text(330, 440, "Press 'Enter' to start!", {fill:'#5ce647'});
        gametext.font = 'Monaco', 'Monospace'
        gametext.fontSize = '16px'
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            progress += 1
            game.state.start('state18');
        
    }
}
};