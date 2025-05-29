const btnStart =       document.querySelector('#start');
const btnClear =       document.querySelector('#clear');
const btnSave =        document.querySelector('#save');
const btnClearTable =  document.querySelector("#clearTable");
const btnModal =       document.querySelector("#plan");
const btnCloseModal =  document.querySelector("#cancelModal");
const btnAplic =       document.querySelector("#aplicTime");
const indiceList =     document.querySelector("#indice");
const container =      document.querySelector("#container-clear");
const containerModal = document.querySelector("#container-modal");

// Elements DOM
let eTime   = document.querySelector('#time');
let eMinute = document.querySelector('#minute');
let eSecond = document.querySelector('#second');

// Variables
let time = 0;
let minute = 0;
let second = 0;
let elapsed = 0;
let isValid = true;
let isModal = true;
let isPlan = false;
let startTime = null;
let interval, endTime, tbody, header, taskValue, taskValueModal, resultTHeader, resultTBody, taskInputModal;
let oldHour, oldMinute, oldSecond;
let arrayTasks = [];

function incrementeSeconds () {
    const now = Date.now();
    elapsed = now - startTime;

    const totalSeconds = Math.floor(elapsed / 1000);
    second = totalSeconds % 60;
    minute = Math.floor(totalSeconds / 60) % 60;
    time = Math.floor(totalSeconds / 3600);

    eSecond.innerText = second.toString().padStart(2, '0');
    eMinute.innerText = minute.toString().padStart(2, '0');
    eTime.innerText = time.toString().padStart(2, '0');
}

function decrementSeconds () {
    const now = Date.now();
    const remainingMs = endTime - now;

    if (remainingMs <= 0) {
        eSecond.innerText = '00';
        eMinute.innerText = '00';
        eTime.innerText = '00';
        clearInterval(interval);
        isPlan = true;
        saveTimer();
        isPlan = false;
        return;
    }
    
    const totalSeconds = Math.floor(remainingMs / 1000);
    second = totalSeconds % 60;
    minute = Math.floor(totalSeconds / 60) % 60;
    time = Math.floor(totalSeconds / 3600);

    eSecond.innerText = second.toString().padStart(2, '0');
    eMinute.innerText = minute.toString().padStart(2, '0');
    eTime.innerText = time.toString().padStart(2, '0');
}

function validationToggle () {
    clearInterval(interval);

    if (isPlan) {
        if (isValid) {
            startTime = Date.now() - elapsed;
            let totalSeconds = (time * 3600) + (minute * 60);
            endTime = Date.now() + totalSeconds * 1000;
            interval = setInterval(decrementSeconds, 1000);
            btnStart.innerHTML = 'Pausar';
            isValid = false;
            isPlan = false;
        } else {
            clearInterval(interval);
            btnStart.innerHTML = 'Iniciar';
            isValid = true;
            isPlan = false;
        }
    }  else {
        if (isValid) {
            startTime = Date.now() - elapsed;
            interval = setInterval(incrementeSeconds, 100);
            btnStart.innerHTML = 'Pausar';
            isValid = false;
        } else {
            clearInterval(interval);
            btnStart.innerHTML = 'Iniciar';
            isValid = true;
        }
    }
}

function clearTimer () {
    clearInterval(interval);
    time = 0;
    minute = 0;
    second = 0;
    elapsed = 0;
    startTime = null;
    eTime.innerHTML = '00';
    eMinute.innerHTML = '00';
    eSecond.innerHTML = '00';
    document.querySelector('#taskInput').value = '';
    btnStart.innerHTML = 'Iniciar';
    isValid = true;
}

function clearTable () {
    localStorage.clear();
    arrayTasks = [];
    if (resultTHeader.length === 1) {
        header.remove();
    }
    if (resultTBody.length === 1) {
        tBody.remove();
    }
    container.classList.remove("displayFlex");
}

function saveTimer () {
    // Header
    resultTHeader = indiceList.getElementsByTagName("thead");
    verifyHeader(resultTHeader);

    // Content
    resultTBody = indiceList.getElementsByTagName("tbody");
    verifyBody(resultTBody);

    const newRow = document.createElement("tr");

    taskValue = document.getElementById('taskInput').value;

    const newTask = document.createElement("td");
    const newContentTask = document.createTextNode(`${taskValue}`);
    newTask.appendChild(newContentTask);

    if (isPlan) {
        verifyPlan(newRow, newTask, oldHour, oldMinute, oldSecond);
        oldHour = 0;
        oldMinute = 0;
        oldSecond = 0;
    } else {
        verifyPlan(newRow, newTask, time, minute, second);
    }
}

