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
//array of letters 
var l1,l2,l3,l4,l5,l6,l7;
var usedLetters=[l1,l2,l3,l4,l5,l6,l7];
var n1,n2,n3,n4,n5,n6,n7;
var displayCorrect=[n1,n2,n3,n4,n5,n6,n7];
var z = 1;
demo.state14 = function(){};
demo.state14.prototype = {
    preload: function(){
        game.load.image('game', 'assets/sprites/mastermind.png');
        game.load.image('copcar', 'assets/sprites/copcarbackground.png', 512,512);
        game.load.image('stickynote', 'assets/sprites/postitnote.png', 512, 512);
        game.load.image('guesspad', 'assets/sprites/licenseguess.png', 800, 306);
    },
    create: function(){
        game.stage.backgroundColor = '#e6c822';
        console.log('state14');
        var copcar = game.add.sprite(0,0, 'copcar');
        copcar.scale.setTo(1.6,1.6)
        var board = game.add.sprite(150,180,'game');
        board.scale.setTo(1.75,1.75);
        var postit = game.add.sprite(520, 450, 'stickynote');
        postit.scale.setTo(0.4,0.4);
        var license = game.add.sprite(210, 40, 'guesspad');
        license.scale.setTo(0.5,0.5)
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
        var postittext = game.add.text(555,500,revealOptions.toString())
        postittext.fontSize = '18px';
        postittext.font = 'Monaco', 'Monospace';
    },
    update: function(){
        if (guesses.length == 8){
            game.state.start('state0');
        }
        if (count != 7){
            game.input.keyboard.addCallbacks(this, null, null, keyPress);
        }
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
        checkDisplay();
        //counts right spots in guess and shows which letters were right
        countRight(used);
        console.log(count);
        //saves guess
        guesses[8-attempts] = used;
        attempts --;
        //resets guess and clears license plate
        used = [];
        for (i=0;i<usedLetters.length;i++){
            usedLetters[i].alpha=0;
        }
    }
    else if (used.length < 3 && revealOptions.includes(char) && used.includes(char) == false){
        //adds first 3 letters no repeats
        console.log(char);
        used.push(char);
        displayInput();
    }
    else if (used.length < 8 && used.length > 2 && revealOptions.includes(char) && used.includes(char) == false){
        //adds last 4 numbers
        console.log(char);
        used.push(char);
        displayInput();
    }
    else if (used.length > 0 && ascii == 45){
        console.log('delete');
        //fuctionality for delete key
        used.pop();
        
        usedLetters[used.length].alpha=0;
        
    }
    
}
function countRight(used){
    count = 0;
    for (var i = 0;i<used.length;i++){
        console.log(i);
        if (used[i] == plateOptions[i]){
            count++;
            displayCorrect[i]=game.add.text(252+i*50,100,used[i],{fill: '#ffffff'})
            displayCorrect[i].alpha=1;
            console.log('match');
        }
        else{
            displayCorrect[i]=game.add.text(252+i*50,100,'_', {fill: '#ffffff'})
        }
    }
    
    //you win if you get all 7 in right place
    if (count == 7){
        z = 0;
        console.log('win');
        //clueClick{clueNum:3};
        game.state.start('state20');
    }

}
//function spellOutText(x,y,width,text,fontSize,speed, fill, font){
function displayInput(){
    if (z == 1){
        usedLetters[used.length-1]=game.add.text(190+(used.length-1)*70,290,used[used.length-1], {fill: '#021d59', fontSize: '60px', font:'Monaco', fontFamily: 'Monospace'})
        usedLetters[used.length-1].alpha=1;
    }
}
//checks to see if displayCorrect variable has any letters currently showing
function checkDisplay(){
    var hasLetter=false;
    for (i=0;i<displayCorrect.length;i++){
        if (displayCorrect[i]){
            displayCorrect[i].alpha=0;
        }
    }
}