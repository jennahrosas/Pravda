var movement = 1;
var yPos;
var oils;
var i = 0;
var lives3 = 3;
var timeToWin, timer, timerEvent, text, currentTime, slickTimer;
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('oil', 'assets/sprites/oilslick3.png');
        game.load.image('detective','assets/sprites/pravdashoot.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('life', 'assets/sprites/life.png');
        game.load.image('lostLife', 'assets/sprites/lostlife.png');
        game.load.image('road','assets/sprites/road.png');
    },
    create: function(){
        console.log('state5');
        parlorMusic.stop();
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
        lives3Array = [game.add.sprite(10, 0, 'life'), game.add.sprite(85, 0, 'life'), game.add.sprite(160, 0, 'life')];    
        
        
         // Create a custom timer
        timer = game.time.create();
        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
        
        // Start the timer
        timer.start();
        
        //parlorMusic.pause();
        miniMusic.play();
        miniMusic.volume=.3;
        
        
    },
    update: function(){
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
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && detective.y>250 && game.time.now>currentTime+150 && movement == 1){
            movement = 0;
            yPos = detective.y - 160;
            currentTime=game.time.now;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.S) && detective.y<550 && game.time.now>currentTime+150 && movement == 1){
            yPos = detective.y + 160;
            movement = 2;
            currentTime=game.time.now;
        }
        if (movement == 0 && detective.y > yPos) {
            detective.y -= 10;
        }
        else if (movement == 2 && detective.y < yPos) {
            detective.y += 10;
        }
        if (detective.y == yPos) {
            movement = 1;
        }
        //collision detector currently bugged always calling for some reason
        //game.physics.arcade.overlap(detective, oils, this.collisionHandler());
        //test collision
        game.physics.arcade.overlap(detective, oils, collisionHandler,null,this);
    },
    
    render: function(){
        if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 400, 14, "#ff0");
        }
        else {
            game.debug.text("Done!", 2, 14, "#0f0");
        }
    },
    
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
        game.state.start('state17');
    },
    
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }

};

function collisionHandler(obj,oil){
    oil.destroy();
    lives3 -= 1;
    console.log('hi');
    lives3Array[lives3] = game.add.sprite(10+75*lives3, 0, 'lostLife');
    if (lives3 == 0){
        detective.kill();
        game.state.start('state8');
    }
    
}