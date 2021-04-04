var currentTime;
var slickTimer;
var oils;
var i = 0;
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
        slickTimer=game.time.now;
        console.log(currentTime);
        
        //add oil
        oils = [game.add.sprite(800,0,'oilslick2'), game.add.sprite(800,0,'oilslick1'), game.add.sprite(800,0,'oilslick3'), game.add.sprite(800,0,'oilslick2'), game.add.sprite(800,0,'oilslick3'), game.add.sprite(800,0,'oilslick1')];
        var index;
        for (index = 0; index < 6;index ++){
            oils[index].scale.setTo(.75);
            game.physics.enable(oils[index]);
        }
        
    },
    update: function(){
        //road+ obstacle movement
        road.tilePosition.x -= 10;
        if(game.time.now>slickTimer+1000){
            oils[i].y = 40 + 160 * Math.floor(Math.random()*3)
            oils[i].x = 800
            game.physics.arcade.moveToXY(oils[i], -200, oils[i].y, 200);
            slickTimer = game.time.now;
            i = (i+1)%6;
        }
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

