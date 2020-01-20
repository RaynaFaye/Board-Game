let tmpArr = [], // Temporary 1-dimensional array to hold all values
  board = [], //Final 1-dimensional array with all values
  farLeftColumn = [],
  farRightColumn = [],
  theObstacles = [],
  theWeapons = [],
  thePlayers = [],
  obstacles = 10,
  weapons = 5,
  i,
  boardgame = document.querySelector('#boardgame');

/*Prototype to create the board game for a type of map with all elements placed randomly. Then we will be able to call it again to start a new game*/
let Map = {
  init: function(size, obstacle, weapon, player) {
    this.size = size;
    this.obstacle = obstacle;
    this.weapon = weapon;
    this.player = player;
  },
  creation: function() {
    // Create full temp array with all the cells
    for (i = 0; i < this.size; i += 1) {
      tmpArr.push('empty');
    }
    //Splitting up to array to place the players on far left and right, so they don't touch each other at start, and the rest obstacles and weapons in the middle
    farLeftColumn = tmpArr.splice(0, 10);
    farRightColumn = tmpArr.splice(80, 90);
    let previousIndex = [];
    for (i = 0; i < 10; i += 1) {
      let index = Math.floor(Math.random() * tmpArr.length);
      for (let j = 0; j < previousIndex.length; j++) {
        if (index === previousIndex[j]) {
          index = Math.floor(Math.random() * tmpArr.length);
        }
      }
      previousIndex.push(index);
      tmpArr.splice(index, 1, 'obstacle');
      theObstacles.push(index + 10);
    }
    function placeWeapon(element) {
      let index2 = Math.floor(Math.random() * tmpArr.length);
      for (let j = 0; j < previousIndex.length; j++) {
        if (index2 === previousIndex[j]) {
          index2 = Math.floor(Math.random() * tmpArr.length);
        }
      }
      previousIndex.push(index2);
      tmpArr.splice(index2, 1, element);
      theWeapons.push(index2 + 10);
    }
    function placePlayer(arrayName, element, add) {
      let index3 = Math.floor(Math.random() * arrayName.length);
      arrayName.splice(index3, 1, element);
      thePlayers.push(index3 + add);
    }
    placeWeapon('weapontwo');
    placeWeapon('weaponthree');
    placeWeapon('weaponfour');
    placeWeapon('weaponfive');
    placeWeapon('healthpotion');
    placePlayer(farLeftColumn, 'playerone', 0);
    placePlayer(farRightColumn, 'playertwo', 90);
    //Reassembling into the final board: one unique array
    board = [...farLeftColumn, ...tmpArr, ...farRightColumn];
    board.forEach(element => {
      let newSquare = document.createElement('div');
      newSquare.classList.add('boardcell');
      newSquare.classList.add(element);
      if (element === 'playertwo') {
        newSquare.classList.add('flip');
      }
      if (element === 'healthpotion' || element === 'weapontwo' || element === 'weaponthree' || element === 'weaponfour' || element === 'weaponfive') {
        newSquare.classList.add('weapon');
      }
      boardgame.appendChild(newSquare);
    });
  }
};

/* Initializing the Map, the size will be a 10 * 10 map, so 100 Squares. Each object placed in the map are all placed into arrays to track their position*/
var boardplateau = Object.create(Map);
boardplateau.init(100, theObstacles, theWeapons, thePlayers);
boardplateau.creation();

/*Show intro message before showing the game, once clicked on start the game is shown. Option to see english instructions when clicking on the english flag or returning back to french ones*/
let frenchInstructions = document.querySelector('.instructions-french');
let englishInstructions = document.querySelector('.instructions-english');
let frenchButton = document.querySelector('.french');
let englishButton = document.querySelector('.english');
frenchButton.addEventListener('click', function() {
  frenchInstructions.style.display = 'block';
  englishInstructions.style.display = 'none';
});
englishButton.addEventListener('click', function() {
  frenchInstructions.style.display = 'none';
  englishInstructions.style.display = 'block';
});

let startButton = document.querySelector('#start');
let introduction = document.querySelector('#intro');
let languageButtons = document.querySelectorAll('.language');
let playerSections = document.querySelectorAll('.player-section');
startButton.addEventListener('click', function() {
  introduction.style.display = 'none';
  languageButtons.forEach(button => {
    button.style.display = 'none';
  });
  playerSections.forEach(section => {
    section.style.display = 'block';
  });
  boardgame.style.display = 'flex';
});
