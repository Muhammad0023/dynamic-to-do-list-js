document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add Task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, true);
            taskInput.value = '';
        }
    });

    // Remove Task (event delegation)
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const li = e.target.parentElement;
            removeTask(li.firstChild.textContent);
            li.remove();
        }
    });

    // Function to add a task to the DOM
    function addTask(taskText, save = false) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});