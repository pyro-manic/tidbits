/***
//"Rick and Morty" Rick cipher/converter, by Yaniv Sobol (aka videodrome)
***/


/*** Working variables, initalizations ***/

//Placeholder for the input string that will be cyphered by the app, TODO: grab this from the DOM with jQuery or React
let baseInput = "The quick brown fox jumped over the lazy dog";
let bi2 = "I am so blue I'm greener than purple.";

//Base chance to apply a mod to the sentence on each iteration
let baseChance = 0.3; 

//An enum with identities of different filler words/mods
let Mods = {
	FILL: 0, //Fills simply position themselves between two words in the sentence
	BREAK: 1, //Breaks place themselves after a word and "break" the sentence, the next word is capitalized
	STUTTER: 2, //"Stutter" over the last word, repeating its last character
	POSTFIX: 3 //Appends a phrase to the end of the sentence
}


//An array of key-value pairs of words and their behavior in the sentence (henceforth referred to as 'mod')
let wordList = [
	{word: '*burp*',mod: Mods.FILL},
	{word: '*hick*',mod: Mods.FILL},
	//{word: ' sss...', mod: Mods.BREAK}, Deprecated
	{word: ', Morty!', mod: Mods.POSTFIX},
	{word: 'Now fetch me the screwdriver!', mod: Mods.POSTFIX},
	{word: null, mod: Mods.STUTTER}
]



/*** Functions ***/

//Generate a random whole number from a range (min and max values inclusive), tested with negative values and 0
let rng = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Chooses a word/mod pair from the word list
let getRandomWord = () => { return wordList[rng(0,wordList.length-1)]; }

//Return a capitalized word
let capitalize = (str) => { return str[0].toUpperCase() + str.substr(1,str.length-1); }

//The main function: take the input string and "rickify" it, return the rickified string
let rickify = (str) => {
	
	let strArr = str.split(' '); //Manufactures an array of words from the input string
	let ret = ''; //Return string
	
	for (let i = 0; i < strArr.length; i++) {
		let word = getRandomWord(); //Get a random word/mod pair from the wordsList array
		ret += strArr[i]; //Append the currently iterated word
		
		 //Append a space and continue iterating through the sentence if the base chance hasn't been met
		if (baseChance < Math.random()) {
			ret += ' ';
			continue;
		}
		
		switch(word.mod) { //Handle different mod cases, TODO: wrap this in a separate function
			case Mods.FILL:
				ret += ' ' + word.word + ' '; break;
			case Mods.BREAK:
				ret += word.word;
				ret += (i + 1 > strArr.length -1) ? '' : ' ' + capitalize(strArr[i + 1]) + ' '; 
				i++;
				break;
			case Mods.STUTTER:
				let stutter = strArr[i][strArr[i].length-1];
				for (let y = 0; y < rng(2,5); y++) ret += stutter;
				ret += '...';
				break;
			case Mods.POSTFIX:
				ret += word.word;
				break;
			default:
				break;
		}
		
	}
	
	return ret;
	
}
console.log(rickify(bi2));