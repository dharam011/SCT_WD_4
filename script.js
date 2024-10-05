const taskForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const datetimeInput = document.getElementById('datetime-input');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDateTime = datetimeInput.value;

  if (taskText === '' || taskDateTime === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    datetime: taskDateTime
  };

  tasks.push(task);
  renderTasks(tasks);
  taskInput.value = '';
  datetimeInput.value = '';
});

function renderTasks(taskArray) {
  taskList.innerHTML = '';

  taskArray.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');
    if (task.completed) taskElement.classList.add('completed');

    taskElement.innerHTML = `
      <span>${task.text}</span>
      <span>${new Date(task.datetime).toLocaleString()}</span>
      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">✔</button>
        <button class="edit-btn" onclick="editTask(${task.id})">✏</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) task.completed = !task.completed;
    return task;
  });
  renderTasks(tasks);
}

function editTask(id) {
  const taskToEdit = tasks.find(task => task.id === id);
  taskInput.value = taskToEdit.text;
  datetimeInput.value = taskToEdit.datetime;
  tasks = tasks.filter(task => task.id !== id);
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks(tasks);
}

filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const filter = e.target.id;

    if (filter === 'show-all') {
      renderTasks(tasks);
    } else if (filter === 'show-active') {
      const activeTasks = tasks.filter(task => !task.completed);
      renderTasks(activeTasks);
    } else if (filter === 'show-completed') {
      const completedTasks = tasks.filter(task => task.completed);
      renderTasks(completedTasks);
    }
  });
});
