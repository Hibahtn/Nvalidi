document.addEventListener('DOMContentLoaded', () => {
    const API = "../api/todo.php"; 
    const inputField = document.querySelector('.todo-input');
    const priorityOptions = document.querySelectorAll('.priority-option');
    const addButton = document.querySelector('.add-btn');
    const todoList = document.querySelector('.todo-list');
    const emptyState = document.querySelector('.empty-state');
    const priorityFilter = document.getElementById('priority-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const selectModeBtn = document.getElementById('select-mode');
    let currentPriority = 'tous';
    let currentSort = 'recent';
    let selectedPriority = null;
    let currentFilter = 'tous';
    let selectMode = false;
    priorityOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            priorityOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedPriority = opt.dataset.priority;
        });
    });

    fetchTasks();

    const statusFilter = document.getElementById('status-filter');

    statusFilter.addEventListener('change', () => {
        currentFilter = statusFilter.value;
        applyFilter();
    });

    priorityFilter.addEventListener('change', () => {
        currentPriority = priorityFilter.value;
        applyFilter();
    });

    sortFilter.addEventListener('change', () => {
        currentSort = sortFilter.value;
        applyFilter();
    });

    resetFiltersBtn.addEventListener('click', () => {
        currentFilter = 'tous';
        currentPriority = 'tous';
        currentSort = 'recent';

        statusFilter.value = 'tous';
        priorityFilter.value = 'tous';
        sortFilter.value = 'recent';

        applyFilter();
    });
    addButton.addEventListener('click', addTask);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    selectModeBtn.addEventListener('click', () => {
        selectMode = true;
        selectModeBtn.style.display = 'none';
        document.getElementById('selection-bar').style.display = 'flex';
        toggleSelectionCheckboxes(true);
    });

    document.getElementById('cancel-select').addEventListener('click', () => {
        exitSelectMode();
    });

    document.getElementById('select-all').addEventListener('click', () => {
        const checkboxes = todoList.querySelectorAll('.select-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        updateDeleteCount();
    });

    document.getElementById('delete-selected').addEventListener('click', () => {
        const selected = getSelectedItems();
        if (selected.length === 0) return;
        if (!confirm(`Supprimer ${selected.length} tâche(s) ?`)) return;

        const deletePromises = selected.map(li => 
            fetch(`${API}?action=delete&id=${li.dataset.id}`)
                .then(res => res.json())
                .then(data => { if (data.success) li.remove(); })
        );

        Promise.all(deletePromises).then(() => {
            exitSelectMode();
            updateEmptyState();
        });
    });

    document.getElementById('status-selected').addEventListener('change', function() {
        const status = this.value;
        if (!status) return;
        const selected = getSelectedItems();
        if (selected.length === 0) { this.value = ''; return; }

        const updatePromises = selected.map(li => 
            fetch(`${API}?action=update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: li.dataset.id, status: status })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const btn = li.querySelector('.status-btn');
                    applyStatus(btn, li, status);
                }
            })
        );

        Promise.all(updatePromises).then(() => {
            this.value = '';
        });
    });

    document.getElementById('priority-selected').addEventListener('change', function() {
        const priority = this.value;
        if (!priority) return;
        const selected = getSelectedItems();
        if (selected.length === 0) { this.value = ''; return; }

        const updatePromises = selected.map(li =>
            fetch(`${API}?action=update_priority`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: li.dataset.id, priority: priority })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    li.classList.remove('item-basse', 'item-moyenne', 'item-haute');
                    li.classList.add(`item-${priority}`);
                    li.dataset.priority = priority;
                    const badge = li.querySelector('.priority-badge');
                    badge.className = `priority-badge priority-${priority}`;
                    badge.textContent = priority;
                }
            })
        );

        Promise.all(updatePromises).then(() => {
            this.value = '';
            applyFilter();
        });
    });

    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('.todo-item');
        if (!li) return;
        const taskId = li.dataset.id;

        if (e.target.classList.contains('fa-trash-alt')) {
            deleteTask(taskId, li);
        }

        if (e.target.closest('.status-btn')) {
            cycleStatus(taskId, e.target.closest('.status-btn'), li);
        }

        if (e.target.classList.contains('select-checkbox')) {
            updateDeleteCount();
        }
    });
    function fetchTasks() {
        fetch(`${API}?action=get`)
            .then(res => res.json())
            .then(tasks => {
                todoList.innerHTML = '';
                if (tasks && Array.isArray(tasks)) {
                    tasks.forEach(task => renderTask(task));
                }
                updateEmptyState();
            })
            .catch(err => console.error("Erreur lors du chargement des tâches:", err));
    }

    function addTask() {
        const text = inputField.value.trim();
        const priority = selectedPriority;

        if (text === '') return;
        if (!priority) {
            alert("Veuillez sélectionner une priorité pour la tâche.");
            return;
        }

        fetch(`${API}?action=add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                task_text: text,
                priority: priority
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                renderTask({ 
                    id: data.id, 
                    task_text: text, 
                    is_completed: 0,
                    priority: priority,
                    status: 'a_faire'
                });
                inputField.value = '';
                priorityOptions.forEach(o => o.classList.remove('active'));
                selectedPriority = null;
                updateEmptyState();
            } else {
                alert("Erreur: " + (data.error || "Inconnue"));
            }
        });
    }

    function cycleStatus(id, btn, li) {
        if (selectMode) return;
        const current = btn.dataset.status;
        const next = current === 'a_faire' ? 'en_cours' 
                   : current === 'en_cours' ? 'termine' 
                   : 'a_faire';

        fetch(`${API}?action=update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, status: next })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                applyStatus(btn, li, next);
            }
        });
    }

    function applyStatus(btn, li, status) {
        btn.dataset.status = status;

        const icons = {
            a_faire:  '<i class="far fa-circle"></i>',
            en_cours: '<i class="fas fa-clock"></i>',
            termine:  '<i class="fas fa-check-circle"></i>'
        };
        const titles = { a_faire: 'À faire', en_cours: 'En cours', termine: 'Terminé' };
        btn.innerHTML = icons[status];
        btn.title = titles[status];

        const span = li.querySelector('.task-text-content');
        span.style.textDecoration = status === 'termine' ? 'line-through' : 'none';
        span.style.opacity = status === 'termine' ? '0.5' : '1';

        li.classList.remove('status-a_faire', 'status-en_cours', 'status-termine');
        li.classList.add(`status-${status}`);

        applyFilter();
    }

    function deleteTask(id, liElement) {
        if (!confirm("Supprimer cette tâche ?")) return;
        
        fetch(`${API}?action=delete&id=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    liElement.remove();
                    updateEmptyState();
                }
            });
    }

    function renderTask(task) {
        const li = document.createElement('li');
        const status = task.status || 'a_faire';

        li.className =`todo-item item-${task.priority} status-${status}`;
        li.dataset.id = task.id;
        li.dataset.priority = task.priority;

        const icons = {
            a_faire:  '<i class="far fa-circle"></i>',
            en_cours: '<i class="fas fa-clock"></i>',
            termine:  '<i class="fas fa-check-circle"></i>'
        };
        const titles = { a_faire: 'À faire', en_cours: 'En cours', termine: 'Terminé' };

        const textStyle = status === 'termine' ? 'text-decoration: line-through; opacity: 0.5;' : '';
        const priorityClass =`priority-${task.priority}`;

        li.innerHTML = `
            <div class="todo-text">
                <input type="checkbox" class="select-checkbox" style="display:none;">
                <button class="status-btn" data-status="${status}" title="${titles[status]}">${icons[status]}</button>
                <div class="task-info">
                    <span class="task-text-content" style="${textStyle}">${task.task_text}</span>
                    <div class="task-meta">
                        <span class="priority-badge ${priorityClass}">${task.priority}</span>
                    </div>
                </div>
            </div>
            <i class="fas fa-trash-alt delete-todo"></i>
        `;
        todoList.appendChild(li);
    }

    function toggleSelectionCheckboxes(show) {
        todoList.querySelectorAll('.select-checkbox').forEach(cb => {
            cb.style.display = show ? 'inline-block' : 'none';
            cb.checked = false;
        });
        updateDeleteCount();
    }

    function getSelectedItems() {
        return Array.from(todoList.querySelectorAll('.todo-item')).filter(li => {
            const cb = li.querySelector('.select-checkbox');
            return cb && cb.checked;
        });
    }

    function updateDeleteCount() {
        const count = getSelectedItems().length;
        document.getElementById('delete-selected').innerHTML =` <i class="fas fa-trash-alt"></i> Supprimer (${count})`;
    }

    function exitSelectMode() {
        selectMode = false;
        selectModeBtn.style.display = 'inline-block';
        document.getElementById('selection-bar').style.display = 'none';
        toggleSelectionCheckboxes(false);
    }

    function applyFilter() {
        let items = Array.from(todoList.querySelectorAll('.todo-item'));

        items.sort((a, b) => {
            const textA = a.querySelector('.task-text-content').textContent.toLowerCase();
            const textB = b.querySelector('.task-text-content').textContent.toLowerCase();
            const idA = parseInt(a.dataset.id);
            const idB = parseInt(b.dataset.id);

            if (currentSort === 'recent') return idB - idA;
            if (currentSort === 'ancien') return idA - idB;
            if (currentSort === 'az') return textA.localeCompare(textB);
            if (currentSort === 'za') return textB.localeCompare(textA);
        });

        items.forEach(item => todoList.appendChild(item));

        let visibleCount = 0;
        items.forEach(item => {
            const status = item.querySelector('.status-btn').dataset.status;
            const priority = item.dataset.priority;

            const matchStatus = currentFilter === 'tous' || status === currentFilter;
            const matchPriority = currentPriority === 'tous' || priority === currentPriority;

            const visible = matchStatus && matchPriority;
            item.style.display = visible ? 'flex' : 'none';
            if (visible) visibleCount++;
        });

        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    function updateEmptyState() {
        applyFilter();
    }
});