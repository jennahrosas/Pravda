//the actual order your trying to guess
var plateOptions;
//the list of options in alpa order
var revealOptions;
//how many guesses left game ends when it reaches 0
var attempts = 8;
//past guesses
var guesses;
//current guess
var used = [];
//count of how many you guessed right
var count;
demo.state14 = function(){};
demo.state14.prototype = {
    preload: function(){
        game.load.image('game', 'assets/sprites/mastermind.png');
        game.load.image('copcar', 'assets/sprites/copcarbackground.png', 512,512);
    },
    create: function(){
        game.stage.backgroundColor = '#e6c822';
        console.log('state14');
        var copcar = game.add.sprite(0,0, 'copcar');
        copcar.scale.setTo(1.6,1.6)
        var board = game.add.sprite(50,180,'game');
        board.scale.setTo(1.75,1.75);
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
        revealOptions = [revealOptions[4], revealOptions[5], revealOptions[6], revealOptions[0], revealOptions[1], revealOptions[2], revealOptions[3]];
        //revealOptions = [revealOptions.slice(4,7)] + [revealOptions.slice(0,4)];
        //checking theyre ok
        console.log(plateOptions);
        console.log(revealOptions);
        //spellOutText(10,410,700,"You have 8 guesses. Hit enter to confirm your guess, '-' to backspace if you made a mistake in your guess. We know the license plate has these 7 elements: " + revealOptions + ". Good luck!",30,20,'#000000','Monaco', 'Monospace');
        guesses = [];
    },
    update: function(){
        if (guesses.length == 8){
            game.state.start('state0');
        }
        game.input.keyboard.addCallbacks(this, null, null, keyPress);
        
    },
}
function keyPress(char){
    ascii = char.charCodeAt(0);
    //capitalize letters to match
    if (ascii < 123 && 96 < ascii){  
        ascii -= 32
        char = String.fromCharCode(ascii);
    }
    //making number input into ints
    if (ascii < 58 && 47 < ascii){
        char = ascii - 48
    }
    //console.log(ascii);
    //console.log(char);
    //if enter is clicked and cur guess is full
    if (used.length == 7 && ascii == 13){
        console.log('enter');
        //counts right spots in guess
        countRight(used);
        console.log(count);
        //saves guess
        guesses[8-attempts] = used;
        attempts --;
        //rests guess
        used = [];
    }
    else if (used.length < 3 && revealOptions.includes(char) && used.includes(char) == false){
        //adds first 3 letters no repeats
        console.log(char);
        used.push(char);
    }
    else if (used.length < 8 && used.length > 2 && revealOptions.includes(char) && used.includes(char) == false){
        //adds last 4 numbers
        console.log(char);
        used.push(char);
    }
    else if (used.length > 0 && ascii == 45){
        console.log('delete');
        //fuctionality for delete key
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
    //you win if you get all 7 in right place
    if (count == 7){
        console.log('win');
        game.state.start('state0');
    }
}

function displayInput(){

}
//fuction to add pegs on screen to get how many you got right we could change to just a number but idk
function addPegs(count){
    
}