
const TASK_DOM = {
    task_name: document.getElementById("task_name"),
    task_time: document.getElementById("task_time"),
    task_status: document.getElementById(" task_status"),
    task_date: document.getElementById("task_date"),
    main_div: document.getElementById("mainDiv")
}

const arrayOfData = getFromLocalStorage("taskData");
draw(arrayOfData)


function draw(inputArray) {
    clearCard()
    for (let index = 0; index < inputArray.length; index++) {
        const length = inputArray.length - 1
        if (index === length) { // check if this is the last card we are drawing
            createTaskCardFade(inputArray[index]) // if it is, use the same function as createTaskCard, but add fadein class to the task card
        } else {
            createTaskCard(inputArray[index])
        }
    }
}
function clearCard() {
    TASK_DOM.main_div.innerHTML = ""
}


function drawCard(task) {
    const { main_div } = TASK_DOM
    const taskCard = createTaskCard(task)
    if (!taskCard) return; //taskCard always retrun undefinied , createTaskCard has no return. 
    main_div.append(taskCard) // you already append taskCard in createTaskCard function, making drawCard function unneccesery
}

const form = document.querySelector("#add-task-form");
form.addEventListener("submit", addTaskCard)

const firstP = document.querySelector("#first");
firstP.addEventListener("click", showFirst)

const secondP = document.querySelector("#second");
secondP.addEventListener("click", showSecond)

const noP = document.querySelector("#no");
noP.addEventListener("click", showNo)



function createTaskCard(task) {
    const divOfAllCards = document.querySelector("#mainDiv")
    //divOfAllCards.classList.add("w3-center", "w3-animate-left"); ==> i deleted this, because we are using the animation on the mainTaskCard, and not the parent (divOfAllCards)
    const { task_name, task_time, task_status, task_date, id } = task;


    const mainTaskCard = document.createElement("div");
    mainTaskCard.setAttribute("class", "card");
    mainTaskCard.style.backgroundImage = " url(../projact/picture/pinkNote.png)"
    mainTaskCard.style = ("width: 18rem");
    // mainTaskCard.addEventListener("mouseover", buttonFunction);
    mainTaskCard.onmouseover = function () {
        buttonDiv.style.visibility = "visible"
    }
    mainTaskCard.onmouseleave = function () {
        buttonDiv.style.visibility = "hidden"
    }

    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    mainTaskCard.appendChild(cardBody)

    const titleCard = document.createElement("h3")
    titleCard.setAttribute("class", "card-title")
    titleCard.innerText = task_name
    cardBody.appendChild(titleCard)

    const status = document.createElement("h4");
    status.setAttribute("class", "blockquote-footer");
    status.innerText = task_status
    cardBody.appendChild(status)


    const time = document.createElement("h4");
    time.setAttribute("class", "card-subtitle mb-1 text-muted");
    time.innerText = task_time
    cardBody.appendChild(time)

    const date = document.createElement("h4");
    date.setAttribute("class", "card-subtitle mb-1 text-muted");
    date.innerText = task_date
    cardBody.appendChild(date)

    const buttonDiv = document.createElement("div")
    buttonDiv.className = "button"
    cardBody.appendChild(buttonDiv);


    const deleteCard = document.createElement("button");
    deleteCard.setAttribute("class", "btn btn-danger");
    deleteCard.addEventListener("click", function () {
        deleteTaskCard(id)

    });
    deleteCard.innerHTML = "delete"
    buttonDiv.appendChild(deleteCard)

    const doneTask = document.createElement("button");
    doneTask.setAttribute("class", "btn btn-success")
    doneTask.innerText = "done"
    doneTask.addEventListener("click", function () {
        toggleDone(id, mainTaskCard);
        saveToLocalStorage("taskData", arrayOfData)
    })
    buttonDiv.appendChild(doneTask)

    divOfAllCards.append(mainTaskCard)
}

