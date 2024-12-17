class DOMManager {
    static renderToDoToDOM(todo, todoCategory) {

        const categoryToDos = document.querySelector('.categoryToDos');
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem');

        // const category = document.createElement('h2');
        // category.textContent = `Category: ${todoCategory}`;

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
        removeBtn.addEventListener('click', () => {
            todoItem.remove();
            TodoCategories.deleteTodoFromCategory(todoCategory, todo.todoIdentifier);
        })

        // todoItem.appendChild(category);
        todoItem.appendChild(title);
        todoItem.appendChild(description);
        todoItem.appendChild(dueDate);
        todoItem.appendChild(priority);
        todoItem.appendChild(notes);
        todoItem.appendChild(isCompleted);
        todoItem.appendChild(removeBtn);

        categoryToDos.appendChild(todoItem);
    }
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

    static toggleCompletion(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.todoIdentifier === todoIdentifier);

        if (targetToDo) {
            targetToDo.isCompleted = !targetToDo.isCompleted;
            localStorage.setItem(category, JSON.stringify(todos));
            console.log(`Todo completed successfully.`);
        }
    }

    static updatePriority(category, todoIdentifier, newPriority) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.todoIdentifier === todoIdentifier);
        if (targetToDo) {
            targetToDo.priority = newPriority;
            localStorage.setItem(category, JSON.stringify(todos));
            console.log(`Priority updated successfully.`);
        }
    }

    static updateDueDate(category, todoIdentifier, newDueDate) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(todo => todo.todoIdentifier === todoIdentifier);
        if (targetToDo) {
            targetToDo.dueDate = newDueDate;
            localStorage.setItem(category, JSON.stringify(todos));
            console.log(`Due date updated successfully.`);
        }
    }
}


// manages categories of todos
class TodoCategories {
    constructor() {
        // singleton pattern ensures NMT one instance of this class is created
        if (!TodoCategories.instance) {
            this.categories = {
                life: [],
                work: [],
                education: [],
            }
            TodoCategories.instance = this;
        }
        return TodoCategories.instance;
    }

    createNewCat(catName) {
        if (!this.categories[catName]) {
            this.categories[catName] = [];
        }
        return this.categories[catName];
    }

    // get todos from localStorage
    static getToDos(category) {
        const categoryName = document.querySelector('.categoryName');
        categoryName.textContent = `${category}`;
        return JSON.parse(localStorage.getItem(category)) || [];
    }


    // save todo into category and then into localStorage
    static saveToDoToCategory(category, todo) {
        const todos = TodoCategories.getToDos(category);
        todos.push(todo);
        localStorage.setItem(category, JSON.stringify(todos));
        console.log(`Todo saved to "${category}" successfully.`);
    }

    // delete todo from category and then from localStorage
    static deleteTodoFromCategory(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        const updatedToDos = todos.filter(todo => todo.todoIdentifier !== todoIdentifier);
        localStorage.setItem(category, JSON.stringify(updatedToDos));
        console.log(`Todo removed from "${category}" successfully.`);
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
let todo2 = new NewToDo(
    "todo 2",
    "This is a leisure todo",
    "anytime",
    2,
    "i will enjoy myself :)"
)

// access an existing or create a new category
let todoCategories = new TodoCategories();
// TodoCategories.saveToDoToCategory("work", todo1);
// TodoCategories.getToDos("work").forEach(todo => DOMManager.renderToDoToDOM(todo, "work"));

todoCategories.createNewCat("leisure");
TodoCategories.saveToDoToCategory("leisure", todo2);
TodoCategories.getToDos("leisure").forEach(todo => DOMManager.renderToDoToDOM(todo, "leisure"));
// todoCategories.categories["life"] === todoCategories.categories.life


// saving the todo to local storage
// todo1.saveToLocalStorage(Object.keys(todoCategories.categories).at(0));
// Object.keys(todoCategories.categories).at(1)









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