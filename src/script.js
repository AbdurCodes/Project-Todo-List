import './style.css';
import { format, parseISO, formatDistanceToNow } from "date-fns";


const closeModal = document.querySelector("dialog .modalCloseBtn #dialogCloseBtn");
const selectElement = document.getElementById("todosCats");
const addNewCatLabel = document.querySelector(".addNewCatLabel");
const newCatInput = document.getElementById("newCatName");
const myForm = document.getElementById("myForm");
const createNewCatBtn = document.getElementById("createNewCatBtn");
const addNewCatBtn = document.getElementById("addNewCatBtn");
const completedToDosCatBtn = document.getElementById("completedToDosCatBtn");
const missedToDosCatBtn = document.getElementById("missedToDosCatBtn");
const addToDoBtn = document.querySelector(".addNewToDoBtnMain");
const dialog = document.querySelector("dialog");
const dialogHeading = document.querySelector("dialog h2");


function sortTodos() {

}


function removeMarkCompAndEditTodoBtns() {
    const allMarkCompBtns = document.querySelectorAll('.markCompletedBtn');
    Array.from(allMarkCompBtns, (item) => { item.style.display = 'none' });
    const allEditTodoBtns = document.querySelectorAll('.editToDoBtn');
    Array.from(allEditTodoBtns, (item) => { item.style.display = 'none' });
}


completedToDosCatBtn.addEventListener('click', () => {
    DOMManager.clearAllTodos();
    for (let index = 0; index < items.length; index++) {

        const categoryName = items[index][0];

        const categoryToDos = JSON.parse(items[index][1]);

        const todosContainer = document.querySelector(".todosContainer");

        const singleCatToDos = document.createElement("div");
        singleCatToDos.classList.add("singleCatToDos");

        const singleCatToDos_categoryName = document.createElement("h2");
        singleCatToDos_categoryName.classList.add("categoryName");
        singleCatToDos_categoryName.textContent = `${capitalizeFirstLetter(categoryName)} Category - Completed Todos`;

        const delCatBtn = document.createElement('button');
        delCatBtn.textContent = 'Delete this category';
        delCatBtn.setAttribute('type', 'button');
        delCatBtn.classList.add('delCatBtn');
        delCatBtn.addEventListener('click', () => {
            const deleteCat = confirm("Sure to delete this category?");
            if (deleteCat) {
                StorageManager.removeCat(categoryName);
                location.reload();
            } else {
                alert('Your category is not deleted.');
            }
        })
        singleCatToDos_categoryName.appendChild(delCatBtn);

        singleCatToDos.appendChild(singleCatToDos_categoryName);

        const singleCatToDos_categoryToDos = document.createElement("div");
        singleCatToDos_categoryToDos.classList.add("categoryToDos");

        if (categoryToDos.length === 0) {
            const noToDoMsg = document.createElement('p');
            noToDoMsg.textContent = "No todos here what to say of completed todos.";
            singleCatToDos_categoryToDos.appendChild(noToDoMsg);
            singleCatToDos.appendChild(singleCatToDos_categoryToDos);
        }
        else {
            const compTodos = categoryToDos.filter(todo => {
                const parsedDate = parseISO(todo.dueDate);
                const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
                return !relativeTime.includes('ago') && todo.isCompleted === true;
            });

            if (isNaN(compTodos)) {
                for (let todoIndex = 0; todoIndex < compTodos.length; todoIndex++) {
                    const todoItem = DOMManager.renderToDoToDOM(compTodos[todoIndex], categoryName);
                    todoItem.style.backgroundColor = 'green';
                    todoItem.style.color = 'white';
                    singleCatToDos_categoryToDos.appendChild(todoItem);
                    singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                }
            }
            else {
                const noToDoMsg = document.createElement('p');
                noToDoMsg.textContent = "No completed todos here.";
                singleCatToDos_categoryToDos.appendChild(noToDoMsg);
                singleCatToDos.appendChild(singleCatToDos_categoryToDos);
            }
        }
        todosContainer.appendChild(singleCatToDos);
    }
    removeMarkCompAndEditTodoBtns();
});


