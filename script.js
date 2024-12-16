// func that renders a single todo to the DOM
function renderToDoToDOM(todo, todoCategory) {

    const toDoContainer = document.querySelector('.toDoContainer');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');

    const category = document.createElement('h2');
    category.textContent = `Category: ${todoCategory}`;

    const title = document.createElement('h2');
    title.textContent = `Title: ${todo.title}`;

    const description = document.createElement('p');
    description.textContent = `Description: ${todo.description}`;

    const dueDate = document.createElement('p');
    dueDate.textContent = `Due Date: ${todo.dueDate}`;

    const priority = document.createElement('p');
    priority.textContent = `Priority: ${todo.priority}`;

    const notes = document.createElement('p');
    notes.textContent = `Notes: ${todo.notes}`;

    const isCompleted = document.createElement('p');
    isCompleted.textContent = `Completed: ${todo.isCompleted}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = `Remove this todo`;
    removeBtn.id = "remBtn";
    removeBtn.addEventListener('click', ()=>{
        todoItem.remove();
        TodoCategories.deleteTodoFromCategory(todoCategory, todo.todoIdentifier);
    })

    todoItem.appendChild(category);
    todoItem.appendChild(title);
    todoItem.appendChild(description);
    todoItem.appendChild(dueDate);
    todoItem.appendChild(priority);
    todoItem.appendChild(notes);
    todoItem.appendChild(isCompleted);
    todoItem.appendChild(removeBtn);

    toDoContainer.appendChild(todoItem);
}


// manages a single todo
class NewToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isCompleted = false;
        this.todoIdentifier = Date.now(); // Unique identifier
    }

    static toggleCompletion (category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.todoIdentifier === todoIdentifier);

        if (targetToDo) {
            targetToDo.isCompleted = !targetToDo.isCompleted;
            localStorage.setItem(category, JSON.stringify(todos));
        }
    }

    static updatePriority(category, todoIdentifier, newPriority) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.todoIdentifier === todoIdentifier);
        if (targetToDo) {
            targetToDo.priority = newPriority;
            localStorage.setItem(category, JSON.stringify(todos));
        } 
    }

    static updateDueDate(category, todoIdentifier, newDueDate) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.toDoContainer === todoIdentifier);
        if (targetToDo) {
            targetToDo.dueDate = newDueDate;
            localStorage.setItem(category, JSON.stringify(todos));
        }
    }
}


// manages categories of todos
class TodoCategories {
    constructor() {
        this.categories = {
            life: [],
            work: [],
            education: [],
        }
    }

    createNewCat(catName) {
        if (!this.categories[catName]) {
            this.categories[catName] = [];
        }
        return this.categories[catName];
    }

    static getToDos (category) {
        return JSON.parse(localStorage.getItem(category)) || [];
    }

    saveToDoToCategory (category, todo) {
        const todos = TodoCategories.getToDos(category);
        todos.push(todo);
        localStorage.setItem(category, JSON.stringify(todos));

    }

    static deleteTodoFromCategory(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        const updatedToDos = todos.filter(todo => todo.todoIdentifier !== todoIdentifier);
        localStorage.setItem(category, JSON.stringify(updatedToDos));
    }
}

// -----------------------------------------------------------------------------------------

// creating a new todo
let todo1 = new NewToDo(
    "example todo",
    "This is an example todo only",
    "24-12-2024",
    1,
    "i will try to complete it in time"
)

// access an existing or create a new category
let todoCategories = new TodoCategories();
todoCategories.saveToDoToCategory("work", todo1);
TodoCategories.getToDos("work").forEach(todo => renderToDoToDOM(todo, "work"));
// todoCategories.createNewCat("leisure");
// todoCategories.categories["life"]
// todoCategories.addToDoToCategory("life", todo1);


// saving the todo to local storage
// todo1.saveToLocalStorage(Object.keys(todoCategories.categories).at(0));
// Object.keys(todoCategories.categories).at(0)









// DOM-related stuff should be separate from the application logic

// create a new todo

// parameters of a todo
// title, description, dueDate, priority, notes

// categories of to-dos
// given: life, work, education
// create a new category
// adding a to-do into a certain category

// setting todos as complete
// changing todo priority
// changing due date of a todo

// method that saves newly created todos into localStorage
// method that loads to-dos from the localStorage to display on page











// basic app workflow

// give user option to enter their todo
// save that todo into localStorage
// upon user request, load that todo from local storage
// on homepage, show user all their todos, along with option to 'create new todo'
// also user should be able to include a certain todo into a certain category