var plateOptions;
var revealOptions;
var attempts = 8;
var curLetter = 0;
var guesses = [];
var used = [];
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
        plateOptions = [['','',''],[-1,-1,-1,-1]]
        //adding unique letters
        var a = String.fromCharCode(Math.floor(Math.random()*26+65));
        plateOptions[0][0] = a;
        revealOptions[0][0] = a;
        while (plateOptions[0].includes(a) == true){
            a = String.fromCharCode(Math.floor(Math.random()*26+65));
        }
        plateOptions[0][1] = a;
        revealOptions[0][1] = a;
        while (plateOptions[0].includes(a) == true){
            a = String.fromCharCode(Math.floor(Math.random()*26+65));
        }
        plateOptions[0][2] = a;
        revealOptions[0][2] = a;
        //adding unique nums
        a = Math.floor(Math.random()*10);
        plateOptions[1][0] = a;
        revealOptions[1][0] = a;
        while (plateOptions[1].includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[1][1] = a;
        revealOptions[1][1] = a;
        while (plateOptions[1].includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[1][2] = a;
        revealOptions[1][2] = a;
        while (plateOptions[1].includes(a) == true){
            a = Math.floor(Math.random()*10);
        }
        plateOptions[1][3] = a;
        revealOptions[1][3] = a;
        //sorting the stated options
        revealOptions[0].sort();
        revealOptions[1].sort();
        //checking theyre ok
        console.log(plateOptions);
        console.log(revealOptions);
        guesses= [[]]*8;
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
    console.log(ascii);
    console.log(char);
    if (used.length == 7 && ascii == 13){
        console.log('enter');
        guesses.append(used);
    }
    else if (used.length < 3 && revealOptions[0].includes(char) && used.includes(char) == false){
        console.log(char);
        used.push(char);
    }
    else if (used.length < 8 && used.length > 2 && revealOptions[1].includes(char) && used.includes(char) == false){
        console.log(char);
        used.push(char)
    }
    else if (used > 0 && ascii == 45){
        console.log('delete');
        used.pop();
    }
    return 0
}
