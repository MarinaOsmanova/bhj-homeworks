'use strict';

let tasks = [];
const storageItemName = 'my_tasks';
const myStorage = window.localStorage;
const tasksList = document.getElementById('tasks__list');

function saveTasks() {
    myStorage.setItem(storageItemName, JSON.stringify(tasks));
}

function removeTaskClickHandler() {
    const taskElement = this.closest('.task');
    const text = taskElement.querySelector('.task__title').textContent;
    const index = tasks.indexOf(text);
    if (index >= 0) {
        tasks.splice(index, 1);
        saveTasks();
    }
    taskElement.remove();
    return false;
}

function createTaskElement(text) {
    const task = document.createElement('div');
    task.className = 'task';
    const title = document.createElement('div');
    title.className = 'task__title';
    title.innerText = text;
    
    const link = document.createElement('a');
    link.className = 'task__remove';
    link.href = '#';
    link.innerHTML = '&times;';
    link.onclick = removeTaskClickHandler;

    task.appendChild(title);
    task.appendChild(link);
    return task;
}

function addTask(text) {
    tasks.push(text);
    saveTasks();
    const taskElement = createTaskElement(text);
    tasksList.appendChild(taskElement);
}

function loadTasks() {
    tasks = JSON.parse(myStorage.getItem(storageItemName));
    if (!tasks) {
        tasks = [];
        return;
    }
    for (let i=0; i<tasks.length; i++) {
        tasksList.appendChild( createTaskElement(tasks[i]) );
    }
}

loadTasks();

document.getElementById('tasks__add').onclick = function() {
    const input = document.getElementById('task__input');
    let taskText = input.value.trim();
    if (taskText) {
        addTask(taskText);
        input.value = '';
    }
    return false;
}