missedToDosCatBtn.addEventListener('click', () => {
    DOMManager.clearAllTodos();
    for (let index = 0; index < items.length; index++) {

        const categoryName = items[index][0];

        const categoryToDos = JSON.parse(items[index][1]);

        const todosContainer = document.querySelector(".todosContainer");

        const singleCatToDos = document.createElement("div");
        singleCatToDos.classList.add("singleCatToDos");

        const singleCatToDos_categoryName = document.createElement("h2");
        singleCatToDos_categoryName.classList.add("categoryName");
        singleCatToDos_categoryName.textContent = `${capitalizeFirstLetter(categoryName)} Category - Missed Todos`;

        const delCatBtn = document.createElement('button');
        delCatBtn.textContent = 'Delete this category';
        delCatBtn.setAttribute('type', 'button');
        delCatBtn.classList.add('delCatBtn');
        delCatBtn.addEventListener('click', () => {
            const deleteCat = confirm("Sure to delete this category?");
            if (deleteCat) {
                StorageManager.removeCat(categoryName);
                location.reload();
            } else {
                alert('Your category is not deleted.');
            }
        })
        singleCatToDos_categoryName.appendChild(delCatBtn);

        singleCatToDos.appendChild(singleCatToDos_categoryName);

        const singleCatToDos_categoryToDos = document.createElement("div");
        singleCatToDos_categoryToDos.classList.add("categoryToDos");

        if (categoryToDos.length === 0) {
            const noToDoMsg = document.createElement('p');
            noToDoMsg.textContent = "No todos here what to say of missed todos.";
            singleCatToDos_categoryToDos.appendChild(noToDoMsg);
            singleCatToDos.appendChild(singleCatToDos_categoryToDos);
        }
        else {
            const missedTodos = categoryToDos.filter(todo => {
                const parsedDate = parseISO(todo.dueDate);
                const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
                return relativeTime.includes('ago') && todo.isCompleted === false;
            });

            if (isNaN(missedTodos)) {
                for (let todoIndex = 0; todoIndex < missedTodos.length; todoIndex++) {
                    const todoItem = DOMManager.renderToDoToDOM(missedTodos[todoIndex], categoryName);
                    todoItem.style.backgroundColor = 'red';
                    todoItem.style.color = 'white';
                    singleCatToDos_categoryToDos.appendChild(todoItem);
                    singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                }
            }
            else {
                const noToDoMsg = document.createElement('p');
                noToDoMsg.textContent = "No missed todos here.";
                singleCatToDos_categoryToDos.appendChild(noToDoMsg);
                singleCatToDos.appendChild(singleCatToDos_categoryToDos);
            }
        }
        todosContainer.appendChild(singleCatToDos);
    }
    removeMarkCompAndEditTodoBtns();
})


function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.replace(/^\w/, c => c.toUpperCase());
}


function populateNewCatInMainMenu(catName) {
    const mainMenu = document.querySelector(".mainMenu");
    const liElement = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = catName;
    button.type = "button";
    button.addEventListener('click', () => {
        DOMManager.clearAllTodos();
        for (let index = 0; index < items.length; index++) {

            const categoryName = items[index][0];
            if (catName === categoryName) {
                const categoryToDos = JSON.parse(items[index][1]);

                const todosContainer = document.querySelector(".todosContainer");

                const singleCatToDos = document.createElement("div");
                singleCatToDos.classList.add("singleCatToDos");

                const singleCatToDos_categoryName = document.createElement("h2");
                singleCatToDos_categoryName.classList.add("categoryName");
                singleCatToDos_categoryName.textContent = `${capitalizeFirstLetter(catName)} Category - Current Todos`;

                const delCatBtn = document.createElement('button');
                delCatBtn.textContent = 'Delete this category';
                delCatBtn.setAttribute('type', 'button');
                delCatBtn.classList.add('delCatBtn');
                delCatBtn.addEventListener('click', () => {
                    const deleteCat = confirm("Sure to delete this category?");
                    if (deleteCat) {
                        StorageManager.removeCat(categoryName);
                        location.reload();
                    } else {
                        alert('Your category is not deleted.');
                    }
                })
                singleCatToDos_categoryName.appendChild(delCatBtn);

                singleCatToDos.appendChild(singleCatToDos_categoryName);

                const singleCatToDos_categoryToDos = document.createElement("div");
                singleCatToDos_categoryToDos.classList.add("categoryToDos");


                if (categoryToDos.length === 0) {
                    const noToDoMsg = document.createElement('p');
                    noToDoMsg.textContent = "No todos here what to say of current todos.";
                    singleCatToDos_categoryToDos.appendChild(noToDoMsg);
                    singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                }
                else {
                    const currentTodos = categoryToDos.filter(todo => {
                        const parsedDate = parseISO(todo.dueDate);
                        const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
                        return !relativeTime.includes('ago') && todo.isCompleted === false;
                    });
                    if (isNaN(currentTodos)) {
                        for (let todoIndex = 0; todoIndex < currentTodos.length; todoIndex++) {
                            const todoItem = DOMManager.renderToDoToDOM(currentTodos[todoIndex], categoryName);
                            todoItem.style.backgroundColor = 'blue';
                            todoItem.style.color = 'white';
                            singleCatToDos_categoryToDos.appendChild(todoItem);
                            singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                        }
                    }
                    else {
                        const noToDoMsg = document.createElement('p');
                        noToDoMsg.textContent = "No current todos here.";
                        singleCatToDos_categoryToDos.appendChild(noToDoMsg);
                        singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                    }
                }
                todosContainer.appendChild(singleCatToDos);
            }
        }
    })
    liElement.appendChild(button);
    mainMenu.prepend(liElement);
}


