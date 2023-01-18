//! selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");
const reload = document.querySelector(".reload");
//? alerts

const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

//* Events

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);
// let counter =0;

//* Functions

function addTodo(e) {
  e.preventDefault();

  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    alertWarning.style.display = "block";
    setTimeout(() => {
      alertWarning.style.display = "none";
    }, 1000);
    //? clear todo input value
    todoInput.value = "";
    todoInput.focus();
  } else {
    alertSuccess.style.display = "block";
    setTimeout(() => {
      alertSuccess.style.display = "none";
    }, 1000);

    saveLocalTodos(todoInput.value);

    //? create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //   console.log(todoDiv);

    //? create mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
    completedButton.classList.add("complete-btn");
    // console.log(completedButton);
    todoDiv.appendChild(completedButton);

    //? create todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // console.log(newTodo);
    todoDiv.appendChild(newTodo);

    //? create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fa-solid fa-circle-minus'></i>";
    trashButton.classList.add("trash-btn");
    // console.log(trashButton);
    todoDiv.appendChild(trashButton);

    //? appent to list
    todoList.appendChild(todoDiv);
    // console.log(todoList);

    //? clear todo input value
    todoInput.value = "";
    todoInput.focus();
    // counter++;
  }
  // console.log(counter);
}

function deleteCheck(e) {
  const item = e.target;
  // console.log(item);

  //?delete todo
  if (
    item.classList.contains("trash-btn") ||
    item.classList.contains("fa-circle-minus")
  ) {
    const todo = item.closest("div");
    console.log(todo);
    todo.classList.add("fall");
    removeLocaleStorage(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //?check mark
  if (
    item.classList.contains("complete-btn") ||
    item.classList.contains("fa-circle-check")
  ) {
    const todo = item.closest("div");
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//! local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //? create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //   console.log(todoDiv);

    //? create mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
    completedButton.classList.add("complete-btn");
    // console.log(completedButton);
    todoDiv.appendChild(completedButton);

    //? create todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // console.log(newTodo);
    todoDiv.appendChild(newTodo);

    //? create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fa-solid fa-circle-minus'></i>";
    trashButton.classList.add("trash-btn");
    // console.log(trashButton);
    todoDiv.appendChild(trashButton);

    //? appent to list
    todoList.appendChild(todoDiv);
    // console.log(todoList);
  });
}

function removeLocaleStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

getTodos();
