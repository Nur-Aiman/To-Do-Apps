console.log('start to do list')

let btnSubmitDOM = document.querySelector('#btnSubmit')
let newTaskDOM = document.querySelector('#newTask')
let listContainerDOM = document.querySelector('#ListContainer')
let importantCheckboxDOM = document.querySelector('#importantCheckbox')
let btnResetDOM = document.querySelector('#btnReset')

btnSubmitDOM.addEventListener('click', newTask)
btnResetDOM.addEventListener('click', resetList)

function newTask() {
    if (newTaskDOM.value === '') return

    let newLiDOM = document.createElement('li')
    newLiDOM.classList.add('task-container')

    let taskSpan = document.createElement('span')
    taskSpan.innerText = newTaskDOM.value
    newLiDOM.appendChild(taskSpan)

    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    let editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    editBtn.addEventListener('click', editTask)
    buttonContainer.appendChild(editBtn)

    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', deleteTask)
    buttonContainer.appendChild(deleteBtn)

    newLiDOM.appendChild(buttonContainer)

    if (importantCheckboxDOM.checked) {
        taskSpan.style.color = 'red'
        newLiDOM.classList.add('important')
    }

    listContainerDOM.appendChild(newLiDOM)
    sortTasks()

    resetForm()
}

function editTask(event) {
    let taskContainer = event.target.closest('.task-container')
    let taskSpan = taskContainer.querySelector('span')
    let newTaskName = prompt('Edit your task:', taskSpan.innerText)
    if (newTaskName) {
        taskSpan.innerText = newTaskName
    }
}

function deleteTask(event) {
    let taskContainer = event.target.closest('.task-container')
    taskContainer.remove()
}

function resetList() {
    listContainerDOM.innerHTML = ''
}

function resetForm() {
    newTaskDOM.value = ''
    importantCheckboxDOM.checked = false
}

function sortTasks() {
    let tasks = Array.from(listContainerDOM.children)
    tasks.sort(
        (a, b) =>
        b.classList.contains('important') - a.classList.contains('important')
    )
    listContainerDOM.innerHTML = ''
    tasks.forEach((task) => listContainerDOM.appendChild(task))
}