function resetFormFields() {
    document.getElementById("todoTitle").value = "";
    document.getElementById("todoDesc").value = "";
    document.getElementById("todoDueDate").value = "";
    document.getElementById("todoPriority").value = "0";
    document.getElementById("todoNotes").value = "";
}


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

    // to handle change of category in case of editing a todo
    // console.log(document.getElementById("oldCategory")); // null in case of adding a new todo
    if (document.getElementById("oldCategory")) {
        const oldCategory = document.getElementById("oldCategory").value;
        const oldCategoryIdentifier = document.getElementById("oldCategoryIdentifier").value;
        TodoCategories.deleteTodoFromCategory(oldCategory, Number(oldCategoryIdentifier));
        console.log('todo deleted from old category');
    }

    dialog.close();
    console.log("Todo added successfully.");
    // location.reload();
    myForm.removeEventListener("submit", handleFormSubmit);
}


function dialogCloseBtnHandler() {
    dialog.close();
    closeModal.removeEventListener("click", dialogCloseBtnHandler);
}


function createNewCatEventListeners() {
    createNewCatBtn.addEventListener("click", createNewCatBtnClickHandler);
    addNewCatBtn.addEventListener("click", addNewCatBtnClickHandler);
    myForm.addEventListener("submit", handleFormSubmit);
    closeModal.addEventListener("click", dialogCloseBtnHandler);
}


addToDoBtn.addEventListener("click", () => {
    dialogHeading.textContent = "Add New Todo";
    resetFormFields();
    dialog.showModal();
    createNewCatEventListeners();
});


