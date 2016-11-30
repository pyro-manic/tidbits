/**  
	Can't think of your next wacky Binding of Isaac enemy combo? Never fear! Let technology do the dirty deed
	for you.
	Made by Yaniv Sobol (aka videodrome, Captain Midnight)
**/

const monsters = ['Horf', 'Fat Fly', 'Mulliboom', 'Hive'];
const bosses = ['Monstro', 'Dark One', 'Sloth', 'Greed'];

//Random number generator, supports zero and negative values
let rng = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let generateRandomEnemy = () => {
	let pair1 = monsters[rng(0,monsters.length-1)];
	let pair2 = monsters[rng(0,monsters.length-1)];
	console.log(`${pair1} + ${pair2}`);
}

generateRandomEnemy();