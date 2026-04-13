const API = "/Nvalidi/api/flashcards.php";
const USER_ID = 1;

const addBtn = document.querySelector('.add-card-placeholder');
const modal = document.getElementById('cardModal');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const grid = document.querySelector('.cards-grid');

async function loadCards() {
    const res = await fetch(`${API}?action=get&user_id=${USER_ID}`);
    const cards = await res.json();
    cards.forEach(card => {
        const el = createCardElement(card.matiere, card.question, card.reponse, card.id);
        grid.insertBefore(el, addBtn);
    });
    updateMatiereFilter();
}

loadCards();

// ---- FILTRES ----
const filterMatiere = document.getElementById('filterMatiere');
const filterOrder = document.getElementById('filterOrder');
const resetFilters = document.getElementById('resetFilters');

function updateMatiereFilter() {
    const cartes = grid.querySelectorAll('.flashcard');
    const matieres = new Set();
    cartes.forEach(card => {
        matieres.add(card.dataset.matiere);
    });

    const currentVal = filterMatiere.value;
    filterMatiere.innerHTML = '<option value="all">Toutes les matières</option>';
    matieres.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        filterMatiere.appendChild(opt);
    });
    filterMatiere.value = matieres.has(currentVal) ? currentVal : 'all';
}

function applyFilters() {
    const cartes = Array.from(grid.querySelectorAll('.flashcard'));
    const matiereVal = filterMatiere.value;
    const orderVal = filterOrder.value;

    cartes.forEach(card => {
        if (matiereVal === 'all' || card.dataset.matiere === matiereVal) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    const visibles = cartes.filter(c => {
        return matiereVal === 'all' || c.dataset.matiere === matiereVal;
    });

    visibles.sort((a, b) => {
        if (orderVal === 'az') {
            return a.dataset.matiere.localeCompare(b.dataset.matiere);
        } else if (orderVal === 'oldest') {
            return parseInt(a.dataset.id) - parseInt(b.dataset.id);
        } else {
            return parseInt(b.dataset.id) - parseInt(a.dataset.id);
        }
    });

    visibles.forEach(card => grid.insertBefore(card, addBtn));
}

filterMatiere.addEventListener('change', applyFilters);
filterOrder.addEventListener('change', applyFilters);

resetFilters.addEventListener('click', () => {
    filterMatiere.value = 'all';
    filterOrder.value = 'recent';
    applyFilters();
});
// ---- FIN FILTRES ----

// ---- SELECTION MULTIPLE ----
const selectModeBtn = document.getElementById('selectModeBtn');
const selectionBar = document.getElementById('selectionBar');
const selectAllBtn = document.getElementById('selectAllBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const cancelSelectBtn = document.getElementById('cancelSelectBtn');
const selectedCount = document.getElementById('selectedCount');

let selectionMode = false;

function enterSelectionMode() {
    selectionMode = true;
    selectModeBtn.classList.add('active');
    selectionBar.style.display = 'flex';
    grid.classList.add('selection-mode');
    updateSelectedCount();
}

function exitSelectionMode() {
    selectionMode = false;
    selectModeBtn.classList.remove('active');
    selectionBar.style.display = 'none';
    grid.classList.remove('selection-mode');
    grid.querySelectorAll('.flashcard').forEach(card => {
        card.classList.remove('selected');
        const cb = card.querySelector('.card-checkbox');
        if (cb) cb.checked = false;
    });
    updateSelectedCount();
}

function updateSelectedCount() {
    const count = grid.querySelectorAll('.flashcard.selected').length;
    selectedCount.textContent = count;
}

selectModeBtn.addEventListener('click', () => {
    if (selectionMode) {
        exitSelectionMode();
    } else {
        enterSelectionMode();
    }
});

selectAllBtn.addEventListener('click', () => {
    const cartes = grid.querySelectorAll('.flashcard');
    const allSelected = [...cartes].every(c => c.classList.contains('selected'));
    cartes.forEach(card => {
        const cb = card.querySelector('.card-checkbox');
        if (allSelected) {
            card.classList.remove('selected');
            if (cb) cb.checked = false;
        } else {
            card.classList.add('selected');
            if (cb) cb.checked = true;
        }
    });
    updateSelectedCount();
});

deleteSelectedBtn.addEventListener('click', async () => {
    const selected = grid.querySelectorAll('.flashcard.selected');
    if (selected.length === 0) return;

    if (!confirm(`Supprimer ${selected.length} carte(s) ?`)) return;

    for (const card of selected) {
        await fetch(`${API}?action=delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: card.dataset.id })
        });
        card.remove();
    }

    updateMatiereFilter();
    exitSelectionMode();
});

cancelSelectBtn.addEventListener('click', () => {
    exitSelectionMode();
});
// ---- FIN SELECTION MULTIPLE ----

addBtn.onclick = () => modal.style.display = "block";
cancelBtn.onclick = () => {
    modal.style.display = "none";
    clearInputs();
    resetSaveBtn();
};

grid.addEventListener('click', (e) => {
    const card = e.target.closest('.flashcard');
    if (!card) return;

    // Mode sélection
    if (selectionMode) {
        const cb = card.querySelector('.card-checkbox');
        if (e.target.classList.contains('card-checkbox')) {
            card.classList.toggle('selected', cb.checked);
            updateSelectedCount();
            return;
        }
        cb.checked = !cb.checked;
        card.classList.toggle('selected', cb.checked);
        updateSelectedCount();
        return;
    }

    if (e.target.classList.contains('fa-trash')) {
        e.stopPropagation();
        if (confirm("Supprimer cette carte ?")) deleteCard(card);
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

async function deleteCard(card) {
    await fetch(`${API}?action=delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: card.dataset.id })
    });
    card.remove();
    updateMatiereFilter();
}

function createCardElement(subj, ques, answ, id) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.dataset.id = id;
    card.dataset.matiere = subj;
    card.innerHTML = `
        <input type="checkbox" class="card-checkbox">
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
    document.getElementById('subject').value = card.dataset.matiere;
    document.getElementById('question').value = card.querySelector('.flashcard-front p').innerText;
    document.getElementById('answer').value = card.querySelector('.card-back-content p').innerText;
    modal.style.display = "block";

    document.querySelector('.modal-content h2').innerHTML = 'Modifier la Flashcard <span><i class="fas fa-edit"></i></span>';
    saveBtn.textContent = "Modifier la carte";

    const cardId = card.dataset.id;

    saveBtn.onclick = async () => {
        const subj = document.getElementById('subject').value.trim();
        const ques = document.getElementById('question').value.trim();
        const answ = document.getElementById('answer').value.trim();

        if (subj && ques && answ) {
            await fetch(`${API}?action=update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: cardId, matiere: subj, question: ques, reponse: answ })
            });
            card.remove();
            const updated = createCardElement(subj, ques, answ, cardId);
            grid.insertBefore(updated, addBtn);
            modal.style.display = "none";
            clearInputs();
            resetSaveBtn();
            updateMatiereFilter();
        } else {
            alert("Remplis tous les champs !");
        }
    };
}

