function populateNewCatInMainMenu(catName) {

    const mainMenu = document.querySelector(".mainMenu");

    const liElement = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = catName;
    button.type = "button";

    liElement.appendChild(button);

    mainMenu.prepend(liElement);
}

class DOMManager {
    static renderToDoToDOM(todo, todoCategory) {
        const dialog = document.querySelector("dialog");
        const closeModal = document.querySelector(
            "dialog .modalCloseBtn #dialogCloseBtn"
        );
        const submitBtn = document.getElementById("submitBtn");
        const dialogHeading = document.querySelector("dialog h2");

        if (!DOMManager.validateToDo(todo)) {
            console.error("Invalid todo object:", todo);
            return;
        }

        const todoItem = document.createElement("div");
        todoItem.classList.add("todoItem");

        const title = document.createElement("h2");
        title.textContent = `Title: ${todo.title}`;

        const description = document.createElement("p");
        description.textContent = `Description: ${todo.description}`;

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due Date: ${todo.dueDate}`;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${todo.priority}`;

        const notes = document.createElement("p");
        notes.textContent = `Notes: ${todo.notes}`;

        const cat = document.createElement("p");
        cat.textContent = `Category: ${todo.category}`;

        const isCompleted = document.createElement("p");
        isCompleted.textContent = `Completed: ${todo.isCompleted}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = `Remove this todo`;

        const editToDoBtn = document.createElement("button");
        editToDoBtn.textContent = `Edit this todo`;

        const addToDoBtn = document.createElement("button");
        addToDoBtn.textContent = `Add a new todo`;

        todoItem.appendChild(title);
        todoItem.appendChild(description);
        todoItem.appendChild(dueDate);
        todoItem.appendChild(priority);
        todoItem.appendChild(notes);
        todoItem.appendChild(cat);
        todoItem.appendChild(isCompleted);

        todoItem.appendChild(removeBtn);
        todoItem.appendChild(editToDoBtn);
        todoItem.appendChild(addToDoBtn);

        removeBtn.addEventListener("click", () => {
            todoItem.remove();
            TodoCategories.deleteTodoFromCategory(todoCategory, todo.todoIdentifier);
        });

        const createNewCatBtn = document.getElementById("createNewCatBtn");
        const selectElement = document.getElementById("todosCats");
        const addNewCatLabel = document.querySelector(".addNewCatLabel");
        const newCatInput = document.getElementById("newCatName");
        const addNewCatBtn = document.getElementById("addNewCatBtn");

        function createNewCatBtnClickHandler() {
            addNewCatLabel.style.display = "block";
            newCatInput.style.display = "block";
            addNewCatBtn.style.display = "block";
            createNewCatBtn.style.display = "none"; // hides the 'create new category' btn after a single click
            createNewCatBtn.removeEventListener("click", createNewCatBtnClickHandler);
        }

        function addNewCatBtnClickHandler() {
            const newCategory = newCatInput.value.trim();
            if (newCategory) {
                const optionEl = document.createElement("option");
                optionEl.value = newCategory.toLowerCase();
                optionEl.textContent = newCategory;
                selectElement.appendChild(optionEl);

                newCatInput.value = "";
                addNewCatLabel.style.display = "none";
                newCatInput.style.display = "none";
                addNewCatBtn.style.display = "none";

                selectElement.value = optionEl.value;

                const categories = Object.keys(todoCategories.categories);
                if (!categories.includes(newCategory)) {
                    todoCategories.createNewCat(newCategory);
                }

                addNewCatBtn.removeEventListener("click", addNewCatBtnClickHandler);
            } else {
                alert("Please enter a valid category name.");
            }
        }

        function retrieveToDoData() {
            document.getElementById("todoTitle").value = todo.title;
            document.getElementById("todoDesc").value = todo.description;
            document.getElementById("todoDueDate").value = todo.dueDate;
            document.getElementById("todoPriority").value = todo.priority;
            document.getElementById("todoNotes").value = todo.notes;
            document.getElementById("todosCats").value = todo.category;
        }

        function resetFormFields() {
            document.getElementById("todoTitle").value = "";
            document.getElementById("todoDesc").value = "";
            document.getElementById("todoDueDate").value = "";
            document.getElementById("todoPriority").value = "";
            document.getElementById("todoNotes").value = "";
            // document.getElementById('todosCats').value = '';
        }

        function handleFormSubmit(event) {
            event.preventDefault();
            const todoTitle = document.getElementById("todoTitle").value;
            const todoDesc = document.getElementById("todoDesc").value;
            const todoDueDate = document.getElementById("todoDueDate").value;
            const todoPriority = document.getElementById("todoPriority").value;
            const todoNotes = document.getElementById("todoNotes").value;
            const todosCats = document.getElementById("todosCats").value;

            const newTodo = new NewToDo(
                todoTitle,
                todoDesc,
                todoDueDate,
                todoPriority,
                todoNotes,
                todosCats
            );
            TodoCategories.saveToDoToCategory(newTodo.category, newTodo);

            if (
                newTodo.category === "work" ||
                newTodo.category === "life" ||
                newTodo.category === "education"
            ) {
                console.log("Category already exists.");
            } else {
                console.log("New category created!");
                console.log(todoCategories.categories[newTodo.category]);

                populateNewCatInMainMenu(newTodo.category);
            }

            dialog.close();
            console.log("Todo added successfully.");
        }

        function dialogCloseBtnHandler() {
            dialog.close();
        }

        function createNewCatEventListeners() {
            createNewCatBtn.addEventListener("click", createNewCatBtnClickHandler);
            addNewCatBtn.addEventListener("click", addNewCatBtnClickHandler);
            submitBtn.addEventListener("click", handleFormSubmit);
            closeModal.addEventListener("click", dialogCloseBtnHandler);
        }

        editToDoBtn.addEventListener("click", () => {
            dialogHeading.textContent = "Edit Todo";
            dialog.showModal();
            retrieveToDoData();
            createNewCatEventListeners();
        });

        addToDoBtn.addEventListener("click", () => {
            dialogHeading.textContent = "Add New Todo";
            resetFormFields();
            dialog.showModal();
            createNewCatEventListeners();
        });

        return todoItem;
    }

    // to ensure todos are valid
    static validateToDo(todo) {
        const requiredFields = [
            "title",
            "description",
            "dueDate",
            "priority",
            "notes",
            "category",
        ];
        return requiredFields.every((field) =>
            Object.prototype.hasOwnProperty.call(todo, field)
        );
    }

    // to reset the DOM for dynamic updates
    static clearAllTodos() {
        const todosContainer = document.querySelector(".todosContainer");
        if (todosContainer) todosContainer.innerHTML = "";
    }
}

// manages localStorage
class StorageManager {
    static get(category) {
        return JSON.parse(localStorage.getItem(category)) || [];
    }
    static set(category, todos) {
        localStorage.setItem(category, JSON.stringify(todos));
    }
}

// manages a single todo
class NewToDo {
    constructor(title, description, dueDate, priority, notes, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.category = category;
        this.isCompleted = false;
        this.todoIdentifier = Date.now(); // Unique identifier
    }

    static toggleCompletion(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(
            (todo) => todo.todoIdentifier === todoIdentifier
        );

        if (targetToDo) {
            targetToDo.isCompleted = !targetToDo.isCompleted;
            StorageManager.set(category, todos);
            console.log(`Todo completed successfully.`);
        }
    }

    static updatePriority(category, todoIdentifier, newPriority) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(
            (todo) => todo.todoIdentifier === todoIdentifier
        );
        if (targetToDo) {
            targetToDo.priority = newPriority;
            StorageManager.set(category, todos);
            console.log(`Priority updated successfully.`);
        }
    }

    static updateDueDate(category, todoIdentifier, newDueDate) {
        const todos = TodoCategories.getToDos(category);
        const targetToDo = todos.find(
            (todo) => todo.todoIdentifier === todoIdentifier
        );
        if (targetToDo) {
            targetToDo.dueDate = newDueDate;
            StorageManager.set(category, todos);
            console.log(`Due date updated successfully.`);
        }
    }
}

// manages categories of todos
class TodoCategories {
    constructor() {
        // singleton pattern ensures NMT one instance of this class is created
        if (TodoCategories.instance) {
            return TodoCategories.instance;
        }
        this.categories = {
            life: [],
            work: [],
            education: [],
        };
        TodoCategories.instance = this;
    }

    static getInstance() {
        if (!TodoCategories.instance) {
            new TodoCategories();
        }
        return TodoCategories.instance;
    }

    getCategories() {
        return this.categories;
    }

    createNewCat(catName) {
        if (!this.categories[catName]) {
            this.categories[catName] = [];
        }
        localStorage.setItem(catName, JSON.stringify([]));
        return this.categories[catName];
    }

    // static updateCategoryName(category) {
    //     document.addEventListener("DOMContentLoaded", () => {
    //         const singleCatToDos = document.querySelector(".singleCatToDos");
    //         const categoryName = document.createElement("h2");
    //         categoryName.classList.add("categoryName");
    //         if (categoryName) categoryName.textContent = `Category: ${category}`;

    //         singleCatToDos.prepend(categoryName);
    //     });

    //     // const categoryName = document.querySelector('.categoryName');
    //     // if (categoryName) categoryName.textContent = `Category: ${category}`;
    // }


    // get todos from localStorage
    static getToDos(category) {
        return StorageManager.get(category);
    }

    // save todo into category and then into localStorage
    static saveToDoToCategory(category, todo) {
        const todos = TodoCategories.getToDos(category);
        todos.push(todo);
        StorageManager.set(category, todos);
        console.log(`Todo saved to "${category}" successfully.`);
    }

    // delete todo from category and then from localStorage
    static deleteTodoFromCategory(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        console.log(todos);
        const updatedToDos = todos.filter(
            (todo) => todo.todoIdentifier !== todoIdentifier
        );
        StorageManager.set(category, updatedToDos);
        console.log(updatedToDos);
        console.log(`Todo removed from "${category}" successfully.`);
    }
}


function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.replace(/^\w/, c => c.toUpperCase());
}



// -----------------------------------------------------------------------------------------

// creating a new todo
// let todo1 = new NewToDo(
//     "example todo",
//     "This is an example todo only",
//     "2024-12-24",
//     5,
//     "i will try to complete it in time",
//     'education'
// )

// access an existing or create a new category
const todoCategories = TodoCategories.getInstance();
Object.freeze(todoCategories); // Optional: to make the singleton instance immutable

// todoCategories.createNewCat("leisure");
// TodoCategories.saveToDoToCategory(todo1.category, todo1);
// TodoCategories.updateCategoryName(todo1.category);
// TodoCategories.getToDos(todo1.category).forEach(todo => DOMManager.renderToDoToDOM(todo, todo1.category));
// Object.keys(todoCategories.categories).forEach(cat => populateNewCatInMainMenu (cat));

// get all the items of localStorage in one go
// Object.entries(localStorage);


// populate the main page with all the todos of the user
const items = Object.entries(localStorage).map((item) => item);
for (let index = 0; index < items.length; index++) {

    const categoryName = items[index][0];
    const categoryToDos = JSON.parse(items[index][1]);
    // console.log(categoryToDos.length);
    
    const todosContainer = document.querySelector(".todosContainer");

    const singleCatToDos = document.createElement("div");
    singleCatToDos.classList.add("singleCatToDos");

    const singleCatToDos_categoryName = document.createElement("h2");
    singleCatToDos_categoryName.classList.add("categoryName");
    singleCatToDos_categoryName.textContent = `${capitalizeFirstLetter(categoryName)} Category Todos`;

    singleCatToDos.appendChild(singleCatToDos_categoryName);

    const singleCatToDos_categoryToDos = document.createElement("div");
    singleCatToDos_categoryToDos.classList.add("categoryToDos");

    if (categoryToDos.length === 0)  { 
        const noToDoMsg = document.createElement('p');
        noToDoMsg.textContent = "No todos here.";
        singleCatToDos_categoryToDos.appendChild(noToDoMsg);
        singleCatToDos.appendChild(singleCatToDos_categoryToDos);
    } else {
        for (let todoIndex = 0; todoIndex < categoryToDos.length; todoIndex++) {
            
            // else {
                const todoItem = DOMManager.renderToDoToDOM(categoryToDos[todoIndex], categoryName);
                singleCatToDos_categoryToDos.appendChild(todoItem);
                singleCatToDos.appendChild(singleCatToDos_categoryToDos);
            // }
        }
    }

    populateNewCatInMainMenu(categoryName);

    todosContainer.appendChild(singleCatToDos);
}

// TodoCategories.getToDos(todo1.category).forEach(todo => DOMManager.todoButtonsClicksHandler(todo, todo1.category));
// DOMManager.todoButtonsClicksHandler(todo, todoCategory);

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
