let playerOnePosition = thePlayers[0],
  playerTwoPosition = thePlayers[1],
  availableSquares = [],
  leftrow = [],
  rightrow = [],
  toprow = [],
  bottomrow = [],
  nearbysquares,
  square1,
  square2,
  square3,
  messageWeaponChange = 'New Weapon : ',
  boxes = document.querySelectorAll('.boardcell'),
  allSquares = [...boxes];

/*Creating The Players from a player prototype. All Players have commun stats */
let Player = {
  //Initializing player with stats
  init: function(name, player, health, weaponCatagory, weaponName, weaponStyle, damage, avatar, dead, win, position, defend, turn) {
    this.name = name;
    this.player = player;
    this.health = health;
    this.weaponCategory = weaponCatagory;
    this.weaponName = weaponName;
    this.weaponStyle = weaponStyle;
    this.damage = damage;
    this.avatar = avatar;
    this.dead = dead;
    this.win = win;
    this.position = position;
    this.defend = defend;
    this.turn = turn;
  },

  //show player info in cards next to board
  showPlayerInfo: function() {
    let playerAvatar = document.querySelector(`#${this.player} .player-avatar`);
    let playerName = document.querySelector(`#${this.player} .player-name`);
    let playerHealth = document.querySelector(`#${this.player} .health-value`);
    let playerWeaponDamage = document.querySelector(`#${this.player} .weapon-value`);
    let playerWeaponName = document.querySelector(`#${this.player} .weapon-name`);
    let playerWeaponAvatar = document.querySelector(`#${this.player} .weapon-avatar`);
    playerAvatar.setAttribute('src', this.avatar);
    playerName.textContent = this.name;
    playerHealth.textContent = this.health;
    playerWeaponDamage.textContent = this.damage;
    playerWeaponName.textContent = this.weaponName;
    playerWeaponAvatar.setAttribute('src', this.weaponStyle);
  },

  //Seeking all possible mouvements of player on board
  findMoves: function() {
    function findSquares(playerPosition, squarename, num1, num2) {
      if (i % 2 === 0) {
        squarename = playerPosition + ((i % 2) - num1) * Math.pow(-1, (i * 2) % 3);
        bottomrow.push(squarename);
      } else {
        squarename = playerPosition + (i % 2) * num2 * Math.pow(-1, i % 3);
        rightrow.push(squarename);
      }
    }
    //Go in loop to find all squares available to user for a +1 to +3 mouvement
    for (i = 0; i < 4; i += 1) {
      findSquares(this.position, square1, 1, 10); //Adding +1 mouvements
      findSquares(this.position, square2, 2, 20); //Adding +2 mouvements
      findSquares(this.position, square3, 3, 30); //Adding +3 mouvements
    }
    //Create arrays of left, right, top and bottom moves and take out numbers that are negative or above 100
    leftrow = rightrow.splice(0, 3);
    toprow = bottomrow.splice(0, 3);
    leftrow = leftrow.filter(x => x > -1);
    toprow = toprow.filter(x => x > -1);
    bottomrow = bottomrow.filter(x => x < 100);
    rightrow = rightrow.filter(x => x < 100);
    //Making so the player can't port from bottom to top or top to bottom of the board
    if (this.position % 10 === 9) {
      bottomrow.splice(0, 3);
    }
    if (this.position % 10 === 8) {
      bottomrow.splice(1, 2);
    }
    if (this.position % 10 === 7) {
      bottomrow.splice(2, 1);
    }
    if (this.position % 10 === 0) {
      toprow.splice(0, 3);
    }
    if (this.position % 10 === 1) {
      toprow.splice(1, 2);
    }
    if (this.position % 10 === 2) {
      toprow.splice(2, 1);
    }
    //Seeking obstacles or players and taking away squares that are after
    function unavailableSquares(array) {
      //Goes through the array, once is finds an element with one of the classes, returns true, breaks out of the .some() and then executes the for loop to splice the array from the index that encountered the first class obstacle
      let cutArray;
      array.some(element => {
        if (boxes[element].classList.contains('obstacle') || boxes[element].classList.contains('playerone') || boxes[element].classList.contains('playertwo')) {
          return (cutArray = element);
        }
      });
      for (i = 0; i < array.length; i++) {
        if (array[i] === cutArray) {
          array.splice(i);
        }
      }
    }
    unavailableSquares(leftrow);
    unavailableSquares(rightrow);
    unavailableSquares(toprow);
    unavailableSquares(bottomrow);
    //Creating full array of all the available squares and giving them a class to show on board available moves
    availableSquares = [...toprow, ...bottomrow, ...leftrow, ...rightrow];
    //Filters through the boardSquaresAvailable array and keeps only the elements that are placed at the index given in the availableSquares array. True or false is sent back. True: element is kept, false: filetered out of the array
    let boardSquaresAvailable = [...boxes];
    boardSquaresAvailable = boardSquaresAvailable.filter((element, index) => {
      return availableSquares.includes(index);
    });
    for (i = 0; i < boardSquaresAvailable.length; i += 1) {
      boardSquaresAvailable[i].classList.add('availableMoves');
    }
  },

  //Weapon info change on card and player stats when arriving on a new weapon
  changeWeapon: function(weaponname) {
    let playerWeaponDamage = document.querySelector(`#${this.player} .weapon-value`);
    let playerWeaponName = document.querySelector(`#${this.player} .weapon-name`);
    let playerWeaponAvatar = document.querySelector(`#${this.player} .weapon-avatar`);
    playerWeaponDamage.textContent = weaponname.damage;
    playerWeaponName.textContent = weaponname.name;
    playerWeaponAvatar.setAttribute('src', weaponname.style);
    allSquares[i].classList.remove(weaponname.weapon);
    allSquares[i].classList.add(this.weaponCategory);
    this.weaponCategory = weaponname.weapon;
    this.weaponName = weaponname.name;
    this.weaponStyle = weaponname.style;
    this.damage = weaponname.damage;
  },

  //Change Health Value if user crosses a square with the elixir
  changeHealth: function(weaponname) {
    let playerHealth = document.querySelector(`#${this.player} .health-value`);
    playerHealth.textContent = this.health + weaponname.damage;
    allSquares[i].classList.remove(weaponname.weapon);
    this.health = this.health + weaponname.damage;
  }
};

