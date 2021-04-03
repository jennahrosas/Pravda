var currentTime;

demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('oilslick1', 'assets/sprites/oilslick1.png');
        game.load.image('oilslick2', 'assets/sprites/oilslick2.png');
        game.load.image('oilslick3', 'assets/sprites/oilslick3.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('road','assets/sprites/road.png')
    },
    create: function(){
        console.log('state5');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        road=game.add.tileSprite(0,0,2450,1536,'road');
        game.stage.backgroundColor = '#808080';
        road.scale.setTo(.33);
        //add detective
        detective = game.add.sprite(110, 400, 'detective');
        detective.anchor.setTo(0.5);
        detective.scale.setTo(0.4);
        game.physics.enable(detective);
        
        //add timer
        currentTime=game.time.now;
        console.log(currentTime);
        
        //add oil
        oilslick1=game.add.sprite(800,60,'oilslick1');
        oilslick2=game.add.sprite(800,200,'oilslick2');
        oilslick3=game.add.sprite(800,340,'oilslick3');
        oilslick1.scale.setTo(.75);
        oilslick2.scale.setTo(.75);
        oilslick3.scale.setTo(.75);
        game.physics.enable(oilslick1);
        game.physics.enable(oilslick2);
        game.physics.enable(oilslick3);

    },
    update: function(){
        //road+ obstacle movement
        road.tilePosition.x -= 10;
        oilslick1.x -= 3.29;
        oilslick2.x -= 3.29;
        oilslick3.x -= 3.29;
        
        //detective movement
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && detective.y>80 && game.time.now>currentTime+125){
            detective.y-=160;
            currentTime=game.time.now;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<350 && game.time.now>currentTime+125){
            detective.y+=160 ;
            currentTime=game.time.now;
        }
    },
};

function collisionHandler(){
    
}