function verifyLocalStorage () {
    try {
        let localStorageTask = JSON.parse(localStorage.getItem("task"));

        resultTHeader = indiceList.getElementsByTagName("thead");

        verifyHeader(resultTHeader);

        resultTBody = indiceList.getElementsByTagName("tbody");
        verifyBody(resultTBody);

        for (let i = 0; i < localStorageTask.length; i++) {
            const newRow = document.createElement("tr");

            const newTask = document.createElement("td");
            const newContentTask = document.createTextNode(`${localStorageTask[i].nameTask}`);
            newTask.appendChild(newContentTask);

            const newTd = document.createElement("td");
            const newContentTime = document.createTextNode(`${localStorageTask[i].hours.toString().padStart(2, "0")}`);
            newTd.appendChild(newContentTime);

            const newTd2 = document.createElement("td");
            const newContentMinute = document.createTextNode(`${localStorageTask[i].minutes.toString().padStart(2, "0")}`);
            newTd2.appendChild(newContentMinute);

            const newTd3 = document.createElement("td");
            const newContentSecond = document.createTextNode(`${localStorageTask[i].seconds.toString().padStart(2, "0")}`);
            newTd3.appendChild(newContentSecond);

            indiceList.appendChild(header);
            newRow.appendChild(newTask);
            newRow.appendChild(newTd);
            newRow.appendChild(newTd2);
            newRow.appendChild(newTd3);
            tBody.appendChild(newRow);

            indiceList.appendChild(tBody);
        }

        if (localStorageTask.length) {
            container.classList.add("displayFlex");
        }
    } catch (error) {}
}

function openModal () {
    if (isModal) {
        containerModal.classList.add("dFlexModal");
        isModal = false;
    } else {
        containerModal.classList.remove("dFlexModal");
        isModal = true;
    }
}

function createPlan () {
    taskValueModal = document.getElementById('taskTime').value;
    taskInputModal = document.getElementById('taskInputModal').value;

    if (taskValueModal === '') {
        window.alert("O campo tempo não pode ser vazio!");
        return
    }

    if (taskValueModal[4] === 0) {
        window.alert("O campo tempo não pode estar zerado!");
        return
    }

    try {
        const hour = taskValueModal[0] + taskValueModal[1];
        const minutes = taskValueModal[3] + taskValueModal[4];
        time = hour;
        minute = minutes;
        second = 59;

        oldHour = hour;
        oldMinute = minutes;
        oldSecond = 59;

        eTime.innerHTML = time;
        eMinute.innerHTML  = minute;
        eSecond.innerHTML  = second;
        document.getElementById('taskInput').value = taskInputModal;

        isPlan = true;

        containerModal.classList.remove("dFlexModal");
        isModal = true;

        document.getElementById('taskTime').value = '';
        document.getElementById('taskInputModal').value = '';
    } catch (error) {}
}   

const verifyHeader = (element) => {
    if (element.length === 0) {
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
        return tHeader = resultTHeader[0]; 
    }

}

const verifyBody = (element) => {
    if (element.length === 0) {
        tBody = document.createElement("tbody");
    } else {
        return tBody = resultTBody[0];
    }
}

const verifyPlan = (row, task, hour, minute, second) => {
    const newTd = document.createElement("td");
    const newContentTime = document.createTextNode(`${hour.toString().padStart(2, '0')}`);
    newTd.appendChild(newContentTime);

    const newTd2 = document.createElement("td");
    const newContentMinute = document.createTextNode(`${minute.toString().padStart(2, '0')}`);
    newTd2.appendChild(newContentMinute);

    const newTd3 = document.createElement("td");
    const newContentSecond = document.createTextNode(`${second.toString().padStart(2, '0')}`);
    newTd3.appendChild(newContentSecond);

    indiceList.appendChild(header);
    row.appendChild(task);
    row.appendChild(newTd);
    row.appendChild(newTd2);
    row.appendChild(newTd3);
    tBody.appendChild(row);

    let addTask = {
        nameTask: taskValue,
        hours: hour,
        minutes: minute,
        seconds: second,
    } 
    arrayTasks.push(addTask);

    indiceList.appendChild(tBody);
    localStorage.setItem("task", JSON.stringify(arrayTasks));

    container.classList.add("displayFlex");
    clearTimer();   
}

btnStart.addEventListener('click', validationToggle);
btnClear.addEventListener('click', clearTimer);
btnSave.addEventListener('click', saveTimer);
btnClearTable.addEventListener('click', clearTable);
btnModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', openModal);
btnAplic.addEventListener('click', createPlan);