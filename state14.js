var plateOptions;
var revealOptions;
var attempts = 8;
var curLetter = 0;
var guesses;
var used = [];
var count;
demo.state14 = function(){};
demo.state14.prototype = {
    preload: function(){
        game.load.image('game', 'assets/sprites/mastermind.png');
    },
    create: function(){
        game.stage.backgroundColor = '#ffffff';
        console.log('state14');
        var board = game.add.sprite(0,0,'game');
        //code to generate a unique set of options (I can get rid of this if you want it to be pre determined or we can move this to another state to save there but i thought it woudl be cool to change every game)
        plateOptions = ['','','',-1,-1,-1,-1]
        revealOptions = ['','','',-1,-1,-1,-1]
        //adding unique letters
        var a = String.fromCharCode(Math.floor(Math.random()*26+65));
        plateOptions[0] = a;
        revealOptions[0] = a;
        while (plateOptions.includes(a) == true){
            a = String.fromCharCode(Math.floor(Math.random()*26+65));
        }
        plateOptions[1] = a;
        revealOptions[1] = a;
        while (plateOptions.includes(a) == true){
            a = String.fromCharCode(Math.floor(Math.random()*26+65));
        }
        plateOptions[2] = a;
        revealOptions[2] = a;
        //adding unique nums
        a = Math.floor(Math.random()*10);
        plateOptions[3] = a;
        revealOptions[3] = a;
        while (plateOptions.includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[4] = a;
        revealOptions[4] = a;
        while (plateOptions.includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[5] = a;
        revealOptions[5] = a;
        while (plateOptions.includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[6] = a;
        revealOptions[6] = a;
        //sorting the stated options
        revealOptions.sort();
        //revealOptions = [revealOptions.slice(4,7)] + [revealOptions.slice(0,4)];
        //checking theyre ok
        console.log(plateOptions);
        console.log(revealOptions);
        guesses = [];
    },
    update: function(){
        if (guesses.length == 8){
            game.state.start('state0');
        }
        game.input.keyboard.addCallbacks(this, null, null, keyPress)
        
    },
}
function keyPress(char){
    ascii = char.charCodeAt(0);
    if (ascii < 123 && 96 < ascii){  
        ascii -= 32
        char = String.fromCharCode(ascii);
    }
    if (ascii < 58 && 47 < ascii){
        char = ascii - 48
    }
    //console.log(ascii);
    //console.log(char);
    if (used.length == 7 && ascii == 13){
        console.log('enter');
        countRight(used);
        console.log(count);
        guesses[8-attempts] = used;
        attempts --;
        //used = [];
    }
    else if (used.length < 3 && revealOptions.includes(char) && used.includes(char) == false){
        console.log(char);
        used.push(char);
    }
    else if (used.length < 8 && used.length > 2 && revealOptions.includes(char) && used.includes(char) == false){
        console.log(char);
        used.push(char);
    }
    else if (used.length > 0 && ascii == 45){
        console.log('delete');
        used.pop();
    }
}
function countRight(used){
    count = 0;
    for (var i = 0;i<used.length;i++){
        console.log(i);
        if (used[i] == plateOptions[i]){
            count++;
            console.log('match');
        }
    }
}