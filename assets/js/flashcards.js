const addBtn = document.querySelector('.add-card-placeholder');
const modal = document.getElementById('cardModal');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const grid = document.querySelector('.cards-grid');

addBtn.onclick = () => modal.style.display = "block";
cancelBtn.onclick = () => {
    modal.style.display = "none";
    clearInputs();
};

grid.addEventListener('click', (e) => {
    const card = e.target.closest('.flashcard');
    if (!card) return;

    // Supprimer
    if (e.target.classList.contains('fa-trash')) {
        e.stopPropagation();
        if (confirm("Supprimer cette carte ?")) card.remove();
        return;
    }

    if (e.target.classList.contains('fa-edit')) {
        e.stopPropagation();
        editCard(card);
        return;
    }

    if (e.target.classList.contains('fa-copy')) {
        e.stopPropagation();
        duplicateCard(card);
        return;
    }

    card.classList.toggle('flipped');
});

saveBtn.onclick = () => {
    const subj = document.getElementById('subject').value.trim();
    const ques = document.getElementById('question').value.trim();
    const answ = document.getElementById('answer').value.trim();

    if (subj && ques && answ) {
        const newCard = createCardElement(subj, ques, answ);
        grid.insertBefore(newCard, addBtn);
        modal.style.display = "none";
        clearInputs();
    } else {
        alert("Remplis tous les champs !");
    }
};

function createCardElement(subj, ques, answ) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <h3>${subj}</h3>
                <p>${ques}</p>
            </div>
            <div class="flashcard-back">
                <div class="card-controls">
                    <i class="fas fa-edit" title="Modifier"></i>
                    <i class="fas fa-copy" title="Dupliquer"></i>
                    <i class="fas fa-trash" title="Supprimer"></i>
                </div>
                <div class="card-back-content">
                    <p>${answ}</p>
                </div>
            </div>
        </div>
    `;
    return card;
}

function editCard(card) {
    document.getElementById('subject').value = card.querySelector('h3').innerText;
    document.getElementById('question').value = card.querySelector('.flashcard-front p').innerText;
    document.getElementById('answer').value = card.querySelector('.card-back-content p').innerText;
    modal.style.display = "block";
    card.remove();
}

function duplicateCard(card) {
    const subj = card.querySelector('h3').innerText;
    const ques = card.querySelector('.flashcard-front p').innerText;
    const answ = card.querySelector('.card-back-content p').innerText;
    const copy = createCardElement(subj, ques, answ);
    grid.insertBefore(copy, addBtn);
}

function clearInputs() {
    document.getElementById('subject').value = "";
    document.getElementById('question').value = "";
    document.getElementById('answer').value = "";
}