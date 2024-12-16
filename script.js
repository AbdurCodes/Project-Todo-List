
// func that renders a single todo to the DOM
function renderToDoToDOM(todo) {
    const toDoContainer = document.querySelector('.toDoContainer');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');
    todoItem.insertAdjacentHTML('beforeend', ` 
        <h2>Category: ${todo.category}</h2> 
        <h2>Title: ${todo.title}</h2>
        <p>Description: ${todo.description}</p> 
        <p>Due Date: ${todo.dueDate}</p> 
        <p>Priority: ${todo.priority}</p> 
        <p>Notes: ${todo.notes}</p> 
        <p>Completed: ${todo.isCompleted}</p> 
        <button id="remBtn">Remove this todo</button> 
        `);
    toDoContainer.appendChild(todoItem);

    const remBtn = todoItem.querySelector("#remBtn");
    remBtn.addEventListener('click', () => {
        remBtn.parentElement.remove();
        TodoCategories.removeToDoFromLocalStorage(todo.category, todo.timestamp);
    })
}







class NewToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isCompleted = false;
        this.timestamp = Date.now();
    }

    // method that saves newly created todos into localStorage
    saveToLocalStorage(category) {

        // deserializing
        let todos = JSON.parse(localStorage.getItem(category)) || [];

        todos.push({
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            isCompleted: this.isCompleted,
            timestamp: this.timestamp,
            category: category
        });

        // serializing
        localStorage.setItem(category, JSON.stringify(todos));

    }



    // method that loads to-dos from the localStorage to display on page
    static retrieveFromLocalStorage(category) {

        return JSON.parse(localStorage.getItem(category)) || [];

    }

    setToDoComplete() {
        this.isCompleted = true;
        console.log(`${this.title} is completed.`);
    }

    changePriority(newPriority) {
        this.priority = newPriority;
        console.log(`${this.title} priority is changed to ${newPriority}`);
    }

    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
        console.log(`The due date of "${this.title}" is changed to ${newDueDate}`);
    }
}





// categories of to-dos
// given: life, work, education
// create a new category

// let todoCategories = {
//     life: [],
//     work: [],
//     education: [],
//     createNewCat: function (catName) {
//         if (!this[catName]) {
//             this[catName] = [];
//         }
//         return this[catName];
//     }
// }


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

    // addToDoToCategory(category, todo) {
    //     if (!this.categories[category]) {
    //         this.createNewCat(category);
    //     }
    //     this.categories[category].push(todo);
    // }

    static removeToDoFromLocalStorage(category, timestamp) {
        let jsObj = JSON.parse(localStorage.getItem(category)) || [];
        // console.log(jsObj);
    
        let updatedjsObj = jsObj.filter(todo => todo.timestamp !== timestamp)
    
        localStorage.setItem(category, JSON.stringify(updatedjsObj));
        // console.log(updatedjsObj);
    }
}




// app logic ends here
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
todoCategories.createNewCat("leisure");
// todoCategories.categories["life"]
// todoCategories.addToDoToCategory("life", todo1);


// saving the todo to local storage
todo1.saveToLocalStorage(Object.keys(todoCategories.categories).at(0));
// Object.keys(todoCategories.categories).at(0)


// Render all to-dos for a category
NewToDo.retrieveFromLocalStorage("life").forEach(todo => renderToDoToDOM(todo));

// adding a to-do into a certain category
// todoCategories.life.push(todo1);
// todoCategories.work.push(todo1);
// todoCategories.education.push(todo1);
// todoCategories.createNewCat("Sports").push(todo1);
// todoCategories.createNewCat("Travel").push(todo1);









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