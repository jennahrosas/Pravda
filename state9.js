var scope, enemy, box, background,timer1=50,timer2=50,timer3=50,timer4=50;
demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('box', 'assets/sprites/box.png');
        game.load.image('scope','assets/sprites/scope.png');
        game.load.image('background', 'assets/sprites/stripclubexterior.png');
        game.load.image('badguyhalf','assets/sprites/npcshootfronthalf.png');
        game.load.image('enemy','assets/sprites/npcshootfront.png');
        game.load.image('taxi','assets/sprites/car2.png');
        game.load.image('car','assets/sprites/car4.png');
        game.load.image('booth','assets/sprites/phonebooth.png');
        game.load.audio('gunshot','assets/audio/sniper.mp3')

    },
    create: function(){
        console.log('state9');;
        
        //add background
        background = game.add.image(0,0,"background");
        background.scale.setTo(1.57,1.57);
        //add bullet count
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bulletsLeft = [game.add.sprite(0,0,"bullet"), game.add.sprite(0,20,"bullet"), game.add.sprite(0,40,"bullet"), game.add.sprite(0,60,"bullet"), game.add.sprite(0,80,"bullet"), game.add.sprite(0,100,"bullet")];
        
        
        //add sprites
        
        badGuyGroup = game.add.group();
        badGuyGroup.enableBody = true;
        badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        badGuyGroup.create(760, 582, 'badguyhalf');
        badGuyGroup.create(320, 582, 'badguyhalf');
        badGuyGroup.create(875, 452, 'badguyhalf');
        badGuyGroup.scale.setTo(.75,.75);
        //badGuyGroup.anchor.setTo(.5,.5);

        
        enemy=game.add.sprite(120, 375,'enemy');
        enemy.anchor.setTo(.5,.5);
        enemy.scale.setTo(.75,.75);
        enemy.inputEnabled=true;
        enemy.events.onInputDown.add(hitEnemy,this);
        
        box=game.add.sprite(700, 400,'box');
        box.anchor.setTo(.5,.5);
        box.scale.setTo(.3,.3);
        
        booth=game.add.sprite(150, 350,'booth');
        booth.anchor.setTo(.5,.5);
        booth.scale.setTo(2,2);
        
        taxi=game.add.sprite(600, 500,'taxi');
        taxi.anchor.setTo(.5,.5);
        
        car=game.add.sprite(250, 500,'car');
        car.anchor.setTo(.5,.5);
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);
        //add gunshot audio
        gunshot=game.add.audio('gunshot');
    },
    update: function(){
        scope.x=game.input.x;
        scope.y=game.input.y;
        game.input.onDown.addOnce(fired, this);
    },
}

function hitEnemy(){
    console.log('hit');
    
}

function fired(){
    gunshot.play();
    //remove a bullet
}