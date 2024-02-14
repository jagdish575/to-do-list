window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();

        if (!task) {
            alert("Please enter a task!");
            return;
        }

        const taskEl = createTaskElement(task);
        listEl.appendChild(taskEl);

        input.value = '';
    });

    function createTaskElement(task) {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');

        const taskContentEl = document.createElement('div');
        taskContentEl.classList.add('content');

        const taskInputEl = document.createElement('input');
        taskInputEl.classList.add('text');
        taskInputEl.type = 'text';
        taskInputEl.value = task;
        taskInputEl.setAttribute('readonly', 'readonly');

        taskContentEl.appendChild(taskInputEl);

        const taskActionsEl = document.createElement('div');
        taskActionsEl.classList.add('actions');

        const taskEditEl = createButton('Edit', 'edit');
        const taskDeleteEl = createButton('Delete', 'delete');

        taskActionsEl.appendChild(taskEditEl);
        taskActionsEl.appendChild(taskDeleteEl);

        taskEl.appendChild(taskContentEl);
        taskEl.appendChild(taskActionsEl);

        taskEditEl.addEventListener('click', () => toggleEdit(taskEditEl, taskInputEl));
        taskDeleteEl.addEventListener('click', () => listEl.removeChild(taskEl));

        return taskEl;
    }

    function createButton(text, className) {
        const buttonEl = document.createElement('button');
        buttonEl.classList.add(className);
        buttonEl.innerText = text;
        return buttonEl;
    }

    function toggleEdit(editButton, inputElement) {
        if (editButton.innerText.toLowerCase() === 'edit') {
            editButton.innerText = 'Save';
            inputElement.removeAttribute('readonly');
            inputElement.focus();
        } else {
            editButton.innerText = 'Edit';
            inputElement.setAttribute('readonly', 'readonly');
        }
    }
});
