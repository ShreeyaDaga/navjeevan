const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('tasks');

// Add task when button clicked or Enter pressed
addBtn.onclick = addTask;

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const item = document.createElement('li');
  item.className = 'task-item';

  item.innerHTML = `
    <span class="task-text">${text}</span>
    <input class="edit-input" type="text" value="${text}">
    <div class="actions">
      <button class="edit-btn">Edit</button>
      <button class="save-btn">Save</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  list.appendChild(item);
  input.value = '';
  setupActions(item);
}

function setupActions(item) {
  const editBtn = item.querySelector('.edit-btn');
  const saveBtn = item.querySelector('.save-btn');
  const delBtn = item.querySelector('.delete-btn');

  editBtn.onclick = () => {
    item.classList.add('editing');
    item.querySelector('.edit-input').focus();
  };

  saveBtn.onclick = () => {
    const input = item.querySelector('.edit-input');
    const span = item.querySelector('.task-text');
    span.textContent = input.value;
    item.classList.remove('editing');
  };

  delBtn.onclick = () => list.removeChild(item);
}
