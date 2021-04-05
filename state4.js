demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){
        game.load.image('rip', 'assets/sprites/lostlife.png', 64,64);
        game.load.image('deaddetective', 'assets/sprites/deaddetective.png', 256,256);
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#ffffff';
        console.log('state4');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var results = game.add.sprite(300,320,'rip')
        results = game.add.sprite(380,320,'rip')
        results = game.add.sprite(460,320,'rip')
        ripdetective = game.add.sprite(290,400,'deaddetective');
        
        var riptext = game.add.text(150, 230, 'YOU WERE KILLED BY THE BAD GUYS.', {fill: 'red'});
        riptext.font = 'Monaco', 'Monospace';
        riptext = game.add.text(330, 270, 'TRY AGAIN!', {fill: 'red'});
        riptext.font = 'Monaco', 'Monospace';
        
        riptext = game.add.text(500, 700, 'PRESS ENTER TO TRY AGAIN.', {fill: 'red'});
        riptext.font = 'Monaco', 'Monospace';
        riptext.fontSize = '18px'
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state2');
    }
}
}