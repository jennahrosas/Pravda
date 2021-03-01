var game = new Phaser.Game(640 , 640 , Phaser.AUTO);
game.state.add('state0' , demo.state0);
game.state.start('state0');