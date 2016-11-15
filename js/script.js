var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'), 
	pickPaper = document.getElementById('js-playerPick_paper'), 
	pickScissors = document.getElementById('js-playerPick_scissors'); 
	gameResult = document.getElementById('js-gameWinner');

pickRock.addEventListener('click', function() { 
	playerPick('rock') 
});

pickPaper.addEventListener('click', function() {
	playerPick('paper')
}); 

pickScissors.addEventListener('click', function() {
	playerPick('scissors')
});


var gameState = 'notStarted', //started // ended
	player = { 
		name: '',
		score: 0
	},
	computer = {
		score: 0 
	};

var newGameBtn = document.getElementById('js-newGameButton'), 
	newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	} 
}


var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		playerNameElem.innerHTML = player.name;
	}
}

function playerPick(playerPick) { 
	console.log(playerPick); 
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = ''; 

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
	} else if ( (computerPick == 'rock' && playerPick == 'scissors') ||
				(computerPick == 'scissors' && playerPick == 'paper') ||
				(computerPick == 'paper' && playerPick == 'rock') ) { 
		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Wygrana!"; 
		player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Wygrana!";
		computer.score++;
	}
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	var overallResult;
	playerPickElem.innerHTML = playerPick; 
	computerPickElem.innerHTML = computerPick; 
	checkRoundWinner(playerPick, computerPick);
	overallResult= checkGameWinner();
	setGamePoints();
	switch (overallResult) {
		case 0:
			return;
		case 1:
			gameResult.innerHTML = player.name+' wygrał!';
			BootstrapDialog.show({
    	       	title: 'Wygrana gracza '+player.name,
	            message: 'Wynik: '+player.score+':'+computer.score+'. Gratulacje!'
        	});
        	break;
		case 2:
			gameResult.innerHTML = 'Komputer wygrał!';
			BootstrapDialog.show({
    	       	title: 'Komputer wygrał!',
	            message: 'Wynik: '+player.score+':'+computer.score+'. Następnym razem pójdzie lepiej!'
        	});
        	break;
	}
	gameResult.innerHTML='';
    player.score = computer.score = 0;
    setGamePoints();
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner() {
	if (player.score == 10) {
		return 1 // 1 means player won
	} else if (computer.score == 10) {
		return 2 // 2 means computer won
	} else {
		return 0; // duel still in progress
	}
}