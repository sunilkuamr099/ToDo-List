
const taskInput = document.querySelector('.card-input input');
const submit = document.querySelector('#submit');
const tasks = document.querySelector('.tasks');
const completeall = document.querySelector('.completeAll');
const clearComplete = document.querySelector('.clearComplete');
const allTasks = document.querySelector('#all');
const uncomplete = document.querySelector('#uncomplete');
const complete = document.querySelector('#complete');
const pendingTask = document.querySelector('.pending-task');
const edit = document.querySelector('.edit');


// This function invokes views the page with the tasks that are currently
// Stored in the browser storage
showTasks('all');

// This Function Adds the items to the Task List On Pressing "Enter" Key
taskInput.addEventListener('keyup', (e) => {
    let task = taskInput.value.trim();

    if( task != 0 ){
        submit.style.display = "block";
    }else{
        submit.style.display = "none";
    }

    if(e.key == 'Enter' && task ){
        // Use Browser storage to store the tasks so that even if the page refreshes the
        // Task List does not vanishes

        // We fetch the task from browser storage
        var todoList = JSON.parse(localStorage.getItem('todo-list'));
        if(!todoList){  //If list is empty then return empty
            todoList = [];
        }
        
        // Stored task details in the form of object containing
        // Two parameters 1) task name and 2) task status
        let taskDetails = {name: task, status: "Pending"};
        todoList.push(taskDetails); // Add task details to array

        // Setting the updated local Storege 
        localStorage.setItem("todo-list", JSON.stringify(todoList));
        showTasks('all');
        taskInput.value = '';
    }
});

// This Function adds tasks To the list of tasks on submitting

submit.onclick = () =>{
    if(taskInput.value.trim() == '' ){
        return;
    }

    // We fetch the task from browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(!todoList){  //If list is empty then return empty
        // If BrowserStorage is empty then we start new Array
        todoList = [];
    }
    
    // Stored task details in the form of object containing
    // Two parameters 1) task name and 2) task status
    let taskDetails = {name: taskInput.value.trim(), status: "Pending"};
    todoList.push(taskDetails);// Add task details to array

    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTasks('all');
    taskInput.value = ''
    
}


//  This function actually shows the tasks list depending upon the filter
// Provided to the function
function showTasks(filter){
    let lists = "";
    // Fetching the array in browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    
    if(todoList == null){ //If list is empty then return empty
        lists = "No task to show"
        return lists;
    }

    let len = 0;
    todoList.forEach((elem, idx) => {
        let isComplete = elem.status === "Complete" ? "complete" : "";
        // This used to add checked status to the list if item is already complete
        let checked = elem.status === "Complete" ? "checked" : "";
        if(elem.status === "Pending"){
            len++;
        }

        if(filter == elem.status || filter == 'all'){
            lists += `<li class="task">
                        <label for="${idx}">
                            <input id=${idx} class="taskinput" type="checkbox" onclick="updateStatus(${idx})" ${checked} >
                            <span class="${isComplete}">${elem.name}</span>
                        </label>
                        <span class="remove">
                            <i class="edit fa-solid fa-pen-to-square" onclick="editTask(${idx})"></i>
                            <i class="fa-solid fa-xmark" onclick="deleteTask(${idx})"></i>
                        <span>
                    </li>`
        }
    });
    tasks.innerHTML = lists;
    submit.style.display = "none";
    // Update the status of the pending tasks
    pendingTask.textContent = len || '0';
}


// This function fetches the array from browser storage and removes the elements
// On Id which is provided in this function
function deleteTask(idx) {
    // Fetching the array in browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(todoList == null){
        return;
    }

    // Remove one element at index -> idx
    todoList.splice(idx, 1);

    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTasks('all');
}

// This Function Complete all tasks and removes from the storage
completeall.onclick = () => {
    var todoList = JSON.parse(localStorage.getItem('todo-list'));

    if(todoList == null){
        return;
    }

    // Update the status of each element in list
    todoList.forEach( (elem) => {
        elem.status = 'Complete';
    })

    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList) );
    showTasks('all');
}


// This function removes all tasks whose status is completed
clearComplete.onclick = () => {
    // Fetching the array in browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(todoList == null){
        return;
    }

    // Removes the tasks from the list which status is complete
    todoList.forEach((elem, idx) => {
        if(elem.status == "Complete"){
            todoList.splice(idx, 1);
        }
    });

    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList) );

    showTasks('all');
}


// This function updates the status of the task whose index is provided
function updateStatus(idx){
    // Fetching the array in browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    var inputTask = document.querySelector('.taskinput');
    if(todoList == null){
        return;
    }
    
    if(todoList[idx].status == "Complete"){
        todoList[idx].status = "Pending";
    }else{
        todoList[idx].status = "Complete";
    }
    
    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList) );
    showTasks('all')
} 

// This function shows the Pending tasks in list

uncomplete.onclick = () => {
    // Pass status as 'Pending' to the showTask function
    showTasks('Pending');
}


// This function shows the Completed tasks in list
complete.onclick = () => {
    // Pass status as 'Complete' to the showTask function
    showTasks('Complete');
}

// This function shows the all tasks in list
allTasks.onclick = () => {
    // Pass status as 'all' to the showTask function
    showTasks('all');
}


function editTask(idx){
    // Prompt user to enter edit task
    let updatedTask = prompt("Enter the update");

    // Fetching the array in browser storage
    var todoList = JSON.parse(localStorage.getItem('todo-list'));

    if(todoList == null){
        return;
    }

    todoList[idx].name = updatedTask;

    // Setting the updated local Storege 
    localStorage.setItem("todo-list", JSON.stringify(todoList) );
    showTasks('all');
}