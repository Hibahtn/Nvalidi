document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card');
    const triesDisplay = document.getElementById('tries-count');
    const resetBtn = document.getElementById('resetBtn');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let tries = 0;
    let matchedPairs = 0;
    
    // ── localStorage ──
    let partiesJouees = parseInt(localStorage.getItem('memory_parties_jouees')) || 0;
    let bestScore = parseInt(localStorage.getItem('memory_best_score')) || null;

    // Retourner la carte
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.img === secondCard.dataset.img;
        tries++;
        triesDisplay.innerText = tries;
        if (isMatch) {
            disableCards();
            matchedPairs++;
            // Si les 6 paires sont trouvées
            if (matchedPairs === 6) {
                setTimeout(showVictory, 500);
            }
        } else {
            unflipCards();
        }
    }

    // Alerte de réussite et Reset
    function showVictory() {
        // Incrémenter les parties jouées
        partiesJouees++;
        localStorage.setItem('memory_parties_jouees', partiesJouees);

        // Meilleur score (moins d'essais = meilleur)
        if (bestScore === null || tries < bestScore) {
            bestScore = tries;
            localStorage.setItem('memory_best_score', bestScore);
        }

        alert(`Félicitations ! 🎉\nTu as trouvé toutes les paires en ${tries} essais.\nLe jeu va recommencer !`);
        resetGame();
    }

    // Bloquer les cartes si elles matchent
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    // Retourner les cartes si elles ne matchent pas
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Remettre le jeu à zéro
    function resetGame() {
        tries = 0;
        matchedPairs = 0;
        triesDisplay.innerText = tries;
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        setTimeout(shuffle, 500);
    }

    // Mélanger les cartes
    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }

    // Événements
    resetBtn.addEventListener('click', resetGame);
    cards.forEach(card => card.addEventListener('click', flipCard));
    
    // Mélange initial
    shuffle();
});