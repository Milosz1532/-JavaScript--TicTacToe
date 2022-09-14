// GAME MENU //
const container = document.querySelector('.container')
const startGameMenu = document.querySelector('.startGame')
const startGameBtn = document.querySelector('#startGameBtn')
const startGameError = document.querySelector('.startGameError')
const getPlayersBtn = document.querySelector('#getPlayersBtn')
const gameOverPopup = document.querySelector('.gameOver-popup')
const shadow = document.querySelector('.shadow')
const backBtn = document.querySelectorAll('.backBtn')
const restartBtn = document.querySelectorAll('.restartBtn')
const popupText = document.querySelector(".popup-text");
const winner = document.querySelector(".winner")
// GAME //
const board = document.querySelector('.board')
const gameScore = document.querySelector('.gameScore')

let player1 = {}
let player2 = {}
let player1Name, player2Name
let move = 0
let gameMode
let temp // hover effect

const gameModeError = info => {
	const errorInfo = document.querySelector('.gameMode-error')
	errorInfo.textContent = info
	errorInfo.style.display = 'block'
	window.setTimeout(
		() => {
			errorInfo.style.display = 'none'
		},
		4000,
		true
	)
}

getPlayersBtn.addEventListener('click', e => {
	if (gameMode) {
		startGameMenu.style.display = 'none'
		if (gameMode === 'players') {
			const window = document.createElement('div')
			window.classList.add('playerListWindow')
			const playerListImg = document.createElement('img')
			playerListImg.setAttribute('src', 'img/icon.png')
			const h3 = document.createElement('h5')
			h3.textContent = 'Wprowadź dane graczy'
			player1Name = document.createElement('input')
			player1Name.id = 'player1'
			player1Name.placeholder = 'GRACZ 1'
			player2Name = document.createElement('input')
			player2Name.id = 'player2'
			player2Name.placeholder = 'GRACZ 2'
			const text = document.createElement('p')
			text.id = 'playersListInfo'
			text.textContent = 'Możesz pozostawić puste pola.'
			const playerListBtn = document.createElement('button')
			playerListBtn.classList.add('playerListBtn')
			playerListBtn.textContent = 'Rozpocznij Grę'
			window.append(playerListImg, h3, player1Name, player2Name, text, playerListBtn)
			container.append(window)
			playerListBtn.addEventListener('click', () => {
				setPlayers(player1Name.value, player2Name.value, window)
			})
		} else {
			//startGame()
			window.location.assign('index.html')
			alert("Już niedługo tryb będzie gotowy.")
		}
	} else {
		gameModeError('Musisz wybrać tryb gry!')
	}
})

let activeBtn

const buttons = document.querySelectorAll('.box')
for (const button of buttons) {
	button.addEventListener('click', function (e) {
		if (gameMode != e.target.id) {
			if (activeBtn) {
				activeBtn.classList.remove('active')
			}
			e.target.classList.add('active')
			activeBtn = e.target
			gameMode = e.target.id
		}
	})
}

const setPlayers = (playerName1, playerName2, window) => {
	player1 = {
		name: playerName1 || 'Gracz 1',
		iconType: 'X',
		icon: 'fa-xmark',
		color: 'tomato',
		items: [],
	}
	player2 = {
		name: playerName2 || 'Gracz 2',
		iconType: 'O',
		icon: 'fa-o',
		color: 'aquamarine',
		items: [],
	}
	if (window) {
		window.remove()
	}

	startGame(player1, player2)
}

const startGame = (player1, player2) => {
	startGameMenu.style.display = 'none'
	board.style.display = 'block'

	if (player1 && player2) {
		player1Name = document.createElement('div')
		player1Name.classList.add('player1_score')
		player1Name.textContent = player1.name
		player2Name = document.createElement('div')
		player2Name.classList.add('player2_score')
		player2Name.textContent = player2.name

		gameScore.append(player1Name, player2Name)
		player2Name.classList.toggle('inactivePlayer')
		document.addEventListener('click', checkGameBoard)
		document.addEventListener('mouseover', boardHoverEffect)
		document.addEventListener('mouseout', deleteTempElement)
	} else {
		document.addEventListener('click', checkGameBoard2)
	}
}

player = {
	name: 'Gracz 1',
	iconType: 'X',
	icon: 'fa-xmark',
	color: 'tomato',
	items: [],
}