async function duplicateCard(card) {
    const subj = card.dataset.matiere;
    const ques = card.querySelector('.flashcard-front p').innerText;
    const answ = card.querySelector('.card-back-content p').innerText;

    const res = await fetch(`${API}?action=create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, matiere: subj, question: ques, reponse: answ })
    });
    const data = await res.json();
    const copy = createCardElement(subj, ques, answ, data.id);
    grid.insertBefore(copy, addBtn);
    updateMatiereFilter();
}

function resetSaveBtn() {
    document.querySelector('.modal-content h2').innerHTML = 'Nouvelle Flashcard <span><i class="fas fa-lightbulb"></i></span>';
    saveBtn.textContent = "Créer la carte";

    saveBtn.onclick = async () => {
        const subj = document.getElementById('subject').value.trim();
        const ques = document.getElementById('question').value.trim();
        const answ = document.getElementById('answer').value.trim();

        if (subj && ques && answ) {
            const res = await fetch(`${API}?action=create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: USER_ID, matiere: subj, question: ques, reponse: answ })
            });
            const data = await res.json();
            const newCard = createCardElement(subj, ques, answ, data.id);
            grid.insertBefore(newCard, addBtn);
            modal.style.display = "none";
            clearInputs();
            updateMatiereFilter();
        } else {
            alert("Remplis tous les champs !");
        }
    };
}

resetSaveBtn();

function clearInputs() {
    document.getElementById('subject').value = "";
    document.getElementById('question').value = "";
    document.getElementById('answer').value = "";
}