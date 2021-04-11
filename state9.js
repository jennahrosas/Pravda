var scope, enemy, box, background, timers=[5000+Math.random()*5000, 5000+Math.random()*5000, 5000+Math.random()*5000, 5000+Math.random()*5000], direction = [-1,-1,-1,-1];
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

    },
    create: function(){
        console.log('state9');;
        
        //add background
        background = game.add.image(0,0,"background");
        background.scale.setTo(1.57,1.57);
        //add bullet count
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bulletsLeft = [game.add.sprite(0,0,"bullet"), game.add.sprite(0,20,"bullet"), game.add.sprite(0,40,"bullet"), game.add.sprite(0,60,"bullet"), game.add.sprite(0,80,"bullet"), game.add.sprite(0,100,"bullet")];
        
        //adding scope
        scope = game.add.sprite(game.world.centerX, game.world.centerY, 'scope');
        scope.anchor.setTo(.5,.5);
        scope.scale.setTo(.15,.15);
        game.physics.enable(scope,Phaser.Physics.ARCADE);
        //add sprites      
        
        enemy1=game.add.sprite(120, 375,'enemy');
        enemy1.anchor.setTo(.5,.5);
        enemy1.scale.setTo(.75,.75);
        enemy1.inputEnabled=true;
        enemy1.events.onInputDown.add(hitEnemy,this);
        
        enemy2=game.add.sprite(250, 490, 'badguyhalf');
        enemy2.anchor.setTo(.5,.5);
        enemy2.scale.setTo(.75,.75);
        enemy2.inputEnabled=true;
        enemy2.events.onInputDown.add(hitEnemy,this);
        
        enemy3=game.add.sprite(590, 490, 'badguyhalf');
        enemy3.anchor.setTo(.5,.5);
        enemy3.scale.setTo(.75,.75);
        enemy3.inputEnabled=true;
        enemy3.events.onInputDown.add(hitEnemy,this);
        
        enemy4=game.add.sprite(700, 395, 'badguyhalf');
        enemy4.anchor.setTo(.5,.5);
        enemy4.scale.setTo(.75,.75);
        enemy4.inputEnabled=true;
        enemy4.events.onInputDown.add(hitEnemy,this);
        
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
        console.log(game.time.now);
        
    },
    update: function(){
        scope.x=game.input.x;
        scope.y=game.input.y;
        if (timers[0] < game.time.now){
            if (enemy1.x > 50 && enemy1.x < 120){
                    enemy1.x += direction[0];
            }
            else if (enemy1.x == 50){
                if (direction[0] == 1){
                    enemy1.x += direction[0];
                }
                else{
                    direction[0] = 1;
                    timers[0] = game.time.now + 2000 + 2000 * Math.random();
                }
            }
            else{
                if (direction[0] == -1){
                    enemy1.x += direction[0];
                }
                else{
                    direction[0] = -1;
                    timers[0] = game.time.now + 3000 + 3000 * Math.random();
                }
            }
        }
        if (timers[1] < game.time.now){
            if (enemy2.y > 400 && enemy2.y < 490){
                    enemy2.y += direction[1];
            }
            else if (enemy2.y == 400){
                if (direction[1] == 1){
                    enemy2.y += direction[1];
                }
                else{
                    direction[1] = 1;
                    timers[1] = game.time.now + 2000 + 2000 * Math.random();
                }
            }
            else{
                if (direction[1] == -1){
                    enemy2.y += direction[1];
                }
                else{
                    direction[1] = -1;
                    timers[1] = game.time.now + 3000 + 3000 * Math.random();
                }
            }
        }
        if (timers[2] < game.time.now){
            if (enemy3.y > 400 && enemy3.y < 490){
                    enemy3.y += direction[2]
            }
            else if (enemy3.y == 400){
                if (direction[2] == 1){
                    enemy3.y += direction[2];
                }
                else{
                    direction[2] = 1;
                    timers[2] = game.time.now + 2000 + 2000 * Math.random();
                }
            }
            else{
                if (direction[2] == -1){
                    enemy3.y += direction[2];
                }
                else{
                    direction[2] = -1;
                    timers[2] = game.time.now + 3000 + 3000 * Math.random();
                }
            }
        }
        if (timers[3] < game.time.now){
            if (enemy4.y > 305 && enemy4.y < 395){
                    enemy4.y += direction[3]
            }
            else if (enemy4.y == 305){
                if (direction[3] == 1){
                    enemy4.y += direction[3];
                }
                else{
                    direction[3] = 1;
                    timers[3] = game.time.now + 2000 + 2000 * Math.random();
                }
            }
            else{
                if (direction[3] == -1){
                    enemy4.y += direction[3];
                }
                else{
                    direction[3] = -1;
                    timers[3] = game.time.now + 3000 + 3000 * Math.random();
                }
            }
        }
    },
}

function hitEnemy(){
    console.log('hit');
}