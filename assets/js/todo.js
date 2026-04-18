document.addEventListener('DOMContentLoaded', () => {
    const API = "../api/todo.php"; 
    const inputField = document.querySelector('.todo-input');
    const priorityOptions = document.querySelectorAll('.priority-option');
    const addButton = document.querySelector('.add-btn');
    const todoList = document.querySelector('.todo-list');
    const emptyState = document.querySelector('.empty-state');
    
    let selectedPriority = null;

    // Priority Selection Logic
    priorityOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            priorityOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedPriority = opt.dataset.priority;
        });
    });

    fetchTasks();

    addButton.addEventListener('click', addTask);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('.todo-item');
        if (!li) return;
        const taskId = li.dataset.id;

        if (e.target.classList.contains('fa-trash-alt')) {
            deleteTask(taskId, li);
        }

        if (e.target.classList.contains('todo-checkbox')) {
            const span = li.querySelector('span');
            toggleTask(taskId, e.target.checked, span);
        }
    });

    // --- FUNCTIONS ---

    function fetchTasks() {
        fetch(`${API}?action=get`)
            .then(res => res.json())
            .then(tasks => {
                todoList.innerHTML = ''; // Clear items
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
                    priority: priority
                });
                inputField.value = '';
                // Reset priority selection
                priorityOptions.forEach(o => o.classList.remove('active'));
                selectedPriority = null;
                updateEmptyState();
            } else {
                alert("Erreur: " + (data.error || "Inconnue"));
            }
        });
    }

    function toggleTask(id, isCompleted, span) {
        fetch(`${API}?action=update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, is_completed: isCompleted ? 1 : 0 })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                if (isCompleted) {
                    span.style.textDecoration = 'line-through';
                    span.style.opacity = '0.6';
                } else {
                    span.style.textDecoration = 'none';
                    span.style.opacity = '1';
                }
            }
        });
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
        li.className = `todo-item item-${task.priority}`;
        li.dataset.id = task.id;
        
        const isChecked = task.is_completed == 1 ? 'checked' : '';
        const style = task.is_completed == 1 ? 'style="text-decoration: line-through; opacity: 0.6;"' : '';
        
        const priorityClass = `priority-${task.priority}`;

        li.innerHTML = `
            <div class="todo-text">
                <input type="checkbox" class="todo-checkbox" ${isChecked}>
                <div class="task-info">
                    <span ${style}>${task.task_text}</span>
                    <div class="task-meta">
                        <span class="priority-badge ${priorityClass}">${task.priority}</span>
                    </div>
                </div>
            </div>
            <i class="fas fa-trash-alt delete-todo"></i>
        `;
        todoList.appendChild(li);
    }

    function updateEmptyState() {
        if (todoList.children.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }
});