//Defining the players
let fireWizard = Object.create(Player);
fireWizard.init(
  'Fire Wizard',
  'playerone',
  100,
  weaponone.weapon,
  weaponone.name,
  weaponone.style,
  weaponone.damage,
  'images/wizardfire.png',
  'images/wizardfiredead.png',
  'images/wizardfirewin.png',
  playerOnePosition,
  false,
  true
);
fireWizard.showPlayerInfo();

let iceWizard = Object.create(Player);
iceWizard.init(
  'Ice Wizard',
  'playertwo',
  100,
  weaponone.weapon,
  weaponone.name,
  weaponone.style,
  weaponone.damage,
  'images/wizardice.png',
  'images/wizardicedead.png',
  'images/wizardicewin.png',
  playerTwoPosition,
  false,
  false
);
iceWizard.showPlayerInfo();

/*Moves the player turn by turn by first moving the current player to it's new position and seeking if available weapons along the way. If a player is on a current nearby square, the turn by turn moves stop and the fight starts. If not close by, seeks the next player and finds his available moves to move him*/
function movingPlayers(wizardname, opponent) {
  allSquares.forEach((square, index) => {
    square.addEventListener('click', function() {
      let weaponMessage = document.querySelector(`#${wizardname.player} .message`);
      let cellIndex = index;
      function clearMessage() {
        weaponMessage.textContent = '';
        weaponMessage.classList.remove('show');
      }
      function weaponChange(weaponType) {
        wizardname.changeWeapon(weaponType);
        weaponMessage.classList.add('show');
        weaponMessage.textContent = `${messageWeaponChange} ${wizardname.weaponName}`;
        setTimeout(clearMessage, 2000);
      }
      function grabWeapon(wizardname) {
        let currentPlayer = document.querySelectorAll(`.${wizardname.player}`);
        currentPlayer.forEach(currentPositionSqaure => {
          currentPositionSqaure.classList.remove(wizardname.player);
        });
        wizardname.position = i;
        if (allSquares[i].classList.contains('weapon')) {
          if (allSquares[i].classList.contains('weaponone')) {
            weaponChange(weaponone);
          } else if (allSquares[i].classList.contains('weapontwo')) {
            weaponChange(weapontwo);
          } else if (allSquares[i].classList.contains('weaponthree')) {
            weaponChange(weaponthree);
          } else if (allSquares[i].classList.contains('weaponfour')) {
            weaponChange(weaponfour);
          } else if (allSquares[i].classList.contains('weaponfive')) {
            weaponChange(weaponfive);
          } else if (allSquares[i].classList.contains('healthpotion')) {
            wizardname.changeHealth(healthpotion);
            weaponMessage.classList.add('show');
            weaponMessage.textContent = 'You gained a bonus of 40 health';
            setTimeout(clearMessage, 2000);
          }
        }
      }
      //If the square selected isn't an available move, player can't go there and has to select available move
      if (!availableSquares.includes(cellIndex)) {
        return;
      }
      //Move player if available square
      if (availableSquares.includes(cellIndex)) {
        if (cellIndex - wizardname.position >= 10) {
          for (i = wizardname.position + 10; i <= cellIndex; i += 10) {
            grabWeapon(wizardname);
          }
        } else if (cellIndex - wizardname.position <= -10) {
          for (i = wizardname.position - 10; i >= cellIndex; i -= 10) {
            grabWeapon(wizardname);
          }
        } else if (cellIndex - wizardname.position >= 1) {
          for (i = wizardname.position + 1; i <= cellIndex; i += 1) {
            grabWeapon(wizardname);
          }
        } else if (cellIndex - wizardname.position <= -1) {
          for (i = wizardname.position - 1; i >= cellIndex; i -= 1) {
            grabWeapon(wizardname);
          }
        }
        square.classList.add(wizardname.player);
        if (wizardname.position > opponent.position) {
          allSquares[wizardname.position].classList.add('flip');
          allSquares[opponent.position].classList.remove('flip');
        }
      }
      //Clearing the board of available moves and clearing the arrays of those moves so free for next player
      let boardSquaresAvailable = [...boxes];
      boardSquaresAvailable = boardSquaresAvailable.filter((element, index) => {
        return availableSquares.includes(index);
      });
      for (i = 0; i < boardSquaresAvailable.length; i += 1) {
        boardSquaresAvailable[i].classList.remove('availableMoves');
      }
      availableSquares = [];
      leftrow = [];
      rightrow = [];
      toprow = [];
      bottomrow = [];
      //Seeking if a player on a nearby square, if so start the fight and making so fight can't start if nearby squares are top and bottom board
      nearbysquares = [cellIndex + 1, cellIndex + 10, cellIndex - 1, cellIndex - 10];
      if (wizardname.position % 10 === 9) {
        nearbysquares.splice(0, 1);
      }
      if (wizardname.position % 10 === 0) {
        nearbysquares.splice(2, 1);
      }
      nearbysquares = nearbysquares.filter(x => x > -1);
      let surroundingSquares = [...boxes];
      surroundingSquares = surroundingSquares.filter((element, index) => {
        return nearbysquares.includes(index);
      });
      for (i = 0; i < surroundingSquares.length; i += 1) {
        if (surroundingSquares[i].classList.contains(opponent.player)) {
          return showCombatOptions(wizardname, opponent);
        }
      }
      //If no players nearby, change player and find his available moves
      wizardname.turn = false;
      opponent.turn = true;
      [wizardname, opponent] = [opponent, wizardname];
      wizardname.findMoves();
    });
  });
}

//Start game with player one going first
fireWizard.findMoves();
movingPlayers(fireWizard, iceWizard);
