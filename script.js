const toDoContainer = document.querySelector('toDoContainer');

class newToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isCompleted = false;
    }



    // method that saves newly created todos into localStorage
    saveToLocalStorage(category) {

        let todos = JSON.parse(localStorage.getItem(category)) || [];
        todos.push({
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            isCompleted: this.isCompleted
        });
        localStorage.setItem(category, JSON.stringify(todos));

        // store todo data in js object
        // let todo = {
        //     title: this.title,
        //     description: this.description,
        //     dueDate: this.dueDate,
        //     priority: this.priority,
        //     notes: this.notes,
        //     isCompleted: this.isCompleted
        // }
        // // convert todo into JSON
        // let jsonTODO = JSON.stringify(todo);
        // // save that json to localStorage
        // localStorage.setItem(this.title, jsonTODO);
    }



    // method that loads to-dos from the localStorage to display on page
    static retrieveFromLocalStorage(category) {

        return JSON.parse(localStorage.getItem(category)) || [];

        // let jsonFromLS = localStorage.getItem(this.title);
        // let json_to_obj = JSON.parse(jsonFromLS);
        // console.log(json_to_obj);
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


class TodoCategories  {
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

    addToDoToCategory (category, todo) {
        if (!this.categories[category]) {
            this.createNewCat(category);
        }
        this.categories[category].push(todo);
    }
}


let todo1 = new newToDo(
    "example todo",
    "This is an example todo only",
    "24-12-2024",
    1,
    "i will try to complete it in time"
)


let todoCategories = new TodoCategories();
todoCategories.addToDoToCategory("life", todo1);
todoCategories.addToDoToCategory("word", todo2);

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