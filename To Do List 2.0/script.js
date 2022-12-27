window.addEventListener('DOMContentLoaded', () => {

const createBoard = document.querySelector('.createBoard');
const boardsContainer = document.querySelector('.boards-container');
const taskCreationWindow = document.getElementById('task-creation-window');
const taskName = document.getElementById('task-name');
const addATask = document.querySelector('.add-a-task');
const cancel = document.querySelector('.cancel');
    
const creatingBoard = function () {
        createBoard.addEventListener('click', function() {
            console.log('click');
            let currentId;
            const board = document.createElement('div');
            board.classList.add('board');
            board.id = window.crypto.randomUUID();
            currentId = board.id;
            boardsContainer.append(board);
            board.insertAdjacentHTML('beforeend', `
            <span class="title" contentEditable='true'>Введите название доски</span>
            <ol class="tasks">
            </ol>
            `);
            let button = document.createElement('button');
            button.classList.add('create-task');
            button.textContent = 'Создать задачу';
            board.append(button);
            const tasks = document.querySelector('.tasks');
            creatingTask();
            board.ondrop = drop;
            board.ondragover = allowDrop;
        })
    };

const creatingTask = function () {
    let boards = document.querySelectorAll('.board');
    boards.forEach(oneOfTheBoards => {
    let secondChildElement = oneOfTheBoards.children[1];
    oneOfTheBoards.addEventListener('click', function(event) {
    
        if (event.target.classList.contains('create-task')) {
            taskCreationWindow.showModal();
            addATask.onclick = function() {
            let task = document.createElement('li');
            task.id = window.crypto.randomUUID(); 
            task.classList.add('task');
            task.textContent = taskName.value;
            task.draggable = true;
            secondChildElement.append(task);

            cancel.addEventListener('click', function() {
                taskCreationWindow.close();

            })
            
            taskCreationWindow.close();
            taskName.value = '';
    
            oneOfTheBoards.ondragover = allowDrop;
            
            task.ondragstart = drag;
            
            oneOfTheBoards.ondrop = drop;
        } 
    }
    
    
})

})
}

function allowDrop(event) {
    event.preventDefault()
}

function drag (event) {
    event.dataTransfer.setData('id', event.target.id);
}

function drop (event) {
    let itemId = event.dataTransfer.getData('id');
    event.target.append(document.getElementById(itemId));
}

creatingBoard();
})