demo.state16 = function(){};
demo.state16.prototype = {
    preload: function(){
        game.load.spritesheet('background', 'assets/spritesheets/opening.png', 512, 512);
        game.load.audio('jazzintro','assets/audio/jazzclip.mp3');
    },
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,640,640);
        game.stage.backgroundColor = '#000000';
        console.log('state16');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0,'background');
        background.scale.setTo(1.56,1.56);
        game.physics.enable(background);
        background.enableBody = true;
        background.physicsBodyType=Phaser.Physics.ARCADE;
        background.body.collideWorldBounds=true;
        
        background.animations.add('starry',[0,1,2,3,4]);
        background.animations.play('starry',4,true);
        
        var jazz = game.add.audio('jazzintro');
        jazz.play();
        jazz.resume();
        jazz.volume = 0.3;
        console.log(jazz.volume);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('state3')
    }
}};