const STORAGE_KEY = 'pd1-uzdevumi';
const taskInput = document.querySelector('#task-input');
const dueInput = document.querySelector('#due-input');
const priorityInputs = document.querySelectorAll('input[name="priority"]');
const taskForm = document.querySelector('#task-form');
const taskDialog = document.querySelector('#task-dialog');
const openTaskDialogButton = document.querySelector('#open-task-dialog-btn');
const closeTaskDialogButton = document.querySelector('#close-task-dialog-btn');
const taskList = document.querySelector('#task-list');
const counter = document.querySelector('#counter');
const filterButtons = document.querySelectorAll('[data-filter]');
const clearCompletedButton = document.querySelector('#clear-completed-btn');
const sortButton = document.querySelector('#sort-btn');
const statsTotal = document.querySelector('#stats-total');
const statsCompleted = document.querySelector('#stats-completed');
const statsOverdue = document.querySelector('#stats-overdue');
const statsProgress = document.querySelector('#stats-progress');
const statsProgressBar = document.querySelector('#stats-progress-bar');
const progressTrack = document.querySelector('.progress-track');

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
    }).map(task => ({
      id: task.id,
      text: task.text,
      done: task.done,
      due: typeof task.due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(task.due)
        ? task.due
        : null,
      priority: ['high', 'medium', 'low'].includes(task.priority)
        ? task.priority
        : 'medium'
    }));
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
  tasks.push({
    id: generateUniqueId(),
    text,
    done: false,
    due: dueInput.value || null,
    priority: getSelectedPriority()
  });
  saveTasks();
  taskInput.value = '';
  dueInput.value = '';
  resetPriority();
  renderTasks();
  updateCounter();
  taskDialog.close();
  openTaskDialogButton.focus();
}

function getSelectedPriority() {
  return [...priorityInputs].find(input => input.checked)?.value || 'high';
}

function resetPriority() {
  priorityInputs.forEach(input => {
    input.checked = input.value === 'high';
  });
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

function sortTasks() {
  tasks.sort((task, nextTask) =>
    task.text.localeCompare(nextTask.text, 'lv')
  );
  saveTasks();
  renderTasks();
  updateCounter();
}

function createTaskElement(task) {
  const item = document.createElement('li');
  const overdue = isTaskOverdue(task);
  item.className = `task-item${task.done ? ' is-completed' : ''}${overdue ? ' is-overdue' : ''}`;
  item.dataset.taskId = String(task.id);

  const checkbox = document.createElement('input');
  checkbox.className = 'task-checkbox';
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', `Atzīmēt uzdevumu: ${task.text}`);

  const details = createTaskDetails(task, overdue);
  const deleteButton = createDeleteButton(task);
  item.append(checkbox, details, deleteButton);
  return item;
}

function createTaskDetails(task, overdue) {
  const details = document.createElement('div');
  details.className = 'task-details';
  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = task.text;
  details.append(text);
  appendDueDetails(details, task, overdue);
  appendPriorityDetails(details, task.priority);
  return details;
}

function appendPriorityDetails(details, priority) {
  const labels = { high: 'Augsta', medium: 'Vidēja', low: 'Zema' };
  const priorityLabel = document.createElement('span');
  priorityLabel.className = `task-priority is-${priority}`;
  priorityLabel.textContent = labels[priority];
  details.append(priorityLabel);
}

function createDeleteButton(task) {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = '×';
  deleteButton.setAttribute('aria-label', `Dzēst uzdevumu: ${task.text}`);
  return deleteButton;
}

function isTaskOverdue(task) {
  if (task.done || !task.due) return false;
  const today = new Date();
  const todayText = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
  return task.due < todayText;
}

function formatDueDate(due) {
  const [year, month, day] = due.split('-');
  return `${day}/${month}/${year}`;
}

function appendDueDetails(details, task, overdue) {
  if (!task.due) return;
  const dueText = document.createElement('span');
  dueText.className = 'task-due';
  dueText.textContent = formatDueDate(task.due);
  details.append(dueText);
  if (!overdue) return;
  const overdueText = document.createElement('span');
  overdueText.className = 'overdue-label';
  overdueText.textContent = 'Nokavēts';
  details.append(overdueText);
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
  renderStats();
  if (!visibleTasks.length) {
    renderEmptyState();
    return;
  }
  visibleTasks.forEach(task => taskList.append(createTaskElement(task)));
}

function renderStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;
  const overdue = tasks.filter(task => isTaskOverdue(task)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  statsTotal.textContent = String(total);
  statsCompleted.textContent = String(completed);
  statsOverdue.textContent = String(overdue);
  statsProgress.textContent = `${percentage}%`;
  statsProgressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute('aria-valuenow', String(percentage));
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
  openTaskDialogButton.addEventListener('click', () => taskDialog.showModal());
  closeTaskDialogButton.addEventListener('click', () => taskDialog.close());
  taskForm.addEventListener('submit', addTask);
  taskList.addEventListener('change', toggleTask);
  taskList.addEventListener('click', deleteTask);
  clearCompletedButton.addEventListener('click', deleteCompletedTasks);
  sortButton.addEventListener('click', sortTasks);
  filterButtons.forEach(button => button.addEventListener('click', selectFilter));
  renderTasks();
  updateCounter();
}

initializeApp();
