const STORAGE_KEY = 'pd1-uzdevumi';
const taskInput = document.querySelector('#task-input');
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const counter = document.querySelector('#counter');
const filterButtons = document.querySelectorAll('[data-filter]');
const clearCompletedButton = document.querySelector('#clear-completed-btn');

let tasks = loadTasks();
let activeFilter = 'all';

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    if (!Array.isArray(parsedTasks)) return [];
    const seenIds = new Set();
    return parsedTasks.filter(task => {
      if (!task || !Number.isSafeInteger(task.id) || typeof task.text !== 'string'
        || typeof task.done !== 'boolean' || seenIds.has(task.id)) return false;
      seenIds.add(task.id);
      return true;
    }).map(({ id, text, done }) => ({ id, text, done }));
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function generateUniqueId() {
  let id = Date.now();
  while (tasks.some(task => task.id === id)) id += 1;
  return id;
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: generateUniqueId(), text, done: false });
  saveTasks();
  taskInput.value = '';
  renderTasks();
  updateCounter();
  taskInput.focus();
}

function toggleTask(event) {
  if (!event.target.matches('.task-checkbox')) return;
  const taskId = Number(event.target.closest('.task-item').dataset.taskId);
  const task = tasks.find(item => item.id === taskId);
  if (!task) return;
  task.done = event.target.checked;
  saveTasks();
  renderTasks();
  updateCounter();
}

function deleteTask(event) {
  const button = event.target.closest('.delete-button');
  if (!button) return;
  const taskId = Number(button.closest('.task-item').dataset.taskId);
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
  updateCounter();
}

function deleteCompletedTasks() {
  if (!tasks.some(task => task.done)) return;
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
  updateCounter();
}

function filterTasks() {
  if (activeFilter === 'active') return tasks.filter(task => !task.done);
  if (activeFilter === 'completed') return tasks.filter(task => task.done);
  return tasks;
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = `task-item${task.done ? ' is-completed' : ''}`;
  item.dataset.taskId = String(task.id);

  const checkbox = document.createElement('input');
  checkbox.className = 'task-checkbox';
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', `Atzīmēt uzdevumu: ${task.text}`);

  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = '×';
  deleteButton.setAttribute('aria-label', `Dzēst uzdevumu: ${task.text}`);

  item.append(checkbox, text, deleteButton);
  return item;
}

function renderEmptyState() {
  const item = document.createElement('li');
  item.className = 'empty-state';
  item.textContent = tasks.length ? 'Šajā skatā uzdevumu nav.' : 'Pagaidām uzdevumu nav.';
  taskList.append(item);
}

function renderTasks() {
  taskList.replaceChildren();
  const visibleTasks = filterTasks();
  if (!visibleTasks.length) {
    renderEmptyState();
    return;
  }
  visibleTasks.forEach(task => taskList.append(createTaskElement(task)));
}

function updateCounter() {
  const remaining = tasks.filter(task => !task.done).length;
  counter.textContent = `Atlikuši ${remaining} uzdevumi`;
}

function selectFilter(event) {
  activeFilter = event.currentTarget.dataset.filter;
  filterButtons.forEach(button => {
    const selected = button === event.currentTarget;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  renderTasks();
}

function initializeApp() {
  taskForm.addEventListener('submit', addTask);
  taskList.addEventListener('change', toggleTask);
  taskList.addEventListener('click', deleteTask);
  clearCompletedButton.addEventListener('click', deleteCompletedTasks);
  filterButtons.forEach(button => button.addEventListener('click', selectFilter));
  renderTasks();
  updateCounter();
}

initializeApp();
