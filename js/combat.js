let playAgain = document.querySelector('#play-again'),
  playerAvatars = document.querySelectorAll('.player-avatar'),
  gameOverMessage = document.querySelector('#gameover');

/*When a player's health is 0 or below, the game is over and the winner is announced. The board is cleared of it's previous game, the board is then hidden and the message of the winner is shown. The option to restart a new game is proposed*/
function gameover(wizardname, opponent) {
  boardgame.innerHTML = '';
  boardgame.style.display = 'none';
  gameOverMessage.style.display = 'flex';
  let winner = document.querySelector('#winner');
  winner.textContent = wizardname.name;
  let winnerAvatar = document.querySelector(`#${wizardname.player} .player-avatar`);
  winnerAvatar.setAttribute('src', wizardname.win);
  let loserAvatar = document.querySelector(`#${opponent.player} .player-avatar`);
  loserAvatar.setAttribute('src', opponent.dead);
  playerAvatars.forEach(avatar => {
    avatar.style.width = '250px';
    avatar.style.height = '200px';
  });
}

/*Showing the attack and Defend buttons for the current active player*/
function showCombatOptions(wizardname) {
  let currentPlayer = document.querySelectorAll(`#${wizardname.player} button`);
  currentPlayer.forEach(button => (button.style.display = 'inline-block'));
}

let combatButtons = document.querySelectorAll('.combat-button');
/*Players will fight until a player has no more health. If the player defends the next attack will be half the damage.*/
function attack(wizardname, opponent) {
  if (wizardname.turn === false) {
    //Switch players
    [wizardname, opponent] = [opponent, wizardname];
  }
  if (opponent.defend) {
    opponent.health = opponent.health - wizardname.damage / 2;
    opponent.defend = false;
    let opponentHealth = document.querySelector(`#${opponent.player} .health-value`);
    opponentHealth.textContent = opponent.health;
    combatButtons.forEach(button => (button.style.display = 'none'));
    wizardname.turn = false;
    opponent.turn = true;
  } else {
    opponent.health = opponent.health - wizardname.damage;
    let opponentHealth = document.querySelector(`#${opponent.player} .health-value`);
    opponentHealth.textContent = opponent.health;
    combatButtons.forEach(button => (button.style.display = 'none'));
    wizardname.turn = false;
    opponent.turn = true;
  }
  if (wizardname.health <= 0 || opponent.health <= 0) {
    combatButtons.forEach(button => (button.style.display = 'none'));
    return gameover(wizardname, opponent);
  }
  //Change player if health of both players still above 0
  [wizardname, opponent] = [opponent, wizardname];
  showCombatOptions(wizardname, opponent);
}

function defend(wizardname, opponent) {
  if (wizardname.turn === false) {
    [wizardname, opponent] = [opponent, wizardname];
  }
  wizardname.defend = true;
  combatButtons.forEach(button => (button.style.display = 'none'));
  wizardname.turn = false;
  opponent.turn = true;
  [wizardname, opponent] = [opponent, wizardname];
  showCombatOptions(wizardname, opponent);
}

let defendButton = document.querySelectorAll('.defend');
defendButton.forEach(button =>
  button.addEventListener('click', function() {
    defend(fireWizard, iceWizard);
  })
);
let attackButton = document.querySelectorAll('.attack');
attackButton.forEach(button =>
  button.addEventListener('click', function() {
    attack(fireWizard, iceWizard);
  })
);

//Reinitializing the whole board if the user desires to play again
playAgain.addEventListener('click', function() {
  playerAvatars.forEach(avatar => {
    avatar.style.width = '100px';
    avatar.style.height = '100px';
  });
  tmpArr = [];
  board = [];
  farLeftColumn = [];
  farRightColumn = [];
  theObstacles = [];
  theWeapons = [];
  thePlayers = [];
  nearbysquares = [];
  availableSquares = [];
  leftrow = [];
  rightrow = [];
  toprow = [];
  bottomrow = [];
  boardplateau.init(100, theObstacles, theWeapons, thePlayers);
  boardplateau.creation();
  boxes = document.querySelectorAll('.boardcell');
  allSquares = [...boxes];
  playerOnePosition = thePlayers[0];
  playerTwoPosition = thePlayers[1];
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
  gameOverMessage.style.display = 'none';
  boardgame.style.display = 'flex';
  fireWizard.findMoves();
  movingPlayers(fireWizard, iceWizard);
});
