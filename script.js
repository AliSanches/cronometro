const btnStar = document.querySelector('#start');
const btnClear = document.querySelector('#clear');
const btnSave = document.querySelector('#save');
const indiceList = document.querySelector('#indice');
let eTime = document.querySelector('#time');
let eMinute = document.querySelector('#minute');
let eSecond = document.querySelector('#second');

let time = 0;
let minute = 0;
let second = 0;
let isValid = true;
let interval, tbody, header, taskValue;

function incrementeSeconds() {
   second += 1
   eSecond.innerText = second.toString().padStart(2, '0');

   if (second === 60) { 
        minute += 1
        second = 0
   }
   eMinute.innerText = minute.toString().padStart(2, '0');

   if (minute === 60) {
        time += 1
        minute = 0
   }
   eTime.innerText = time.toString().padStart(2, '0');
}

function validationToggle () {
    if (isValid) {
        interval = setInterval(incrementeSeconds, 1000);
        btnStar.innerHTML = 'Pausar';
        isValid = false;
    } else {
       clearInterval(interval);
       btnStar.innerHTML = 'Iniciar';
       isValid = true;
    }
}

function clearTimer () {
    clearInterval(interval);
    time = 0;
    minute = 0;
    second = 0;
    eTime.innerHTML = '00';
    eMinute.innerHTML = '00';
    eSecond.innerHTML = '00';
    document.querySelector('#taskInput').value = '';
    btnStar.innerHTML = 'Iniciar';
}

function saveTimer () {
    // Header
    const resultTHeader = indiceList.getElementsByTagName("thead");
    if (resultTHeader.length === 0) {
        header = document.createElement("thead");

        const headerTr = document.createElement("tr");
        header.appendChild(headerTr);

        const columnTask = document.createElement("th");
        const contentTask = document.createTextNode("Tarefa");
        columnTask.appendChild(contentTask);
        
        const columnTime = document.createElement("th");
        const contentTime = document.createTextNode("Hora");
        columnTime.appendChild(contentTime);

        const columnMinute = document.createElement("th");
        const contentMinute = document.createTextNode("Minutos");
        columnMinute.appendChild(contentMinute);

        const columnSecond = document.createElement("th");
        const contentSecond = document.createTextNode("Segundos");
        columnSecond.appendChild(contentSecond);

        header.appendChild(columnTask);
        header.appendChild(columnTime);
        header.appendChild(columnMinute);
        header.appendChild(columnSecond);
    } else {
        tHeader = resultTHeader[0]; 
    }

    // Content
    const resultTBody = indiceList.getElementsByTagName("tbody");
    if (resultTBody.length === 0) {
        tBody = document.createElement("tbody");
    } else {
        tBody = resultTBody[0];
    }
    const newRow = document.createElement("tr");

    taskValue = document.getElementById('taskInput').value;

    const newTask = document.createElement("td");
    const newContentTask = document.createTextNode(`${taskValue}`);
    newTask.appendChild(newContentTask);

    const newTd = document.createElement("td");
    const newContentTime = document.createTextNode(`${time.toString().padStart(2, '0')}`);
    newTd.appendChild(newContentTime);

    const newTd2 = document.createElement("td");
    const newContentMinute = document.createTextNode(`${minute.toString().padStart(2, '0')}`);
    newTd2.appendChild(newContentMinute);

    const newTd3 = document.createElement("td");
    const newContentSecond = document.createTextNode(`${second.toString().padStart(2, '0')}`);
    newTd3.appendChild(newContentSecond);

    indiceList.appendChild(header);
    newRow.appendChild(newTask);
    newRow.appendChild(newTd);
    newRow.appendChild(newTd2);
    newRow.appendChild(newTd3);
    tBody.appendChild(newRow);

    indiceList.appendChild(tBody);

    localStorage.setItem("task", `${taskValue}`);
    localStorage.setItem("time", `${time}`);
    localStorage.setItem("minute", `${minute}`);
    localStorage.setItem("second", `${second}`);
    clearTimer();
}

function verifyLocalStorage () {
    let localStorageTask = localStorage.getItem("task");
    let localStorageTime = localStorage.getItem("time");
    let localStorageMinute = localStorage.getItem("minute");
    let localStorageSecond = localStorage.getItem("second");

    if (localStorageTask === null) {
        localStorageTask = '';
    }
    if (localStorageTime === null) {
        localStorageTime = '00';
    }
    if (localStorageMinute === null) {
        localStorageMinute = '00';
    }
    if (localStorageSecond === null) {
        localStorageSecond = '00';
    }

    const resultTHeader = indiceList.getElementsByTagName("thead");
    if (resultTHeader.length === 0) {
        header = document.createElement("thead");

        const headerTr = document.createElement("tr");
        header.appendChild(headerTr);

        const columnTask = document.createElement("th");
        const contentTask = document.createTextNode("Tarefa");
        columnTask.appendChild(contentTask);
        
        const columnTime = document.createElement("th");
        const contentTime = document.createTextNode("Hora");
        columnTime.appendChild(contentTime);

        const columnMinute = document.createElement("th");
        const contentMinute = document.createTextNode("Minutos");
        columnMinute.appendChild(contentMinute);

        const columnSecond = document.createElement("th");
        const contentSecond = document.createTextNode("Segundos");
        columnSecond.appendChild(contentSecond);

        header.appendChild(columnTask);
        header.appendChild(columnTime);
        header.appendChild(columnMinute);
        header.appendChild(columnSecond);
    } else {
        tHeader = resultTHeader[0]; 
    }

    const resultTBody = indiceList.getElementsByTagName("tbody");
    if (resultTBody.length === 0) {
        tBody = document.createElement("tbody");
    } else {
        tBody = resultTBody[0];
    }
    const newRow = document.createElement("tr");

    const newTask = document.createElement("td");
    const newContentTask = document.createTextNode(`${localStorageTask}`);
    newTask.appendChild(newContentTask);

    const newTd = document.createElement("td");
    const newContentTime = document.createTextNode(`${localStorageTime}`);
    newTd.appendChild(newContentTime);

    const newTd2 = document.createElement("td");
    const newContentMinute = document.createTextNode(`${localStorageMinute}`);
    newTd2.appendChild(newContentMinute);

    const newTd3 = document.createElement("td");
    const newContentSecond = document.createTextNode(`${localStorageSecond}`);
    newTd3.appendChild(newContentSecond);

    indiceList.appendChild(header);
    newRow.appendChild(newTask);
    newRow.appendChild(newTd);
    newRow.appendChild(newTd2);
    newRow.appendChild(newTd3);
    tBody.appendChild(newRow);

    indiceList.appendChild(tBody);
}

btnStar.addEventListener('click', validationToggle);
btnClear.addEventListener('click', clearTimer);
btnSave.addEventListener('click', saveTimer);
window.addEventListener("DOMContentLoaded", verifyLocalStorage);