const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector('#tasks');
let todoArr = [];
let addTodoList;
let allTodoList;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;

    if (task.trim() == '') {
        const emptyModal = document.querySelector(".empty")
        emptyModal.style.opacity = 1
        setTimeout(() => {
            emptyModal.style.opacity = 0
        }, 2000)
        task = null;
    }

    todoArr.push(task);
    localStorage.setItem("todoKey", JSON.stringify(todoArr));
    input.value = '';

    addTodo();
    todOper();
});

if (JSON.parse(localStorage.getItem("todoKey")) != null) {
    window.addEventListener('load', () => {
        todoArr = JSON.parse(localStorage.getItem("todoKey"))
    });
}

todOper();

allTodoList = JSON.parse(localStorage.getItem("todoKey"));
if (allTodoList != undefined) {
    allTodoList.forEach(element => {
        console.log(element)
        list_el.innerHTML += `<div class="task">
      <div class="content">
        <span class="input_checked"></span>
        <input type="text" value="${element}" class="text" readonly="readonly">
      </div>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div> 
    </div>`
    });
    todOper();
}

function addTodo() {
    addTodoList = JSON.parse(localStorage.getItem("todoKey"));
    const addedModal = document.querySelector(".added")
    addedModal.style.opacity = 1
    setTimeout(() => {
        addedModal.style.opacity = 0
    }, 2000)
    list_el.innerHTML += `<div class="task">
      <div class="content">
        <span class="input_checked"></span>
        <input type="text" value="${addTodoList[addTodoList.length - 1]
        }" class="text" readonly="readonly">
      </div>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div> 
    </div>`;

}


function todOper() {
    var task_desk_el = document.querySelectorAll('.task .content');
    for (let j = 0; j < task_desk_el.length; j++) {
        task_desk_el[j].onclick = () => {
            task_desk_el[j].classList.toggle('newstyle');
        };
    }

    var task_edit_el = document.querySelectorAll('button.edit');
    var task_delete_el = document.querySelectorAll('button.delete');
    var task_input_el = document.querySelectorAll('input.text');
    var task_el = document.querySelectorAll('.task');

    for (let j = 0; j < task_edit_el.length; j++) {
        task_edit_el[j].addEventListener('click', () => {
            if (task_edit_el[j].innerText.toLowerCase() == 'edit') {
                task_input_el[j].removeAttribute('readonly');
                task_input_el[j].focus();
                task_edit_el[j].innerText = 'Save';
            } else {
                task_input_el[j].setAttribute('readonly', 'readonly');
                task_edit_el[j].innerText = 'Edit';
            }
        });
    }

    for (let j = 0; j < task_delete_el.length; j++) {
        task_delete_el[j].addEventListener('click', () => {
            list_el.removeChild(task_el[j]);
            let c = JSON.parse(localStorage.getItem("todoKey"));
            c.splice(j, 1);
            localStorage.setItem("todoKey", JSON.stringify(c));
        });
    }
}