class DOMManager {
    static renderToDoToDOM(todo, todoCategory) {

        const todoItem = document.createElement("div");
        todoItem.classList.add("todoItem");

        const title = document.createElement("h2");
        title.textContent = `Title: ${todo.title}`;
        title.classList.add('todoItemField');

        const description = document.createElement("p");
        description.textContent = `Description: ${todo.description}`;
        description.classList.add('todoItemField');

        const dueDate = document.createElement("p");
        // const formattedDueDate = dateFormatter(todo.dueDate);
        const parsedDate = parseISO(todo.dueDate);
        const formattedDueDate = format(parsedDate, "EEEE, MMMM d, yyyy 'at' h:mm a");
        const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
        dueDate.textContent = `Due Date: ${formattedDueDate} (${relativeTime})`;
        dueDate.classList.add('todoItemField');

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${todo.priority}`;
        priority.classList.add('todoItemField');

        const notes = document.createElement("p");
        notes.textContent = `Notes: ${todo.notes}`;
        notes.classList.add('todoItemField');

        const cat = document.createElement("p");
        cat.textContent = `Category: ${todo.category}`;
        cat.classList.add('todoItemField');

        const pEditRemoveBtnsContainer = document.createElement("div");
        pEditRemoveBtnsContainer.classList.add('pEditRemoveBtnsContainer');

        const isCompleted = document.createElement("p");
        isCompleted.textContent = `Completed: ${todo.isCompleted}`;
        isCompleted.classList.add('todoItemField', 'isCompletedP');
        isCompleted.style.display = 'inline';
        pEditRemoveBtnsContainer.appendChild(isCompleted);

        const markCompletedBtn = document.createElement("button");
        markCompletedBtn.textContent = `Mark as completed`;
        markCompletedBtn.classList.add('todoItemField', 'markCompletedBtn', 'todoItemBtns');
        pEditRemoveBtnsContainer.appendChild(markCompletedBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = `Remove this todo`;
        removeBtn.classList.add('todoItemField', 'removeBtn', 'todoItemBtns');
        pEditRemoveBtnsContainer.appendChild(removeBtn);

        const editToDoBtn = document.createElement("button");
        editToDoBtn.textContent = `Edit this todo`;
        editToDoBtn.classList.add('todoItemField', 'editToDoBtn', 'todoItemBtns');
        pEditRemoveBtnsContainer.appendChild(editToDoBtn);

        todoItem.appendChild(title);
        todoItem.appendChild(description);
        todoItem.appendChild(dueDate);
        todoItem.appendChild(priority);
        todoItem.appendChild(notes);
        todoItem.appendChild(cat);
        todoItem.appendChild(pEditRemoveBtnsContainer);

        markCompletedBtn.addEventListener('click', () => {
            const yes = confirm("Are you sure this todo is completed?");
            if (yes) {
                NewToDo.toggleCompletion(todo.category, todo.todoIdentifier);
                // todo item background change to green
                // location.reload();
                alert('Todo completed and added to "completed todos".');
            }
            else {
                alert('Your todo is yet to be completed.');
            }
        });

        removeBtn.addEventListener("click", () => {
            const yes = confirm("Sure to delete this todo?");
            if (yes) {
                todoItem.remove();
                TodoCategories.deleteTodoFromCategory(todoCategory, todo.todoIdentifier);
                location.reload();
                alert('Todo deleted successfully!');
            }
            else {
                alert('Your todo is not deleted.');
            }

        });

        function retrieveToDoData() {
            document.getElementById("todoTitle").value = todo.title;
            document.getElementById("todoDesc").value = todo.description;
            document.getElementById("todoDueDate").value = todo.dueDate;
            document.getElementById("todoPriority").value = todo.priority;
            document.getElementById("todoNotes").value = todo.notes;
            document.getElementById("todosCats").value = todo.category;

            // capture the old category name and its unique identifier for later removal
            const oldCategory = document.createElement('option');
            oldCategory.id = 'oldCategory';
            oldCategory.value = todo.category;

            const oldCategoryIdentifier = document.createElement('option');
            oldCategoryIdentifier.id = 'oldCategoryIdentifier';
            oldCategoryIdentifier.value = todo.todoIdentifier;

            selectElement.appendChild(oldCategory);
            selectElement.appendChild(oldCategoryIdentifier);
        }

        editToDoBtn.addEventListener("click", () => {
            dialogHeading.textContent = "Edit Todo";
            dialog.showModal();
            retrieveToDoData();
            createNewCatEventListeners();
        });
        return todoItem;
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

    static removeCat(catName) {
        localStorage.removeItem(catName);
    }

    static removeAllCats() {
        localStorage.clear();
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
            console.log(targetToDo.isCompleted);
            targetToDo.isCompleted = !targetToDo.isCompleted;
            console.log(targetToDo.isCompleted);
            StorageManager.set(category, todos);
            console.log((TodoCategories.getToDos(category)));
            console.log(`Todo completed successfully.`);
        }
    }

    // static updatePriority(category, todoIdentifier, newPriority) {
    //     const todos = TodoCategories.getToDos(category);
    //     const targetToDo = todos.find(
    //         (todo) => todo.todoIdentifier === todoIdentifier
    //     );
    //     if (targetToDo) {
    //         targetToDo.priority = newPriority;
    //         StorageManager.set(category, todos);

    //         console.log(`Priority updated successfully.`);
    //     }
    // }

    // static updateDueDate(category, todoIdentifier, newDueDate) {
    //     const todos = TodoCategories.getToDos(category);
    //     const targetToDo = todos.find(
    //         (todo) => todo.todoIdentifier === todoIdentifier
    //     );
    //     if (targetToDo) {
    //         targetToDo.dueDate = newDueDate;
    //         StorageManager.set(category, todos);
    //         console.log(`Due date updated successfully.`);
    //     }
    // }
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

    // get todos from localStorage
    static getToDos(category) {
        return StorageManager.get(category);
    }


    // save todo into category and then into localStorage
    static saveToDoToCategory(category, todo) {
        const todos = TodoCategories.getToDos(category);
        console.log(todos);
        todos.push(todo);
        StorageManager.set(category, todos);
        console.log(`Todo saved to "${category}" successfully.`);
    }

    // delete todo from category and then from localStorage
    static deleteTodoFromCategory(category, todoIdentifier) {
        const todos = TodoCategories.getToDos(category);
        console.log(todos);
        console.log(todoIdentifier);
        console.log(typeof todoIdentifier);
        const updatedToDos = todos.filter(
            (todo) => todo.todoIdentifier !== todoIdentifier
        );
        console.log(updatedToDos);
        StorageManager.set(category, updatedToDos);
        console.log(`Todo removed from "${category}" successfully.`);
    }
}


// -----------------------------------------------------------------------------------------


// access an existing or create a new category
const todoCategories = TodoCategories.getInstance();
Object.freeze(todoCategories); // Optional: to make the singleton instance immutable


// get all the items of localStorage in one go
// Object.entries(localStorage);


// populate the main page with all the todos of the user
const items = Object.entries(localStorage).map((item) => item);
for (let index = 0; index < items.length; index++) {

    const categoryName = items[index][0];

    if (categoryName === "completedToDosCat" || categoryName === "missedToDosCat") {
        console.log("cats not meant to be populated in main menu and dom");
    }
    else {
        const categories = Object.keys(todoCategories.categories);
        if (!categories.includes(categoryName)) {
            const optionEl = document.createElement("option");
            optionEl.value = categoryName.toLowerCase();
            optionEl.textContent = capitalizeFirstLetter(categoryName);
            selectElement.appendChild(optionEl);
        }

        const categoryToDos = JSON.parse(items[index][1]);

        const todosContainer = document.querySelector(".todosContainer");

        const singleCatToDos = document.createElement("div");
        singleCatToDos.classList.add("singleCatToDos");

        const singleCatToDos_categoryName = document.createElement("h2");
        singleCatToDos_categoryName.classList.add("categoryName");
        singleCatToDos_categoryName.textContent = `${capitalizeFirstLetter(categoryName)} Category - Current Todos`;

        const delCatBtn = document.createElement('button');
        delCatBtn.textContent = 'Delete this category';
        delCatBtn.setAttribute('type', 'button');
        delCatBtn.classList.add('delCatBtn');
        delCatBtn.addEventListener('click', () => {
            const deleteCat = confirm("Sure to delete this category?");
            if (deleteCat) {
                StorageManager.removeCat(categoryName);
                location.reload();
            } else {
                alert('Your category is not deleted.');
            }
        })
        singleCatToDos_categoryName.appendChild(delCatBtn);

        singleCatToDos.appendChild(singleCatToDos_categoryName);

        const singleCatToDos_categoryToDos = document.createElement("div");
        singleCatToDos_categoryToDos.classList.add("categoryToDos");


        if (categoryToDos.length === 0) {
            const noToDoMsg = document.createElement('p');
            noToDoMsg.textContent = "No todos here what to say of current todos.";
            singleCatToDos_categoryToDos.appendChild(noToDoMsg);
            singleCatToDos.appendChild(singleCatToDos_categoryToDos);
        }
        else {
            const currentTodos = categoryToDos.filter(todo => {
                const parsedDate = parseISO(todo.dueDate);
                const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
                return !relativeTime.includes('ago') && todo.isCompleted === false;
            });

            if (isNaN(currentTodos)) {

                const noPriorityTodos = currentTodos.filter((todo) => todo.priority == 0)
                // console.log(noPriorityTodos);
                const priorityTodos = currentTodos.filter((todo) => todo.priority != 0)
                // console.log(priorityTodos);

                const sortedPriorityTodos = priorityTodos.sort((a, b) => {
                    return a.priority - b.priority
                })
                // console.log(sortedPriorityTodos);
                const sortedCurrentTodos = sortedPriorityTodos.concat(noPriorityTodos);
                // console.log(sortedCurrentTodos);

                for (let todoIndex = 0; todoIndex < sortedCurrentTodos.length; todoIndex++) {
                    const todoItem = DOMManager.renderToDoToDOM(sortedCurrentTodos[todoIndex], categoryName);
                    todoItem.style.backgroundColor = 'blue';
                    todoItem.style.color = 'white';
                    singleCatToDos_categoryToDos.appendChild(todoItem);
                    singleCatToDos.appendChild(singleCatToDos_categoryToDos);
                }
            }
            else {
                const noToDoMsg = document.createElement('p');
                noToDoMsg.textContent = "No current todos here.";
                singleCatToDos_categoryToDos.appendChild(noToDoMsg);
                singleCatToDos.appendChild(singleCatToDos_categoryToDos);
            }
        }
        populateNewCatInMainMenu(categoryName);
        todosContainer.appendChild(singleCatToDos);
    }
}


// TODO
// 1. sort todos according to priority
// 2. collapse a todo to show only title and duedate