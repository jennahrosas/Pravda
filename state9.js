var scope, background, enemy1, enemy2, enemy3, enemy4, dead = 0, shots = 5, timers=[5000+Math.random()*5000, 5000+Math.random()*5000, 5000+Math.random()*5000, 5000+Math.random()*5000], direction = [-5,-5,-5,-5];
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
        console.log('state9');
        //add background
        background = game.add.image(0,0,"background");
        background.scale.setTo(1.57,1.57);
        background.inputEnabled = true;
        //background.events.onInputDown.add(shot,this);
        //add bullet count
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bulletsLeft = [game.add.sprite(0,0,"bullet"), game.add.sprite(0,20,"bullet"), game.add.sprite(0,40,"bullet"), game.add.sprite(0,60,"bullet"), game.add.sprite(0,80,"bullet"), game.add.sprite(0,100,"bullet")];
        

        //add sprites
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);

        

        //add sprites      
        
        enemy1=game.add.sprite(130, 375,'enemy');
        enemy1.anchor.setTo(.5,.5);
        enemy1.scale.setTo(.75,.75);
        enemy1.inputEnabled=true;
        enemy1.events.onInputDown.add(hitEnemy,this);
        
        enemy2=game.add.sprite(251, 495, 'badguyhalf');
        enemy2.anchor.setTo(.5,.5);
        enemy2.scale.setTo(.75,.75);
        enemy2.inputEnabled=true;
        enemy2.events.onInputDown.add(hitEnemy,this);
        
        enemy3=game.add.sprite(590, 495, 'badguyhalf');
        enemy3.anchor.setTo(.5,.5);
        enemy3.scale.setTo(.75,.75);
        enemy3.inputEnabled=true;
        enemy3.events.onInputDown.add(hitEnemy,this);
        
        enemy4=game.add.sprite(701, 400, 'badguyhalf');
        enemy4.anchor.setTo(.5,.5);
        enemy4.scale.setTo(.75,.75);
        enemy4.inputEnabled=true;
        enemy4.events.onInputDown.add(hitEnemy,this);
        
        var box=game.add.sprite(700, 400,'box');
        box.anchor.setTo(.5,.5);
        box.scale.setTo(.3,.3);
        box.inputEnabled=true;
        box.events.onInputDown.add(hitEnemy,this);
        
        var booth=game.add.sprite(150, 350,'booth');
        booth.anchor.setTo(.5,.5);
        booth.scale.setTo(2,2);
        booth.inputEnabled=true;
        booth.events.onInputDown.add(hitEnemy,this);
        
        var taxi=game.add.sprite(600, 500,'taxi');
        taxi.anchor.setTo(.5,.5);
        taxi.inputEnabled=true;
        taxi.events.onInputDown.add(hitEnemy,this);
        
        var car=game.add.sprite(250, 500,'car');
        car.anchor.setTo(.5,.5);
        car.inputEnabled=true;
        car.events.onInputDown.add(hitEnemy,this);
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);
        //add gunshot audio
        gunshot=game.add.audio('gunshot');
        gunshot.volume=.5;
    },
    update: function(){
        scope.x=game.input.x;
        scope.y=game.input.y;
        game.input.onDown.addOnce(shot, this);
        if (timers[0] < game.time.now){
            if (enemy1.x > 50 && enemy1.x < 125){
                    enemy1.x += direction[0];
            }
            else if (enemy1.x == 50){
                if (direction[0] > 0){
                    enemy1.x += direction[0];
                }
                else{
                    direction[0] = -direction[0];
                    timers[0] = game.time.now + 2000 + 3000 * Math.random();
                }
            }
            else{
                if (direction[0] < 0){
                    enemy1.x += direction[0];
                }
                else{
                    direction[0] = -direction[0];
                    timers[0] = game.time.now + 3000 + 5000 * Math.random();
                }
            }
        }
        if (timers[1] < game.time.now){
            if (enemy2.y > 400 && enemy2.y < 495){
                    enemy2.y += direction[1];
            }
            else if (enemy2.y == 400){
                if (direction[1] > 0){
                    enemy2.y += direction[1];
                }
                else{
                    direction[1] = -direction[1];
                    timers[1] = game.time.now + 2000 + 3000 * Math.random();
                }
            }
            else{
                if (direction[1] < 0){
                    enemy2.y += direction[1];
                }
                else{
                    direction[1] = -direction[1];
                    timers[1] = game.time.now + 3000 + 5000 * Math.random();
                }
            }
        }
        if (timers[2] < game.time.now){
            if (enemy3.y > 400 && enemy3.y < 495){
                    enemy3.y += direction[2]
            }
            else if (enemy3.y == 400){
                if (direction[2] > 0){
                    enemy3.y += direction[2];
                }
                else{
                    direction[2] = -direction[2];
                    timers[2] = game.time.now + 2000 + 3000 * Math.random();
                }
            }
            else{
                if (direction[2] < 0){
                    enemy3.y += direction[2];
                }
                else{
                    direction[2] = -direction[2];
                    timers[2] = game.time.now + 3000 + 5000 * Math.random();
                }
            }
        }
        if (timers[3] < game.time.now){
            if (enemy4.y > 305 && enemy4.y < 400){
                    enemy4.y += direction[3]
            }
            else if (enemy4.y == 305){
                if (direction[3] > 0){
                    enemy4.y += direction[3];
                }
                else{
                    direction[3] = -direction[3];
                    timers[3] = game.time.now + 2000 + 3000 * Math.random();
                }
            }
            else{
                if (direction[3] < 0){
                    enemy4.y += direction[3];
                }
                else{
                    direction[3] = -direction[3];
                    timers[3] = game.time.now + 3000 + 5000 * Math.random();
                }
            }
        }
    },
}



function hitEnemy(obj){
    if (obj.x != 150 && obj.x != 700 && obj.x != 600 && obj.x != 250){
        obj.destroy();
        dead+=1
    }
    if(dead==4){
        game.state.start('state12');
    }
}
function shot(){
    gunshot.play();
    bulletsLeft[shots].destroy();
    shots-=1
    if(shots==0){
        game.state.start('state11');
    }
    
}