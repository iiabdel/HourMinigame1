const emojis = ['❤️', '💖', '🎁', '🌹', '✨', '🍭', '❤️', '💖', '🎁', '🌹', '✨', '🍭'];
let flippedCards = [];
let matchedPairs = 0;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    createBoard();
}

function createBoard() {
    const grid = document.getElementById('game-grid');
    const shuffled = emojis.sort(() => 0.5 - Math.random());
    
    shuffled.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        if (matchedPairs === emojis.length / 2) {
            showEndScreen();
        }
    } else {
        card1.classList.remove('flipped');
        card1.innerText = '';
        card2.classList.remove('flipped');
        card2.innerText = '';
    }
    flippedCards = [];
}

function showEndScreen() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
}