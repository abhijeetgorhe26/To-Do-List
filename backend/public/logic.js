const taskList = document.getElementById('task');
const addInput = document.querySelector('.add-input');
const addBtn = document.querySelector('.add-btn');
const warning = document.getElementById('warning');

// ─── Load all tasks from server when page opens ───────────────────────────────
async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    tasks.forEach(task => renderTask(task));
}

// ─── Render one task into the list ───────────────────────────────────────────
function renderTask(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;               // store id on the element

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = task.completed;

    // Task text
    const p = document.createElement('p');
    p.className = 'typed-thing';
    p.textContent = task.text;
    if (task.completed) p.classList.add('checked');

    // Delete button
    const img = document.createElement('img');
    img.src = './Resource/cross.png';
    img.className = 'close';
    img.alt = 'close';

    li.appendChild(checkbox);
    li.appendChild(p);
    li.appendChild(img);
    taskList.appendChild(li);

    // ── Toggle completed ──────────────────────────────────────────────────────
    checkbox.addEventListener('change', async function () {
        const res = await fetch(`/api/tasks/${task.id}`, { method: 'PATCH' });
        const updated = await res.json();
        console.log(updated);

        if (updated.completed) {
            p.classList.add('checked');
        } else {
            p.classList.remove('checked');
        }
    });

    // ── Delete task ───────────────────────────────────────────────────────────
    img.addEventListener('click', async function () {
        await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
        li.remove();
    });
}

// ─── Add task ────────────────────────────────────────────────────────────────
addBtn.addEventListener('click', addTask);

addInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();      // also add on Enter key
});

async function addTask() {
    const text = addInput.value.trim();

    if (text === '') {
        warning.style.display = 'block';
        return;
    }

    warning.style.display = 'none';

    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });


    const newTask = await res.json();
    console.log(newTask);
    renderTask(newTask);
    addInput.value = '';
}

// ─── Start ────────────────────────────────────────────────────────────────────
loadTasks();