function createTaskCardFade(task) { // same as createTaskCard but with some changes
    const divOfAllCards = document.querySelector("#mainDiv")
    const { task_name, task_time, task_status, task_date, id } = task;
    //divOfAllCards.classList.add("w3-center", "w3-animate-left"); deleted again, since we are not animation the parent div, but the mainTaskCard

    const mainTaskCard = document.createElement("div");
    mainTaskCard.classList.add("w3-animate-opacity", "card"); // here we apply to the card the animation we want to use

    mainTaskCard.style.backgroundImage = " url(../projact/picture/pinkNote.png)"
    mainTaskCard.style = ("width: 18rem");
    // mainTaskCard.addEventListener("mouseover", buttonFunction);
    mainTaskCard.onmouseover = function () {
        buttonDiv.style.visibility = "visible"
    }
    mainTaskCard.onmouseleave = function () {
        buttonDiv.style.visibility = "hidden"
    }

    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    mainTaskCard.appendChild(cardBody)

    const titleCard = document.createElement("h3")
    titleCard.setAttribute("class", "card-title")
    titleCard.innerText = task_name
    cardBody.appendChild(titleCard)

    const status = document.createElement("h4");
    status.setAttribute("class", "blockquote-footer");
    status.innerText = task_status
    cardBody.appendChild(status)


    const time = document.createElement("h4");
    time.setAttribute("class", "card-subtitle mb-1 text-muted");
    time.innerText = task_time
    cardBody.appendChild(time)

    const date = document.createElement("h4");
    date.setAttribute("class", "card-subtitle mb-1 text-muted");
    date.innerText = task_date
    cardBody.appendChild(date)

    const buttonDiv = document.createElement("div")
    buttonDiv.className = "button"
    cardBody.appendChild(buttonDiv);


    const deleteCard = document.createElement("button");
    deleteCard.setAttribute("class", "btn btn-danger");
    deleteCard.addEventListener("click", function () {
        deleteTaskCard(id)

    });
    deleteCard.innerHTML = "delete"
    buttonDiv.appendChild(deleteCard)

    const doneTask = document.createElement("button");
    doneTask.setAttribute("class", "btn btn-success")
    doneTask.innerText = "done"
    doneTask.addEventListener("click", function () {
        toggleDone(id, mainTaskCard);
        saveToLocalStorage("taskData", arrayOfData)
    })
    buttonDiv.appendChild(doneTask)

    divOfAllCards.append(mainTaskCard)
}




function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].id === id) {
            return index
        }
    }
}

function deleteTaskCard(id) {

    const index = findIndex(arrayOfData, id)
    if (id === undefined) return;
    arrayOfData.splice(index, 1)
    saveToLocalStorage("taskData", arrayOfData)
    draw(arrayOfData);
}

function toggleDone(id, element) {
    const index = findIndex(arrayOfData, id)
    if (index === undefined) return;
    const task = arrayOfData[index]
    // if (task.isDone === false) {
    //     task.isDone = true
    // } else {
    //     task.isDone = false;
    // }
    task.isDone = !task.isDone;
    if (task.isDone) {
        element.style.opacity = 0.4;

    } else {
        element.style.opacity = "unset";
        saveToLocalStorage("taskData", arrayOfData)//i have a priblem
    }
}
function showFirst() {//not finish!!!!!!!

}

function showSecond() {//not finish!!!!!!

}

function showNo() {//not finish!!!!!!

}



function addTaskCard(e) {
    // don't let the browser submit the form to a server (navigate to a new page)
    e.preventDefault();

    const card_id = new Date().getTime();
    const { task_name, task_time, task_status, task_date } = TASK_DOM
    arrayOfData.push(new Task(task_name.value, task_time.value, task_date.value, task_status.value, card_id))

    saveToLocalStorage("taskData", arrayOfData)

    draw(arrayOfData)
}
function Task(_name, _time, _date, _status, _id) {
    this.id = _id
    this.task_name = _name
    this.task_time = _time
    this.task_status = _status
    this.task_date = _date
    this.isDone = false
}
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function getFromLocalStorage(key) {
    const stringifiedData = localStorage.getItem(key)
    return JSON.parse(stringifiedData) || [];
}