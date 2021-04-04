var currentTime;
var slickTimer;
var oils;
var i = 0;
var lives = 3;
var timeToWin;
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('oil', 'assets/sprites/oilslick3.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('road','assets/sprites/road.png')
    },
    create: function(){
        console.log('state5');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        road=game.add.tileSprite(0,0,2450,1990,'road');
        game.stage.backgroundColor = '#808080';
        road.scale.setTo(.33);
        
        //add oil
        oil = game.add.sprite(800,400,'oil');
        oils = game.add.group();
        oils.enableBody = true;
        oils.physicsBodyType = Phaser.Physics.ARCADE;
        oils.createMultiple(10, 'oil');
        oils.setAll('checkWorldBounds', true);
        oils.setAll('outOfBoundsKill', true);
        oils.setAll('anchor.y', 0.5);
        oils.setAll('scale.x', 0.75);
        oils.setAll('scale.y', 0.75);
        
        //add detective
        detective = game.add.sprite(110, 410, 'detective');
        detective.anchor.setTo(0.5);
        detective.scale.setTo(0.4);
        game.physics.enable(detective);
        
        //add timers
        currentTime=game.time.now;
        slickTimer=game.time.now;
        console.log(currentTime);
        timeToWin = 30000 + game.time.now;
        
        //lives array to show the image of lives
        livesArray = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];    
        
        
    },
    update: function(){

        console.log('changed counter');
        //winning timer check
        if (game.time.now == timeToWin) {
            console.log ('you win');
        }
        //road+ obstacle movement
        road.tilePosition.x -= 20;
        //oil on screen
        if(game.time.now>slickTimer+800){
            //adds more randomness so oilslick does not repeat
             //used to inc difficulty 
            lane = 250 + Math.floor(Math.random()*3) * 160
            if (oil.y == 250 && lane == 250){
                lane = 250 + Math.ceil(Math.random()*2) * 160
            }
            else if (oil.y == 410 && lane == 410){
                lane = 250 + Math.floor(Math.random()*2) * 320
            }
            else if (oil.y == 570 && lane == 570){
                lane = 250 + Math.floor(Math.random()*2) * 160
            }
            //spawning oil
            oil = oils.getFirstDead();
            oil.reset(800 , lane);
            game.physics.arcade.moveToXY(oil, 0, oil.y, 395);
            slickTimer = game.time.now;
        }
        //detective movement
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && detective.y>250 && game.time.now>currentTime+150){
            detective.y-=160;
            currentTime=game.time.now;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<550 && game.time.now>currentTime+150){
            detective.y+=160 ;
            currentTime=game.time.now;
        }
        //collision detector currently bugged always calling for some reason
        //game.physics.arcade.overlap(detective, oils, this.collisionHandler());
        //test collision
        game.physics.arcade.overlap(detective, oils, collisionHandler,null,this);
    },

};

function collisionHandler(obj,oil){
    oil.destroy();
    lives -= 1;
    console.log('hi');
    livesArray[lives] = game.add.sprite(10+75*lives, 0, 'lostLife');
    if (lives == 0){
        detective.kill();
        game.state.start('state4');
        lives = 3;
    }
    
}