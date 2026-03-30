const addBtn = document.querySelector("#addBtn");
const newTaskInput = document.querySelector("#taskToBeDOne");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const constValue = document.querySelector(".countValue");

    
/***************************************************************************
*******************************                *****************************
*******************************    Varaible    *****************************
*******************************                *****************************
****************************************************************************/

var taskCount = 0;
const displayCount = (taskCount) => {
    constValue.innerText = taskCount;
}

var editMode = false;
var targetTask = undefined;

/***************************************************************************
*******************************                *****************************
*******************************  Function Area *****************************
*******************************                *****************************
****************************************************************************/

// Add a Task on the board
function addTask(){
    if(editMode === true){
        targetTask.querySelector(".taskName").innerText = newTaskInput.value;
        resetMode();
    } else {
        editMode = false;
        const taskName = newTaskInput.value.trim();
        error.computedStyleMap.display = "none";

        if(!taskName){
            setTimeout(() => {
                error.style.display = "block";
            }, 200);
            return;
        }

        const task = createTask(taskName);
        tasksContainer.append(task);

        //delete button in a task
        deleteButtonsTask()

        // edit button in a task
        editButtonsTask();

        // checked input is changed
        checkedTask();
    }
    newTaskInput.value = "";
    displayCount(taskCount);
}

// Checked Task selectionned
function checkedTask(){
    const checkTasks = tasksContainer.querySelectorAll(".CheckTask");
    checkTasks.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                checkBox.parentNode.querySelector(".edit").disabled = true;
            } else{
                checkBox.parentNode.querySelector(".edit").disabled = false;
            }
        }
        
    });
}


// delete button in a task
function deleteButtonsTask(){
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        }
    });
}

//Edit button in a task
function editButtonsTask(){
    const editButtons = tasksContainer.querySelectorAll(".edit");
    editButtons.forEach((editBtns) => {
        editBtns.onclick = (e) => {
            let targetElement = e.target.parentNode;
            newTaskInput.value = targetElement.parentNode.querySelector(".taskName").innerText;
            editMode = true;
            targetTask = targetElement.parentNode;

            editModeTask();
        }
    });
}


// EditModeTask when button is clicked
function editModeTask(){
    disabledTask();

    addBtn.textContent = "Save";
    addBtn.value = "Save";
}

// Disable all Task
function disabledTask(){
    const taskElt = tasksContainer.querySelectorAll(".task");
    taskElt.forEach(task => {
        // console.log(task);
        task.querySelector(".CheckTask").disabled = true;
        task.querySelector(".edit").disabled = true;
        task.querySelector(".delete").disabled = true;
        task.style.opacity = "0.4";
    });
}

// Reset all mode of tasks
function resetMode(){
    addBtn.textContent = "Add";
    newTaskInput.value = "";
    editMode = false;
    resetTask();
}

//retset disable taks 
function resetTask(){
    const tasks = tasksContainer.querySelectorAll(".task");
    tasks.forEach(task => {
        if(task.querySelector(".CheckTask").checked){
            task.querySelector(".edit").disabled = true;
        }
        else {
            task.querySelector(".edit").disabled = false;
        }
        task.querySelector(".CheckTask").disabled = false;
        task.querySelector(".delete").disabled = false;
        task.style.opacity = "1";
    });
}

// function create a task and return a task
function createTask(taskName){
    taskCount++;
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = "task";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("CheckTask");
    checkBox.id = "CheckTask";

    const span = document.createElement("span");
    span.classList.add("taskName");
    span.id = "taskName";
    span.textContent = taskName;

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.id = "edit";

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editBtn.appendChild(editIcon);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.id = "delete";

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteBtn.appendChild(deleteIcon);

    task.appendChild(checkBox);
    task.appendChild(span);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    return task;
}



/***************************************************************************
*******************************                *****************************
*******************************   Execution    *****************************
*******************************                *****************************
****************************************************************************/

addBtn.addEventListener("click", addTask);