const checkGameBoard2 = e => {
	if (e.target.id.includes('space')) {
		const button = e.target
		const p = button.querySelector('p')
		if (!p.getAttribute('point')) {
			deleteTempElement()
			const pointId = button.id.at(6)
			p.style.color = player.color
			p.innerHTML = `<i class="fa-solid ${[player.icon]}"></i>`
			p.setAttribute('point', parseInt(pointId))
			button.style.cursor = 'default'
			player.items.push(parseInt(pointId))
			const numbers = []
			setTimeout(function () {
				const freeButtons = board.querySelectorAll('p')
				for (let i = 0; i < freeButtons.length; i++) {
					const element = freeButtons[i]
					if (!element.getAttribute('point')) {
						numbers.push(i + 1)
					}
				}
				const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
				for (let i = 0; i < winNumbers.length; i++) {}
			}, 1000)

		}
	}
}

const boardHoverEffect = e => {
	if (e.target.id.includes('space')) {
		const button = e.target
		const p = button.querySelector('p')
		if (p.innerHTML === '') {
			const tempItem = document.createElement('p')
			if (move % 2 == 0) {
				tempItem.innerHTML = `<i class="fa-solid ${[player1.icon]}"></i>`
				tempItem.style.color = player1.color
			} else {
				tempItem.innerHTML = `<i class="fa-solid ${[player2.icon]}"></i>`
				tempItem.style.color = player2.color
			}
			tempItem.style.opacity = 0.2
			button.appendChild(tempItem)
			temp = tempItem
		}
	}
}
const deleteTempElement = () => {
	if (temp) {
		temp.remove()
	}
}

const winNumbers = []
winNumbers[0] = [1, 2, 3]
winNumbers[1] = [4, 5, 6]
winNumbers[2] = [7, 8, 9]
winNumbers[3] = [1, 4, 7]
winNumbers[4] = [2, 5, 8]
winNumbers[5] = [3, 6, 9]
winNumbers[6] = [3, 5, 7]
winNumbers[7] = [1, 5, 9]

const endGameEffect = (player, winNumber) => {
	const allButtons = board.querySelectorAll('p')
	player1Name.classList.add('inactivePlayer')
	player2Name.classList.add('inactivePlayer')
	popupText.innerHTML = 'Zwyciężył gracz <span class="winner">'+ player.name +'</span>'
	gameOverPopup.classList.add('show')
	shadow.classList.add('show')
	allButtons.forEach(button => {
		if (button.getAttribute('style')) {
			if (winNumber.includes(parseInt(button.getAttribute('point')))) {
				button.style.color = 'lime'
			} else {
				button.style.opacity = 0.1
			}
		}
	})
}

const checkPlayerWin = player => {
	player.items.sort()
	let checker = (arr, target) => target.every(v => arr.includes(v))
	for (let i = 0; i < winNumbers.length; i++) {
		if (checker(player.items, winNumbers[i])) {
			document.removeEventListener('click', checkGameBoard)
			document.removeEventListener('mouseover', boardHoverEffect)
			document.removeEventListener('mouseout', deleteTempElement)
			endGameEffect(player, winNumbers[i])
		}
	}
	if (move == 8) {
		if (!gameOverPopup.classList.contains("show")) {
			gameOverPopup.classList.add("show")
			shadow.classList.add("show");
			popupText.textContent = "Wystąpił Remis";
		}
	}
}

const checkGameBoard = e => {
	if (e.target.id.includes('space')) {
		const button = e.target
		const p = button.querySelector('p')
		if (!p.getAttribute('point')) {
			let player = ''
			player1Name.classList.toggle('inactivePlayer')
			player2Name.classList.toggle('inactivePlayer')
			if (move % 2 == 0) {
				player = player1
			} else {
				player = player2
			}
			deleteTempElement()
			const pointId = button.id.at(6)
			p.style.color = player.color
			p.innerHTML = `<i class="fa-solid ${[player.icon]}"></i>`
			p.setAttribute('point', parseInt(pointId))
			button.style.cursor = 'default'
			player.items.push(parseInt(pointId))
			checkPlayerWin(player)
			move++
		}
	}
}

for (const button of backBtn) {
	button.addEventListener('click', function (event) {
		window.location.assign('index.html')
	})
}

for (const button of restartBtn) {
	button.addEventListener('click', function (event) {
		if (gameOverPopup.classList.contains("show")) {
			gameOverPopup.classList.remove("show")
			shadow.classList.remove("show");
		}
		for (const el of board.querySelectorAll("p")) {
			el.innerHTML = "";
			el.removeAttribute("point")
			el.parentElement.style.cursor = "pointer";
			el.style.opacity = 1;
		}
		while (gameScore.firstChild) {
			gameScore.removeChild(gameScore.firstChild);
		}
		move = 0
		setPlayers(player1Name.textContent,player2Name.textContent);
	})
}
