demo.state11 = function(){};
demo.state11.prototype = {
    preload: function(){
        game.load.image('bullet', 'assets/sprites/bullet.png', 62,19);
        game.load.image('deaddetective', 'assets/sprites/deaddetective.png', 256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#6b6e5e';
        console.log('state11');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var bullet = game.add.sprite(220,320,'bullet')
        bullet = game.add.sprite(300,320,'bullet')
        bullet = game.add.sprite(380,320,'bullet')
        bullet = game.add.sprite(460,320,'bullet')
        bullet = game.add.sprite(540,320,'bullet')
        ripdetective = game.add.sprite(290, 350,'deaddetective');
        
        var riptext = game.add.text(165, 230, 'UH-OH! YOU RAN OUT OF BULLETS!', {fill: '#e7edcc'});
        riptext.font = 'Monaco', 'Monospace';
        riptext = game.add.text(330, 270, 'TRY AGAIN!', {fill: '#e7edcc'});
        riptext.font = 'Monaco', 'Monospace';
        
        riptext = game.add.text(500, 700, 'PRESS ENTER TO TRY AGAIN!', {fill: '#e7edcc'});
        riptext.font = 'Monaco', 'Monospace';
        riptext.fontSize = '18px'
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state9');
    }
}
}